'use client';

import { useState, useCallback } from 'react';
import type { Publication } from '@/data/publications';
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
