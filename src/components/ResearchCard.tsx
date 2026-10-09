import Image from 'next/image';
import type { ResearchProject } from '@/data/research';
import styles from './ResearchCard.module.css';

interface ResearchCardProps {
  project: ResearchProject;
}

const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  completed: 'Completed',
  upcoming: 'Upcoming',
};

export default function ResearchCard({ project }: ResearchCardProps) {
  return (
    <article className={styles.card} aria-label={`Research project: ${project.title}`}>
      {project.imageUrl && (
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={640}
          height={360}
          sizes="(max-width: 768px) 100vw, 360px"
          className={styles.image}
        />
      )}
      <div className={styles.header}>
        <span className={`${styles.badge} ${styles[`badge_${project.status}`]}`}>
          {STATUS_LABELS[project.status] ?? project.status}
        </span>
      </div>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.pi}>PI: {project.principalInvestigator}</p>
      <p className={styles.summary}>{project.summary}</p>
      {project.fundingSource && (
        <p className={styles.funding}>
          <strong>Funded by:</strong> {project.fundingSource}
        </p>
      )}
      {project.focusAreas.length > 0 && (
        <div className={styles.tags}>
          {project.focusAreas.map((area) => (
            <span key={area} className="badge">
              {area}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
