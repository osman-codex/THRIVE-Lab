import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <section className={styles.container}>
      <div className="container">
        <div className={styles.content}>
          <span className={styles.code} aria-hidden="true">404</span>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.text}>
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <Link href="/" className="btn btn--primary">
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
