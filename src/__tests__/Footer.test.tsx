import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer', () => {
  it('renders the lab name', () => {
    render(<Footer />);
    expect(screen.getByText('The THRIVE Lab')).toBeInTheDocument();
  });

  it('renders the lab description', () => {
    render(<Footer />);
    expect(
      screen.getAllByText(/Transforming the HIV Response Through Innovation and Equity/).length,
    ).toBeGreaterThan(0);
  });

  it('renders quick navigation links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Team' })).toHaveAttribute('href', '/team');
    expect(screen.getByRole('link', { name: 'What We Do' })).toHaveAttribute('href', '/research');
    expect(screen.getByRole('link', { name: 'Publications' })).toHaveAttribute('href', '/publications');
    expect(screen.getByRole('link', { name: 'News & Events' })).toHaveAttribute('href', '/news');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('renders the lab-wide email address', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'thrivelab@vcu.edu' })).toHaveAttribute(
      'href',
      'mailto:thrivelab@vcu.edu',
    );
  });

  it('renders the VCU address', () => {
    render(<Footer />);
    expect(screen.getByText('Virginia Commonwealth University (VCU)')).toBeInTheDocument();
    expect(screen.getByText('Department of Social and Behavioural Sciences')).toBeInTheDocument();
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
