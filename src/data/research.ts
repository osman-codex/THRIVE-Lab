export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type ProjectStatus = 'active' | 'completed' | 'upcoming';

export interface ResearchProject {
  id: string;
  title: string;
  principalInvestigator: string;
  summary: string;
  focusAreas: string[];
  status: ProjectStatus;
  fundingSource?: string;
  imageUrl?: string;
}

export const researchAreas: ResearchArea[] = [
  {
    id: 'hiv-prevention',
    title: 'HIV Prevention & PrEP Access',
    description:
      'Developing and evaluating culturally tailored strategies to improve access to and uptake of pre-exposure prophylaxis (PrEP) and HIV self-testing among African immigrant communities.',
    icon: '🛡️',
  },
  {
    id: 'health-equity',
    title: 'Health Equity & Social Determinants',
    description:
      'Investigating how structural factors, including immigration policy, religiosity, gender norms, and healthcare access, shape HIV risk and outcomes for immigrant and refugee populations.',
    icon: '⚖️',
  },
  {
    id: 'community-engagement',
    title: 'Community-Driven Research',
    description:
      'Centering community voices through participatory research methods, youth-led interventions, and partnerships with grassroots organizations in the U.S. and West Africa.',
    icon: '🤝',
  },
  {
    id: 'implementation-science',
    title: 'Implementation Science',
    description:
      'Translating evidence-based HIV interventions into real-world settings with fidelity, sustainability, and cultural responsiveness among immigrant and refugee populations.',
    icon: '🔬',
  },
  {
    id: 'digital-health',
    title: 'Digital Health Innovation',
    description:
      'Leveraging technology and digital tools, from WhatsApp-based recruitment to mobile interventions and digital narratives, to expand HIV prevention and self-care for underserved communities.',
    icon: '💻',
  },
  {
    id: 'stigma-reduction',
    title: 'Stigma Reduction & Cultural Factors',
    description:
      'Addressing intersecting stigmas around HIV, PrEP, race, and immigration status, shaped by religiosity and gender norms, and their impact on prevention engagement and care.',
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
    focusAreas: ['HIV Prevention & PrEP Access', 'Community-Driven Research', 'Digital Health Innovation'],
    status: 'active',
    fundingSource: 'University at Buffalo',
    imageUrl: '/images/news/yfit-gh-1.jpg',
  },
  {
    id: 'mist-pathways',
    title: 'MiST-Pathways: Migration, Social Bonds, Transnationalism, and HIV Prevention',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'A mixed-methods study examining how migration experiences, social bonds, and transnational connections shape HIV prevention decision-making pathways among African immigrants in the United States.',
    focusAreas: ['Health Equity & Social Determinants', 'Community-Driven Research'],
    status: 'active',
  },
  {
    id: 'wise-woman',
    title: 'WISE WOMAN Study',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'A four-week online program co-developed with community input, focused on understanding and addressing HIV prevention needs among women, with an emphasis on culturally responsive approaches and health equity.',
    focusAreas: ['HIV Prevention & PrEP Access', 'Health Equity & Social Determinants'],
    status: 'active',
  },
  {
    id: 'divergent-stigma',
    title: 'Divergent Effects of HIV and PrEP Stigma Among African Immigrants',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'Research examining how HIV-related stigma and PrEP-related stigma have divergent effects on prevention uptake and care engagement among African immigrants in the United States.',
    focusAreas: ['Stigma Reduction & Cultural Factors', 'HIV Prevention & PrEP Access'],
    status: 'active',
  },
  {
    id: 'c4-workshop',
    title: 'C4 Workshop Series',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'A community workshop series bringing young people, families, and local partners together to learn, share, and shape the lab\u2019s HIV prevention work. Sessions blend skill-building with open conversation so research priorities reflect community voices.',
    focusAreas: ['Community-Driven Research', 'Stigma Reduction & Cultural Factors'],
    status: 'active',
    imageUrl: '/images/news/c4-workshop-1.jpg',
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
    focusAreas: ['Stigma Reduction & Cultural Factors', 'Health Equity & Social Determinants'],
    status: 'completed',
    fundingSource: 'University at Buffalo',
  },
  {
    id: 'suicide-adolescents',
    title: '"It\u2019s a Sin Against God": Ghanaian Adolescents, Suicide, and HIV',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'A study understanding how Ghanaian adolescents frame suicide as sin, taboo, and crime, and the implications for HIV prevention and mental health interventions in this population.',
    focusAreas: ['Stigma Reduction & Cultural Factors', 'Community-Driven Research'],
    status: 'completed',
    fundingSource: 'University at Buffalo',
  },
  {
    id: 'tumaini-lancet',
    title: 'Tumaini Digital Narrative Intervention: Lancet Commentary',
    principalInvestigator: 'Dr. Gloria Aidoo-Frimpong',
    summary:
      'A commentary in The Lancet discussing the significance of a major randomized controlled trial evaluating Tumaini, a digital narrative intervention for HIV prevention among African immigrant communities.',
    focusAreas: ['Digital Health Innovation', 'Implementation Science'],
    status: 'completed',
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
    focusAreas: ['Community-Driven Research', 'Health Equity & Social Determinants'],
    status: 'upcoming',
  },
];

/** All projects combined, in case callers want the full list. */
export const researchProjects: ResearchProject[] = [
  ...currentProjects,
  ...completedProjects,
  ...upcomingProjects,
];

export const approachPillars = [
  {
    title: 'Community-Centered',
    description:
      'We partner with communities from the earliest stages of research design, ensuring our work reflects the priorities and lived experiences of African immigrant and refugee populations.',
  },
  {
    title: 'Culturally Tailored',
    description:
      'All interventions are developed with cultural humility and adapted to the specific sociocultural contexts of African immigrant communities in the U.S. and West Africa.',
  },
  {
    title: 'Evidence-Based',
    description:
      'We employ rigorous epidemiological and mixed-methods approaches while centering equity, producing research that is both methodologically sound and socially impactful.',
  },
  {
    title: 'Interdisciplinary',
    description:
      'Our team brings together expertise in epidemiology, implementation science, community health, and social science to address complex HIV prevention challenges.',
  },
];
