import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SocialLinks from '@/components/SocialLinks';

describe('SocialLinks', () => {
  it('renders LinkedIn and Facebook links with correct hrefs', () => {
    render(<SocialLinks />);
    expect(screen.getByRole('link', { name: /The THRIVE Lab on LinkedIn/ })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/the-thrive-lab-at-ub/',
    );
    expect(screen.getByRole('link', { name: /The THRIVE Lab on Facebook/ })).toHaveAttribute(
      'href',
      'https://www.facebook.com/p/The-Thrive-Lab-at-UB-61576633776186/',
    );
  });

  it('opens links in a new tab safely', () => {
    render(<SocialLinks />);
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('has an accessible group label', () => {
    render(<SocialLinks />);
    expect(
      screen.getByRole('list', { name: 'The THRIVE Lab on social media' }),
    ).toBeInTheDocument();
  });
});
