/**
 * Browser verification of the complete website revision.
 * Run with the production server already listening (npx next start -p 3457).
 * Drives real Chrome via puppeteer-core; leaves screenshots in .browser-shots/.
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

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900'],
  defaultViewport: { width: 1440, height: 900 },
});

try {
  const page = await browser.newPage();

  // ---- 1. Home page renders the new brief structure ----
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
  await sleep(1500);
  const home = await page.evaluate(() => {
    const text = document.body.innerText;
    const lower = text.toLowerCase();
    const navLink = document.querySelector('nav a[href="/"]');
    return {
      h1: document.querySelector('h1')?.innerText ?? '',
      hasKicker: text.includes('Community-Engaged Research'),
      hasMission: lower.includes('advancing evidence from discovery to equitable impact'),
      hasPriorities: lower.includes('center community knowledge') && lower.includes('strengthen implementation') && lower.includes('expand equitable access'),
      hasSixFocus: [...document.querySelectorAll('h3')].some((h) => h.textContent.includes('Trust, Stigma & Healthcare Engagement')),
      hasFeatured: text.includes('WI-CARE') && text.includes('Institutionalizing African Epistemologies'),
      hasMetrics: text.includes('$2.5M+') && text.includes('40+') && text.includes('U.S. + Ghana'),
      funderLogos: [...document.querySelectorAll('img')].filter((i) => decodeURIComponent(i.src).includes('/funders/')).length,
      hasNews: text.includes('View All News & Events'),
      navFontPx: navLink ? parseFloat(getComputedStyle(navLink).fontSize) : 0,
      logoSrc: document.querySelector('header img')?.getAttribute('src') ?? '',
    };
  });
  check('home: hero h1 is The THRIVE Lab @ VCU', home.h1 === 'The THRIVE Lab @ VCU', home.h1);
  check('home: hero kicker', home.hasKicker);
  check('home: mission + priorities', home.hasMission && home.hasPriorities);
  check('home: six focus areas incl. Trust & Stigma', home.hasSixFocus);
  check('home: featured WI-CARE + African Epistemologies', home.hasFeatured);
  check('home: verified metrics', home.hasMetrics);
  check('home: funder logos rendered', home.funderLogos >= 4, `${home.funderLogos} logos`);
  check('home: news section', home.hasNews);
  check('nav font size increased to >= 16px', home.navFontPx >= 16, `${home.navFontPx}px`);
  check('header uses the new logo file', home.logoSrc.includes('thrive-logo.png'), home.logoSrc);
  await page.screenshot({ path: `${SHOTS}/r01-home.png` });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.35));
  await sleep(900);
  await page.screenshot({ path: `${SHOTS}/r02-home-mid.png` });

  // ---- 2. Nav dropdown opens ----
  const toggle = await page.$('button[aria-controls^="submenu-"]');
  if (toggle) {
    await toggle.hover();
    await sleep(400);
    const dropdown = await page.evaluate(() => {
      const sub = document.querySelector('nav ul[id^="submenu-"]');
      if (!sub) return null;
      const style = getComputedStyle(sub);
      return {
        visible: style.visibility === 'visible' && parseFloat(style.opacity) > 0,
        items: sub.innerText.split('\n').map((s) => s.trim()).filter(Boolean),
      };
    });
    check('dropdown shows five items', dropdown?.visible && dropdown.items.length === 5, dropdown?.items.join(', '));
  } else {
    check('dropdown toggle exists', false);
  }
  await page.screenshot({ path: `${SHOTS}/r03-nav-dropdown.png` });

  // ---- 3. About page ----
  await page.goto(`${BASE}/about`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  const about = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasMission: text.includes('The mission of the THRIVE Lab'),
      hasVision: text.includes('We envision a research and healthcare ecosystem'),
      hasPrinciples: text.includes('Principles That Guide Our Science'),
      hasDomains: text.includes('Domains of Application') && text.includes('Cancer Prevention & Control'),
      hasWhere: text.includes('Where We Work'),
      hasTraining: text.includes('Developing the Next Generation of Scholars'),
      hasLeadership: text.includes('Founder & Director, The THRIVE Lab @ VCU'),
      hasBehavioral: text.includes('Department of Social and Behavioral Sciences'),
    };
  });
  check('about: all nine sections present',
    about.hasMission && about.hasVision && about.hasPrinciples && about.hasDomains &&
    about.hasWhere && about.hasTraining && about.hasLeadership && about.hasBehavioral,
    JSON.stringify(about));
  await page.screenshot({ path: `${SHOTS}/r04-about.png`, fullPage: false });

  // ---- 4. Projects page ----
  await page.goto(`${BASE}/projects`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  const projects = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasSections: ['Current Projects', 'Community Initiatives', 'Completed Projects', 'Research Focus Areas', 'Our Approach']
        .every((s) => text.includes(s)),
      hasQuestions: (text.match(/Our research asks:/g) || []).length,
      hasMethods: text.includes('Discrete Choice Experiments') && text.includes('Implementation Frameworks'),
      hasWisewoman: text.includes('WISE WOMAN'),
      hasInitiatives: text.includes('C4 Workshop Series') && text.includes('School Outreach Visits'),
    };
  });
  check('projects: five sections from brief', projects.hasSections);
  check('projects: six research questions', projects.hasQuestions === 6, `${projects.hasQuestions}`);
  check('projects: methods grid', projects.hasMethods);
  check('projects: WISE WOMAN + initiatives', projects.hasWisewoman && projects.hasInitiatives);
  await page.screenshot({ path: `${SHOTS}/r05-projects.png` });
  await page.evaluate(() => document.getElementById('focus-areas')?.scrollIntoView());
  await sleep(900);
  await page.screenshot({ path: `${SHOTS}/r06-projects-focus.png` });

  // ---- 5. Funding page ----
  await page.goto(`${BASE}/funding`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  const funding = await page.evaluate(() => {
    const text = document.body.innerText;
    const lower = text.toLowerCase();
    return {
      hasHero: lower.includes('funding our science'),
      hasMetrics: text.includes('$2.5M+') && lower.includes('funding organizations'),
      current: [...document.querySelectorAll('h3')].filter((h) => text.includes(h.textContent)).length,
      hasCurrent: text.includes('Institutionalizing African Epistemologies in U.S. Health Research'),
      hasCollab: text.includes('HPTN 096'),
      hasPilot: text.includes('Mark Diamond Research Foundation'),
      hasCompleted: text.includes('Fund for Lesbian and Gay Studies'),
      hasPartners: lower.includes('funding partners'),
      partnerImgs: [...document.querySelectorAll('img')].filter((i) => decodeURIComponent(i.src).includes('/funders/')).length,
      hasAmounts: text.includes('$1,892,841') && text.includes('$499,870'),
    };
  });
  check('funding: hero + portfolio metrics', funding.hasHero && funding.hasMetrics);
  check('funding: current awards', funding.hasCurrent);
  check('funding: collaborative awards', funding.hasCollab);
  check('funding: pilot & institutional', funding.hasPilot);
  check('funding: completed awards', funding.hasCompleted);
  check('funding: partner logos', funding.hasPartners && funding.partnerImgs >= 5, `${funding.partnerImgs} logos`);
  check('funding: verified dollar amounts shown', funding.hasAmounts);
  await page.screenshot({ path: `${SHOTS}/r07-funding.png` });

  // ---- 6. Team page: director, roster edits, justified paragraphs ----
  await page.goto(`${BASE}/team`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  const team = await page.evaluate(() => {
    const text = document.body.innerText;
    const bio = [...document.querySelectorAll('article p')].find((p) => p.textContent.length > 80);
    return {
      hasHero: text.includes('The THRIVE Team'),
      hasDirector: text.includes('Gloria Aidoo-Frimpong, PhD, MPH, MA'),
      noNihith: !text.includes('Nihith Nath'),
      noDavid: !text.includes('Dr. David'),
      noAzasu: !text.includes('Enock Azasu'),
      danielRA: text.includes('Daniel Selase Anyidoho') && text.includes('Research Assistant'),
      ebenezerClean: !text.includes('West Africa AIDS Foundation'),
      osmanGrad: text.includes('Osman Abdul-Fatawu Iddrisu'),
      hasTraining: text.includes('Interested in Joining THRIVE'),
      bioTextAlign: bio ? getComputedStyle(bio).textAlign : 'n/a',
    };
  });
  check('team: hero + director section', team.hasHero && team.hasDirector);
  check('team: Nihith / Dr. David / Azasu removed', team.noNihith && team.noDavid && team.noAzasu);
  check('team: Daniel Selase listed as research assistant', team.danielRA);
  check('team: Ebenezer no longer tied to WAAF', team.ebenezerClean);
  check('team: Osman remains a graduate student', team.osmanGrad);
  check('team: training section', team.hasTraining);
  check('team: member paragraphs justified', team.bioTextAlign === 'justify', team.bioTextAlign);
  await page.screenshot({ path: `${SHOTS}/r08-team.png` });
  await page.evaluate(() => window.scrollTo(0, 1400));
  await sleep(700);
  await page.screenshot({ path: `${SHOTS}/r09-team-roster.png` });

  // ---- 7. Contact page: pathways, official email, form ----
  await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  const contact = await page.evaluate(() => {
    const text = document.body.innerText;
    const lower = text.toLowerCase();
    const select = document.querySelector('select');
    return {
      hasHero: lower.includes('connect with thrive'),
      pathways: ['research collaboration', 'community partnerships', 'students & trainees', 'general inquiries']
        .every((s) => lower.includes(s)),
      email: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute('href')),
      hasOrganization: !!document.getElementById('contact-organization'),
      hasReason: !!document.getElementById('contact-reason'),
      reasonOptions: select ? [...select.options].map((o) => o.text) : [],
      submitText: document.querySelector('form button[type="submit"]')?.innerText ?? '',
      hasOldEmail: text.includes('thrivelab@vcu.edu'),
    };
  });
  check('contact: hero + four pathways', contact.hasHero && contact.pathways);
  check('contact: official email everywhere', contact.email.length > 0 && contact.email.every((h) => h === 'mailto:thrive.lab.research@gmail.com'), contact.email.join(','));
  check('contact: no old email', !contact.hasOldEmail);
  check('contact: form has organization + reason fields', contact.hasOrganization && contact.hasReason);
  check('contact: five reason options', contact.reasonOptions.length === 5, contact.reasonOptions.join(', '));
  check('contact: submit button says Submit', contact.submitText === 'Submit', contact.submitText);
  await page.screenshot({ path: `${SHOTS}/r10-contact.png` });

  // ---- 8. Publications, news, research redirect ----
  await page.goto(`${BASE}/publications`, { waitUntil: 'networkidle0' });
  await sleep(1000);
  const pubsOk = await page.evaluate(() => document.body.innerText.toLowerCase().includes('scholarship'));
  check('publications: scholarship kicker', pubsOk);
  await page.screenshot({ path: `${SHOTS}/r11-publications.png` });

  await page.goto(`${BASE}/news`, { waitUntil: 'networkidle0' });
  await sleep(1000);
  const newsOk = await page.evaluate(() => {
    const lower = document.body.innerText.toLowerCase();
    return lower.includes('lab activity') && lower.includes('follow the latest thrive research');
  });
  check('news: lab activity kicker + new subtitle', newsOk);
  await page.screenshot({ path: `${SHOTS}/r12-news.png` });

  const redirectResp = await page.goto(`${BASE}/research`, { waitUntil: 'networkidle0' });
  const redirected = page.url().endsWith('/projects');
  check('/research redirects to /projects', redirected, `${redirectResp?.status()} -> ${page.url()}`);

  // ---- 9. Footer on every page ----
  const footer = await page.evaluate(() => {
    const f = document.querySelector('footer');
    if (!f) return null;
    const text = f.innerText;
    return {
      email: !!f.querySelector('a[href="mailto:thrive.lab.research@gmail.com"]'),
      explore: ['About', 'Projects & Initiatives', 'Funding', 'Team', 'Publications', 'News & Events']
        .every((s) => text.includes(s)),
      connect: ['Collaborate', 'Join the Lab', 'Contact'].every((s) => text.includes(s)),
      tagline: text.includes('Transforming Health Research through Innovation, Value, and Equity'),
      copyright: /© \d{4} The THRIVE Lab @ VCU\. All rights reserved\./.test(text),
    };
  });
  check('footer: official email', footer?.email);
  check('footer: Explore + Connect columns', footer?.explore && footer?.connect);
  check('footer: tagline + copyright', footer?.tagline && footer?.copyright);

  // ---- 10. Mobile layout + hamburger ----
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
  await sleep(1000);
  await page.screenshot({ path: `${SHOTS}/r13-mobile-home.png` });
  const mobile = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-controls="main-nav"]');
    return { hasToggle: !!btn, overflow: document.documentElement.scrollWidth <= window.innerWidth + 2 };
  });
  check('mobile: hamburger present, no horizontal overflow', mobile.hasToggle && mobile.overflow);
  if (mobile.hasToggle) {
    await page.click('button[aria-controls="main-nav"]');
    await sleep(500);
    const menuFont = await page.evaluate(() => {
      const link = document.querySelector('nav a[href="/about"]');
      return link ? parseFloat(getComputedStyle(link).fontSize) : 0;
    });
    check('mobile: nav font size increased', menuFont >= 18, `${menuFont}px`);
    await page.screenshot({ path: `${SHOTS}/r14-mobile-menu.png` });
  }
} catch (err) {
  check('script completed without crash', false, String(err).slice(0, 400));
} finally {
  await browser.close();
  const passed = results.filter((r) => r.pass).length;
  console.log(`\n${passed}/${results.length} checks passed`);
  process.exit(passed === results.length ? 0 : 1);
}
