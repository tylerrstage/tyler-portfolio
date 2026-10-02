import { useState } from 'react';
import { profile, sheets, ui } from '../../data/content';
import SectionFrame from '../SectionFrame/SectionFrame';
import styles from './Contact.module.css';

const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '');

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable: the address is selectable text right beside the button.
    }
  };

  return (
    <SectionFrame id="contact" sheet={sheets.contact}>
      <ul className={styles.rows}>
        <li>
          <span className={styles.label}>{ui.email}</span>
          <span className={styles.value}>{profile.email}</span>
          <span className={styles.actions}>
            <a className="btn btnSolid" href={`mailto:${profile.email}`}>
              {ui.email} ↗
            </a>
            <button type="button" className="btn" onClick={copy}>
              <span aria-live="polite">{copied ? ui.copied : ui.copy}</span>
            </button>
          </span>
        </li>
        <li>
          <span className={styles.label}>{ui.linkedin}</span>
          <span className={styles.value}>{strip(profile.linkedin)}</span>
          <span className={styles.actions}>
            <a className="btn btnSolid" href={profile.linkedin} target="_blank" rel="noreferrer">
              {ui.open} ↗
            </a>
          </span>
        </li>
        <li>
          <span className={styles.label}>{ui.github}</span>
          <span className={styles.value}>{strip(profile.github)}</span>
          <span className={styles.actions}>
            <a className="btn btnSolid" href={profile.github} target="_blank" rel="noreferrer">
              {ui.open} ↗
            </a>
          </span>
        </li>
      </ul>
    </SectionFrame>
  );
}
