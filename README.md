# The THRIVE Lab Website

**Transforming the HIV Response Through Innovation and Equity**

A production-ready React/Next.js website for The THRIVE Lab — a community-driven research lab at the **Virginia Commonwealth University (VCU) School of Public Health, Department of Social and Behavioural Sciences**, dedicated to reducing HIV disparities among African immigrant and Black populations.

## 🌟 Overview

This site communicates the lab's mission, research initiatives, team members, publications, news, and contact information to a public health audience including researchers, community partners, students, and funders.

### Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Logo-forward hero with social media handles, About, Mission, and Vision sections, plus a team preview |
| **Team** | `/team` | All lab members organized by role (PI, graduate students, lab members, affiliates) with photos, bios, and ORCID/LinkedIn links |
| **Research & Projects** | `/research` | Focus areas, approach, and projects organized into Current, Completed, and Future sections |
| **Publications** | `/publications` | Peer-reviewed publications, pre-prints, and conference presentations with topic filtering |
| **News & Events** | `/news` | Lab news, upcoming events, success stories, and a photo/video gallery of lab activities |
| **Contact** | `/contact` | Validated contact form routing to the lab-wide inbox, plus the VCU address |

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 20.9.0
- npm (or yarn/pnpm)

### Local hosting / Installation

```bash
# Clone the repository
git clone <repository-url>
cd thrive-lab-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Production build (self-hosted)

```bash
npm run build
npm run start
```

This serves the optimized production build locally on port 3000. To host on your own server or a campus VM, run the two commands above under a process manager (e.g. `pm2` or `systemd`) and reverse-proxy with nginx.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL for metadata, sitemap, robots | `https://thrive-lab.example.org` |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Contact form submission endpoint URL | _(empty — simulated)_ |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Lab-wide inbox displayed to visitors | `thrivelab@vcu.edu` |

## ✏️ Updating Content (for non-technical maintainers)

All content lives in plain TypeScript data files under `src/data/`. You can add news, update team bios, and publish new publications **without touching any component code** — edit the data file, save, and the site updates.

| File | What it controls |
|------|------------------|
| `src/data/site.ts` | Lab name, address, lab-wide email, social media links, navigation labels |
| `src/data/members.ts` | Team member profiles: name, title, role group, bio, photo, ORCID, LinkedIn |
| `src/data/research.ts` | Focus areas and projects split into `currentProjects`, `completedProjects`, `upcomingProjects` |
| `src/data/publications.ts` | Publications with `type` (`journal-article`, `preprint`, `conference-paper`, …) which determines the section they appear in |
| `src/data/news.ts` | News items, events, success stories, and videos with optional photos and links |

### Common tasks

**Add a new team member** — append an entry to `members` in `src/data/members.ts`:

```ts
{
  id: 'new-member',
  name: 'Their Name',
  title: 'Lab Member',
  role: 'research-assistant',      // role group they appear under
  roleLabel: 'Lab Members',
  bio: 'One or two sentences about them.',
  imageUrl: '/images/members/new-member.jpg',  // optional; initials show if omitted
  orcid: '0000-0000-0000-0000',    // optional
  linkedin: 'https://...',         // optional
}
```

Drop their photo into `public/images/members/`. When a member's documents or full bio arrive, just update their entry.

**Add a publication** — append to `publications` in `src/data/publications.ts`. Set `type: 'journal-article'` for peer-reviewed, `'preprint'` for pre-prints, or `'conference-paper'` (with a `venue`) for conference presentations.

**Post lab news** — append to `newsItems` in `src/data/news.ts` with a `dateISO` (used for sorting), a category, and optionally `imageUrl` (drop the photo into `public/images/news/`) or `videoUrl` (an embeddable URL).

**Change the lab address, inbox, or socials** — edit `src/data/site.ts`.

> **Privacy rule baked into the site:** individual member emails are never displayed. All inquiries route to the lab-wide contact form and inbox.

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout with Header/Footer
│   ├── page.tsx             # Home
│   ├── team/                # Team page
│   ├── research/            # Research & Projects page
│   ├── publications/        # Publications page (client-side filtering)
│   ├── news/                # News & Events page
│   ├── contact/             # Contact page
│   ├── not-found.tsx        # 404 page
│   ├── robots.ts / sitemap.ts
├── components/
│   ├── Header.tsx           # Sticky header with logo + mobile menu
│   ├── Footer.tsx           # Footer with address, socials, quick links
│   ├── MemberCard.tsx       # Team member profile card
│   ├── ResearchCard.tsx     # Research project card with status badge
│   ├── PublicationCard.tsx  # Publication entry with expandable abstract
│   ├── NewsCard.tsx         # News/event card with photo or video embed
│   ├── ContactForm.tsx      # Validated contact form
│   ├── SocialLinks.tsx      # Reusable social media icon links
│   └── SectionHeading.tsx   # Reusable section heading
├── data/                    # ✏️ All editable content lives here
│   ├── site.ts              # Lab identity, address, socials, nav
│   ├── members.ts           # Team roster
│   ├── research.ts          # Research areas & projects
│   ├── publications.ts      # Publications
│   └── news.ts              # News & events
└── __tests__/               # Vitest + React Testing Library suites
public/
├── images/logo.jpg          # Lab logo
├── images/members/          # Team member photos
└── images/news/             # News & activity photos
```

## 🧪 Testing

Tests are written with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), covering components, pages, and data integrity (unique IDs, valid ORCID formats, no personal emails rendered, correct category grouping).

```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

## ♿ Accessibility

This site targets **WCAG 2.1 AA** compliance:

- **Semantic HTML**: `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<section>`, `<address>`
- **Skip link** for keyboard users, visible `:focus-visible` indicators
- **Forms**: `aria-invalid`, `aria-describedby`, `role="alert"` for error messages
- **ARIA labels** on icon-only links and interactive regions; `aria-current` on the active nav item
- **Responsive** across mobile, tablet, and desktop

## 🎨 Design System

The palette is derived from the lab's official logo (greens with gold accents):

| Token | Color | Usage |
|-------|-------|-------|
| `--color-primary` | `#1b6b4a` | Primary brand green |
| `--color-primary-light` | `#27a06e` | Lighter green for accents |
| `--color-secondary` | `#e8a838` | Gold accent |
| `--color-accent` | `#c0392b` | Error/destructive actions |
| `--color-bg` | `#fafbf8` | Page background |

**Typography:** Merriweather (headings) and Inter (body), loaded via system font stacks in `globals.css`.

## 🚢 Deployment

### Vercel (recommended)

1. Push the repository to GitHub/GitLab/Bitbucket
2. Import it in [Vercel](https://vercel.com)
3. Configure the environment variables above
4. Deploy

### Self-hosted

Run `npm run build && npm run start` behind a reverse proxy (see *Production build* above).

## 📄 License

Copyright © 2026 The THRIVE Lab. All rights reserved.
