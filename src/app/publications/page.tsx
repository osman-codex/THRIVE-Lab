'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  publications,
  getUniqueTags,
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  type PublicationCategory,
} from '@/data/publications';
import PublicationCard from '@/components/PublicationCard';
import SectionHeading from '@/components/SectionHeading';
import styles from './page.module.css';

export default function PublicationsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => getUniqueTags(), []);

  const filteredPublications = useMemo(() => {
    if (!selectedTag) return publications;
    return publications.filter((pub) => pub.tags.includes(selectedTag));
  }, [selectedTag]);

  const filteredByCategory = useMemo(() => {
    const grouped: Record<PublicationCategory, typeof publications> = {
      'peer-reviewed': [],
      'preprint': [],
      'conference': [],
      'under-review': [],
    };
    const sorted = [...filteredPublications].sort(
      (a, b) => b.year - a.year || a.title.localeCompare(b.title),
    );
    for (const pub of sorted) {
      const category =
        pub.category ??
        (pub.type === 'preprint'
          ? 'preprint'
          : pub.type === 'conference-paper'
            ? 'conference'
            : 'peer-reviewed');
      grouped[category].push(pub);
    }
    return grouped;
  }, [filteredPublications]);

  const handleTagChange = useCallback(
    (tag: string | null) => {
      setSelectedTag(tag);
    },
    [],
  );

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Publications</h1>
          <p className={styles.heroSubtitle}>
            Peer-reviewed articles, pre-prints, conference presentations, and other
            scholarly work produced by members of The THRIVE Lab.
          </p>
          <p className={styles.count}>{publications.length} scholarly outputs</p>
        </div>
      </section>

      {/* Publications by category */}
      <section className="page-section" aria-labelledby="pubs-heading">
        <div className="container">
          <SectionHeading
            id="pubs-heading"
            title="Our Work"
            subtitle="Browse our research outputs by category or filter by topic."
          />

          {/* Tag filter */}
          <div className={styles.filterSection} role="group" aria-label="Filter publications by tag">
            <button
              className={`${styles.filterButton} ${selectedTag === null ? styles.filterButtonActive : ''}`}
              onClick={() => handleTagChange(null)}
              aria-pressed={selectedTag === null}
            >
              All Topics
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`${styles.filterButton} ${selectedTag === tag ? styles.filterButtonActive : ''}`}
                onClick={() => handleTagChange(tag)}
                aria-pressed={selectedTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Category sections */}
          {filteredPublications.length === 0 ? (
            <p className={styles.noResults}>
              No publications match the selected filter.
            </p>
          ) : (
            CATEGORY_ORDER.map((category) => {
              const pubs = filteredByCategory[category];
              if (pubs.length === 0) return null;
              return (
                <div key={category} className={styles.categorySection}>
                  <h2 className={styles.categoryHeading}>
                    {CATEGORY_LABELS[category]}
                    <span className={styles.categoryCount}>{pubs.length}</span>
                  </h2>
                  <div className={styles.pubsList} data-animate-group>
                    {pubs.map((pub) => (
                      <PublicationCard key={pub.id} publication={pub} />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
