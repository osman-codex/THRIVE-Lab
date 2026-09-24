import Link from 'next/link';
import { siteConfig, navLinks } from '@/data/site';
import SocialLinks from '@/components/SocialLinks';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.grid}>
          {/* About column */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{siteConfig.name}</h3>
            <p className={styles.about}>
              {siteConfig.fullName}. We are a community-driven research lab at
              the Virginia Commonwealth University School of Public Health
              committed to reducing HIV disparities among African immigrant and
              Black populations.
            </p>
            <SocialLinks />
          </div>

          {/* Quick links */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className={styles.linkList} role="list">
                {navLinks
                  .filter((link) => link.href !== '/')
                  .map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
              </ul>
            </nav>
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
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className={styles.credit}>
            {siteConfig.fullName} | Virginia Commonwealth University
          </p>
        </div>
      </div>
    </footer>
  );
}
