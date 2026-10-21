import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TeamPage from '@/app/team/page';

describe('Team Page', () => {
  it('renders the page title from the brief', () => {
    render(<TeamPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'The THRIVE Team' }),
    ).toBeInTheDocument();
  });

  it('renders the hero kicker and subtitle', () => {
    render(<TeamPage />);
    expect(screen.getByText('Our People')).toBeInTheDocument();
    expect(screen.getByText(/collective expertise spans/)).toBeInTheDocument();
    expect(
      screen.getByText(/Scientific collaboration and mentorship are central/),
    ).toBeInTheDocument();
  });

  it('renders the lab director section', () => {
    render(<TeamPage />);
    expect(screen.getByRole('heading', { name: 'Lab Director' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Gloria Aidoo-Frimpong, PhD, MPH, MA' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Founder & Director, The THRIVE Lab @ VCU'),
    ).toBeInTheDocument();
    expect(
      screen.getAllByAltText('Photo of Dr. Gloria Aidoo-Frimpong').length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole('link', { name: 'Learn More About Dr. Aidoo-Frimpong →' }),
    ).toHaveAttribute('href', '/about');
  });

  it('renders the section heading', () => {
    render(<TeamPage />);
    expect(screen.getByText('Meet the Lab')).toBeInTheDocument();
  });

  it('renders role group headings', () => {
    render(<TeamPage />);
    expect(screen.getByRole('heading', { name: 'Principal Investigator' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Graduate Students' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Lab Members' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Affiliates & Collaborators' }),
    ).toBeInTheDocument();
  });

  it('renders the PI', () => {
    render(<TeamPage />);
    expect(screen.getAllByText('Dr. Gloria Aidoo-Frimpong').length).toBeGreaterThan(0);
  });

  it('renders lab members awaiting documents', () => {
    render(<TeamPage />);
    expect(screen.getByText('Winfred Kofi Mensa')).toBeInTheDocument();
    expect(screen.getByText('Yaa Adutwumwaa Obeng')).toBeInTheDocument();
    expect(screen.getByText('Abass Tando Abubakar')).toBeInTheDocument();
    expect(screen.getByText('Senam Aku Biddah')).toBeInTheDocument();
  });

  it('keeps removed members off the roster', () => {
    render(<TeamPage />);
    expect(screen.queryByText('Nihith Nath')).not.toBeInTheDocument();
    expect(screen.queryByText('Dr. David')).not.toBeInTheDocument();
    expect(screen.queryByText('Enock Azasu')).not.toBeInTheDocument();
  });

  it('lists Daniel Selase Anyidoho as a lab member (RA)', () => {
    render(<TeamPage />);
    expect(screen.getByText('Daniel Selase Anyidoho')).toBeInTheDocument();
    expect(screen.getAllByText('Research Assistant').length).toBeGreaterThan(0);
  });

  it('renders collaborators without the WAAF affiliation', () => {
    render(<TeamPage />);
    expect(screen.getByText('Ebenezer Asare')).toBeInTheDocument();
    expect(
      screen.queryByText(/Research Collaborator, West Africa AIDS Foundation/),
    ).not.toBeInTheDocument();
  });

  it('renders the graduate students', () => {
    render(<TeamPage />);
    expect(
      screen.getByText('Osman Abdul-Fatawu Iddrisu'),
    ).toBeInTheDocument();
  });

  it('renders ORCID and LinkedIn profile links for members who have them', () => {
    render(<TeamPage />);
    const orcidLinks = screen.getAllByRole('link', { name: /ORCID profile/ });
    expect(orcidLinks.length).toBeGreaterThan(0);
    const linkedInLinks = screen.getAllByRole('link', { name: /LinkedIn profile/ });
    expect(linkedInLinks.length).toBeGreaterThan(0);
    for (const link of [...orcidLinks, ...linkedInLinks]) {
      expect(link).toHaveAttribute('target', '_blank');
    }
  });

  it('never shows personal email addresses or mailto links', () => {
    render(<TeamPage />);
    expect(screen.queryByRole('link', { name: /Email/ })).not.toBeInTheDocument();
    const links = screen.getAllByRole('link');
    for (const link of links) {
      expect(link.getAttribute('href')).not.toMatch(/^mailto:/);
    }
  });

  it('directs contact inquiries to the contact form', () => {
    render(<TeamPage />);
    expect(screen.getByText(/use our contact form/)).toBeInTheDocument();
  });

  it('renders the training and mentorship section', () => {
    render(<TeamPage />);
    expect(
      screen.getByRole('heading', {
        name: 'Developing the Next Generation of Scholars',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Interested in Joining THRIVE? →' }),
    ).toHaveAttribute('href', '/contact');
  });
});
