import styles from './Avatar.module.css';

interface Props {
  photoSrc?: string;
}

export default function Avatar({ photoSrc }: Props) {
  return (
    <figure className={styles.frame}>
      <div className={styles.topbar}>
        <span className={styles.dot} aria-hidden="true" />
        <span>Connected</span>
      </div>
      <div className={styles.screen}>
        {photoSrc ? (
          <img src={photoSrc} alt="Tyler Stageberg" width={260} height={260} />
        ) : (
          <svg viewBox="0 0 200 200" role="img" aria-label="Blueprint-style profile illustration">
            <defs>
              <pattern
                id="hatch"
                width="5"
                height="5"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="5" stroke="#2c6bf2" strokeWidth="1" />
              </pattern>
            </defs>
            <g fill="none" stroke="#2c6bf2" strokeWidth="2.5" strokeLinejoin="round">
              <circle cx="100" cy="100" r="88" strokeDasharray="3 6" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="68" strokeWidth="1.5" />
              <path d="M30 190c0-38 28-56 70-56s70 18 70 56z" fill="url(#hatch)" />
              <path d="M82 128v-16h36v16" />
              <ellipse cx="100" cy="82" rx="30" ry="36" fill="#f9fbff" />
              <path
                d="M70 76c2-26 20-36 38-32 14 3 22 14 22 32-10-14-28-18-60 0z"
                fill="url(#hatch)"
              />
            </g>
          </svg>
        )}
      </div>
      <div className={styles.buttons} aria-hidden="true">
        <i style={{ background: 'var(--red)' }} />
        <i style={{ background: 'var(--yellow)' }} />
        <i style={{ background: 'var(--green)' }} />
        <i style={{ background: 'var(--cobalt)' }} />
      </div>
    </figure>
  );
}
