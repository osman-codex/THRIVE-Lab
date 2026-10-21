import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionProvider from '@/components/MotionProvider';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://thrive-lab.example.org'),
  title: {
    default: `${siteConfig.name} | ${siteConfig.fullName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    `${siteConfig.name} at the Virginia Commonwealth University School of Public Health is an academic research enterprise advancing community-engaged research, implementation science, prevention, and health equity to close the gap between scientific evidence and equitable population health.`,
  keywords: [
    'health research',
    'implementation science',
    'community-engaged research',
    'health equity',
    'HIV prevention',
    'African immigrant health',
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
      'Transforming Health Research through Innovation, Value, and Equity. Community-engaged research at the Virginia Commonwealth University School of Public Health.',
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
