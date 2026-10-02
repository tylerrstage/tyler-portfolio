import type { ReactNode } from 'react';
import styles from './SectionFrame.module.css';

interface Props {
  id: string;
  sheet: { n: string; label: string; title: string; caption: string };
  children: ReactNode;
}

export default function SectionFrame({ id, sheet, children }: Props) {
  return (
    <section id={id} className={`enter ${styles.section}`} aria-labelledby={`${id}-title`}>
      <div className={styles.sheet}>
        <i className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
        <i className={`${styles.corner} ${styles.tr}`} aria-hidden="true" />
        <i className={`${styles.corner} ${styles.bl}`} aria-hidden="true" />
        <i className={`${styles.corner} ${styles.br}`} aria-hidden="true" />
        <p className={styles.label}>
          Sheet {sheet.n} / {sheet.label}
        </p>
        <h2 id={`${id}-title`} className={styles.title}>
          {sheet.title}
        </h2>
        <p className={styles.caption}>{sheet.caption}</p>
        {children}
      </div>
    </section>
  );
}
