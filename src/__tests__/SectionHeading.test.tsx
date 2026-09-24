import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeading from '@/components/SectionHeading';

describe('SectionHeading', () => {
  it('renders the title', () => {
    render(<SectionHeading title="Test Title" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Test Title' })).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(<SectionHeading title="Test" subtitle="A subtitle" />);
    expect(screen.getByText('A subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<SectionHeading title="Test" />);
    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
  });

  it('applies the section-heading class', () => {
    const { container } = render(<SectionHeading title="Test" />);
    expect(container.querySelector('.section-heading')).toBeInTheDocument();
  });

  it('applies id to the wrapper when provided', () => {
    const { container } = render(<SectionHeading title="Test" id="my-section" />);
    expect(container.querySelector('#my-section')).toBeInTheDocument();
  });

  it('has the accent bar (decorative)', () => {
    const { container } = render(<SectionHeading title="Test" />);
    const accent = container.querySelector('.section-heading__accent');
    expect(accent).toBeInTheDocument();
    expect(accent).toHaveAttribute('aria-hidden', 'true');
  });
});
