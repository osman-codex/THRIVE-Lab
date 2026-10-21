import { describe, it, expect } from 'vitest';
import { members, ROLE_ORDER, ROLE_LABELS } from '@/data/members';
import {
  publications,
  getPublicationsByYear,
  getUniqueTags,
  getPublicationsByCategory,
  getPublicationCategory,
  CATEGORY_ORDER,
} from '@/data/publications';
import {
  researchAreas,
  currentProjects,
  completedProjects,
  upcomingProjects,
  communityInitiatives,
  researchProjects,
  approachMethods,
} from '@/data/research';
import {
  currentAwards,
  collaborativeAwards,
  pilotSupportAwards,
  completedAwards,
  allAwards,
  fundingPartners,
  fundingMetrics,
  totalResearchSupport,
  fundedAwardCount,
} from '@/data/funding';
import { newsItems, getSortedNews, getUpcomingEvents, getVideos } from '@/data/news';
import { siteConfig, navLinks } from '@/data/site';

describe('Members data', () => {
  it('has a non-empty members array', () => {
    expect(members.length).toBeGreaterThan(0);
  });

  it('has unique member IDs', () => {
    const ids = members.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only uses roles defined in ROLE_ORDER with labels', () => {
    for (const member of members) {
      expect(ROLE_ORDER).toContain(member.role);
      expect(ROLE_LABELS[member.role]).toBeDefined();
    }
  });

  it('has a PI', () => {
    expect(members.some((m) => m.role === 'principal-investigator')).toBe(true);
  });

  it('never publishes member emails on the roster', () => {
    for (const member of members) {
      expect(member.email).toBeUndefined();
    }
  });

  it('has valid ORCID identifiers when provided', () => {
    const orcidPattern = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/;
    for (const member of members) {
      if (member.orcid) {
        expect(member.orcid).toMatch(orcidPattern);
      }
    }
  });

  it('keeps the roster aligned with the latest team edits', () => {
    const names = members.map((m) => m.name);
    const ids = members.map((m) => m.id);
    // Removed from the roster
    expect(names).not.toContain('Nihith Nath');
    expect(names).not.toContain('Dr. David');
    expect(names).not.toContain('Enock Azasu');
    expect(ids).not.toContain('nath');
    expect(ids).not.toContain('dr-david');
    expect(ids).not.toContain('azasu');
  });

  it('lists Daniel Selase Anyidoho as a research assistant', () => {
    const member = members.find((m) => m.id === 'anyidoho');
    expect(member).toBeDefined();
    expect(member?.role).toBe('research-assistant');
    expect(member?.title).toBe('Research Assistant');
  });

  it('no longer ties Ebenezer Asare to WAAF', () => {
    const member = members.find((m) => m.id === 'asare');
    expect(member).toBeDefined();
    expect(member?.title).not.toMatch(/West Africa AIDS Foundation/);
    expect(member?.bio).not.toMatch(/West Africa AIDS Foundation/);
  });

  it('lists Osman as a graduate student with full profile details', () => {
    const member = members.find((m) => m.id === 'iddrisu');
    expect(member).toBeDefined();
    expect(member?.name).toBe('Osman Abdul-Fatawu Iddrisu');
    expect(member?.role).toBe('graduate-student');
    expect(member?.title).toMatch(/Field Epidemiology and Applied Biostatistics/);
    expect(member?.bio).toMatch(/Actuarial Science/);
    expect(member?.orcid).toBe('0009-0009-4816-7233');
    expect(member?.linkedin).toMatch(/linkedin\.com\/in\/osman-abdul-fatawu-iddrisu/);
  });

  it('uses Brian, not Brain', () => {
    const names = members.map((m) => m.name);
    expect(names).toContain('Brian');
    expect(names).not.toContain('Brain');
  });
});

describe('Publications data', () => {
  it('has a non-empty publications array', () => {
    expect(publications.length).toBeGreaterThan(0);
  });

  it('getPublicationsByYear groups by year with sorted keys', () => {
    const grouped = getPublicationsByYear();
    const years = Object.keys(grouped).map(Number);
    expect(years.length).toBeGreaterThanOrEqual(1);
    expect(new Set(years).size).toBe(years.length);
    for (const year of years) {
      expect(grouped[year].length).toBeGreaterThan(0);
    }
  });

  it('getUniqueTags returns sorted unique tags', () => {
    const tags = getUniqueTags();
    expect(tags.length).toBeGreaterThan(0);
    expect(new Set(tags).size).toBe(tags.length);
    expect(tags).toEqual([...tags].sort());
  });

  it('every publication has required fields', () => {
    for (const pub of publications) {
      expect(pub.id).toBeTruthy();
      expect(pub.title).toBeTruthy();
      expect(pub.authors.length).toBeGreaterThan(0);
      expect(pub.journal).toBeTruthy();
      expect(pub.year).toBeGreaterThan(2000);
      expect(pub.abstract).toBeTruthy();
      expect(pub.tags.length).toBeGreaterThan(0);
    }
  });

  it('maps every publication into a valid category', () => {
    for (const pub of publications) {
      expect(CATEGORY_ORDER).toContain(getPublicationCategory(pub));
    }
  });

  it('getPublicationsByCategory returns entries for all categories', () => {
    const grouped = getPublicationsByCategory();
    expect(grouped['peer-reviewed'].length).toBe(5);
    expect(grouped.preprint.length).toBe(3);
    expect(grouped.conference.length).toBe(3);
    expect(grouped['under-review'].length).toBe(9);
  });

  it('includes peer-reviewed journal articles in the peer-reviewed category', () => {
    const grouped = getPublicationsByCategory();
    expect(
      grouped['peer-reviewed'].some((p) => p.id === 'pub-religiosity-2026'),
    ).toBe(true);
  });

  it('includes the Y-FIT crowdsourcing paper as peer-reviewed', () => {
    const grouped = getPublicationsByCategory();
    expect(
      grouped['peer-reviewed'].some((p) => p.id === 'pub-yfit-crowdsourcing-2026'),
    ).toBe(true);
  });
});

describe('Research data', () => {
  it('has research areas', () => {
    expect(researchAreas.length).toBe(6);
  });

  it('has current, completed, and upcoming projects', () => {
    expect(currentProjects.length).toBeGreaterThan(0);
    expect(completedProjects.length).toBeGreaterThan(0);
    expect(upcomingProjects.length).toBeGreaterThan(0);
  });

  it('researchProjects combines all project collections', () => {
    expect(researchProjects.length).toBe(
      currentProjects.length + completedProjects.length + upcomingProjects.length,
    );
  });

  it('has approach methods covering the full methodological toolkit', () => {
    expect(approachMethods.length).toBe(13);
    expect(approachMethods).toContain('Implementation Science');
    expect(approachMethods).toContain('Community-Based Participatory Research');
    expect(approachMethods).toContain('Discrete Choice Experiments');
  });

  it('has community initiatives with population and setting', () => {
    expect(communityInitiatives.length).toBeGreaterThan(0);
    for (const initiative of communityInitiatives) {
      expect(initiative.id).toBeTruthy();
      expect(initiative.title).toBeTruthy();
      expect(initiative.purpose).toBeTruthy();
      expect(initiative.population).toBeTruthy();
      expect(initiative.location).toBeTruthy();
      expect(initiative.relationship).toBeTruthy();
    }
  });

  it('every project has required fields and a valid status', () => {
    for (const project of researchProjects) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.principalInvestigator).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(['active', 'completed', 'upcoming']).toContain(project.status);
    }
  });

  it('keeps statuses consistent within each collection', () => {
    for (const project of currentProjects) expect(project.status).toBe('active');
    for (const project of completedProjects) expect(project.status).toBe('completed');
    for (const project of upcomingProjects) expect(project.status).toBe('upcoming');
  });

  it('has unique project IDs across collections', () => {
    const ids = researchProjects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('News data', () => {
  it('has news items', () => {
    expect(newsItems.length).toBeGreaterThan(0);
  });

  it('has unique news item IDs', () => {
    const ids = newsItems.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every news item has required fields', () => {
    for (const item of newsItems) {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.date).toBeTruthy();
      expect(item.dateISO).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.summary).toBeTruthy();
      expect(item.body).toBeTruthy();
      expect(['news', 'event', 'success-story', 'video']).toContain(item.category);
      if (item.videoUrl) {
        expect(item.postUrl).toBeTruthy();
      }
    }
  });

  it('getSortedNews returns items newest first', () => {
    const sorted = getSortedNews();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].dateISO >= sorted[i].dateISO).toBe(true);
    }
  });

  it('getUpcomingEvents returns only events', () => {
    for (const event of getUpcomingEvents()) {
      expect(event.category).toBe('event');
    }
  });

  it('getVideos returns only items with an embeddable video url', () => {
    const videos = getVideos();
    expect(videos.length).toBeGreaterThan(0);
    for (const video of videos) {
      expect(video.videoUrl).toMatch(/^https:\/\//);
    }
    expect(videos.some((v) => v.id === 'video-wise-woman-recruitment')).toBe(true);
    expect(videos.some((v) => v.id === 'video-ghana-hiv-estimates')).toBe(true);
  });

  it('embedded videos link back to their Facebook posts', () => {
    for (const video of getVideos()) {
      expect(video.postUrl).toMatch(/^https:\/\/www\.facebook\.com\//);
    }
  });
});

describe('Site config', () => {
  it('points to the VCU School of Public Health', () => {
    expect(siteConfig.institution).toBe('Virginia Commonwealth University');
    expect(siteConfig.school).toBe('School of Public Health');
  });

  it('uses a lab-wide inbox rather than a personal address', () => {
    expect(siteConfig.contactEmail).toMatch(/@/);
    expect(siteConfig.contactEmail).not.toMatch(/buffalo\.edu$/);
  });

  it('includes the required address lines', () => {
    expect(siteConfig.addressLines.join(' ')).toContain('THRIVE Lab');
    expect(siteConfig.addressLines.join(' ')).toContain('School of Public Health');
    expect(siteConfig.addressLines.join(' ')).toContain('Social and Behavioral Sciences');
  });

  it('uses the official lab email', () => {
    expect(siteConfig.contactEmail).toBe('thrive.lab.research@gmail.com');
  });

  it('uses the new THRIVE meaning', () => {
    expect(siteConfig.fullName).toBe(
      'Transforming Health Research through Innovation, Value, and Equity',
    );
  });

  it('has social links', () => {
    expect(siteConfig.socials.linkedin).toMatch(/^https:/);
    expect(siteConfig.socials.facebook).toMatch(/^https:/);
  });

  it('never uses em or en dashes in site copy', () => {
    const copyFields: string[] = [];
    for (const member of members) {
      copyFields.push(member.bio, member.title);
    }
    for (const item of newsItems) {
      copyFields.push(item.summary, item.body);
    }
    for (const project of researchProjects) {
      copyFields.push(project.title, project.summary, project.subtitle ?? '');
    }
    for (const area of researchAreas) {
      copyFields.push(area.title, area.description, area.tagline, area.question, ...area.paragraphs);
    }
    for (const initiative of communityInitiatives) {
      copyFields.push(initiative.title, initiative.purpose, initiative.relationship);
    }
    for (const award of allAwards) {
      copyFields.push(award.title, award.summary, award.mechanism ?? '', award.year);
    }
    for (const text of copyFields) {
      expect(text).not.toMatch(/[\u2013\u2014]/);
    }
  });

  it('covers all top-level pages in the navigation', () => {
    const hrefs = navLinks.map((link) => link.href);
    expect(hrefs).toEqual([
      '/',
      '/about',
      '/projects',
      '/funding',
      '/team',
      '/publications',
      '/news',
      '/contact',
    ]);
  });

  it('gives Projects & Initiatives a dropdown', () => {
    const projects = navLinks.find((link) => link.href === '/projects');
    expect(projects?.children).toHaveLength(5);
    const childLabels = projects?.children?.map((child) => child.label);
    expect(childLabels).toEqual([
      'Current Projects',
      'Community Initiatives',
      'Completed Projects',
      'Research Focus Areas',
      'Our Approach',
    ]);
  });
});

describe('Funding data', () => {
  it('has verified current, collaborative, pilot, and completed awards', () => {
    expect(currentAwards.length).toBeGreaterThan(0);
    expect(collaborativeAwards.length).toBeGreaterThan(0);
    expect(pilotSupportAwards.length).toBeGreaterThan(0);
    expect(completedAwards.length).toBeGreaterThan(0);
  });

  it('keeps unique award IDs across collections', () => {
    const ids = [
      ...currentAwards,
      ...collaborativeAwards,
      ...pilotSupportAwards,
      ...completedAwards,
    ].map((award) => award.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has a portfolio total at least as large as the listed current awards', () => {
    const currentTotal = currentAwards.reduce(
      (sum, award) => sum + (award.amount ?? 0),
      0,
    );
    expect(totalResearchSupport).toBeGreaterThanOrEqual(currentTotal);
    expect(fundedAwardCount).toBeGreaterThanOrEqual(currentAwards.length);
  });

  it('never displays a funding figure without a verified amount', () => {
    for (const metric of fundingMetrics) {
      expect(metric.value).not.toMatch(/X/);
    }
  });

  it('provides approved funder logos', () => {
    expect(fundingPartners.length).toBeGreaterThanOrEqual(4);
    for (const partner of fundingPartners) {
      expect(partner.logo).toMatch(/^\/images\/funders\//);
      expect(partner.name).toBeTruthy();
    }
  });
});
