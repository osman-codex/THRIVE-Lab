import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ProjectsPage from '@/app/projects/page';

describe('Projects & Initiatives Page', () => {
  it('renders the hero with the page title', () => {
    render(<ProjectsPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Projects & Initiatives' }),
    ).toBeInTheDocument();
  });

  it('renders the hero subtitle from the brief', () => {
    render(<ProjectsPage />);
    expect(
      screen.getByText(/addressing prevention, implementation, health equity/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/investigator-led studies, collaborative research/),
    ).toBeInTheDocument();
  });

  it('renders the quick-jump buttons', () => {
    render(<ProjectsPage />);
    expect(screen.getAllByRole('link', { name: 'Current Projects' })[0]).toHaveAttribute(
      'href',
      '#current-projects',
    );
    expect(
      screen.getAllByRole('link', { name: 'Community Initiatives' })[0],
    ).toHaveAttribute('href', '#community-initiatives');
    expect(
      screen.getAllByRole('link', { name: 'Completed Projects' })[0],
    ).toHaveAttribute('href', '#completed-projects');
  });

  it('renders the five sections from the brief', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { name: 'Current Projects' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Community Initiatives' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Completed Projects' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Research Focus Areas' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Our Approach' })).toBeInTheDocument();
  });

  it('renders current and upcoming projects', () => {
    render(<ProjectsPage />);
    expect(screen.getAllByText(/Y-FIT Ghana/).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'WISE WOMAN' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'WI-CARE' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Institutionalizing African Epistemologies in Health Research',
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/MiST-Pathways/).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Community Partnerships in Central Virginia/).length,
    ).toBeGreaterThan(0);
  });

  it('renders community initiatives with population and setting', () => {
    render(<ProjectsPage />);
    const section = screen
      .getByRole('heading', { name: 'Community Initiatives' })
      .closest('section') as HTMLElement;
    const titles = within(section)
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toContain('C4 Workshop Series');
    expect(titles).toContain('Y-FIT GH Youth HIV Contest Sprint and Workshop');
    expect(titles).toContain('School Outreach Visits');
    expect(within(section).getAllByText('Ghana').length).toBeGreaterThan(0);
  });

  it('renders completed projects', () => {
    render(<ProjectsPage />);
    expect(screen.getAllByText(/Religiosity and Gender Norms/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Sin Against God/).length).toBeGreaterThan(0);
  });

  it('renders the full intellectual focus area descriptions', () => {
    render(<ProjectsPage />);
    for (const title of [
      'Community-Engaged Research & Co-Production',
      'Implementation Science',
      'Prevention, Screening & Early Intervention',
      'Health Equity, Social Context & Structural Determinants',
      'Digital Health & Innovation',
      'Trust, Stigma & Healthcare Engagement',
    ]) {
      expect(screen.getAllByRole('heading', { name: title }).length).toBeGreaterThan(0);
    }
    // Guiding questions appear once per domain
    expect(screen.getAllByText(/Our research asks:/).length).toBe(6);
    expect(screen.getByText('An Integrated Research Program')).toBeInTheDocument();
  });

  it('renders the methods grid', () => {
    render(<ProjectsPage />);
    for (const method of [
      'Implementation Science',
      'Qualitative Research',
      'Mixed Methods',
      'Community-Based Participatory Research',
      'Human-Centered Design',
      'Crowdsourcing & Designathons',
      'Discrete Choice Experiments',
      'Survey Research',
      'Digital Health Research',
      'Intervention Development',
      'Implementation Evaluation',
      'Consensus-Building Methods',
      'Implementation Frameworks',
    ]) {
      expect(screen.getAllByText(method).length).toBeGreaterThan(0);
    }
  });

  it('has accessible sections with aria-labelledby', () => {
    render(<ProjectsPage />);
    const sections = screen.getAllByRole('region');
    expect(sections.length).toBeGreaterThanOrEqual(5);
  });
});
