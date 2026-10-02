import { useEffect, useState } from 'react';
import { profile } from '../../data/content';
import styles from './DropIntro.module.css';

const FLAG = 'intro-played';
const TOTAL_MS = 1900;

function shouldPlay(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(FLAG) === null;
  } catch {
    return true;
  }
}

export default function DropIntro() {
  const [playing, setPlaying] = useState(shouldPlay);

  useEffect(() => {
    if (!playing) return;
    try {
      sessionStorage.setItem(FLAG, '1');
    } catch {
      // Storage is optional; without it the intro simply plays on each load.
    }
    const end = () => setPlaying(false);
    const timer = setTimeout(end, TOTAL_MS);
    const events = ['pointerdown', 'keydown', 'wheel', 'touchmove', 'scroll'] as const;
    for (const e of events) window.addEventListener(e, end, { passive: true });
    return () => {
      clearTimeout(timer);
      for (const e of events) window.removeEventListener(e, end);
    };
  }, [playing]);

  if (!playing) return null;

  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.surface} />
      <svg className={styles.drop} viewBox="0 0 20 30">
        <path d="M10 0C10 9 19 14 19 21a9 9 0 0 1-18 0C1 14 10 9 10 0z" />
      </svg>
      <div className={styles.reflection} />
      <div className={styles.ring} />
      <div className={styles.ring} />
      <div className={styles.ring} />
      <p className={styles.name}>{profile.name}</p>
    </div>
  );
}
