import Link from 'next/link';
import { siteConfig, navLinks } from '@/data/site';
import SocialLinks from '@/components/SocialLinks';
import styles from './Footer.module.css';

/** Footer "Explore" links: the brief's navigation, without Home. */
const exploreLinks = navLinks.filter((link) => link.href !== '/');

/** Ways to connect with the lab. */
const connectLinks = [
  { href: '/contact', label: 'Collaborate' },
  { href: '/team', label: 'Join the Lab' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.grid}>
          {/* About column */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{siteConfig.name}</h3>
            <p className={styles.about}>{siteConfig.fullName}.</p>
            <p className={styles.about}>
              {siteConfig.institution} | {siteConfig.school} |{' '}
              {siteConfig.department}
            </p>
          </div>

          {/* Explore */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Explore</h3>
            <nav aria-label="Footer navigation">
              <ul className={styles.linkList} role="list">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Connect */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Connect</h3>
            <ul className={styles.linkList} role="list">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contact</h3>
            <address className={styles.address}>
              {siteConfig.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>
                <a href={`mailto:${siteConfig.contactEmail}`}>
                  {siteConfig.contactEmail}
                </a>
              </p>
            </address>
            <SocialLinks />
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} {siteConfig.name} @ VCU. All rights reserved.
          </p>
          <p className={styles.credit}>{siteConfig.fullName}</p>
        </div>
      </div>
    </footer>
  );
}
