'use client';

import { useEffect } from 'react';

/**
 * useScrollReveal — lightweight Intersection Observer scroll-reveal hook.
 * Watches all elements with [data-reveal] inside the given root selector,
 * and adds '.revealed' once they enter the viewport.
 *
 * Purpose: guide user attention through the page as they scroll
 * (R-19 antislop: motion has a UX purpose, not decoration).
 *
 * Usage:
 *   useScrollReveal();             // default: watch [data-reveal] on body
 *   useScrollReveal('#my-section'); // scope to a specific container
 */
export function useScrollReveal(rootSelector?: string) {
  useEffect(() => {
    const root = rootSelector
      ? document.querySelector(rootSelector)
      : document;

    if (!root) return;

    const items = (root as Element | Document).querySelectorAll('[data-reveal]');

    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay ?? '0';
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('revealed');
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px',
      }
    );

    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [rootSelector]);
}
