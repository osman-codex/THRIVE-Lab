import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { members } from '@/data/members';
import SocialLinks from '@/components/SocialLinks';
import MemberCard from '@/components/MemberCard';
import SectionHeading from '@/components/SectionHeading';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: `Home | ${siteConfig.name}` },
  description:
    'Welcome to The THRIVE Lab at the Virginia Commonwealth University School of Public Health. Transforming the HIV Response Through Innovation and Equity. Learn about our mission, vision, team, and community-driven approach to reducing HIV disparities.',
};

export default function HomePage() {
  // Show the PI plus a few members on the home page; the Team page has the full roster.
  const featuredMembers = members.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} aria-label="Introduction">
        <span className={`${styles.heroBlob} ${styles.heroBlobA} hero-blob`} aria-hidden="true" />
        <span className={`${styles.heroBlob} ${styles.heroBlobB} hero-blob hero-blob--slow`} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroVisual}>
            <span className={styles.heroRing} aria-hidden="true" />
            <Image
              src={siteConfig.logo}
              alt={`The ${siteConfig.name} logo`}
              width={260}
              height={260}
              priority
              className={styles.heroLogo}
            />
          </div>
          <div className={styles.heroContent} data-animate-group>
            <p className={styles.heroKicker}>{siteConfig.fullName}</p>
            <h1 className={styles.heroTitle}>
              Welcome to the <span className="shimmer-text">THRIVE Lab</span>
            </h1>
            <p className={styles.heroSubtitle}>
              We are a community-driven research lab at the Virginia Commonwealth
              University School of Public Health. We work alongside African
              immigrant and Black communities to make HIV prevention and care
              something everyone can reach, trust, and feel at home with.
            </p>
            <div className={styles.heroActions}>
              <Link href="/research" className="btn btn--gold">
                Explore Our Work
              </Link>
              <Link href="/contact" className="btn btn--inverted">
                Get in Touch
              </Link>
            </div>
            <div className={styles.heroSocial}>
              <p className={styles.heroSocialLabel}>Follow the lab:</p>
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      {/* Intro / about the lab */}
      <section className="page-section" aria-labelledby="about-heading">
        <div className="container">
          <SectionHeading
            id="about-heading"
            title="A community-driven HIV research lab at VCU"
            subtitle="From early conversations in the community to findings that shape practice, our work follows one path: research that people trust and use."
          />
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText} data-animate="fade">
              <p>
                The THRIVE Lab, short for Transforming the HIV Response Through
                Innovation and Equity, is led by Dr. Gloria Aidoo-Frimpong and
                based in the Department of Social and Behavioural Sciences at the
                Virginia Commonwealth University School of Public Health.
              </p>
              <p>
                Our team partners with African immigrant and Black communities in
                the United States and West Africa to design, test, and deliver HIV
                prevention strategies that fit real lives. From youth-led design
                sprints in Ghana to women-centered programs online, we believe the
                communities most affected by HIV should have the loudest voice in
                shaping the response.
              </p>
              <p>
                <Link href="/team" className={styles.inlineLink}>
                  Meet Dr. Aidoo-Frimpong and the team →
                </Link>
              </p>
            </div>
            <div className={styles.aboutFacts} data-animate-group>
              <div className={styles.fact}>
                <span className={styles.factNumber}>40+</span>
                <span className={styles.factLabel}>Scholarly works with lab members on them</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.factNumber}>764</span>
                <span className={styles.factLabel}>Ghanaian immigrants surveyed across 44 U.S. states</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.factNumber}>2</span>
                <span className={styles.factLabel}>Countries where our community projects run</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values: the three column layout */}
      <section className="page-section page-section--alt" aria-labelledby="mvv-heading">
        <div className="container">
          <SectionHeading
            id="mvv-heading"
            title="What drives the work"
            subtitle="The ideas behind every study we run."
          />
          <div className={styles.mvvGrid} data-animate-group>
            <div className={styles.mvvCard}>
              <h3 className={styles.mvvTitle}>Mission</h3>
              <p className={styles.mvvText}>
                To reduce HIV disparities through community-driven, evidence-based,
                and culturally tailored approaches that empower African immigrant
                and Black populations while fostering equitable access to
                prevention and care.
              </p>
            </div>
            <div className={styles.mvvCard}>
              <h3 className={styles.mvvTitle}>Vision</h3>
              <p className={styles.mvvText}>
                A world where African immigrant and Black communities thrive.
                Where everyone can access HIV prevention and care that respects
                their culture, speaks their language, and meets them where they
                are. We see communities leading the HIV response, free of the
                stigma that stands between people and the care they deserve.
              </p>
            </div>
            <div className={styles.mvvCard}>
              <h3 className={styles.mvvTitle}>Values</h3>
              <p className={styles.mvvText}>
                We are committed to scientific excellence, collaboration, and
                integrity. Our lab values rigorous and reproducible research,
                interdisciplinary teamwork, mentorship, and community engagement.
                We foster an inclusive environment that supports the development
                of future scientists while advancing health equity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research focus areas, numbered like a research portfolio */}
      <section className="page-section" aria-labelledby="focus-heading">
        <div className="container">
          <SectionHeading
            id="focus-heading"
            title="Research focus areas"
            subtitle="Six connected areas that guide what we study and why."
          />
          <div className={styles.focusGrid} data-animate-group>
            {[
              {
                num: '01',
                title: 'HIV Prevention & PrEP Access',
                text: 'Culturally tailored strategies to improve access to PrEP and HIV self-testing among African immigrant communities.',
              },
              {
                num: '02',
                title: 'Health Equity & Social Determinants',
                text: 'How immigration policy, religiosity, gender norms, and healthcare access shape HIV risk and outcomes.',
              },
              {
                num: '03',
                title: 'Community-Driven Research',
                text: 'Participatory methods, youth-led interventions, and partnerships with grassroots organizations in the U.S. and West Africa.',
              },
              {
                num: '04',
                title: 'Implementation Science',
                text: 'Moving evidence-based HIV interventions into real-world settings with fidelity and cultural responsiveness.',
              },
              {
                num: '05',
                title: 'Digital Health Innovation',
                text: 'WhatsApp recruitment, mobile interventions, and digital narratives that expand prevention and self-care.',
              },
              {
                num: '06',
                title: 'Stigma Reduction & Cultural Factors',
                text: 'Intersecting stigmas around HIV, PrEP, race, and immigration status, and their impact on engagement in care.',
              },
            ].map((area) => (
              <div key={area.num} className={styles.focusCard}>
                <span className={styles.focusNum}>{area.num}</span>
                <h3 className={styles.focusTitle}>{area.title}</h3>
                <p className={styles.focusText}>{area.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.sectionCta} data-animate="fade">
            <Link href="/research" className="btn btn--secondary">
              See our projects and publications
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="page-section page-section--alt" aria-labelledby="team-heading">
        <div className="container">
          <SectionHeading
            id="team-heading"
            title="Meet the team"
            subtitle="Researchers and collaborators working together to advance health equity."
          />
          <div className={styles.teamGrid} data-animate-group>
            {featuredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
          <div className={styles.sectionCta} data-animate="fade">
            <Link href="/team" className="btn btn--secondary">
              View the full team
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta} aria-label="Call to action">
        <span className={`${styles.ctaBlob} hero-blob`} aria-hidden="true" />
        <div className="container">
          <div className={styles.ctaInner} data-animate="fade">
            <h2 className={styles.ctaTitle}>Interested in collaborating?</h2>
            <p className={styles.ctaText}>
              We welcome partnerships with researchers, community organizations,
              and students who share our commitment to health equity. All
              inquiries go straight to the lab inbox and someone on the team will
              get back to you.
            </p>
            <Link href="/contact" className="btn btn--gold">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
