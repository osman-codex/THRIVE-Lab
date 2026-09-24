import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactPage from '@/app/contact/page';

describe('Contact Page', () => {
  it('renders the page title', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Contact Us' })).toBeInTheDocument();
  });

  it('renders the hero subtitle', () => {
    render(<ContactPage />);
    expect(
      screen.getByText(/We welcome inquiries/),
    ).toBeInTheDocument();
  });

  it('renders the contact form heading', () => {
    render(<ContactPage />);
    expect(screen.getByText('Send Us a Message')).toBeInTheDocument();
  });

  it('renders the contact form', () => {
    render(<ContactPage />);
    expect(screen.getByRole('form', { name: 'Contact form' })).toBeInTheDocument();
  });

  it('renders the VCU lab address', () => {
    render(<ContactPage />);
    expect(screen.getByText('THRIVE Lab')).toBeInTheDocument();
    expect(screen.getByText('School of Public Health')).toBeInTheDocument();
    expect(screen.getByText('Department of Social and Behavioural Sciences')).toBeInTheDocument();
    expect(screen.getByText('Virginia Commonwealth University (VCU)')).toBeInTheDocument();
  });

  it('renders the lab-wide email address', () => {
    render(<ContactPage />);
    expect(screen.getByRole('link', { name: 'thrivelab@vcu.edu' })).toBeInTheDocument();
  });

  it('explains that inquiries route to a shared lab inbox', () => {
    render(<ContactPage />);
    expect(screen.getByText(/one lab inbox for all inquiries/)).toBeInTheDocument();
  });

  it('does not display individual member contact details', () => {
    render(<ContactPage />);
    expect(screen.queryByText('gloriaai@buffalo.edu')).not.toBeInTheDocument();
    expect(screen.queryByText('(716) 829-5721')).not.toBeInTheDocument();
    expect(screen.queryByText(/193 Farber Hall/)).not.toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<ContactPage />);
    expect(
      screen.getByRole('link', { name: /The THRIVE Lab on LinkedIn/ }),
    ).toBeInTheDocument();
  });

  it('renders researcher info section', () => {
    render(<ContactPage />);
    expect(screen.getByText('For Researchers & Students')).toBeInTheDocument();
  });

  it('renders community partner info section', () => {
    render(<ContactPage />);
    expect(screen.getByText('For Community Partners')).toBeInTheDocument();
  });

  it('renders the Get in Touch section heading', () => {
    render(<ContactPage />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });
});
