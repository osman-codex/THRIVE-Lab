import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import SectionHeading from '@/components/SectionHeading';
import SocialLinks from '@/components/SocialLinks';
import { siteConfig } from '@/data/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with The THRIVE Lab at the Virginia Commonwealth University School of Public Health. We welcome inquiries about our research, collaboration opportunities, and community partnerships.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSubtitle}>
            We welcome inquiries about our research, collaboration opportunities,
            and community partnerships.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="page-section" aria-labelledby="contact-heading">
        <div className="container">
          <SectionHeading
            id="contact-heading"
            title="Get in Touch"
            subtitle="Whether you're a researcher, community partner, student, or funder, we'd love to hear from you."
          />

          <div className={styles.contactGrid} data-animate-group>
            {/* Form */}
            <div className={styles.formColumn}>
              <h3 className={styles.columnTitle}>Send Us a Message</h3>
              <ContactForm />
            </div>

            {/* Info sidebar */}
            <div className={styles.infoColumn}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Address</h3>
                <address className={styles.address}>
                  {siteConfig.addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Lab Email</h3>
                <p className={styles.infoValue}>
                  <a href={`mailto:${siteConfig.contactEmail}`}>
                    {siteConfig.contactEmail}
                  </a>
                </p>
                <p className={styles.infoNote}>
                  Please note that we share one lab inbox for all inquiries, so
                  individual team members are not contacted directly through the
                  website.
                </p>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Follow the Lab</h3>
                <SocialLinks />
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>For Researchers &amp; Students</h3>
                <p className={styles.infoText}>
                  Interested in joining The THRIVE Lab or collaborating on research?
                  Please include details about your background and research
                  interests in your message.
                </p>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>For Community Partners</h3>
                <p className={styles.infoText}>
                  We actively seek partnerships with community organizations, both in
                  the U.S. and West Africa. Tell us about your organization and how we
                  might work together to reduce HIV disparities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
