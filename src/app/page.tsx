import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { researchAreas, currentProjects } from '@/data/research';
import { fundingMetrics, scholarlyWorksMetric, fundingPartners } from '@/data/funding';
import { getSortedNews } from '@/data/news';
import NewsCard from '@/components/NewsCard';
import SectionHeading from '@/components/SectionHeading';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: `Home | ${siteConfig.name}` },
  description:
    'The THRIVE Lab @ VCU: Transforming Health Research through Innovation, Value, and Equity. Community-engaged research, implementation science, and health equity at the Virginia Commonwealth University School of Public Health.',
};

/** Three scientific priorities shown beneath the mission. */
const priorities = [
  {
    num: '01',
    title: 'Center Community Knowledge',
    text: 'Advance models of research in which community knowledge, lived experience, and local expertise meaningfully shape scientific priorities, intervention development, interpretation, and application.',
  },
  {
    num: '02',
    title: 'Strengthen Implementation',
    text: 'Identify the contextual conditions, strategies, and mechanisms required for evidence-based interventions to be adopted, adapted, delivered, scaled, and sustained in real-world settings.',
  },
  {
    num: '03',
    title: 'Expand Equitable Access',
    text: 'Examine and address the conditions that determine who can access, engage with, and ultimately benefit from advances in prevention, screening, treatment, and care.',
  },
];

/** Homepage shows only three featured projects; the full portfolio lives on /projects. */
const FEATURED_PROJECT_IDS = ['wise-woman', 'wi-care', 'african-epistemologies'];

export default function HomePage() {
  const featuredProjects = FEATURED_PROJECT_IDS.map(
    (id) => currentProjects.find((project) => project.id === id),
  ).filter((project): project is NonNullable<typeof project> => Boolean(project));

  const latestNews = getSortedNews().slice(0, 3);

  // Homepage metrics per the brief: research support, scholarly works,
  // funded studies, and research reach (funding organization count lives
  // on the Funding page).
  const homeMetrics = [
    fundingMetrics[0],
    scholarlyWorksMetric,
    fundingMetrics[1],
    fundingMetrics[3],
  ];

  return (
    <>
      {/* 1. Hero */}
      <section className={styles.hero} aria-label="Introduction">
        <Image
          src="/images/hero-yfit.jpg"
          alt="THRIVE researchers and youth partners at a Y-FIT Ghana design workshop"
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
        <span className={styles.heroOverlay} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.heroKicker}>
            Community-Engaged Research • Implementation Science • Health Equity
          </p>
          <h1 className={styles.heroTitle}>The THRIVE Lab @ VCU</h1>
          <p className={styles.heroTagline}>{siteConfig.fullName}</p>
          <div className={styles.heroCopy}>
            <p>
              The THRIVE Lab examines how health interventions, services, and
              systems can be designed, implemented, and sustained to produce
              more equitable health outcomes.
            </p>
            <p>
              Our work brings together community-engaged research,
              implementation science, prevention science, and methodological
              innovation to address persistent gaps between scientific
              evidence, real-world practice, and population health.
            </p>
          </div>
          <div className={styles.heroActions}>
            <Link href="/projects" className="btn btn--gold">
              Explore Our Work
            </Link>
            <Link href="/about" className="btn btn--inverted">
              About THRIVE
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Mission + three scientific priorities */}
      <section className="page-section" aria-labelledby="mission-heading">
        <div className="container">
          <p className={styles.label}>Our Mission</p>
          <h2 id="mission-heading" className={styles.missionTitle}>
            Advancing Evidence From Discovery to Equitable Impact
          </h2>
          <div className={styles.missionCopy} data-animate="fade">
            <p>
              THRIVE generates and translates knowledge to improve the
              accessibility, responsiveness, implementation, and sustainability
              of prevention and care.
            </p>
            <p>
              We study how interventions interact with the communities,
              organizations, systems, and social conditions in which they are
              introduced, with particular attention to populations historically
              underserved by research and healthcare.
            </p>
          </div>

          <h3 className={styles.prioritiesHeading}>Our Research Priorities</h3>
          <div className={styles.prioritiesGrid} data-animate-group>
            {priorities.map((priority) => (
              <div key={priority.num} className={styles.priorityCard}>
                <span className={styles.priorityNum}>{priority.num}</span>
                <h4 className={styles.priorityTitle}>{priority.title}</h4>
                <p className={styles.priorityText}>{priority.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Research Focus Areas */}
      <section className="page-section page-section--alt" aria-labelledby="focus-heading">
        <div className="container">
          <SectionHeading
            id="focus-heading"
            title="Research Focus Areas"
            subtitle="THRIVE's scientific program spans six interconnected areas of inquiry."
            label="Our Science"
          />
          <div className={styles.focusGrid} data-animate-group>
            {researchAreas.map((area, index) => (
              <div key={area.id} className={styles.focusCard}>
                <span className={styles.focusNum}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.focusTitle}>{area.title}</h3>
                <p className={styles.focusText}>{area.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.sectionCta} data-animate="fade">
            <Link href="/projects#focus-areas" className="btn btn--secondary">
              Explore Our Research →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured Projects & Initiatives */}
      <section className="page-section" aria-labelledby="projects-heading">
        <div className="container">
          <SectionHeading
            id="projects-heading"
            title="Projects & Initiatives"
            subtitle="THRIVE leads and collaborates on research spanning prevention, implementation science, health equity, digital innovation, and community-engaged knowledge production."
            label="Current Work"
          />
          <div className={styles.projectsGrid} data-animate-group>
            {featuredProjects.map((project) => (
              <article key={project.id} className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  {project.subtitle && (
                    <p className={styles.projectSubtitle}>{project.subtitle}</p>
                  )}
                </div>
                <p className={styles.projectText}>{project.summary}</p>
                {project.location && (
                  <span className={styles.projectLocation}>{project.location}</span>
                )}
                <Link
                  href="/projects#current-projects"
                  className={styles.projectLink}
                >
                  View Project →
                </Link>
              </article>
            ))}
          </div>
          <div className={styles.sectionCta} data-animate="fade">
            <Link href="/projects" className="btn btn--secondary">
              View All Projects &amp; Initiatives →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Funded Scholarship & Research Reach */}
      <section
        className={`page-section page-section--alt ${styles.enterprise}`}
        aria-labelledby="enterprise-heading"
      >
        <div className="container">
          <SectionHeading
            id="enterprise-heading"
            title="Funded Scholarship & Research Reach"
            subtitle="THRIVE's research is supported through competitive federal, foundation, academic, industry, and institutional funding."
            label="Research Enterprise"
          />
          <div className={styles.metricsGrid} data-animate-group>
            {homeMetrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
                <span className={styles.metricNote}>{metric.note}</span>
              </div>
            ))}
          </div>

          <div className={styles.partners} data-animate="fade">
            <p className={styles.partnersLabel}>Funders &amp; Research Partners</p>
            <ul className={styles.partnerLogos} role="list">
              {fundingPartners.map((partner) => (
                <li key={partner.id} className={styles.partnerLogo}>
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={160}
                    height={64}
                    className={styles.partnerImage}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sectionCta} data-animate="fade">
            <Link href="/funding" className="btn btn--secondary">
              Explore Funding &amp; Awards →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. News & Events */}
      <section className="page-section" aria-labelledby="news-heading">
        <div className="container">
          <SectionHeading
            id="news-heading"
            title="News & Events"
            subtitle="Awards, publications, presentations, community activities, and lab milestones from an active research enterprise."
          />
          <div className={styles.newsGrid} data-animate-group>
            {latestNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
          <div className={styles.sectionCta} data-animate="fade">
            <Link href="/news" className="btn btn--secondary">
              View All News &amp; Events →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
