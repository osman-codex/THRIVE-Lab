import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  fundingMetrics,
  currentAwards,
  collaborativeAwards,
  pilotSupportAwards,
  completedAwards,
  fundingPartners,
  type FundingAward,
} from '@/data/funding';
import SectionHeading from '@/components/SectionHeading';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Funding',
  description:
    'THRIVE leads and collaborates on competitively funded research addressing implementation, prevention, health equity, community engagement, digital innovation, and healthcare engagement across the United States and Ghana.',
};

/** Where each award's work appears in the research portfolio. */
const AWARD_PROJECT_LINKS: Record<string, string> = {
  'rwjf-epistemologies': '/projects#current-projects',
  'cira-mist-pathways': '/projects#current-projects',
  'pcori-whatsapp': '/projects#current-projects',
  'ub-seed-wise-woman': '/projects#current-projects',
  'c4-fund-lg-studies': '/projects#community-initiatives',
  'c4-hifi-lab': '/projects#community-initiatives',
};

function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

function AwardCard({ award }: { award: FundingAward }) {
  const href = AWARD_PROJECT_LINKS[award.id];
  return (
    <article className={styles.awardCard} aria-label={`Award: ${award.title}`}>
      <div className={styles.awardTop}>
        <span className={styles.awardYear}>{award.year}</span>
        <span className={styles.awardSetting}>{award.setting}</span>
      </div>
      <h3 className={styles.awardTitle}>{award.title}</h3>
      <p className={styles.awardRole}>{award.role}</p>
      <p className={styles.awardOrg}>{award.organization}</p>
      {award.mechanism && (
        <p className={styles.awardMechanism}>
          <strong>Mechanism:</strong> {award.mechanism}
        </p>
      )}
      {award.amount !== undefined && (
        <p className={styles.awardAmount}>{formatAmount(award.amount)}</p>
      )}
      <p className={styles.awardSummary}>{award.summary}</p>
      {href && (
        <Link href={href} className={styles.awardLink}>
          View Project →
        </Link>
      )}
    </article>
  );
}

export default function FundingPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroKicker}>Research Support</p>
          <h1 className={styles.heroTitle}>Funding Our Science</h1>
          <p className={styles.heroSubtitle}>
            THRIVE leads and collaborates on competitively funded research
            addressing implementation, prevention, health equity, community
            engagement, digital innovation, and healthcare engagement.
          </p>
          <p className={styles.heroSubtitle}>
            Our portfolio includes investigator-led awards, collaborative
            studies, subawards, pilot research, community-engaged initiatives,
            and institutional research support across the United States and
            Ghana.
          </p>
        </div>
      </section>

      {/* Portfolio at a glance */}
      <section className="page-section" aria-labelledby="glance-heading">
        <div className="container">
          <SectionHeading
            id="glance-heading"
            title="Portfolio at a Glance"
            subtitle="Verified totals across active and completed research support."
            label="Research Support"
          />
          <div className={styles.metricsGrid} data-animate-group>
            {fundingMetrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
                <span className={styles.metricNote}>{metric.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Awards */}
      <section className="page-section page-section--alt" aria-labelledby="current-heading">
        <div className="container">
          <SectionHeading
            id="current-heading"
            title="Current Awards"
            subtitle="Active awards led by THRIVE investigators."
            label="Active Funding"
          />
          <div className={styles.awardsGrid} data-animate-group>
            {currentAwards.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </div>
        </div>
      </section>

      {/* Collaborative Awards & Subawards */}
      <section className="page-section" aria-labelledby="collab-heading">
        <div className="container">
          <SectionHeading
            id="collab-heading"
            title="Collaborative Awards & Subawards"
            subtitle="Work in which THRIVE investigators participate as multi-principal investigator, co-investigator, site investigator, collaborator, consultant, or subaward investigator, representing the full collaborative research portfolio rather than only awards administered directly through the lab."
            label="Collaborative Research"
          />
          <div className={styles.awardsGrid} data-animate-group>
            {collaborativeAwards.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </div>
        </div>
      </section>

      {/* Pilot & Institutional Support */}
      <section className="page-section page-section--alt" aria-labelledby="pilot-heading">
        <div className="container">
          <SectionHeading
            id="pilot-heading"
            title="Pilot & Institutional Funding"
            subtitle="Pilot awards, institutional seed funding, developmental awards, and internal research awards that support preliminary research and innovation."
            label="Early-Stage Support"
          />
          <div className={styles.awardsGrid} data-animate-group>
            {pilotSupportAwards.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </div>
        </div>
      </section>

      {/* Completed Awards */}
      <section className="page-section" aria-labelledby="completed-heading">
        <div className="container">
          <SectionHeading
            id="completed-heading"
            title="Completed Awards"
            subtitle="Completed funding demonstrates the evolution of the research program. Where possible, completed awards connect to resulting publications, subsequent studies, community resources, and tools."
            label="Track Record"
          />
          <div className={styles.awardsGrid} data-animate-group>
            {completedAwards.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </div>
        </div>
      </section>

      {/* Funding Partners */}
      <section className="page-section page-section--alt" aria-labelledby="partners-heading">
        <div className="container">
          <SectionHeading
            id="partners-heading"
            title="Funding Partners"
            subtitle="Federal, foundation, academic, and institutional partners supporting THRIVE's scientific work."
            label="Partners"
          />
          <ul className={styles.partnerLogos} role="list" data-animate-group>
            {fundingPartners.map((partner) => (
              <li key={partner.id} className={styles.partnerCard}>
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={180}
                  height={72}
                  className={styles.partnerImage}
                />
                <span className={styles.partnerName}>{partner.name}</span>
                <span className={styles.partnerRelationship}>
                  {partner.relationship}
                </span>
              </li>
            ))}
          </ul>
          <div className={styles.sectionCta} data-animate="fade">
            <Link href="/contact" className="btn btn--secondary">
              Discuss a Research Collaboration →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
