import { useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import styles from './SectionFrame.module.css';

interface Props {
  id: string;
  sheet: { n: string; label: string; title: string; caption: string };
  children: ReactNode;
}

export default function SectionFrame({ id, sheet, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.sheet}>
        <i className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
        <i className={`${styles.corner} ${styles.tr}`} aria-hidden="true" />
        <i className={`${styles.corner} ${styles.bl}`} aria-hidden="true" />
        <i className={`${styles.corner} ${styles.br}`} aria-hidden="true" />
        <p className={`reveal ${styles.label}`}>
          Sheet {sheet.n} / {sheet.label}
        </p>
        <h2
          id={`${id}-title`}
          className={`reveal ${styles.title}`}
          style={{ '--i': 1 } as CSSProperties}
        >
          {sheet.title}
        </h2>
        <p className={`reveal ${styles.caption}`} style={{ '--i': 2 } as CSSProperties}>
          {sheet.caption}
        </p>
        {children}
      </div>
    </section>
  );
}
