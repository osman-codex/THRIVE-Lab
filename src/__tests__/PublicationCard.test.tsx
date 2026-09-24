import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PublicationCard from '@/components/PublicationCard';
import type { Publication } from '@/data/publications';

const mockPub: Publication = {
  id: 'pub-test',
  title: 'A Test Publication Title',
  authors: ['Author One', 'Author Two'],
  journal: 'Journal of Testing',
  year: 2024,
  volume: '10',
  issue: '2',
  pages: '100-110',
  doi: '10.1000/test.12345',
  abstract: 'This is the abstract of the test publication.',
  tags: ['test', 'research'],
  type: 'journal-article',
};

describe('PublicationCard', () => {
  it('renders the publication title', () => {
    render(<PublicationCard publication={mockPub} />);
    expect(screen.getByText('A Test Publication Title')).toBeInTheDocument();
  });

  it('renders citation information', () => {
    render(<PublicationCard publication={mockPub} />);
    expect(
      screen.getByText(/Author One, Author Two/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Journal of Testing/)).toBeInTheDocument();
  });

  it('renders the DOI link', () => {
    render(<PublicationCard publication={mockPub} />);
    const doiLink = screen.getByText('DOI: 10.1000/test.12345');
    expect(doiLink.closest('a')).toHaveAttribute('href', 'https://doi.org/10.1000/test.12345');
    expect(doiLink.closest('a')).toHaveAttribute('target', '_blank');
  });

  it('shows abstract when button is clicked', async () => {
    const user = userEvent.setup();
    render(<PublicationCard publication={mockPub} />);

    expect(screen.queryByText('This is the abstract of the test publication.')).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Show Abstract' });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);

    expect(screen.getByText('This is the abstract of the test publication.')).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('hides abstract when toggled again', async () => {
    const user = userEvent.setup();
    render(<PublicationCard publication={mockPub} />);

    await user.click(screen.getByRole('button', { name: 'Show Abstract' }));
    await user.click(screen.getByRole('button', { name: 'Hide Abstract' }));

    expect(screen.queryByText('This is the abstract of the test publication.')).not.toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<PublicationCard publication={mockPub} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('research')).toBeInTheDocument();
  });

  it('has proper aria-label', () => {
    render(<PublicationCard publication={mockPub} />);
    expect(
      screen.getByRole('article', { name: 'Publication: A Test Publication Title' }),
    ).toBeInTheDocument();
  });

  it('does not render volume/issue when not provided', () => {
    const pubWithoutVolume: Publication = {
      ...mockPub,
      volume: undefined,
      issue: undefined,
      pages: undefined,
    };
    render(<PublicationCard publication={pubWithoutVolume} />);
    expect(screen.getByText(/Author One, Author Two/)).toBeInTheDocument();
  });
});
