import Image from 'next/image';
import type { LabMember } from '@/data/members';
import styles from './MemberCard.module.css';

interface MemberCardProps {
  member: LabMember;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <article className={styles.card} aria-label={`Profile: ${member.name}`}>
      <div className={styles.imageWrapper}>
        {member.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={`Photo of ${member.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className={styles.photo}
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            {getInitials(member.name)}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{member.name}</h3>
        <p className={styles.title}>{member.title}</p>
        {member.bio && <p className={styles.bio}>{member.bio}</p>}
        {(member.orcid || member.linkedin || member.website) && (
          <div className={styles.links}>
            {member.orcid && (
              <a
                href={`https://orcid.org/${member.orcid}`}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s ORCID profile (opens in new tab)`}
              >
                ORCID
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s LinkedIn profile (opens in new tab)`}
              >
                LinkedIn
              </a>
            )}
            {member.website && (
              <a
                href={member.website}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s website (opens in new tab)`}
              >
                Website
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
