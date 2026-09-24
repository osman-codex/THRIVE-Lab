import type { Metadata } from 'next';
import { members, ROLE_ORDER, ROLE_LABELS } from '@/data/members';
import MemberCard from '@/components/MemberCard';
import SectionHeading from '@/components/SectionHeading';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Meet the researchers, students, and collaborators of The THRIVE Lab at the Virginia Commonwealth University School of Public Health, working to reduce HIV disparities among African immigrant and Black populations.',
};

export default function TeamPage() {
  const membersByRole = ROLE_ORDER.filter((role) =>
    members.some((m) => m.role === role),
  ).map((role) => ({
    role,
    label: ROLE_LABELS[role],
    members: members.filter((m) => m.role === role),
  }));

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroKicker}>Team</p>
          <h1 className={styles.heroTitle}>Meet the team</h1>
          <p className={styles.heroSubtitle}>
            The people behind The THRIVE Lab: researchers, students, and
            community collaborators working together to reduce HIV disparities.
          </p>
        </div>
      </section>

      <section className="page-section" aria-labelledby="team-heading">
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
    </>
  );
}
