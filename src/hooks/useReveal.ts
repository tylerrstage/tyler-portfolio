import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Marks each `.reveal` element inside the container with `data-seen` once it scrolls into
 * view (or is already above the viewport); global.css animates the change.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting && e.boundingClientRect.top >= 0) continue;
          (e.target as HTMLElement).dataset.seen = '';
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    for (const el of root.querySelectorAll('.reveal')) io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}
