import { useCallback, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Project } from '../../types';
import { ui } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './ProjectCard.module.css';

type Phase = 'wire' | 'typing' | 'filling' | 'reveal' | 'done';

const CHAR_MS = 18;
const FILL_MS = 800;
const PIXEL_PX = 44;
const CURTAIN_MS = 320;
const JITTER_MS = 230;

interface PixelGrid {
  cols: number;
  rows: number;
  delays: number[];
}

/** Curtain of pixel blocks: opens from the centre column outward, with per-block jitter. */
function buildPixels(el: HTMLElement): PixelGrid {
  const cols = Math.max(4, Math.round(el.offsetWidth / PIXEL_PX));
  const rows = Math.max(4, Math.round(el.offsetHeight / PIXEL_PX));
  const mid = (cols - 1) / 2;
  const delays: number[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const fromCentre = Math.abs(c - mid) / mid;
      delays.push(Math.round(fromCentre * CURTAIN_MS + Math.random() * JITTER_MS));
    }
  }
  return { cols, rows, delays };
}

export default function ProjectCard({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLElement>(0.25);
  const [phase, setPhase] = useState<Phase>('wire');
  const [typed, setTyped] = useState(0);
  const [pixels, setPixels] = useState<PixelGrid | null>(null);
  const [imgOk, setImgOk] = useState(true);

  const text = [`> mount ${project.code}`, '> read sector 2F ... ok', '> render card ...'].join(
    '\n',
  );

  const boot = useCallback(() => {
    setTyped(0);
    setPhase('typing');
  }, []);

  // Play once when first 25% visible (instant under reduced motion).
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => (reduced ? setPhase('done') : boot()), 0);
    return () => clearTimeout(t);
  }, [inView, reduced, boot]);

  useEffect(() => {
    if (phase !== 'typing') return;
    const t = setTimeout(
      () => (typed >= text.length ? setPhase('filling') : setTyped((n) => n + 1)),
      CHAR_MS,
    );
    return () => clearTimeout(t);
  }, [phase, typed, text.length]);

  useEffect(() => {
    if (phase !== 'filling') return;
    const t = setTimeout(() => {
      if (ref.current) setPixels(buildPixels(ref.current));
      setPhase('reveal');
    }, FILL_MS);
    return () => clearTimeout(t);
  }, [phase, ref]);

  useEffect(() => {
    if (phase !== 'reveal') return;
    const t = setTimeout(() => setPhase('done'), CURTAIN_MS + JITTER_MS + 80);
    return () => clearTimeout(t);
  }, [phase]);

  const booting = phase === 'typing' || phase === 'filling';
  const busy = booting || phase === 'reveal';
  // The boot panel also covers the waiting card, so its content never shows before the boot.
  const covered = booting || (phase === 'wire' && !reduced);

  return (
    <article
      ref={ref}
      className={`${styles.card} ${project.featured ? styles.featured : ''} ${phase === 'wire' ? styles.wire : ''}`}
      aria-labelledby={`${project.slug}-title`}
    >
      <div className={styles.strip}>
        <span>{project.code}</span>
        <span>{project.featured ? `${ui.featured} · ${ui.online}` : ui.online}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.shot}>
          {imgOk ? (
            <img
              src={project.screenshot}
              alt={`Screenshot of the ${project.title} project`}
              loading="lazy"
              onError={() => setImgOk(false)}
            />
          ) : (
            <span className={styles.pending}>{ui.screenshotPending}</span>
          )}
        </div>
        <h3 id={`${project.slug}-title`} className={styles.title}>
          {project.title}
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <ul className="chips">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <ul className={`bullets ${styles.bullets}`}>
          {project.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div className={styles.actions}>
          <a className="btn btnSolid" href={project.repoUrl} target="_blank" rel="noreferrer">
            {ui.github} ↗
          </a>
          <button
            type="button"
            className="btn"
            onClick={reduced ? undefined : boot}
            disabled={busy}
          >
            {ui.reboot}
          </button>
        </div>
      </div>

      {covered && (
        <div className={styles.boot} aria-hidden="true">
          <pre>
            {text.slice(0, typed)}
            <span className={styles.caret} />
          </pre>
          <div className={styles.bar}>
            <div className={`${styles.fill} ${phase === 'filling' ? styles.filling : ''}`} />
          </div>
        </div>
      )}

      {phase === 'reveal' && pixels && (
        <div
          className={styles.pixels}
          aria-hidden="true"
          style={{ '--cols': pixels.cols, '--rows': pixels.rows } as CSSProperties}
        >
          {pixels.delays.map((d, i) => (
            <i key={i} style={{ animationDelay: `${d}ms` }} />
          ))}
        </div>
      )}
    </article>
  );
}
