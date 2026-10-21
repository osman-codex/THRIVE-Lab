import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('Home Page', () => {
  it('renders the hero title', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'The THRIVE Lab @ VCU' }),
    ).toBeInTheDocument();
  });

  it('renders the THRIVE meaning in the hero', () => {
    render(<HomePage />);
    expect(
      screen.getByText('Transforming Health Research through Innovation, Value, and Equity'),
    ).toBeInTheDocument();
  });

  it('renders the hero kicker', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/Community-Engaged Research • Implementation Science • Health Equity/),
    ).toBeInTheDocument();
  });

  it('renders hero action buttons from the brief', () => {
    render(<HomePage />);
    expect(screen.getAllByRole('link', { name: 'Explore Our Work' })[0]).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(screen.getAllByRole('link', { name: 'About THRIVE' })[0]).toHaveAttribute(
      'href',
      '/about',
    );
  });

  it('renders the mission and three research priorities', () => {
    render(<HomePage />);
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Advancing Evidence From Discovery to Equitable Impact',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Our Research Priorities')).toBeInTheDocument();
    expect(screen.getByText('Center Community Knowledge')).toBeInTheDocument();
    expect(screen.getByText('Strengthen Implementation')).toBeInTheDocument();
    expect(screen.getByText('Expand Equitable Access')).toBeInTheDocument();
  });

  it('renders all six research focus areas', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: 'Research Focus Areas' }),
    ).toBeInTheDocument();
    for (const title of [
      'Community-Engaged Research & Co-Production',
      'Implementation Science',
      'Prevention, Screening & Early Intervention',
      'Health Equity, Social Context & Structural Determinants',
      'Digital Health & Innovation',
      'Trust, Stigma & Healthcare Engagement',
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
    expect(
      screen.getByRole('link', { name: 'Explore Our Research →' }),
    ).toHaveAttribute('href', '/projects#focus-areas');
  });

  it('renders exactly three featured projects', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: 'WISE WOMAN' })).toBeInTheDocument();
    expect(
      screen.getByText('Women, Innovation, Sexual Health & Empowerment'),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'WI-CARE' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Institutionalizing African Epistemologies in Health Research' }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: 'View Project →' }).length,
    ).toBe(3);
    expect(
      screen.getByRole('link', { name: 'View All Projects & Initiatives →' }),
    ).toHaveAttribute('href', '/projects');
  });

  it('renders verified research enterprise metrics', () => {
    render(<HomePage />);
    expect(screen.getByText('$2.5M+')).toBeInTheDocument();
    expect(screen.getByText('40+')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('U.S. + Ghana')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Funded Scholarship & Research Reach' }),
    ).toBeInTheDocument();
  });

  it('displays approved funder logos', () => {
    render(<HomePage />);
    expect(screen.getByAltText('National Institutes of Health logo')).toBeInTheDocument();
    expect(
      screen.getByAltText('Patient-Centered Outcomes Research Institute logo'),
    ).toBeInTheDocument();
    expect(screen.getByAltText('Robert Wood Johnson Foundation logo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore Funding & Awards →' })).toHaveAttribute(
      'href',
      '/funding',
    );
  });

  it('renders a news section with three cards and a link to all news', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: 'News & Events' })).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBeGreaterThanOrEqual(3);
    expect(
      screen.getByRole('link', { name: 'View All News & Events →' }),
    ).toHaveAttribute('href', '/news');
  });

  it('uses the authentic lab photo in the hero', () => {
    render(<HomePage />);
    expect(
      screen.getByAltText(/Y-FIT Ghana design workshop/),
    ).toBeInTheDocument();
  });

  it('renders proper ARIA landmarks', () => {
    render(<HomePage />);
    expect(screen.getByRole('region', { name: 'Introduction' })).toBeInTheDocument();
  });
});
