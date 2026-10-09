'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { siteConfig, navLinks } from '@/data/site';
import styles from './Header.module.css';

/** Strip any hash so "/projects#approach" still counts as the /projects route. */
function baseHref(href: string): string {
  return href.split('#')[0];
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setSubmenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const toggleSubmenu = useCallback(() => {
    setSubmenuOpen((prev) => !prev);
  }, []);

  // Close the mobile menu and any dropdown when the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setSubmenuOpen(false);
  }, [pathname]);

  // Close the dropdown on Escape.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSubmenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const isActive = (href: string) => {
    const base = baseHref(href);
    return base === '/' ? pathname === '/' : pathname.startsWith(base);
  };

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
            {navLinks.map(({ href, label, children }) => (
              <li
                key={href}
                className={styles.navItem}
                data-open={children && submenuOpen ? 'true' : undefined}
              >
                <span className={styles.navItemRow}>
                  <Link
                    href={href}
                    className={`${styles.navLink} ${isActive(href) ? styles.navLinkActive : ''}`}
                    aria-current={isActive(href) ? 'page' : undefined}
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                  {children && (
                    <button
                      type="button"
                      className={styles.submenuToggle}
                      aria-expanded={submenuOpen}
                      aria-controls={`submenu-${href.replace(/[^a-z]/gi, '')}`}
                      aria-label={`${label} menu`}
                      onClick={toggleSubmenu}
                    >
                      <span aria-hidden="true" className={styles.chevron} />
                    </button>
                  )}
                </span>
                {children && (
                  <ul
                    className={styles.submenu}
                    id={`submenu-${href.replace(/[^a-z]/gi, '')}`}
                    role="list"
                  >
                    {children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={styles.submenuLink}
                          onClick={closeMenu}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
