import { roles, sheets, ui } from '../../data/content';
import SectionFrame from '../SectionFrame/SectionFrame';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <SectionFrame id="experience" sheet={sheets.experience}>
      {roles.map((r) => (
        <article key={r.title + r.org} className="window">
          <div className="windowBar" aria-hidden="true">
            <span>{ui.experienceWindow}</span>
            <span>
              {r.start} – {r.end}
            </span>
          </div>
          <div className={styles.body}>
            <div className={styles.head}>
              <div className={styles.ring} aria-hidden="true" />
              <div>
                <h3>{r.title}</h3>
                <p className={styles.org}>
                  {r.org} ({r.orgType}) · {r.location}
                </p>
                <p className={styles.dates}>
                  {r.start} – {r.end}
                </p>
              </div>
            </div>
            <ul className="bullets">
              {r.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </SectionFrame>
  );
}
