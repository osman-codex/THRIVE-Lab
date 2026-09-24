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
  researchProjects,
  approachPillars,
} from '@/data/research';
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

  it('lists Enock Azasu as an affiliate (assistant professor, not a student)', () => {
    const member = members.find((m) => m.id === 'azasu');
    expect(member).toBeDefined();
    expect(member?.role).toBe('affiliate');
    expect(member?.title).toMatch(/Assistant Professor/);
    expect(member?.title).toMatch(/Social Work/);
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

  it('has approach pillars', () => {
    expect(approachPillars.length).toBe(4);
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
    expect(siteConfig.addressLines.join(' ')).toContain('Social and Behavioural Sciences');
  });

  it('has social links', () => {
    expect(siteConfig.socials.linkedin).toMatch(/^https:/);
    expect(siteConfig.socials.facebook).toMatch(/^https:/);
  });

  it('never uses em or en dashes in member and news copy', () => {
    for (const member of members) {
      expect(member.bio).not.toMatch(/[\u2013\u2014]/);
      expect(member.title).not.toMatch(/[\u2013\u2014]/);
    }
    for (const item of newsItems) {
      expect(item.summary).not.toMatch(/[\u2013\u2014]/);
      expect(item.body).not.toMatch(/[\u2013\u2014]/);
    }
  });

  it('covers all six pages in the navigation', () => {
    const hrefs = navLinks.map((link) => link.href);
    expect(hrefs).toEqual(['/', '/research', '/team', '/publications', '/news', '/contact']);
  });
});
