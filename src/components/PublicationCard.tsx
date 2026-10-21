'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import type { Publication } from '@/data/publications';
import { researchProjects } from '@/data/research';
import styles from './PublicationCard.module.css';

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleAbstract = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const citation = [
    publication.authors.join(', '),
    `(${publication.year}).`,
    publication.title,
    `${publication.journal}.`,
    publication.volume ? `${publication.volume}` : '',
    publication.issue ? `(${publication.issue})` : '',
    publication.pages ? `${publication.pages}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  /** The project this publication emerged from, when known. */
  const project = publication.projectId
    ? researchProjects.find((p) => p.id === publication.projectId)
    : undefined;
  const projectHref =
    project && project.status === 'completed'
      ? '/projects#completed-projects'
      : '/projects#current-projects';

  return (
    <article
      className={styles.card}
      aria-label={`Publication: ${publication.title}`}
    >
      <h3 className={styles.title}>{publication.title}</h3>
      <p className={styles.citation}>{citation}</p>
      {publication.doi && (
        <p className={styles.doi}>
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`DOI link for ${publication.title} (opens in new tab)`}
          >
            DOI: {publication.doi}
          </a>
        </p>
      )}
      {project && (
        <p className={styles.projectLink}>
          <Link href={projectHref}>
            From project: {project.title} →
          </Link>
        </p>
      )}
      <button
        className={styles.toggleButton}
        onClick={toggleAbstract}
        aria-expanded={expanded}
        aria-controls={`abstract-${publication.id}`}
      >
        {expanded ? 'Hide Abstract' : 'Show Abstract'}
      </button>
      {expanded && (
        <div id={`abstract-${publication.id}`} className={styles.abstract}>
          <p>{publication.abstract}</p>
        </div>
      )}
      {publication.tags.length > 0 && (
        <div className={styles.tags}>
          {publication.tags.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
