/**
 * Browser verification of the scroll-reveal motion system.
 * Run with the production server already listening (npx next start -p 3457).
 * Drives real Chrome via puppeteer-core; leaves screenshots in .browser-shots/.
 * Disposable artifact: safe to delete this folder afterwards.
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const BASE = 'http://localhost:3457';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SHOTS = '.browser-shots';
fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
function check(name, pass, detail = '') {
  results.push({ name, pass });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Inspect every animated element (direct [data-animate] nodes plus children
// of [data-animate-group] containers, since the stagger applies to children).
// Reports: total seen, how many are still hidden, and how many hidden ones
// are currently inside the viewport ("stuck" = should have revealed already).
const measureFn = () => {
  const els = [
    ...document.querySelectorAll('[data-animate]'),
    ...[...document.querySelectorAll('[data-animate-group]')].flatMap((g) => [...g.children]),
  ];
  const vh = window.innerHeight;
  const seen = new Set();
  let hidden = 0;
  let stuck = 0;
  els.forEach((el) => {
    if (!(el instanceof HTMLElement) || seen.has(el)) return;
    seen.add(el);
    if (getComputedStyle(el).opacity !== '1') {
      hidden++;
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0 && r.width > 0 && r.height > 0) stuck++;
    }
  });
  return { total: seen.size, hidden, stuck };
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900'],
  defaultViewport: { width: 1440, height: 900 },
});

try {
  const page = await browser.newPage();

  // ---- Check 1: hero reveals on first load ----
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
  await sleep(1700); // allow staggered fade-up animations (0.75s delay + 0.7s run) to finish
  const htmlHasJs = await page.evaluate(() => document.documentElement.classList.contains('js'));
  const hero = await page.evaluate(measureFn);
  check('hero elements revealed on load', hero.total > 0 && hero.stuck === 0 && htmlHasJs,
    `${hero.total} animated elements, ${hero.hidden} still hidden`);

  // Mark the window so we can prove the next transition is client-side
  // (a full reload would wipe this variable).
  await page.evaluate(() => { window.__motionCheckMarker = 1; });
  await page.screenshot({ path: `${SHOTS}/01-home-hero.png` });

  // ---- Check 2: reveal after client-side navigation (the bug that was fixed) ----
  await page.click('a[href="/team"]');
  await sleep(1700);
  const stillClientSide = await page.evaluate(() => window.__motionCheckMarker === 1);
  const afterNav = await page.evaluate(measureFn);
  check('client-side navigation preserved (marker survives)', stillClientSide);
  check('in-viewport content visible right after client-side nav', afterNav.total > 0 && afterNav.stuck === 0,
    `${afterNav.total} animated elements, ${afterNav.stuck} stuck hidden`);
  await page.screenshot({ path: `${SHOTS}/02-team-after-nav.png` });

  // ---- Check 3: scrolling reveals everything on the navigated page ----
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += 600;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 120);
        else resolve();
      };
      step();
    });
  });
  await sleep(1700);
  const afterScroll = await page.evaluate(measureFn);
  check('all team sections revealed after scrolling to bottom',
    afterScroll.total > 0 && afterScroll.hidden === 0,
    `${afterScroll.total - afterScroll.hidden}/${afterScroll.total} revealed`);
  await page.screenshot({ path: `${SHOTS}/03-team-bottom.png` });

  // ---- Check 4: publications filter still works alongside animations ----
  await page.goto(`${BASE}/publications`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  const countPubItems = () => page.$$eval('[class*="pubsList"] > *', (els) => els.length);
  const before = await countPubItems();
  const filterButtons = await page.$$('button[aria-pressed]');
  if (filterButtons.length > 1 && before > 0) {
    await filterButtons[1].click();
    await sleep(600);
    const after = await countPubItems();
    check('publications filter works with animation attributes',
      after > 0 && after < before, `${before} -> ${after} items`);
  } else {
    check('publications filter interaction', false,
      `buttons: ${filterButtons.length}, items: ${before}`);
  }
  await page.screenshot({ path: `${SHOTS}/04-publications-filtered.png` });

  // ---- Check 5: contact page reveals ----
  await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle0' });
  await sleep(1700);
  const contact = await page.evaluate(measureFn);
  check('contact grid revealed', contact.total > 0 && contact.stuck === 0,
    `${contact.total} animated elements`);
  await page.screenshot({ path: `${SHOTS}/05-contact.png` });

  // ---- Check 6: prefers-reduced-motion shows content without scrolling ----
  const rmPage = await browser.newPage();
  await rmPage.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await rmPage.goto(`${BASE}/research`, { waitUntil: 'networkidle0' });
  await sleep(500);
  const rm = await rmPage.evaluate(measureFn);
  check('prefers-reduced-motion: content visible without scrolling',
    rm.total > 0 && rm.hidden === 0, `${rm.total - rm.hidden}/${rm.total} visible`);
  await rmPage.screenshot({ path: `${SHOTS}/06-research-reduced-motion.png` });
  await rmPage.close();
} catch (err) {
  check('script completed without crash', false, String(err).slice(0, 300));
} finally {
  await browser.close();
  const passed = results.filter((r) => r.pass).length;
  console.log(`\n${passed}/${results.length} checks passed`);
  process.exit(passed === results.length ? 0 : 1);
}
