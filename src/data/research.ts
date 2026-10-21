export interface ResearchArea {
  id: string;
  title: string;
  /** One-sentence description used on cards. */
  description: string;
  /** Short intellectual subtitle used on the Research Focus Areas section. */
  tagline: string;
  /** Full intellectual description, used on the Projects & Initiatives page. */
  paragraphs: string[];
  /** The guiding research question for this domain. */
  question: string;
  icon: string;
}

export type ProjectStatus = 'active' | 'completed' | 'upcoming';

export interface ResearchProject {
  id: string;
  title: string;
  /** Short expansion of the project name, shown under the title when present. */
  subtitle?: string;
  principalInvestigator: string;
  summary: string;
  focusAreas: string[];
  status: ProjectStatus;
  fundingSource?: string;
  /** Geographic setting, e.g. "Ghana" or "United States". */
  location?: string;
  imageUrl?: string;
}

export interface CommunityInitiative {
  id: string;
  title: string;
  /** What the initiative does and why. */
  purpose: string;
  /** Population or community served. */
  population: string;
  /** Geographic setting. */
  location: string;
  /** Partner organizations involved. */
  collaborators?: string;
  /** How the initiative connects to the THRIVE research program. */
  relationship: string;
  imageUrl?: string;
}

/**
 * THRIVE's six interconnected scientific domains.
 */
export const researchAreas: ResearchArea[] = [
  {
    id: 'community-engaged',
    title: 'Community-Engaged Research & Co-Production',
    description:
      'How community knowledge and lived experience shape the production and use of scientific evidence.',
    tagline: 'Reframing communities as partners in knowledge production.',
    paragraphs: [
      'The THRIVE Lab examines how community knowledge, lived experience, and local expertise can strengthen the relevance, rigor, and translational potential of health research.',
      'Our work moves beyond consultation toward models of co-production, shared decision-making, and participatory inquiry, engaging communities in identifying research priorities, shaping scientific questions, developing interventions, interpreting findings, and determining how evidence should be disseminated and used.',
      'We employ approaches including community-based participatory research, human-centered design, crowdsourcing, designathons, consensus-building methods, community advisory structures, and culturally grounded forms of deliberation.',
    ],
    question:
      'How does the science change when communities have meaningful influence over what is studied, how it is studied, and what happens with the knowledge produced?',
    icon: '🤝',
  },
  {
    id: 'implementation-science',
    title: 'Implementation Science',
    description:
      'How interventions move from evidence to adoption, implementation, scale-up, and sustainability.',
    tagline: 'Understanding how evidence becomes practice.',
    paragraphs: [
      'THRIVE investigates the determinants, strategies, mechanisms, and outcomes that shape the adoption, implementation, scale-up, and sustainability of evidence-based interventions.',
      'Our work examines implementation across community, healthcare, and public health settings, with particular attention to context, adaptation, implementation strategies, organizational readiness, equity, sustainability, and the interface between intervention effectiveness and real-world delivery.',
      'We use implementation science not simply as a set of frameworks, but as a means of understanding how interventions interact with the systems, organizations, communities, and social conditions in which they are introduced.',
    ],
    question:
      'What is required for an effective intervention to become an effective, equitable, and sustainable part of routine practice?',
    icon: '🔬',
  },
  {
    id: 'prevention-screening',
    title: 'Prevention, Screening & Early Intervention',
    description:
      'How effective prevention and early intervention can reach populations more equitably.',
    tagline: 'Advancing equitable access before disparities become entrenched.',
    paragraphs: [
      'THRIVE develops and evaluates approaches designed to improve access to prevention, screening, early detection, and timely intervention.',
      'Our current work encompasses HIV testing and self-testing, oral and long-acting prevention technologies, sexual and reproductive health, and prevention among adolescents, young adults, women, and immigrant communities.',
      'This domain also provides the scientific foundation for expanding work in cancer prevention, screening, and early detection. We are particularly interested in how people make prevention decisions, how prevention technologies are introduced and communicated, and how health systems can reduce the distance between the availability of an effective intervention and its meaningful use.',
    ],
    question:
      'Who benefits from advances in prevention, who remains unreached, and what must change for effective prevention to become equitably accessible?',
    icon: '🛡️',
  },
  {
    id: 'health-equity',
    title: 'Health Equity, Social Context & Structural Determinants',
    description:
      'How social, cultural, institutional, and structural conditions shape health opportunities and outcomes.',
    tagline: 'Locating health within the systems that shape opportunity and constraint.',
    paragraphs: [
      'The THRIVE Lab examines how social, cultural, structural, and institutional conditions influence health, healthcare access, intervention uptake, and health outcomes.',
      'Our research considers migration, gender, socioeconomic conditions, religion, social relationships, discrimination, healthcare access, policy environments, and other contextual forces that influence whether individuals and communities can benefit from advances in prevention and care.',
      'Rather than treating disparities simply as differences between population groups, we seek to identify the processes, institutions, and conditions through which inequities are produced and sustained.',
    ],
    question:
      'How do social and structural environments shape who can access, trust, use, and benefit from healthcare and public health interventions?',
    icon: '⚖️',
  },
  {
    id: 'digital-health',
    title: 'Digital Health & Innovation',
    description:
      'How technology can extend the reach and responsiveness of prevention, care, and research.',
    tagline: 'Extending access without reproducing existing inequities.',
    paragraphs: [
      'THRIVE develops and evaluates technology-enabled approaches to prevention, intervention delivery, research participation, communication, and community engagement.',
      'Our work includes mobile health, WhatsApp-based engagement, digital communication, online intervention delivery, digital narratives, and emerging technology-enabled approaches to public health research and practice.',
      'We approach digital health not simply as a question of technological feasibility. We examine acceptability, privacy, trust, usability, accessibility, engagement, cultural relevance, and implementation context to understand when technology expands opportunity and when it may reproduce exclusion.',
    ],
    question:
      'How can digital innovation expand the reach and responsiveness of public health while remaining trustworthy, inclusive, and grounded in the realities of the populations it is intended to serve?',
    icon: '💻',
  },
  {
    id: 'trust-stigma',
    title: 'Trust, Stigma & Healthcare Engagement',
    description:
      'How relational, social, and institutional conditions influence engagement with health systems and interventions.',
    tagline: 'Understanding the relational conditions that shape engagement with prevention and care.',
    paragraphs: [
      'THRIVE investigates how stigma, trust, discrimination, identity, healthcare experiences, and institutional relationships influence engagement with health interventions and systems.',
      'Our research examines HIV and PrEP stigma, medical mistrust, immigration-related experiences, intersectional stigma, perceptions of healthcare institutions, and the processes through which trust is developed, eroded, or restored.',
      'We conceptualize trust not simply as an individual attitude, but as a relational and institutional phenomenon shaped by histories, experiences, systems, and power.',
    ],
    question:
      'What makes people willing to engage with health systems, accept new interventions, and sustain relationships with care over time?',
    icon: '💚',
  },
];

/**
 * Current projects: active studies underway at the lab.
 */
export const currentProjects: ResearchProject[] = [
  {
    id: 'yfit-ghana',
    title: 'Y-FIT Ghana: Youth-Led Participatory Approach to HIV Self-Testing and PrEP Uptake',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'A youth-led participatory research project promoting youth-friendly HIV self-testing (oral and long-acting injectable) and PrEP uptake among young people in Ghana. The project moves through a three-phase innovation pipeline: a national open call for youth-generated ideas, an HIV Innovation Sprint to refine selected concepts, and a bootcamp focused on capacity building and implementation readiness.',
    focusAreas: [
      'Prevention, Screening & Early Intervention',
      'Community-Engaged Research & Co-Production',
      'Digital Health & Innovation',
    ],
    status: 'active',
    fundingSource: 'University at Buffalo',
    location: 'Ghana',
    imageUrl: '/images/news/yfit-gh-1.jpg',
  },
  {
    id: 'wise-woman',
    title: 'WISE WOMAN',
    subtitle: 'Women, Innovation, Sexual Health & Empowerment',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'Developing and evaluating culturally responsive approaches to prevention, sexual health, and digital engagement among young women in Ghana. WISE WOMAN is a four-week online program co-developed with community input, focused on understanding and addressing HIV prevention needs among women.',
    focusAreas: [
      'Prevention, Screening & Early Intervention',
      'Health Equity, Social Context & Structural Determinants',
    ],
    status: 'active',
    fundingSource: 'University at Buffalo',
    location: 'Ghana',
    imageUrl: '/images/news/yamh-collab-1.jpg',
  },
  {
    id: 'wi-care',
    title: 'WI-CARE',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'Examining how digital platforms can strengthen meaningful engagement of African immigrant communities in patient-centered research.',
    focusAreas: [
      'Digital Health & Innovation',
      'Community-Engaged Research & Co-Production',
    ],
    status: 'active',
    fundingSource: 'Patient-Centered Outcomes Research Institute (PCORI)',
    location: 'United States',
  },
  {
    id: 'african-epistemologies',
    title: 'Institutionalizing African Epistemologies in Health Research',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'Examining how African knowledge systems and community perspectives can reshape the production and governance of health research.',
    focusAreas: [
      'Community-Engaged Research & Co-Production',
      'Health Equity, Social Context & Structural Determinants',
    ],
    status: 'active',
    fundingSource: 'Robert Wood Johnson Foundation',
    location: 'United States',
  },
  {
    id: 'mist-pathways',
    title: 'MiST-Pathways: Migration, Social Bonds, Transnationalism, and HIV Prevention',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'A mixed-methods study examining how migration experiences, social bonds, and transnational connections shape HIV prevention decision-making pathways among African immigrants in the United States.',
    focusAreas: [
      'Health Equity, Social Context & Structural Determinants',
      'Community-Engaged Research & Co-Production',
    ],
    status: 'active',
    fundingSource: 'Yale Center for Interdisciplinary Research on AIDS (CIRA)',
    location: 'United States',
  },
  {
    id: 'divergent-stigma',
    title: 'Divergent Effects of HIV and PrEP Stigma Among African Immigrants',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'Research examining how HIV-related stigma and PrEP-related stigma have divergent effects on prevention uptake and care engagement among African immigrants in the United States.',
    focusAreas: [
      'Trust, Stigma & Healthcare Engagement',
      'Prevention, Screening & Early Intervention',
    ],
    status: 'active',
    location: 'United States',
  },
];

/**
 * Community initiatives: activities that extend the lab's scientific
 * mission beyond the boundaries of a conventional research study.
 */
export const communityInitiatives: CommunityInitiative[] = [
  {
    id: 'c4-workshop',
    title: 'C4 Workshop Series',
    purpose:
      'A community workshop series bringing young people, families, and local partners together to learn, share, and shape the lab\u2019s HIV prevention work. Sessions blend skill-building with open conversation so research priorities reflect community voices.',
    population: 'Young people, families, and community partners',
    location: 'Ghana',
    relationship:
      'Feeds community priorities directly into the lab\u2019s community-engaged research studies, including Y-FIT Ghana and WISE WOMAN.',
    imageUrl: '/images/news/c4-workshop-1.jpg',
  },
  {
    id: 'yfit-contest-sprint',
    title: 'Y-FIT GH Youth HIV Contest Sprint and Workshop',
    purpose:
      'A national open call and innovation sprint that invited young people across Ghana to submit bold ideas for HIV self-testing and PrEP, followed by a workshop where the strongest ideas were refined into prototypes.',
    population: 'Young changemakers across Ghana',
    location: 'Ghana',
    collaborators: 'Y-FIT GH community partners and mentors',
    relationship:
      'The participatory design phase of the Y-FIT Ghana innovation pipeline, generating youth-generated strategies that shape intervention development.',
    imageUrl: '/images/news/yfit-gh-2.jpg',
  },
  {
    id: 'school-outreach',
    title: 'School Outreach Visits',
    purpose:
      'Classroom visits that share age-appropriate HIV education, introduce students to public health careers, and gather youth perspectives on stigma and testing.',
    population: 'Secondary school students',
    location: 'Ghana',
    collaborators: 'Y-FIT GH network schools',
    relationship:
      'Community engagement and priority setting that informs the lab\u2019s youth-led prevention research.',
    imageUrl: '/images/news/yamh-collab-2.jpg',
  },
];

/**
 * Completed projects: studies that have wrapped up.
 */
export const completedProjects: ResearchProject[] = [
  {
    id: 'religiosity-gender',
    title: 'Religiosity and Gender Norms as Determinants of HIV and PrEP Stigma',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'A cross-sectional study with 764 Ghanaian immigrants recruited across 44 states, examining how religiosity and gender norms are associated with HIV- and PrEP-related stigma. Key findings show higher religiosity associated with greater PrEP stigma and endorsement of inequitable gender norms strongly associated with both PrEP and HIV stigma.',
    focusAreas: [
      'Trust, Stigma & Healthcare Engagement',
      'Health Equity, Social Context & Structural Determinants',
    ],
    status: 'completed',
    fundingSource: 'University at Buffalo',
    location: 'United States',
  },
  {
    id: 'suicide-adolescents',
    title: '"It\u2019s a Sin Against God": Ghanaian Adolescents, Suicide, and HIV',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'A study understanding how Ghanaian adolescents frame suicide as sin, taboo, and crime, and the implications for HIV prevention and mental health interventions in this population.',
    focusAreas: [
      'Trust, Stigma & Healthcare Engagement',
      'Community-Engaged Research & Co-Production',
    ],
    status: 'completed',
    fundingSource: 'University at Buffalo',
    location: 'Ghana',
  },
  {
    id: 'tumaini-lancet',
    title: 'Tumaini Digital Narrative Intervention: Lancet Commentary',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'A commentary in The Lancet discussing the significance of a major randomized controlled trial evaluating Tumaini, a digital narrative intervention for HIV prevention among African immigrant communities.',
    focusAreas: ['Digital Health & Innovation', 'Implementation Science'],
    status: 'completed',
    location: 'United States',
  },
];

/**
 * Future projects: anticipated work in development.
 */
export const upcomingProjects: ResearchProject[] = [
  {
    id: 'vcu-community-partnerships',
    title: 'Community Partnerships in Central Virginia',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'As the lab establishes its new home at the Virginia Commonwealth University School of Public Health, we are building partnerships with community organizations across Central Virginia to extend our community-driven HIV prevention research to African immigrant and Black communities in the region. Details coming soon.',
    focusAreas: [
      'Community-Engaged Research & Co-Production',
      'Health Equity, Social Context & Structural Determinants',
    ],
    status: 'upcoming',
    location: 'United States',
  },
];

/** All projects combined, in case callers want the full list. */
export const researchProjects: ResearchProject[] = [
  ...currentProjects,
  ...completedProjects,
  ...upcomingProjects,
];

/**
 * Methodological approaches, selected in response to the scientific
 * question, implementation context, and community needs.
 */
export const approachMethods: string[] = [
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
];

/** How the six scientific domains connect into one research program. */
export const integratedProgram: { domain: string; connection: string }[] = [
  {
    domain: 'Community-engaged research',
    connection: 'informs whose knowledge shapes the science.',
  },
  {
    domain: 'Implementation science',
    connection: 'examines how evidence moves into practice.',
  },
  {
    domain: 'Prevention and early intervention',
    connection: 'focuses on what interventions and services need to reach people earlier.',
  },
  {
    domain: 'Health equity',
    connection: 'examines the conditions that structure access and outcomes.',
  },
  {
    domain: 'Digital health',
    connection: 'explores new modes of delivery and engagement.',
  },
  {
    domain: 'Trust and stigma research',
    connection:
      'examines the relational and institutional processes that influence whether interventions are accepted and used.',
  },
];
