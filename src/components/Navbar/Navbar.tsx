import { navLinks, profile } from '../../data/content';
import { useActiveSection } from '../../hooks/useActiveSection';
import StatusBar from '../StatusBar/StatusBar';
import styles from './Navbar.module.css';

const ids = navLinks.map((l) => l.id);

export default function Navbar() {
  const active = useActiveSection(ids);
  return (
    <header className={`enter ${styles.header}`}>
      <a className={styles.mark} href="#top">
        {profile.name}
      </a>
      <nav aria-label="Sections">
        <ul className={styles.links}>
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={active === l.id ? styles.active : undefined}
                aria-current={active === l.id ? 'location' : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <StatusBar />
    </header>
  );
}
