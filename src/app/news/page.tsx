import type { Metadata } from 'next';
import Link from 'next/link';
import { getSortedNews, getUpcomingEvents, getVideos } from '@/data/news';
import NewsCard from '@/components/NewsCard';
import SectionHeading from '@/components/SectionHeading';
import { siteConfig } from '@/data/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'News & Events',
  description:
    'The latest news, upcoming events, success stories, photos, and videos from The THRIVE Lab: workshops, conferences, fieldwork, and community activities.',
};

export default function NewsPage() {
  const sortedNews = getSortedNews();
  const upcomingEvents = getUpcomingEvents();
  const videos = getVideos();
  // Videos with an embed already appear in the featured band above;
  // keep the main grid for stories without an inline player.
  const gridNews = sortedNews.filter((item) => !item.videoUrl);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroKicker}>News &amp; Events</p>
          <h1 className={styles.heroTitle}>News and lab highlights</h1>
          <p className={styles.heroSubtitle}>
            What we have been up to: workshops, conferences, fieldwork, and
            everyday moments from the lab and our communities.
          </p>
        </div>
      </section>

      {/* Featured videos from our Facebook page */}
      {videos.length > 0 && (
        <section className={styles.videoSection} aria-labelledby="videos-heading">
          <div className="container">
            <div className={`section-heading ${styles.videoSectionHeading}`} id="videos-heading">
              <span className="section-heading__accent" aria-hidden="true" />
              <h2 className="section-heading__title">Watch our work</h2>
              <p className="section-heading__subtitle">
                Videos from our Facebook page: study invitations, explainers, and
                highlights from the communities we serve.
              </p>
            </div>
            <div className={styles.videoGrid} data-animate-group>
              {videos.map((video) => (
                <figure key={video.id} className={styles.videoItem}>
                  <div className={styles.videoFrame}>
                    <iframe
                      src={video.videoUrl}
                      title={video.title}
                      allow="encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <figcaption className={styles.videoCaption}>
                    {video.title}.{' '}
                    {video.postUrl && (
                      <a href={video.postUrl} target="_blank" rel="noopener noreferrer">
                        Watch on Facebook
                      </a>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming events */}
      {upcomingEvents.length > 0 && (
        <section className={`page-section page-section--alt ${styles.eventsSection}`} aria-labelledby="events-heading">
          <div className="container">
            <SectionHeading
              id="events-heading"
              title="Recent &amp; Upcoming Events"
              subtitle="Workshops, sprints, and community gatherings hosted by the lab."
            />
            <div className={styles.eventsGrid} data-animate-group>
              {upcomingEvents.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All news */}
      <section className="page-section" aria-labelledby="news-heading">
        <div className="container">
          <SectionHeading
            id="news-heading"
            title="Lab News &amp; Stories"
            subtitle="Updates, success stories, and highlights from our research activities."
          />
          {sortedNews.length === 0 ? (
            <p className={styles.emptyState}>
              News is on the way. In the meantime, follow the lab on{' '}
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>{' '}
              and{' '}
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>{' '}
              for the latest updates, or reach out through our{' '}
              <Link href="/contact">contact form</Link>.
            </p>
          ) : (
            <div className={styles.newsGrid} data-animate-group>
              {gridNews.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
