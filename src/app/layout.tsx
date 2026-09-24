import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionProvider from '@/components/MotionProvider';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://thrive-lab.example.org'),
  title: {
    default: `${siteConfig.name} | Transforming the HIV Response Through Innovation and Equity`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    `${siteConfig.name} at the Virginia Commonwealth University School of Public Health is a community-driven research lab committed to reducing HIV disparities among African immigrant and Black populations through innovative, culturally tailored, and equity-focused approaches.`,
  keywords: [
    'HIV research',
    'health equity',
    'African immigrant health',
    'Black health',
    'community-based research',
    'PrEP',
    'public health',
    'Virginia Commonwealth University',
    'VCU',
    'THRIVE Lab',
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description:
      'Transforming the HIV Response Through Innovation and Equity. Community-driven research at the Virginia Commonwealth University School of Public Health to reduce HIV disparities.',
    images: [{ url: siteConfig.logo, width: 1200, height: 1200, alt: `${siteConfig.name} logo` }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFB300',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <MotionProvider />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
