import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer', () => {
  it('renders the lab name', () => {
    render(<Footer />);
    expect(screen.getAllByText('The THRIVE Lab').length).toBeGreaterThan(0);
  });

  it('renders the THRIVE meaning', () => {
    render(<Footer />);
    expect(
      screen.getAllByText(/Transforming Health Research through Innovation, Value, and Equity/)
        .length,
    ).toBeGreaterThan(0);
  });

  it('renders the Explore navigation links from the brief', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Projects & Initiatives' })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(screen.getByRole('link', { name: 'Funding' })).toHaveAttribute('href', '/funding');
    expect(screen.getByRole('link', { name: 'Team' })).toHaveAttribute('href', '/team');
    expect(screen.getByRole('link', { name: 'Publications' })).toHaveAttribute(
      'href',
      '/publications',
    );
    expect(screen.getByRole('link', { name: 'News & Events' })).toHaveAttribute(
      'href',
      '/news',
    );
    const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
    expect(contactLinks.length).toBeGreaterThan(0);
    for (const link of contactLinks) {
      expect(link).toHaveAttribute('href', '/contact');
    }
  });

  it('renders the Connect links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Collaborate' })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(screen.getByRole('link', { name: 'Join the Lab' })).toHaveAttribute(
      'href',
      '/team',
    );
  });

  it('renders the official lab-wide email address', () => {
    render(<Footer />);
    expect(
      screen.getByRole('link', { name: 'thrive.lab.research@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:thrive.lab.research@gmail.com');
  });

  it('renders the VCU address', () => {
    render(<Footer />);
    expect(screen.getByText('Virginia Commonwealth University')).toBeInTheDocument();
    expect(screen.getByText('School of Public Health')).toBeInTheDocument();
    expect(screen.getByText('Department of Social and Behavioral Sciences')).toBeInTheDocument();
    expect(screen.getByText('Richmond, Virginia')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /The THRIVE Lab on LinkedIn/ })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/the-thrive-lab-at-ub/',
    );
    expect(screen.getByRole('link', { name: /The THRIVE Lab on Facebook/ })).toHaveAttribute(
      'href',
      'https://www.facebook.com/p/The-Thrive-Lab-at-UB-61576633776186/',
    );
  });

  it('renders the current year in the copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
  });

  it('has proper landmark role', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('has a footer navigation region', () => {
    render(<Footer />);
    expect(screen.getByRole('navigation', { name: 'Footer navigation' })).toBeInTheDocument();
  });
});
