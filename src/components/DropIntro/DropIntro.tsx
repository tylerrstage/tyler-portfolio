import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { profile } from '../../data/content';
import styles from './DropIntro.module.css';

const FLAG = 'intro-played';
const HANDOFF_MS = 1900;
// Matches the overlay's opacity transition in DropIntro.module.css.
const FADE_MS = 300;

const MORPH_MS = 800;
const MORPH_STAGGER_MS = 25;
const MORPH_EASING = 'cubic-bezier(0.6, 0, 0.2, 1)';

type Phase = 'playing' | 'leaving' | 'done';

// The glyph box of an element's text, comparable whatever the element's own display is.
function textRect(el: Element): DOMRect {
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect();
}

/**
 * Hands the name over to the hero: its letters start where the intro's letters sit and
 * fly to their places. Does nothing unless the intro name is fully drawn and the hero
 * name is on screen, in which case the hero name keeps its regular entrance.
 */
function morphName(introName: HTMLElement) {
  if (!introName.getAnimations().every((a) => a.playState === 'finished')) return;
  const from = Array.from(introName.querySelectorAll('span'));
  const to = Array.from(document.querySelectorAll<HTMLElement>('[data-name-letter]'));
  const heroName = to[0]?.closest('h1');
  if (!heroName || from.length !== to.length) return;
  const box = heroName.getBoundingClientRect();
  if (box.bottom <= 0 || box.top >= window.innerHeight) return;

  // The letters are the entrance now, so drop the heading's own before measuring.
  heroName.style.animation = 'none';
  const scale =
    parseFloat(getComputedStyle(introName).fontSize) /
    parseFloat(getComputedStyle(heroName).fontSize);
  // Making the letters transformable boxes drops their kerning, so each one flies to its
  // kerned resting spot and the boxes are removed again once every letter has landed.
  const rest = to.map(textRect);
  heroName.dataset.flying = '';
  const paths = to.map((el, i) => {
    const a = textRect(from[i]);
    const b = textRect(el);
    const origin = el.getBoundingClientRect();
    const dx = a.left - (origin.left + scale * (b.left - origin.left));
    const dy = a.top - (origin.top + scale * (b.top - origin.top));
    return [
      { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
      { transform: `translate(${rest[i].left - b.left}px, ${rest[i].top - b.top}px) scale(1)` },
    ];
  });
  const flights = to.map((el, i) =>
    el.animate(paths[i], {
      duration: MORPH_MS,
      delay: i * MORPH_STAGGER_MS,
      easing: MORPH_EASING,
      fill: 'both',
    }),
  );
  void Promise.allSettled(flights.map((f) => f.finished)).then(() => {
    delete heroName.dataset.flying;
    for (const f of flights) f.cancel();
  });
  introName.style.visibility = 'hidden';
}

// index.html marks <html data-intro="pending"> before first paint when the intro should play.
function initialPhase(): Phase {
  return document.documentElement.dataset.intro === 'pending' ? 'playing' : 'done';
}

export default function DropIntro() {
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const nameRef = useRef<HTMLParagraphElement>(null);

  // The page reads this: the grid draws in while 'playing', content enters on 'done'.
  useLayoutEffect(() => {
    document.documentElement.dataset.intro = phase === 'playing' ? 'playing' : 'done';
  }, [phase]);

  useEffect(() => {
    if (phase !== 'playing') return;
    try {
      sessionStorage.setItem(FLAG, '1');
    } catch {
      // Storage is optional; without it the intro simply plays on each load.
    }
    const skip = () => setPhase('leaving');
    const timer = setTimeout(() => {
      if (nameRef.current) morphName(nameRef.current);
      setPhase('leaving');
    }, HANDOFF_MS);
    const events = ['pointerdown', 'keydown', 'wheel', 'touchmove', 'scroll'] as const;
    for (const e of events) window.addEventListener(e, skip, { passive: true });
    return () => {
      clearTimeout(timer);
      for (const e of events) window.removeEventListener(e, skip);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'leaving') return;
    const timer = setTimeout(() => setPhase('done'), FADE_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      className={phase === 'leaving' ? `${styles.overlay} ${styles.leaving}` : styles.overlay}
      aria-hidden="true"
    >
      <div className={styles.surface} />
      <svg className={styles.drop} viewBox="0 0 20 30">
        <path d="M10 0C10 9 19 14 19 21a9 9 0 0 1-18 0C1 14 10 9 10 0z" />
      </svg>
      <div className={styles.reflection} />
      <div className={styles.ring} />
      <div className={styles.ring} />
      <div className={styles.ring} />
      <p className={styles.name} ref={nameRef}>
        {[...profile.name].map((ch, i) => (ch === ' ' ? ' ' : <span key={i}>{ch}</span>))}
      </p>
    </div>
  );
}
