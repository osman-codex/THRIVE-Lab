import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  researchAreas,
  currentProjects,
  communityInitiatives,
  completedProjects,
  upcomingProjects,
  approachMethods,
  integratedProgram,
} from '@/data/research';
import ResearchCard from '@/components/ResearchCard';
import SectionHeading from '@/components/SectionHeading';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Projects & Initiatives',
  description:
    'THRIVE leads and collaborates on research and community-engaged initiatives addressing prevention, implementation, health equity, digital innovation, trust, and healthcare engagement across the United States and Ghana.',
};

export default function ProjectsPage() {
  const activeAndUpcoming = [...currentProjects, ...upcomingProjects];

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroKicker}>Our Portfolio</p>
          <h1 className={styles.heroTitle}>Projects &amp; Initiatives</h1>
          <p className={styles.heroSubtitle}>
            THRIVE leads and collaborates on research and community-engaged
            initiatives addressing prevention, implementation, health equity,
            digital innovation, trust, and healthcare engagement.
          </p>
          <p className={styles.heroSubtitle}>
            Our portfolio includes investigator-led studies, collaborative
            research, pilot projects, intervention development,
            community-engaged initiatives, and methodological work conducted
            across the United States and Ghana.
          </p>
          <div className={styles.heroActions}>
            <a href="#current-projects" className="btn btn--gold">
              Current Projects
            </a>
            <a href="#community-initiatives" className="btn btn--inverted">
              Community Initiatives
            </a>
            <a href="#completed-projects" className="btn btn--inverted">
              Completed Projects
            </a>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section
        className="page-section"
        id="current-projects"
        aria-labelledby="current-heading"
      >
        <div className="container">
          <SectionHeading
            id="current-heading"
            title="Current Projects"
            subtitle="Active studies underway at the lab, from investigator-led trials to collaborative research."
            label="Current Work"
          />
          <div className={styles.projectsGrid} data-animate-group>
            {activeAndUpcoming.map((project) => (
              <ResearchCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Initiatives */}
      <section
        className="page-section page-section--alt"
        id="community-initiatives"
        aria-labelledby="initiatives-heading"
      >
        <div className="container">
          <SectionHeading
            id="initiatives-heading"
            title="Community Initiatives"
            subtitle="Not every consequential THRIVE activity falls within the boundaries of a conventional research study. These initiatives extend the laboratory's scientific mission through community engagement, capacity building, public scholarship, participatory priority setting, and knowledge exchange."
            label="Community Engagement"
          />
          <div className={styles.initiativesGrid} data-animate-group>
            {communityInitiatives.map((initiative) => (
              <article key={initiative.id} className={styles.initiativeCard}>
                {initiative.imageUrl && (
                  <Image
                    src={initiative.imageUrl}
                    alt={initiative.title}
                    width={640}
                    height={360}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className={styles.initiativeImage}
                  />
                )}
                <div className={styles.initiativeBody}>
                  <h3 className={styles.initiativeTitle}>{initiative.title}</h3>
                  <p className={styles.initiativePurpose}>{initiative.purpose}</p>
                  <dl className={styles.initiativeMeta}>
                    <div>
                      <dt>Community</dt>
                      <dd>{initiative.population}</dd>
                    </div>
                    <div>
                      <dt>Setting</dt>
                      <dd>{initiative.location}</dd>
                    </div>
                    {initiative.collaborators && (
                      <div>
                        <dt>Collaborators</dt>
                        <dd>{initiative.collaborators}</dd>
                      </div>
                    )}
                  </dl>
                  <p className={styles.initiativeRelationship}>
                    <strong>Link to the THRIVE research program:</strong>{' '}
                    {initiative.relationship}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Projects */}
      <section
        className="page-section"
        id="completed-projects"
        aria-labelledby="completed-heading"
      >
        <div className="container">
          <SectionHeading
            id="completed-heading"
            title="Completed Projects"
            subtitle="Completed studies remain visible because they demonstrate the development of the scientific program over time, linking to publications, presentations, and follow-on work."
            label="Track Record"
          />
          <div className={styles.projectsGrid} data-animate-group>
            {completedProjects.map((project) => (
              <ResearchCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Research Focus Areas (full intellectual descriptions) */}
      <section
        className="page-section page-section--alt"
        id="focus-areas"
        aria-labelledby="focus-heading"
      >
        <div className="container">
          <SectionHeading
            id="focus-heading"
            title="Research Focus Areas"
            subtitle="THRIVE's scientific program spans six interconnected areas of inquiry."
            label="Our Science"
          />

          <div className={styles.domains}>
            {researchAreas.map((area, index) => (
              <article
                key={area.id}
                className={styles.domainBlock}
                data-animate="fade"
              >
                <div className={styles.domainHeader}>
                  <span className={styles.domainNum}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className={styles.domainTitle}>{area.title}</h3>
                    <p className={styles.domainTagline}>{area.tagline}</p>
                  </div>
                </div>
                <div className={styles.domainProse}>
                  {area.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                  <p className={styles.domainQuestion}>
                    <strong>Our research asks:</strong> {area.question}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Integrated research program */}
          <div className={styles.integrated} data-animate="fade">
            <h3 className={styles.integratedTitle}>
              An Integrated Research Program
            </h3>
            <p className={styles.integratedIntro}>
              These domains are intentionally interconnected. Together, they
              allow THRIVE to study the full pathway from knowledge generation
              to intervention development, implementation, uptake, and sustained
              population health impact.
            </p>
            <ul className={styles.integratedList} role="list">
              {integratedProgram.map((item) => (
                <li key={item.domain} className={styles.integratedItem}>
                  <span className={styles.integratedDomain}>{item.domain}</span>
                  <span className={styles.integratedArrow} aria-hidden="true">
                    →
                  </span>
                  <span className={styles.integratedConnection}>
                    {item.connection}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="page-section" id="approach" aria-labelledby="approach-heading">
        <div className="container">
          <SectionHeading
            id="approach-heading"
            title="Our Approach"
            subtitle="THRIVE employs methodological approaches selected in response to the scientific question, implementation context, and needs of the communities and systems in which we work."
            label="Methods"
          />
          <ul className={styles.methodsGrid} role="list" data-animate-group>
            {approachMethods.map((method) => (
              <li key={method} className={styles.methodItem}>
                {method}
              </li>
            ))}
          </ul>
          <div className={styles.sectionCta} data-animate="fade">
            <Link href="/contact" className="btn btn--secondary">
              Discuss a Collaboration →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
