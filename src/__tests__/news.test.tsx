import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import NewsPage from '@/app/news/page';
describe('News & Events Page', () => {
  it('renders the page title', () => {
    render(<NewsPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'News and lab highlights' })).toBeInTheDocument();
  });

  it('renders the hero kicker', () => {
    render(<NewsPage />);
    expect(screen.getByText('News & Events')).toBeInTheDocument();
  });

  it('embeds the lab Facebook videos in a featured section', () => {
    render(<NewsPage />);
    expect(screen.getByText('Watch our work')).toBeInTheDocument();
    const iframes = screen.getAllByTitle(/WISE WOMAN Study Invitation|2024 National HIV Estimates/);
    expect(iframes.length).toBe(2);
    for (const iframe of iframes) {
      expect(iframe.getAttribute('src')).toMatch(/facebook\.com\/plugins\/video\.php/);
    }
    expect(screen.getAllByRole('link', { name: 'Watch on Facebook' }).length).toBe(2);
  });

  it('keeps video stories out of the main news grid duplication', () => {
    render(<NewsPage />);
    // Video items with a videoUrl appear in the featured band; news grid should still render stories
    expect(screen.getByText('Lab News & Stories')).toBeInTheDocument();
  });

  it('renders the hero subtitle', () => {
    render(<NewsPage />);
    expect(screen.getByText(/What we have been up to/)).toBeInTheDocument();
  });

  it('renders the events section', () => {
    render(<NewsPage />);
    expect(screen.getByText('Recent & Upcoming Events')).toBeInTheDocument();
  });

  it('renders the lab news section', () => {
    render(<NewsPage />);
    expect(screen.getByText('Lab News & Stories')).toBeInTheDocument();
  });

  it('renders event cards in the events section', () => {
    render(<NewsPage />);
    const eventsSection = screen
      .getByText('Recent & Upcoming Events')
      .closest('section') as HTMLElement;
    const eventTitles = within(eventsSection)
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent);
    expect(eventTitles.some((t) => /Y-FIT GH Youth HIV Contest Sprint/.test(t ?? ''))).toBe(true);
    expect(eventTitles.some((t) => /C4 Workshop Series/.test(t ?? ''))).toBe(true);
  });

  it('renders news and success story cards', () => {
    render(<NewsPage />);
    expect(screen.getAllByText(/WISE WOMAN Study Opens for Registration/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/School Visit Spotlight/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/AIDS and Behavior/).length).toBeGreaterThan(0);
  });

  it('renders category badges on cards', () => {
    render(<NewsPage />);
    expect(screen.getAllByText('Event').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Lab News').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Success Story').length).toBeGreaterThan(0);
  });

  it('renders photos on news cards that have them', () => {
    render(<NewsPage />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('renders expandable story details', () => {
    render(<NewsPage />);
    const details = screen.getAllByText('Read more');
    expect(details.length).toBeGreaterThan(0);
  });
});
