import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { members } from '@/data/members';
import SectionHeading from '@/components/SectionHeading';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About the THRIVE Lab at the Virginia Commonwealth University School of Public Health: mission, vision, research philosophy, principles, domains of application, where we work, training, and leadership.',
};

/** Principles that guide THRIVE's science. */
const principles = [
  {
    title: 'Center Community Knowledge',
    text: 'People most affected by a health challenge should have meaningful opportunities to define research priorities, shape solutions, interpret evidence, and determine what meaningful impact looks like.',
  },
  {
    title: 'Design for Implementation',
    text: 'We consider the systems, organizations, people, resources, workflows, and contextual conditions required for interventions to succeed beyond the research study.',
  },
  {
    title: 'Pursue Equity with Rigor',
    text: 'We combine methodological rigor with sustained attention to culture, history, access, structural conditions, trust, and the distribution of health opportunities.',
  },
  {
    title: 'Treat Context as Part of the Science',
    text: 'Culture, migration, institutional environments, social relationships, history, and systems influence how interventions are understood, accessed, implemented, and experienced.',
  },
  {
    title: 'Recognize That Availability Is Not Equity',
    text: 'The existence of an effective intervention does not guarantee meaningful access or benefit. We examine the mechanisms and conditions that determine who ultimately benefits from scientific advances.',
  },
];

/** Domains of application across the portfolio. */
const domains = [
  {
    title: 'HIV Prevention & Care',
    text: 'Research advancing HIV testing, self-testing, PrEP, emerging prevention technologies, care engagement, and the implementation of effective prevention and treatment strategies.',
  },
  {
    title: 'Immigrant & Global Health',
    text: 'Research examining health, healthcare access, and intervention delivery among African immigrant communities in the United States and populations across global settings, with particular engagement in Ghana.',
  },
  {
    title: "Women's & Adolescent Health",
    text: 'Research addressing prevention, sexual and reproductive health, healthcare access, health decision-making, and intervention engagement among women, adolescents, and young adults.',
  },
  {
    title: 'Cancer Prevention & Control',
    text: 'An emerging program of research focused on equitable cancer prevention, screening, early detection, care engagement, and the implementation of evidence-based cancer control strategies.',
  },
  {
    title: 'Chronic Disease Prevention & Management',
    text: 'Research examining the prevention, management, and implementation of evidence-based approaches for chronic conditions, with attention to sustained engagement, self-management, healthcare access, and inequities in long-term outcomes.',
  },
  {
    title: 'AI & Emerging Technologies in Health',
    text: 'Research examining how artificial intelligence and emerging technologies can be developed, evaluated, and implemented responsibly in health research and practice, with particular attention to equity, trust, safety, accessibility, and population-level consequences.',
  },
];

/** Areas of training embedded in the research enterprise. */
const trainingAreas = [
  'Research design',
  'Implementation science',
  'Qualitative research',
  'Mixed methods',
  'Community-engaged research',
  'Intervention development',
  'Data analysis',
  'Manuscript development',
  'Conference dissemination',
  'Grant development',
  'Professional development',
];

export default function AboutPage() {
  const director = members.find((m) => m.role === 'principal-investigator');

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroKicker}>About</p>
          <h1 className={styles.heroTitle}>About the THRIVE Lab</h1>
          <p className={styles.heroSubtitle}>
            An academic research enterprise at the Virginia Commonwealth
            University School of Public Health, studying how health
            interventions, services, and systems can produce more equitable
            outcomes.
          </p>
        </div>
      </section>

      {/* 1. About THRIVE */}
      <section className="page-section" aria-labelledby="about-heading">
        <div className="container">
          <SectionHeading
            id="about-heading"
            title="About the THRIVE Lab"
            subtitle="Directed by Dr. Gloria Aidoo-Frimpong, Assistant Professor in the Department of Social and Behavioral Sciences at the Virginia Commonwealth University School of Public Health."
          />
          <div className={styles.prose} data-animate="fade">
            <p>
              Our scholarship examines how health interventions, services, and
              systems can be designed, implemented, and sustained to produce
              more equitable outcomes for populations historically underserved
              by research and healthcare.
            </p>
            <p>
              Our work integrates community-engaged research, implementation
              science, prevention science, health equity, and digital
              innovation to address consequential questions about access,
              uptake, implementation, trust, and sustainability.
            </p>
            <p>
              Our current portfolio has particular strengths in HIV prevention
              and care, African immigrant health, women’s and adolescent
              health, and digital health, with an expanding program of research
              across cancer prevention and other areas of population health.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Mission */}
      <section className="page-section page-section--alt" aria-labelledby="mission-heading">
        <div className="container">
          <SectionHeading id="mission-heading" title="Mission" />
          <div className={styles.prose} data-animate="fade">
            <p>
              The mission of the THRIVE Lab is to generate and translate
              knowledge that improves the equity, responsiveness, and
              implementation of prevention and care.
            </p>
            <p>
              We conduct community-engaged and implementation-focused research
              to understand how interventions interact with the social,
              cultural, organizational, and structural contexts in which they
              are delivered.
            </p>
            <p>
              Through this work, we seek to advance approaches that are not only
              effective, but also accessible, contextually responsive,
              implementable, and sustainable in real-world settings.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Vision */}
      <section className="page-section" aria-labelledby="vision-heading">
        <div className="container">
          <SectionHeading id="vision-heading" title="Vision" />
          <div className={styles.prose} data-animate="fade">
            <p>
              We envision a research and healthcare ecosystem in which
              scientific advances are not defined solely by efficacy, but also
              by their capacity to reach populations equitably, respond to
              community priorities, and produce meaningful improvements in
              health.
            </p>
            <p>
              THRIVE seeks to contribute to a future in which communities have
              greater influence over the production of health knowledge and
              where evidence-based interventions are implemented in ways that
              reflect the contexts, systems, and lives of the people they are
              intended to serve.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Research philosophy */}
      <section className="page-section page-section--alt" aria-labelledby="philosophy-heading">
        <div className="container">
          <SectionHeading
            id="philosophy-heading"
            title="How We Think About Research"
            subtitle="THRIVE views knowledge production as a collaborative and situated process. We bring empirical rigor into dialogue with community expertise and lived experience, recognizing that each offers distinct insight into the questions we ask, the evidence we generate, and the conclusions we draw. Our scholarship is therefore guided by intellectual rigor, reflexivity, reciprocity, and accountability."
          />
        </div>
      </section>

      {/* 5. Principles */}
      <section className="page-section" aria-labelledby="principles-heading">
        <div className="container">
          <SectionHeading
            id="principles-heading"
            title="Principles That Guide Our Science"
          />
          <div className={styles.principlesGrid} data-animate-group>
            {principles.map((principle) => (
              <div key={principle.title} className={styles.principleCard}>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleText}>{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Domains of application */}
      <section className="page-section page-section--alt" aria-labelledby="domains-heading">
        <div className="container">
          <SectionHeading
            id="domains-heading"
            title="Domains of Application"
            subtitle="THRIVE applies its scientific and methodological expertise across a growing portfolio of population health priorities."
          />
          <div className={styles.domainsGrid} data-animate-group>
            {domains.map((domain) => (
              <div key={domain.title} className={styles.domainCard}>
                <h3 className={styles.domainTitle}>{domain.title}</h3>
                <p className={styles.domainText}>{domain.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Where we work */}
      <section className="page-section" aria-labelledby="where-heading">
        <div className="container">
          <SectionHeading
            id="where-heading"
            title="Where We Work"
            subtitle="THRIVE's research currently spans the United States and Ghana, with projects situated across community, healthcare, academic, and public health environments."
          />
          <div className={styles.whereGrid} data-animate-group>
            <div className={styles.whereCard}>
              <span className={styles.whereFlag} aria-hidden="true">🇺🇸</span>
              <h3 className={styles.whereTitle}>United States</h3>
              <p className={styles.whereText}>
                African immigrant communities, healthcare settings, and
                universities, with the lab based at the Virginia Commonwealth
                University School of Public Health in Richmond, Virginia.
              </p>
            </div>
            <div className={styles.whereCard}>
              <span className={styles.whereFlag} aria-hidden="true">🇬🇭</span>
              <h3 className={styles.whereTitle}>Ghana</h3>
              <p className={styles.whereText}>
                Community organizations, schools, and research partnerships
                across Ghana, where youth-led and community-engaged studies
                shape how prevention reaches people earlier.
              </p>
            </div>
          </div>
          <div className={styles.whereNote} data-animate="fade">
            <p>
              Our transnational research program provides opportunities to
              examine how interventions and implementation processes are shaped
              by differing social, cultural, organizational, and health-system
              contexts.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Training & mentorship */}
      <section className="page-section page-section--alt" aria-labelledby="training-heading">
        <div className="container">
          <SectionHeading
            id="training-heading"
            title="Developing the Next Generation of Scholars"
            subtitle="Training is embedded within THRIVE's research enterprise."
          />
          <div className={styles.prose} data-animate="fade">
            <p>
              Students and emerging scholars participate in substantive research
              while developing expertise in scientific inquiry, implementation
              science, community-engaged methods, intervention development,
              analysis, dissemination, and professional development.
            </p>
            <p>
              THRIVE approaches mentorship as more than research assistance.
              Trainees are supported in developing the conceptual,
              methodological, scholarly, and professional competencies required
              to become independent and socially responsive public health
              researchers.
            </p>
          </div>
          <ul className={styles.trainingList} role="list" data-animate-group>
            {trainingAreas.map((area) => (
              <li key={area} className={styles.trainingItem}>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Laboratory leadership */}
      {director && (
        <section className="page-section" aria-labelledby="leadership-heading">
          <div className="container">
            <SectionHeading
              id="leadership-heading"
              title="Laboratory Leadership"
            />
            <div className={styles.leaderCard} data-animate="fade">
              <div className={styles.leaderPhotoWrap}>
                {director.imageUrl && (
                  <Image
                    src={director.imageUrl}
                    alt={`Photo of ${director.name}`}
                    width={280}
                    height={280}
                    className={styles.leaderPhoto}
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                )}
              </div>
              <div className={styles.leaderInfo}>
                <h3 className={styles.leaderName}>
                  Gloria Aidoo-Frimpong, PhD, MPH, MA
                </h3>
                <p className={styles.leaderRole}>Founder &amp; Director, The THRIVE Lab @ VCU</p>
                <p className={styles.leaderAffiliation}>
                  Assistant Professor, {siteConfig.department}
                </p>
                <p className={styles.leaderAffiliation}>
                  {siteConfig.school}, {siteConfig.institution}
                </p>
                <p className={styles.leaderBio}>{director.bio}</p>
                <div className={styles.leaderLinks}>
                  {director.orcid && (
                    <a
                      href={`https://orcid.org/${director.orcid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost btn--small"
                    >
                      ORCID
                    </a>
                  )}
                  {director.linkedin && (
                    <a
                      href={director.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost btn--small"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
                <Link href="/team" className={styles.learnMore}>
                  Learn More About Dr. Aidoo-Frimpong →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
