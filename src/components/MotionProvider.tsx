'use client';

import { useEffect } from 'react';

/**
 * Global scroll-reveal engine.
 *
 * Watches every element carrying [data-animate] or [data-animate-group]
 * and adds .is-visible when it enters the viewport. Also toggles a .js
 * class on <html> so reveal styles only apply when JS is running,
 * keeping content visible for users without JavaScript.
 *
 * Because this component lives in the root layout, it does NOT remount on
 * client-side navigation. A MutationObserver re-scans whenever the router
 * swaps page content (or anything else injects animated nodes), so newly
 * mounted sections are picked up instead of staying hidden at opacity: 0.
 */
export default function MotionProvider() {
  useEffect(() => {
    document.documentElement.classList.add('js');

    // If the browser lacks IntersectionObserver, show everything.
    if (typeof IntersectionObserver === 'undefined') {
      document
        .querySelectorAll<HTMLElement>('[data-animate], [data-animate-group]')
        .forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    const seen = new WeakSet<Element>();

    const watch = (root: ParentNode) => {
      root
        .querySelectorAll<HTMLElement>('[data-animate], [data-animate-group]')
        .forEach((el) => {
          if (seen.has(el)) return;
          seen.add(el);
          observer.observe(el);
        });
    };

    watch(document);

    // Re-scan when the router swaps page content or new nodes are injected.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (
            node.matches('[data-animate], [data-animate-group]') &&
            !seen.has(node)
          ) {
            seen.add(node);
            observer.observe(node);
          }
          watch(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
