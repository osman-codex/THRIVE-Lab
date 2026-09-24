import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TeamPage from '@/app/team/page';

describe('Team Page', () => {
  it('renders the page title', () => {
    render(<TeamPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Meet the team' })).toBeInTheDocument();
  });

  it('renders the hero subtitle', () => {
    render(<TeamPage />);
    expect(screen.getByText(/people behind The THRIVE Lab/)).toBeInTheDocument();
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
    expect(screen.getByRole('heading', { name: 'Affiliates & Collaborators' })).toBeInTheDocument();
  });

  it('renders the PI', () => {
    render(<TeamPage />);
    expect(screen.getByText('Dr. Gloria Aidoo-Frimpong')).toBeInTheDocument();
  });

  it('renders lab members awaiting documents', () => {
    render(<TeamPage />);
    expect(screen.getByText('Winfred Kofi Mensa')).toBeInTheDocument();
    expect(screen.getByText('Yaa Adutwumwaa Obeng')).toBeInTheDocument();
    expect(screen.getByText('Abass Tando Abubakar')).toBeInTheDocument();
    expect(screen.getByText('Senam Aku Biddah')).toBeInTheDocument();
  });

  it('renders affiliates and collaborators', () => {
    render(<TeamPage />);
    expect(screen.getByText('Enock Azasu')).toBeInTheDocument();
    expect(screen.getByText(/Assistant Professor, School of Social Work/)).toBeInTheDocument();
    expect(screen.getByText('Daniel Selase Anyidoho')).toBeInTheDocument();
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
});
