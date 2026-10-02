import { education, profile, projects, roles, sheets, skills, ui } from '../../data/content';
import SectionFrame from '../SectionFrame/SectionFrame';
import styles from './ResumeView.module.css';

const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '');

export default function ResumeView() {
  const h = ui.resumeHeadings;
  return (
    <SectionFrame id="resume" sheet={sheets.resume}>
      <div className="window reveal">
        <div className="windowBar">
          <span>{ui.resumeWindow}</span>
          <a className="btn" href={profile.resumePdf} download>
            {ui.downloadPdf}
          </a>
        </div>
        <div className={styles.desk}>
          <div className={styles.sheet}>
            <header className={styles.top}>
              <p className={styles.name}>{profile.name}</p>
              <p className={styles.links}>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <a href={profile.linkedin}>{strip(profile.linkedin)}</a>
                <a href={profile.github}>{strip(profile.github)}</a>
              </p>
            </header>

            <h3>{h.education}</h3>
            <div className={styles.row}>
              <strong>{education.school}</strong>
              <span>{education.location}</span>
            </div>
            <div className={styles.row}>
              <em>
                {education.degree}, {ui.gpa} {education.gpa}
              </em>
              <span>
                {ui.expected} {education.expected}
              </span>
            </div>
            <p>
              <strong>{ui.honors}:</strong> {education.honors.join(', ')}
            </p>
            <p>
              <strong>{ui.coursework}:</strong> {education.coursework.join(', ')}
            </p>

            <h3>{h.experience}</h3>
            {roles.map((r) => (
              <div key={r.title + r.org}>
                <div className={styles.row}>
                  <strong>{r.title}</strong>
                  <span>
                    {r.start} – {r.end}
                  </span>
                </div>
                <div className={styles.row}>
                  <em>
                    {r.org} ({r.orgType})
                  </em>
                  <span>{r.location}</span>
                </div>
                <ul>
                  {r.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h3>{h.projects}</h3>
            {projects.map((p) => (
              <div key={p.slug} className={styles.entry}>
                <p>
                  <strong>{p.title}</strong> | <em>{p.stack.join(', ')}</em>
                </p>
                <ul>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h3>{h.skills}</h3>
            {skills.map((g) => (
              <p key={g.label}>
                <strong>{g.label}:</strong> {g.items.join(', ')}
              </p>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
