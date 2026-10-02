import { hero, profile, ui } from '../../data/content';
import Avatar from '../Avatar/Avatar';
import styles from './Hero.module.css';

const nameLines = profile.name.split(' ');

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-label="Introduction">
      <div className={styles.upper}>
        <div className={`halftone enter ${styles.dots}`} aria-hidden="true" />
        <div className={styles.inner}>
          <p className={`enter ${styles.chip}`}>{hero.status}</p>
          {/* One span per letter so the intro can fly them in (see DropIntro). */}
          <h1 className={`enter ${styles.name}`} aria-label={profile.name}>
            {nameLines.map((line) => (
              <span key={line} className={styles.line} aria-hidden="true">
                {[...line].map((ch, i) => (
                  <span key={i} className={styles.letter} data-name-letter>
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <div className={styles.foot}>
            <p className={`enter ${styles.tagline}`}>{profile.tagline}</p>
            <ul className={`enter ${styles.links}`}>
              <li>
                <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
                  {ui.github} ↗
                </a>
              </li>
              <li>
                <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
                  {ui.linkedin} ↗
                </a>
              </li>
              <li>
                <a className="btn" href={`mailto:${profile.email}`}>
                  {ui.email} ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`enter ${styles.slab}`}>
        <div className={`${styles.inner} ${styles.slabInner}`}>
          <div>
            <div className={`enter ${styles.ctas}`}>
              <a className={styles.primary} href="#projects">
                {hero.primaryCta}
              </a>
              <a className={styles.ghost} href={profile.resumePdf} download>
                {hero.secondaryCta}
              </a>
            </div>
            <ul className={`enter ${styles.stats}`}>
              {hero.stats.map((s) => (
                <li key={s.value + s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`enter ${styles.avatar}`}>
            <Avatar />
          </div>
        </div>
      </div>
    </section>
  );
}
