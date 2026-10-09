import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PublicationsPage from '@/app/publications/page';

/** Get the category section container for a given category heading. */
function getCategorySection(headingName: RegExp): HTMLElement {
  const heading = screen.getByRole('heading', { name: headingName });
  // Wrapper div -> heading + pubs list
  return heading.closest('div') as HTMLElement;
}

/** Find a publication card (article) by its title within a section. */
function getPubTitleInSection(section: HTMLElement, titlePattern: RegExp): HTMLElement | undefined {
  const articles = within(section).queryAllByRole('article');
  return articles.find((article) => {
    const title = article.querySelector('h3');
    return title && titlePattern.test(title.textContent ?? '');
  });
}

describe('Publications Page', () => {
  it('renders the page title', () => {
    render(<PublicationsPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Publications' })).toBeInTheDocument();
  });

  it('renders the scholarly outputs count', () => {
    render(<PublicationsPage />);
    expect(screen.getByText(/\d+ scholarly outputs/)).toBeInTheDocument();
  });

  it('renders the filter section', () => {
    render(<PublicationsPage />);
    expect(screen.getByRole('button', { name: 'All Topics' })).toBeInTheDocument();
  });

  it('renders the four category sections', () => {
    render(<PublicationsPage />);
    expect(
      screen.getByRole('heading', { name: /Peer-Reviewed Publications/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Pre-prints/ })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Conference Presentations/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /In Press & Under Review/ }),
    ).toBeInTheDocument();
  });

  it('renders peer-reviewed publications', () => {
    render(<PublicationsPage />);
    const section = getCategorySection(/Peer-Reviewed Publications/);
    expect(getPubTitleInSection(section, /Religiosity and Gender Norms/)).toBeDefined();
    expect(getPubTitleInSection(section, /Y-FIT GH National Crowdsourcing Open Call/)).toBeDefined();
    expect(getPubTitleInSection(section, /Human-Centered Security/)).toBeDefined();
    expect(getPubTitleInSection(section, /Divergent Effects/)).toBeDefined();
    expect(getPubTitleInSection(section, /Sin Against God/)).toBeDefined();
  });

  it('renders pre-prints', () => {
    render(<PublicationsPage />);
    const section = getCategorySection(/Pre-prints/);
    expect(getPubTitleInSection(section, /Y-FIT Ghana: A Study Protocol/)).toBeDefined();
    expect(getPubTitleInSection(section, /MiST-Pathways.*A Study Protocol/)).toBeDefined();
    expect(getPubTitleInSection(section, /WISE WOMAN.*A Study Protocol/)).toBeDefined();
  });

  it('renders conference presentations', () => {
    render(<PublicationsPage />);
    const section = getCategorySection(/Conference Presentations/);
    expect(getPubTitleInSection(section, /Autonomy and Trust Impact PrEP Discussions/)).toBeDefined();
    expect(getPubTitleInSection(section, /PrEP Stigma, HIV Stigma/)).toBeDefined();
    expect(getPubTitleInSection(section, /Gender Norms and Religiosity/)).toBeDefined();
  });

  it('renders under-review manuscripts', () => {
    render(<PublicationsPage />);
    const section = getCategorySection(/In Press & Under Review/);
    expect(getPubTitleInSection(section, /Youth-Generated Digital Engagement Framework/)).toBeDefined();
    expect(getPubTitleInSection(section, /Autonomy Support, Medical Mistrust/)).toBeDefined();
    expect(getPubTitleInSection(section, /We Are Not Taught/)).toBeDefined();
  });

  it('shows category counts', () => {
    render(<PublicationsPage />);
    const peerReviewedHeading = screen.getByRole('heading', {
      name: /Peer-Reviewed Publications/,
    });
    expect(within(peerReviewedHeading).getByText('5')).toBeInTheDocument();
    const preprintHeading = screen.getByRole('heading', { name: /Pre-prints/ });
    expect(within(preprintHeading).getByText('3')).toBeInTheDocument();
    const conferenceHeading = screen.getByRole('heading', {
      name: /Conference Presentations/,
    });
    expect(within(conferenceHeading).getByText('3')).toBeInTheDocument();
    const underReviewHeading = screen.getByRole('heading', {
      name: /In Press & Under Review/,
    });
    expect(within(underReviewHeading).getByText('9')).toBeInTheDocument();
  });

  it('filters publications when a tag is clicked', async () => {
    const user = userEvent.setup();
    render(<PublicationsPage />);

    const prEpTag = screen.getByRole('button', { name: 'PrEP' });
    await user.click(prEpTag);

    const peerReviewed = getCategorySection(/Peer-Reviewed Publications/);
    expect(getPubTitleInSection(peerReviewed, /Religiosity and Gender Norms/)).toBeUndefined();
    expect(getPubTitleInSection(peerReviewed, /Y-FIT GH National Crowdsourcing Open Call/)).toBeDefined();
  });

  it('hides empty categories when filtering', async () => {
    const user = userEvent.setup();
    render(<PublicationsPage />);

    // No conference presentation carries the Ghana tag
    await user.click(screen.getByRole('button', { name: 'Ghana' }));

    expect(
      screen.queryByRole('heading', { name: /Conference Presentations/ }),
    ).not.toBeInTheDocument();
  });

  it('resets filter when All Topics is clicked', async () => {
    const user = userEvent.setup();
    render(<PublicationsPage />);

    await user.click(screen.getByRole('button', { name: 'Ghana' }));
    expect(
      screen.queryByRole('heading', { name: /Conference Presentations/ }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'All Topics' }));
    expect(
      screen.getByRole('heading', { name: /Conference Presentations/ }),
    ).toBeInTheDocument();
  });

  it('has a filter group with proper ARIA', () => {
    render(<PublicationsPage />);
    expect(
      screen.getByRole('group', { name: 'Filter publications by tag' }),
    ).toBeInTheDocument();
  });
});
