import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MemberCard from '@/components/MemberCard';
import type { LabMember } from '@/data/members';

const baseMember: LabMember = {
  id: 'test-member',
  name: 'Dr. Test Member',
  title: 'Research Scientist',
  role: 'research-assistant',
  roleLabel: 'Research Assistant',
  bio: 'A test member bio.',
  imageUrl: '/images/test.jpg',
};

describe('MemberCard', () => {
  it('renders the member name', () => {
    render(<MemberCard member={baseMember} />);
    expect(screen.getByText('Dr. Test Member')).toBeInTheDocument();
  });

  it('renders the member title', () => {
    render(<MemberCard member={baseMember} />);
    expect(screen.getByText('Research Scientist')).toBeInTheDocument();
  });

  it('renders the member bio', () => {
    render(<MemberCard member={baseMember} />);
    expect(screen.getByText('A test member bio.')).toBeInTheDocument();
  });

  it('renders the member photo when imageUrl is provided', () => {
    render(<MemberCard member={baseMember} />);
    expect(screen.getByAltText('Photo of Dr. Test Member')).toBeInTheDocument();
  });

  it('renders initials in the avatar placeholder when no photo', () => {
    const memberWithoutPhoto = { ...baseMember, name: 'Dr. Test Member', imageUrl: undefined };
    render(<MemberCard member={memberWithoutPhoto} />);
    expect(screen.getByText('DT')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('never renders an email link even when email is present', () => {
    const memberWithEmail = { ...baseMember, email: 'test@example.com' };
    render(<MemberCard member={memberWithEmail} />);
    expect(screen.queryByRole('link', { name: /Email/ })).not.toBeInTheDocument();
    expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
  });

  it('renders ORCID link when orcid is provided', () => {
    const memberWithOrcid = { ...baseMember, orcid: '0000-0002-1234-5678' };
    render(<MemberCard member={memberWithOrcid} />);
    const orcidLink = screen.getByRole('link', { name: /ORCID/ });
    expect(orcidLink).toHaveAttribute('href', 'https://orcid.org/0000-0002-1234-5678');
    expect(orcidLink).toHaveAttribute('target', '_blank');
    expect(orcidLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders LinkedIn link when linkedin is provided', () => {
    const memberWithLinkedIn = {
      ...baseMember,
      linkedin: 'https://www.linkedin.com/in/test-member',
    };
    render(<MemberCard member={memberWithLinkedIn} />);
    const linkedInLink = screen.getByRole('link', { name: /LinkedIn/ });
    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/test-member');
    expect(linkedInLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders no links section when no profiles are provided', () => {
    render(<MemberCard member={baseMember} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('has proper aria-label', () => {
    render(<MemberCard member={baseMember} />);
    expect(
      screen.getByRole('article', { name: 'Profile: Dr. Test Member' }),
    ).toBeInTheDocument();
  });

  it('renders different initials for single-name members', () => {
    const singleName = { ...baseMember, name: 'Cher', imageUrl: undefined };
    render(<MemberCard member={singleName} />);
    expect(screen.getByText('C')).toBeInTheDocument();
  });
});
