import type { CSSProperties } from 'react';
import { sheets, skills } from '../../data/content';
import SectionFrame from '../SectionFrame/SectionFrame';
import styles from './Skills.module.css';

export default function Skills() {
  return (
    <SectionFrame id="skills" sheet={sheets.skills}>
      <div className={styles.grid}>
        {skills.map((g, i) => (
          <div
            key={g.label}
            className={`reveal ${styles.cart}`}
            style={{ '--i': i } as CSSProperties}
          >
            <div className={styles.notch} aria-hidden="true">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <i />
            </div>
            <h3>{g.label}</h3>
            <ul className="chips">
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className={`stripes ${styles.foot}`} aria-hidden="true" />
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
