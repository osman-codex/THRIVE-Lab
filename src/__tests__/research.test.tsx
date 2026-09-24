import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResearchPage from '@/app/research/page';

describe('Research Page', () => {
  it('renders the hero with the page title', () => {
    render(<ResearchPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Research projects, funding, and publications/ }),
    ).toBeInTheDocument();
  });

  it('renders the hero subtitle', () => {
    render(<ResearchPage />);
    expect(
      screen.getByText(/built with the communities it serves/),
    ).toBeInTheDocument();
  });

  it('renders all six focus areas', () => {
    render(<ResearchPage />);
    const areaTitles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    for (const title of [
      'HIV Prevention & PrEP Access',
      'Health Equity & Social Determinants',
      'Community-Driven Research',
      'Implementation Science',
      'Digital Health Innovation',
      'Stigma Reduction & Cultural Factors',
    ]) {
      expect(areaTitles).toContain(title);
    }
  });

  it('renders the approach section', () => {
    render(<ResearchPage />);
    expect(screen.getByText('Our approach')).toBeInTheDocument();
    expect(screen.getByText('Community-Centered')).toBeInTheDocument();
    expect(screen.getByText('Culturally Tailored')).toBeInTheDocument();
    expect(screen.getByText('Evidence-Based')).toBeInTheDocument();
    expect(screen.getByText('Interdisciplinary')).toBeInTheDocument();
  });

  it('renders the three project sections', () => {
    render(<ResearchPage />);
    expect(screen.getByText('What we are working on now')).toBeInTheDocument();
    expect(screen.getByText('Completed projects')).toBeInTheDocument();
    expect(screen.getByText('Where we are headed')).toBeInTheDocument();
  });

  it('renders current projects', () => {
    render(<ResearchPage />);
    expect(screen.getByText(/Y-FIT Ghana/)).toBeInTheDocument();
    expect(screen.getByText(/MiST-Pathways/)).toBeInTheDocument();
    expect(screen.getByText(/WISE WOMAN Study/)).toBeInTheDocument();
    expect(screen.getByText(/C4 Workshop Series/)).toBeInTheDocument();
  });

  it('renders completed projects', () => {
    render(<ResearchPage />);
    expect(
      screen.getByText(/Religiosity and Gender Norms/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sin Against God/),
    ).toBeInTheDocument();
  });

  it('renders the future projects placeholder', () => {
    render(<ResearchPage />);
    expect(
      screen.getByText(/Community Partnerships in Central Virginia/),
    ).toBeInTheDocument();
  });

  it('renders section headings', () => {
    render(<ResearchPage />);
    expect(screen.getByText('Research focus areas')).toBeInTheDocument();
    expect(screen.getByText('What we are working on now')).toBeInTheDocument();
  });

  it('has accessible sections with aria-labelledby', () => {
    render(<ResearchPage />);
    const sections = screen.getAllByRole('region');
    expect(sections.length).toBeGreaterThanOrEqual(1);
  });
});
