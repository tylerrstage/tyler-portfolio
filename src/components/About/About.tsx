import { about, education, sheets, ui } from '../../data/content';
import SectionFrame from '../SectionFrame/SectionFrame';
import styles from './About.module.css';

export default function About() {
  return (
    <SectionFrame id="about" sheet={sheets.about}>
      <div className={styles.grid}>
        <p className={styles.bio}>{about.bio}</p>
        <div className="window">
          <div className="windowBar" aria-hidden="true">
            <span>{ui.educationWindow}</span>
          </div>
          <div className={styles.edu}>
            <h3>{education.school}</h3>
            <p className={styles.place}>{education.location}</p>
            <p className={styles.degree}>{education.degree}</p>
            <dl className={styles.facts}>
              <div>
                <dt>{ui.gpa}</dt>
                <dd>{education.gpa}</dd>
              </div>
              <div>
                <dt>{ui.expected}</dt>
                <dd>{education.expected}</dd>
              </div>
              <div>
                <dt>{ui.honors}</dt>
                <dd>{education.honors.join(', ')}</dd>
              </div>
            </dl>
            <p className={styles.label}>{ui.coursework}</p>
            <ul className="chips">
              {education.coursework.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
