import Link from 'next/link';
import Image from 'next/image';
import type { NewsItem } from '@/data/news';
import { NEWS_CATEGORY_LABELS } from '@/data/news';
import styles from './NewsCard.module.css';

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <article className={styles.card} aria-label={item.title}>
      <div className={styles.mediaWrapper}>
        {item.videoUrl ? (
          <div className={styles.videoWrapper}>
            <iframe
              src={item.videoUrl}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={800}
            height={500}
            sizes="(max-width: 768px) 100vw, 400px"
            className={styles.image}
          />
        ) : null}
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={`${styles.badge} ${styles[`badge_${item.category}`]}`}>
            {NEWS_CATEGORY_LABELS[item.category]}
          </span>
          <span className={styles.date}>{item.date}</span>
        </div>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.summary}>{item.summary}</p>
        <details className={styles.details}>
          <summary>Read more</summary>
          <p className={styles.body}>{item.body}</p>
        </details>
        {item.link && (
          <Link href={item.link} className={styles.link}>
            {item.link.startsWith('http') ? 'Learn more' : 'View on site'}
          </Link>
        )}
      </div>
    </article>
  );
}
