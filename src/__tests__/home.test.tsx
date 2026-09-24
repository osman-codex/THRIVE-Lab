import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('Home Page', () => {
  it('renders the hero title', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Welcome to the/ }),
    ).toBeInTheDocument();
    expect(screen.getByText('THRIVE Lab')).toBeInTheDocument();
  });

  it('renders the lab logo prominently in the hero', () => {
    render(<HomePage />);
    expect(screen.getByAltText('The The THRIVE Lab logo')).toBeInTheDocument();
  });

  it('renders social media handles in the hero', () => {
    render(<HomePage />);
    expect(screen.getByText('Follow the lab:')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /The THRIVE Lab on LinkedIn/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /The THRIVE Lab on Facebook/ }),
    ).toBeInTheDocument();
  });

  it('renders the About section with lab description', () => {
    render(<HomePage />);
    expect(screen.getAllByText(/community-driven HIV research lab at VCU/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Department of Social and Behavioural Sciences/).length).toBeGreaterThan(0);
  });

  it('renders the updated lab statistics', () => {
    render(<HomePage />);
    expect(screen.getByText('40+')).toBeInTheDocument();
    expect(screen.getByText('764')).toBeInTheDocument();
  });

  it('renders the mission, vision, and values', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: 'Mission' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Vision' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Values' })).toBeInTheDocument();
    expect(
      screen.getByText(/community-driven, evidence-based, and/),
    ).toBeInTheDocument();
  });

  it('renders hero action buttons', () => {
    render(<HomePage />);
    expect(screen.getAllByRole('link', { name: 'Explore Our Work' })[0]).toHaveAttribute('href', '/research');
    expect(screen.getAllByRole('link', { name: 'Get in Touch' })[0]).toHaveAttribute('href', '/contact');
  });

  it('renders the mission section heading', () => {
    render(<HomePage />);
    expect(screen.getByText('What drives the work')).toBeInTheDocument();
  });

  it('renders the vision copy', () => {
    render(<HomePage />);
    expect(screen.getByText(/communities leading the HIV response/)).toBeInTheDocument();
  });

  it('renders the research focus areas with numbers', () => {
    render(<HomePage />);
    expect(screen.getByText('Research focus areas')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('HIV Prevention & PrEP Access')).toBeInTheDocument();
    expect(screen.getByText('Stigma Reduction & Cultural Factors')).toBeInTheDocument();
  });

  it('renders the team preview with a link to the full team', () => {
    render(<HomePage />);
    expect(screen.getByText('Meet the team')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'View the full team' }),
    ).toHaveAttribute('href', '/team');
  });

  it('renders the CTA section', () => {
    render(<HomePage />);
    expect(screen.getByText('Interested in collaborating?')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Contact Us' }),
    ).toHaveAttribute('href', '/contact');
  });

  it('renders proper ARIA landmarks', () => {
    render(<HomePage />);
    expect(screen.getByRole('region', { name: 'Introduction' })).toBeInTheDocument();
  });

  it('renders exactly four featured members', () => {
    render(<HomePage />);
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBe(4);
  });
});
