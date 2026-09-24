import type { Metadata } from 'next';
import {
  researchAreas,
  currentProjects,
  completedProjects,
  upcomingProjects,
  approachPillars,
} from '@/data/research';
import ResearchCard from '@/components/ResearchCard';
import SectionHeading from '@/components/SectionHeading';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'Explore The THRIVE Lab\u2019s current, completed, and upcoming research on HIV prevention, health equity, and community-driven approaches for African immigrant and Black populations.',
};

export default function ResearchPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroKicker}>What we do</p>
          <h1 className={styles.heroTitle}>Research projects, funding, and publications</h1>
          <p className={styles.heroSubtitle}>
            Our work spans HIV prevention and PrEP access, stigma reduction, and
            community-driven interventions. Every project is built with the
            communities it serves, from the first idea to the final paper.
          </p>
        </div>
      </section>

      {/* Research focus areas, numbered */}
      <section className="page-section" aria-labelledby="areas-heading">
        <div className="container">
          <SectionHeading
            id="areas-heading"
            title="Research focus areas"
            subtitle="Six connected areas that guide what we study and why."
          />
          <div className={styles.areasGrid} data-animate-group>
            {researchAreas.map((area, index) => (
              <div key={area.id} className={styles.areaCard}>
                <span className={styles.areaNum}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.areaTitle}>{area.title}</h3>
                <p className={styles.areaDescription}>{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="page-section page-section--alt" aria-labelledby="approach-heading">
        <div className="container">
          <SectionHeading
            id="approach-heading"
            title="Our approach"
            subtitle="We believe impactful research must be rooted in the communities it serves."
          />
          <div className={styles.approachGrid} data-animate-group>
            {approachPillars.map((pillar) => (
              <div key={pillar.title} className={styles.approachCard}>
                <h3 className={styles.approachTitle}>{pillar.title}</h3>
                <p className={styles.approachDescription}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="page-section" aria-labelledby="current-heading">
        <div className="container">
          <SectionHeading
            id="current-heading"
            title="What we are working on now"
            subtitle="Active research initiatives currently underway at the lab."
          />
          <div className={styles.projectsGrid} data-animate-group>
            {currentProjects.map((project) => (
              <ResearchCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Completed Projects */}
      {completedProjects.length > 0 && (
        <section className="page-section page-section--alt" aria-labelledby="completed-heading">
          <div className="container">
            <SectionHeading
              id="completed-heading"
              title="Completed projects"
              subtitle="Studies that have wrapped up, with findings feeding into our next round of work."
            />
            <div className={styles.projectsGrid}>
              {completedProjects.map((project) => (
                <ResearchCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Future / Anticipated Projects */}
      {upcomingProjects.length > 0 && (
        <section className="page-section" aria-labelledby="future-heading">
          <div className="container">
            <SectionHeading
              id="future-heading"
              title="Where we are headed"
              subtitle="New work taking shape as the lab grows at VCU."
            />
            <div className={styles.projectsGrid}>
              {upcomingProjects.map((project) => (
                <ResearchCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
