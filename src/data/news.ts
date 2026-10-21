export type NewsCategory = 'news' | 'event' | 'success-story' | 'video';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  /** ISO date (YYYY-MM-DD); used for sorting, never rendered raw. */
  dateISO: string;
  summary: string;
  body: string;
  category: NewsCategory;
  imageUrl?: string;
  /** Embeddable iframe src for videos hosted on Facebook. */
  videoUrl?: string;
  /** Link to the original Facebook post (for captions and sharing). */
  postUrl?: string;
  link?: string;
}

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  news: 'Lab News',
  event: 'Event',
  'success-story': 'Success Story',
  video: 'Video',
};

export const newsItems: NewsItem[] = [
  {
    id: 'yfit-contest-sprint',
    title: 'Y-FIT GH Youth HIV Contest Sprint and Workshop',
    date: 'July 2026',
    dateISO: '2026-07-01',
    category: 'event',
    summary:
      'Young changemakers from across Ghana joined us for the Y-FIT GH Innovation Sprint, turning bold ideas on HIV self-testing and PrEP into working concepts.',
    body: 'The Y-FIT GH Youth HIV Contest Sprint and Workshop brought together young people, mentors, and community partners for days of ideation, teamwork, and hands-on design. Participants refined the strongest ideas from the national open call into prototypes for youth-friendly HIV prevention, and the energy in the room said it all: when young people lead, prevention strategies get better. Thank you to every participant, facilitator, and partner who made it happen.',
    imageUrl: '/images/news/yfit-gh-2.jpg',
  },
  {
    id: 'c4-workshop-series',
    title: 'C4 Workshop Series: Community, Conversation, and Connection',
    date: 'June 2026',
    dateISO: '2026-06-01',
    category: 'event',
    summary:
      'Our C4 workshop series brought community members and the lab team around the same table to learn, share, and shape our research priorities together.',
    body: 'The C4 workshop series is built on a simple belief: research works best when the community is in the room from day one. Each session blended practical skill-building with open conversation, giving participants space to ask questions, share experiences, and tell us what matters most to them. The insights gathered are already informing how we design and deliver our HIV prevention studies.',
    imageUrl: '/images/news/c4-workshop-1.jpg',
  },
  {
    id: 'wise-woman-registration',
    title: 'WISE WOMAN Study Opens for Registration',
    date: 'August 2026',
    dateISO: '2026-08-24',
    category: 'news',
    summary:
      'The WISE WOMAN study is officially open! Women aged 18 to 35 are invited to join a four-week online program shaped around their prevention needs.',
    body: 'We are thrilled to announce that the WISE WOMAN study is now open for registration. This women-centered, four-week online program was co-developed with community input to address the HIV prevention needs of women in culturally responsive ways. If you are a woman aged 18 to 35 and want to contribute to and benefit from this work, we would love to have you with us. Reach out through our contact form to learn more or sign up.',
    imageUrl: '/images/news/yamh-collab-1.jpg',
  },
  {
    id: 'school-visit-spotlight',
    title: 'School Visit Spotlight',
    date: 'July 2026',
    dateISO: '2026-07-07',
    category: 'news',
    summary:
      'The lab team headed into classrooms to talk with students about HIV, health careers, and the power of youth-led prevention.',
    body: 'As part of our Y-FIT GH outreach, the team visited schools to share age-appropriate HIV education and introduce students to careers in public health. Students asked sharp questions, shared their own perspectives on stigma and testing, and reminded us exactly why youth voices belong at the center of prevention research.',
    imageUrl: '/images/news/yamh-collab-2.jpg',
  },
  {
    id: 'yfit-crowdsourcing-paper',
    title: 'New Paper: Y-FIT GH National Crowdsourcing Open Call Results in AIDS and Behavior',
    date: 'September 2026',
    dateISO: '2026-09-08',
    category: 'success-story',
    summary:
      'Our latest publication shares what happened when young people across Ghana were invited to design their own HIV prevention strategies.',
    body: 'The THRIVE Lab published new results from the Y-FIT GH national crowdsourcing open call in AIDS and Behavior. The open call invited young Ghanaians to submit ideas for improving HIV self-testing and long-acting injectable PrEP uptake, and the response showed just how much insight and creativity young people bring to prevention. Read the paper on our Publications page.',
    imageUrl: '/images/news/yfit-gh-3.jpg',
    link: '/publications',
  },
  {
    id: 'team-spotlight-abass',
    title: 'Team Spotlight: Abass Tando Abubakar',
    date: 'December 2026',
    dateISO: '2026-12-01',
    category: 'video',
    summary:
      'Day 3 of our five-day team spotlight series featured Abass on HIV and PrEP stigma, and how religion, gender norms, and cultural identity shape prevention.',
    body: 'Our team spotlight series continues to introduce the people behind the research. Abass Tando Abubakar shared his perspective on HIV and PrEP stigma among communities where religion, gender norms, and cultural identity shape how prevention is understood and used. Watch the spotlight and meet the rest of the team on our Team page.',
    link: '/team',
  },
  {
    id: 'video-wise-woman-recruitment',
    title: 'Video: WISE WOMAN Study Invitation',
    date: 'August 2026',
    dateISO: '2026-08-24',
    category: 'video',
    summary:
      'A video invitation to women aged 18 to 35 to join the WISE WOMAN study, our four-week online program on HIV prevention designed by young women, for young women.',
    body: 'In this video the lab invites women aged 18 to 35 to be part of the WISE WOMAN study. The four-week online program covers HIV prevention topics in a private, supportive space designed by young women, for young women. Watch the video and register through the contact page to secure a spot.',
    videoUrl:
      'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F61576633776186%2Fvideos%2F2325558718254211%2F&show_text=false&width=560',
    postUrl:
      'https://www.facebook.com/61576633776186/videos/2325558718254211/',
  },
  {
    id: 'video-ghana-hiv-estimates',
    title: 'Video: Understanding Ghana\u2019s 2024 National HIV Estimates',
    date: 'July 2026',
    dateISO: '2026-07-15',
    category: 'video',
    summary:
      'A short explainer on Ghana\u2019s 2024 National HIV Estimates: real progress in treatment, but rising infections and a high death toll that demand attention.',
    body: 'Ghana\u2019s 2024 National HIV Estimates present a clear picture. Treatment outcomes are improving, yet new infections keep rising and the death toll remains high. In this video we break down what the numbers mean for prevention policy and for the communities we serve, and why youth-led approaches like Y-FIT GH matter more than ever.',
    videoUrl:
      'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F61576633776186%2Fvideos%2F771798035528006%2F&show_text=false&width=560',
    postUrl: 'https://www.facebook.com/61576633776186/videos/771798035528006/',
  },
];

/** News items sorted newest first. */
export function getSortedNews(): NewsItem[] {
  return [...newsItems].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
}

export function getUpcomingEvents(): NewsItem[] {
  return getSortedNews().filter((item) => item.category === 'event');
}

/** Video items with an embeddable player, newest first. */
export function getVideos(): NewsItem[] {
  return getSortedNews().filter((item) => item.videoUrl);
}
