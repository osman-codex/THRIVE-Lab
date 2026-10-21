import { siteConfig } from '@/data/site';
import styles from './SocialLinks.module.css';

interface SocialLinksProps {
  /** Layout direction of the icons. */
  variant?: 'row' | 'column';
  className?: string;
}

const SOCIAL_ITEMS = [
  {
    key: 'linkedin' as const,
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    key: 'facebook' as const,
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z" />
      </svg>
    ),
  },
];

export default function SocialLinks({ variant = 'row', className }: SocialLinksProps) {
  return (
    <ul
      className={`${styles.list} ${variant === 'column' ? styles.column : ''} ${className ?? ''}`}
      role="list"
      aria-label="The THRIVE Lab on social media"
    >
      {SOCIAL_ITEMS.map(({ key, label, icon }) => (
        <li key={key}>
          <a
            href={siteConfig.socials[key]}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`The THRIVE Lab on ${label} (opens in new tab)`}
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
