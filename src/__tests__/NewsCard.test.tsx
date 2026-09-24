import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsCard from '@/components/NewsCard';
import type { NewsItem } from '@/data/news';

const baseItem: NewsItem = {
  id: 'test-item',
  title: 'A Test News Item',
  date: 'January 2026',
  dateISO: '2026-01-15',
  summary: 'A short summary of the item.',
  body: 'The full story behind the item.',
  category: 'news',
};

describe('NewsCard', () => {
  it('renders the title, date, and summary', () => {
    render(<NewsCard item={baseItem} />);
    expect(screen.getByText('A Test News Item')).toBeInTheDocument();
    expect(screen.getByText('January 2026')).toBeInTheDocument();
    expect(screen.getByText('A short summary of the item.')).toBeInTheDocument();
  });

  it('renders the category badge', () => {
    render(<NewsCard item={baseItem} />);
    expect(screen.getByText('Lab News')).toBeInTheDocument();
  });

  it('renders the event badge for events', () => {
    render(<NewsCard item={{ ...baseItem, category: 'event' }} />);
    expect(screen.getByText('Event')).toBeInTheDocument();
  });

  it('renders the photo when an image is provided', () => {
    render(<NewsCard item={{ ...baseItem, imageUrl: '/images/news/test.jpg' }} />);
    expect(screen.getByAltText('A Test News Item')).toBeInTheDocument();
  });

  it('renders no photo when no image or video is provided', () => {
    render(<NewsCard item={baseItem} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('hides the full story until Read more is clicked', async () => {
    const user = userEvent.setup();
    render(<NewsCard item={baseItem} />);

    const details = screen.getByText('The full story behind the item.').closest('details');
    expect(details).not.toHaveAttribute('open');

    await user.click(screen.getByText('Read more'));

    expect(details).toHaveAttribute('open');
  });

  it('renders the optional link', () => {
    render(<NewsCard item={{ ...baseItem, link: '/publications' }} />);
    expect(screen.getByRole('link', { name: 'View on site' })).toHaveAttribute('href', '/publications');
  });

  it('renders no link when none is provided', () => {
    render(<NewsCard item={baseItem} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
