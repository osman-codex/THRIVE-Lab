import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResearchCard from '@/components/ResearchCard';
import type { ResearchProject } from '@/data/research';

const activeProject: ResearchProject = {
  id: 'test-project',
  title: 'Test Research Project',
  principalInvestigator: 'Dr. Test PI',
  summary: 'A test summary of the research project.',
  focusAreas: ['HIV Prevention', 'Community Research'],
  status: 'active',
  fundingSource: 'Test Foundation',
};

const completedProject: ResearchProject = {
  id: 'completed-project',
  title: 'Completed Study',
  principalInvestigator: 'Dr. Complete',
  summary: 'This study is complete.',
  focusAreas: [],
  status: 'completed',
};

describe('ResearchCard', () => {
  it('renders the project title', () => {
    render(<ResearchCard project={activeProject} />);
    expect(screen.getByText('Test Research Project')).toBeInTheDocument();
  });

  it('renders the PI name', () => {
    render(<ResearchCard project={activeProject} />);
    expect(screen.getByText('PI: Dr. Test PI')).toBeInTheDocument();
  });

  it('renders the summary', () => {
    render(<ResearchCard project={activeProject} />);
    expect(screen.getByText('A test summary of the research project.')).toBeInTheDocument();
  });

  it('renders the status badge', () => {
    render(<ResearchCard project={activeProject} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders the funding source', () => {
    render(<ResearchCard project={activeProject} />);
    expect(screen.getByText(/Test Foundation/)).toBeInTheDocument();
  });

  it('renders focus area tags', () => {
    render(<ResearchCard project={activeProject} />);
    expect(screen.getByText('HIV Prevention')).toBeInTheDocument();
    expect(screen.getByText('Community Research')).toBeInTheDocument();
  });

  it('renders completed status', () => {
    render(<ResearchCard project={completedProject} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('has proper aria-label', () => {
    render(<ResearchCard project={activeProject} />);
    expect(
      screen.getByRole('article', { name: 'Research project: Test Research Project' }),
    ).toBeInTheDocument();
  });

  it('does not render funding section when no funding source', () => {
    render(<ResearchCard project={completedProject} />);
    expect(screen.queryByText(/Funded by/)).not.toBeInTheDocument();
  });
});
