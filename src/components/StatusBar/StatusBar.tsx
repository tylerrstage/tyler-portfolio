import { useEffect, useState } from 'react';
import { ui } from '../../data/content';
import styles from './StatusBar.module.css';

function timeString() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function StatusBar() {
  const [time, setTime] = useState(timeString);
  useEffect(() => {
    const t = setInterval(() => setTime(timeString()), 15000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={styles.bar}>
      <span className={styles.dot} aria-hidden="true" />
      <span>{ui.connected}</span>
      <span className={styles.clock}>{time}</span>
    </div>
  );
}
