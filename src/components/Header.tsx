'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { siteConfig, navLinks } from '@/data/site';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  // Close the mobile menu when the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.inner}`}>
        <Link
          href="/"
          className={styles.logo}
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.name} logo`}
            width={48}
            height={48}
            className={styles.logoImage}
            priority
          />
          <span className={styles.logoText}>
            <span className={styles.logoName}>{siteConfig.name}</span>
            <span className={styles.logoSub}>at VCU School of Public Health</span>
          </span>
        </Link>

        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`} aria-hidden="true" />
        </button>

        <nav
          id="main-nav"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="Main navigation"
        >
          <ul className={styles.navList} role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.navLink} ${isActive(href) ? styles.navLinkActive : ''}`}
                  aria-current={isActive(href) ? 'page' : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
