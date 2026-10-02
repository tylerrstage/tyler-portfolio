import { hero, profile } from '../../data/content';
import Avatar from '../Avatar/Avatar';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-label="Introduction">
      <div className={styles.upper}>
        <div className={`halftone ${styles.dots}`} aria-hidden="true" />
        <div className={styles.inner}>
          <p className={styles.chip}>{hero.status}</p>
          <h1 className={styles.name}>
            Tyler
            <br />
            Stageberg
          </h1>
          <p className={styles.tagline}>{profile.tagline}</p>
        </div>
      </div>
      <div className={styles.slab}>
        <div className={`${styles.inner} ${styles.slabInner}`}>
          <div>
            <div className={styles.ctas}>
              <a className={styles.primary} href="#projects">
                {hero.primaryCta}
              </a>
              <a className={styles.ghost} href={profile.resumePdf} download>
                {hero.secondaryCta}
              </a>
            </div>
            <ul className={styles.stats}>
              {hero.stats.map((s) => (
                <li key={s.value + s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.avatar}>
            <Avatar />
          </div>
        </div>
      </div>
    </section>
  );
}
