import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import SectionHeading from '@/components/SectionHeading';
import SocialLinks from '@/components/SocialLinks';
import { siteConfig } from '@/data/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with The THRIVE Lab at the Virginia Commonwealth University School of Public Health. We welcome inquiries about research collaboration, community partnerships, training, and media.',
};

/** Audience pathways from the brief. */
const pathways = [
  {
    id: 'research-collaboration',
    title: 'Research Collaboration',
    text: 'For investigators, institutions, and research teams interested in scientific collaboration, multi-institutional studies, implementation science, community-engaged research, or related partnerships.',
    button: 'Discuss a Research Collaboration',
  },
  {
    id: 'community-partnerships',
    title: 'Community Partnerships',
    text: 'For community organizations, advocacy groups, healthcare organizations, public health agencies, and community leaders interested in research and community-engaged initiatives.',
    button: 'Explore a Community Partnership',
  },
  {
    id: 'students-trainees',
    title: 'Students & Trainees',
    text: 'For students interested in research experience, mentorship, graduate training, research assistant opportunities, or participation in THRIVE.',
    button: 'Learn About Joining THRIVE',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroKicker}>Connect With THRIVE</p>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSubtitle}>
            THRIVE welcomes inquiries from investigators, community
            organizations, healthcare systems, public health agencies,
            students, trainees, and others interested in scientific
            collaboration, partnership, training, or engagement with our work.
          </p>
        </div>
      </section>

      {/* Audience pathways */}
      <section className="page-section" aria-labelledby="pathways-heading">
        <div className="container">
          <SectionHeading
            id="pathways-heading"
            title="Ways to Connect"
            subtitle="Choose the pathway that fits your inquiry. Every message goes to the lab inbox and someone on the team will respond."
          />
          <div className={styles.pathwaysGrid} data-animate-group>
            {pathways.map((pathway) => (
              <div key={pathway.id} className={styles.pathwayCard}>
                <h3 className={styles.pathwayTitle}>{pathway.title}</h3>
                <p className={styles.pathwayText}>{pathway.text}</p>
                <a href="#contact-form" className="btn btn--secondary btn--small">
                  {pathway.button}
                </a>
              </div>
            ))}
            <div className={styles.pathwayCard}>
              <h3 className={styles.pathwayTitle}>General Inquiries</h3>
              <p className={styles.pathwayText}>
                For media requests, speaking invitations, general questions, and
                other inquiries.
              </p>
              <p className={styles.pathwayEmail}>
                <a href={`mailto:${siteConfig.contactEmail}`}>
                  {siteConfig.contactEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section
        className="page-section page-section--alt"
        id="contact-form"
        aria-labelledby="contact-heading"
      >
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
