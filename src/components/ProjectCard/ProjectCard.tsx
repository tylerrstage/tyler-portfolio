import { useCallback, useEffect, useState } from 'react';
import type { Project } from '../../types';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './ProjectCard.module.css';

type Phase = 'wire' | 'typing' | 'filling' | 'done';

const CHAR_MS = 18;
const FILL_MS = 800;

export default function ProjectCard({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLElement>(0.25);
  const [phase, setPhase] = useState<Phase>('wire');
  const [typed, setTyped] = useState(0);
  const [imgOk, setImgOk] = useState(true);

  const lines = [`> mount ${project.code}`, '> read sector 2F ... ok', '> render card ...'];
  const total = lines.join('\n').length;

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
      () => (typed >= total ? setPhase('filling') : setTyped((n) => n + 1)),
      CHAR_MS,
    );
    return () => clearTimeout(t);
  }, [phase, typed, total]);

  useEffect(() => {
    if (phase !== 'filling') return;
    const t = setTimeout(() => setPhase('done'), FILL_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const booting = phase === 'typing' || phase === 'filling';
  const shown = lines.join('\n').slice(0, typed);

  return (
    <article
      ref={ref}
      className={`${styles.card} ${project.featured ? styles.featured : ''} ${phase === 'wire' ? styles.wire : ''}`}
      aria-labelledby={`${project.slug}-title`}
    >
      <div className={styles.strip}>
        <span>{project.code}</span>
        <span>{project.featured ? 'Featured · Online' : 'Online'}</span>
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
            <span className={styles.pending}>Screenshot pending</span>
          )}
        </div>
        <h3 id={`${project.slug}-title`} className={styles.title}>
          {project.title}
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <ul className={styles.chips}>
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <ul className={styles.bullets}>
          {project.bullets.map((b) => (
            <li key={b}>
              <i aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <a className={styles.gh} href={project.repoUrl} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <button
            type="button"
            className={styles.reboot}
            onClick={reduced ? undefined : boot}
            disabled={booting}
          >
            Reboot
          </button>
        </div>
      </div>

      {booting && (
        <div className={styles.boot} aria-hidden="true">
          <pre>
            {shown}
            <span className={styles.caret} />
          </pre>
          <div className={styles.bar}>
            <div className={`${styles.fill} ${phase === 'filling' ? styles.filling : ''}`} />
          </div>
        </div>
      )}
    </article>
  );
}
