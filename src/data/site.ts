/**
 * Site-wide configuration for The THRIVE Lab.
 *
 * This is the single place to update lab identity details, contact
 * information, and social media links. Content editors can change the
 * values below without touching any component code.
 */

export const siteConfig = {
  /** Short name used across the site. */
  name: 'The THRIVE Lab',
  /** What THRIVE stands for. */
  fullName: 'Transforming Health Research through Innovation, Value, and Equity',
  /** Host university and department. */
  institution: 'Virginia Commonwealth University',
  school: 'School of Public Health',
  department: 'Department of Social and Behavioral Sciences',
  /** Full mailing address, one line per row when displayed. */
  addressLines: [
    'The THRIVE Lab',
    'Virginia Commonwealth University',
    'School of Public Health',
    'Department of Social and Behavioral Sciences',
    'Richmond, Virginia',
  ],
  /**
   * Lab-wide official inbox. All inquiries route here and individual member
   * contact details are never published on the site.
   * Overridable via NEXT_PUBLIC_CONTACT_EMAIL for deployments that route the
   * lab inbox elsewhere; defaults to the official address.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'thrive.lab.research@gmail.com',
  /** Logo shown in the header and on the home page hero. */
  logo: '/images/thrive-logo.png',
  /** Social media handles. */
  socials: {
    linkedin: 'https://www.linkedin.com/company/the-thrive-lab-at-ub/',
    facebook: 'https://www.facebook.com/p/The-Thrive-Lab-at-UB-61576633776186/',
  },
} as const;

export interface NavChild {
  href: string;
  label: string;
}

export interface NavItem {
  href: string;
  label: string;
  /** Optional dropdown children (used by Projects & Initiatives). */
  children?: NavChild[];
}

/** Navigation links for the header. Update page labels here. */
export const navLinks: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  {
    href: '/projects',
    label: 'Projects & Initiatives',
    children: [
      { href: '/projects#current-projects', label: 'Current Projects' },
      { href: '/projects#community-initiatives', label: 'Community Initiatives' },
      { href: '/projects#completed-projects', label: 'Completed Projects' },
      { href: '/projects#focus-areas', label: 'Research Focus Areas' },
      { href: '/projects#approach', label: 'Our Approach' },
    ],
  },
  { href: '/funding', label: 'Funding' },
  { href: '/team', label: 'Team' },
  { href: '/publications', label: 'Publications' },
  { href: '/news', label: 'News & Events' },
  { href: '/contact', label: 'Contact' },
];
