import { useEffect, useState } from 'react';

export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const id of ids) {
          const r = visible.get(id) ?? 0;
          if (r > bestRatio) {
            best = id;
            bestRatio = r;
          }
        }
        setActive(best);
      },
      { rootMargin: '-56px 0px -40% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [ids]);
  return active;
}
