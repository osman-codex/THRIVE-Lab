import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { members, pastMembers, ROLE_ORDER, ROLE_LABELS } from '@/data/members';
import MemberCard from '@/components/MemberCard';
import SectionHeading from '@/components/SectionHeading';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Meet the faculty, trainees, research staff, collaborators, and community partners of The THRIVE Lab at the Virginia Commonwealth University School of Public Health.',
};

export default function TeamPage() {
  const director = members.find((m) => m.role === 'principal-investigator');

  const membersByRole = ROLE_ORDER.filter((role) =>
    members.some((m) => m.role === role),
  ).map((role) => ({
    role,
    label: ROLE_LABELS[role],
    members: members.filter((m) => m.role === role),
  }));

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroKicker}>Our People</p>
          <h1 className={styles.heroTitle}>The THRIVE Team</h1>
          <p className={styles.heroSubtitle}>
            THRIVE brings together faculty, trainees, research staff,
            collaborators, and community partners whose collective expertise
            spans implementation science, health equity, community-engaged
            research, digital health, prevention science, and intervention
            development.
          </p>
          <p className={styles.heroSubtitle}>
            Scientific collaboration and mentorship are central to the
            laboratory’s work.
          </p>
        </div>
      </section>

      {/* Lab Director */}
      {director && (
        <section className="page-section" aria-labelledby="director-heading">
          <div className="container">
            <SectionHeading
              id="director-heading"
              title="Lab Director"
              label="Leadership"
            />
            <div className={styles.directorCard} data-animate="fade">
              <div className={styles.directorPhotoWrap}>
                {director.imageUrl && (
                  <Image
                    src={director.imageUrl}
                    alt={`Photo of ${director.name}`}
                    width={280}
                    height={280}
                    className={styles.directorPhoto}
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                )}
              </div>
              <div className={styles.directorInfo}>
                <h3 className={styles.directorName}>
                  Gloria Aidoo-Frimpong, PhD, MPH, MA
                </h3>
                <p className={styles.directorRole}>
                  Founder &amp; Director, The THRIVE Lab @ VCU
                </p>
                <p className={styles.directorAffiliation}>
                  Assistant Professor, Department of Social and Behavioral
                  Sciences
                </p>
                <p className={styles.directorAffiliation}>
                  Virginia Commonwealth University School of Public Health
                </p>
                <p className={styles.directorBio}>{director.bio}</p>
                <div className={styles.directorLinks}>
                  {director.orcid && (
                    <a
                      href={`https://orcid.org/${director.orcid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost btn--small"
                    >
                      ORCID
                    </a>
                  )}
                  {director.linkedin && (
                    <a
                      href={director.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost btn--small"
                    >
                      LinkedIn
                    </a>
                  )}
                  <Link href="/about" className="btn btn--ghost btn--small">
                    Learn More About Dr. Aidoo-Frimpong →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Full roster by category */}
      <section
        className="page-section page-section--alt"
        aria-labelledby="team-heading"
      >
        <div className="container">
          <SectionHeading
            id="team-heading"
            title="Meet the Lab"
            subtitle="Connect with team members through their ORCID and LinkedIn profiles. For all other inquiries, please use our contact form."
          />
          {membersByRole.map(({ role, label, members: roleMembers }) => (
            <div key={role} className={styles.teamGroup}>
              <h2 className={styles.roleLabel}>{label}</h2>
              <div className={styles.teamGrid} data-animate-group>
                {roleMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past members */}
      <section className="page-section" aria-labelledby="past-members-heading">
        <div className="container">
          <SectionHeading
            id="past-members-heading"
            title="Past Members"
            subtitle="We are grateful to these colleagues for their contributions to The THRIVE Lab during its founding years at the University at Buffalo."
            label="Lab Alumni"
          />
          <ul className={styles.pastMembersList} role="list">
            {pastMembers.map((member) => (
              <li key={member.id} className={styles.pastMemberCard}>
                <h3 className={styles.pastMemberName}>{member.name}</h3>
                <p className={styles.pastMemberRole}>{member.role}</p>
                <p className={styles.pastMemberInstitution}>
                  {member.institution}
                </p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost btn--small"
                    aria-label={`${member.name}'s LinkedIn profile (opens in new tab)`}
                  >
                    LinkedIn
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Training & mentorship */}
      <section className="page-section" aria-labelledby="training-heading">
        <div className="container">
          <SectionHeading
            id="training-heading"
            title="Developing the Next Generation of Scholars"
            subtitle="Training is embedded within THRIVE’s research enterprise. Students and emerging scholars participate in substantive scientific work while developing expertise in research design, implementation science, community-engaged methods, intervention development, analysis, dissemination, and scientific writing."
            label="Training & Mentorship"
          />
          <div className={styles.trainingNote} data-animate="fade">
            <p>
              THRIVE’s mentorship model emphasizes conceptual independence,
              methodological competence, scholarly productivity, collaborative
              leadership, and socially responsive public health research.
            </p>
          </div>
          <div className={styles.sectionCta} data-animate="fade">
            <Link href="/contact" className="btn btn--gold">
              Interested in Joining THRIVE? →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
