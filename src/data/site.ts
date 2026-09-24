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
  fullName: 'Transforming the HIV Response Through Innovation and Equity',
  /** Host university and department. */
  institution: 'Virginia Commonwealth University',
  school: 'School of Public Health',
  department: 'Department of Social and Behavioural Sciences',
  /** Full mailing address, one line per row when displayed. */
  addressLines: [
    'THRIVE Lab',
    'School of Public Health',
    'Department of Social and Behavioural Sciences',
    'Virginia Commonwealth University (VCU)',
  ],
  /**
   * Lab-wide inbox. All inquiries route here and individual member
   * contact details are never published on the site.
   */
  contactEmail: 'thrivelab@vcu.edu',
  /** Logo shown in the header and on the home page hero. */
  logo: '/images/logo.jpg',
  /** Social media handles. */
  socials: {
    linkedin: 'https://www.linkedin.com/company/the-thrive-lab-at-ub/',
    facebook: 'https://www.facebook.com/p/The-Thrive-Lab-at-UB-61576633776186/',
  },
} as const;

/** Navigation links for the header. Update page labels here. */
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'What We Do' },
  { href: '/team', label: 'Team' },
  { href: '/publications', label: 'Publications' },
  { href: '/news', label: 'News & Events' },
  { href: '/contact', label: 'Contact' },
] as const;
