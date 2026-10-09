/**
 * Funding portfolio for The THRIVE Lab.
 *
 * All entries are transcribed from Dr. Aidoo-Frimpong's curriculum vitae
 * (Aidoo-Frimpong_CV_7.29.26). No amounts are estimated: the portfolio
 * total below is the sum of the individual verified grant amounts.
 */

export type AwardCategory = 'current' | 'collaborative' | 'pilot' | 'completed';

export interface FundingAward {
  id: string;
  title: string;
  role: string;
  organization: string;
  /** Funding mechanism or award type, when stated by the funder. */
  mechanism?: string;
  /** Verified award amount in US dollars. */
 amount?: number;
  year: string;
  /** Geographic setting of the work. */
  setting: string;
  summary: string;
  category: AwardCategory;
}

export interface FundingPartner {
  id: string;
  name: string;
  logo: string;
  /** Relationship shown under the logo. */
  relationship: string;
}

/**
 * Sum of all verified grant amounts in the portfolio (in US dollars).
 * Excludes the HPTN 096 protocol role, which lists no award amount.
 */
export const totalResearchSupport = 2504858.66;

/** Count of funded awards in the portfolio (submitted proposals excluded). */
export const fundedAwardCount = 12;

/** Count of distinct funding organizations across the portfolio. */
export const fundingOrganizationCount = 8;

export const fundingMetrics = [
  {
    value: '$2.5M+',
    label: 'Research Support',
    note: 'Active and completed research support across the portfolio.',
  },
  {
    value: String(fundedAwardCount),
    label: 'Funded Studies & Initiatives',
    note: 'Competitive awards led by or shared with THRIVE investigators.',
  },
  {
    value: String(fundingOrganizationCount),
    label: 'Funding Organizations',
    note: 'Federal, foundation, academic, and institutional funders.',
  },
  {
    value: 'U.S. + Ghana',
    label: 'Research Reach',
    note: 'Research and partnerships spanning national and health-system contexts.',
  },
] as const;

/** Scholarly output metric shown alongside funding on the homepage. */
export const scholarlyWorksMetric = {
  value: '40+',
  label: 'Scholarly Works',
  note: 'Peer-reviewed publications and other scholarly products involving THRIVE investigators and collaborators.',
} as const;

export const currentAwards: FundingAward[] = [
  {
    id: 'rwjf-epistemologies',
    title:
      'Institutionalizing African Epistemologies in U.S. Health Research: A Pilot Study of a Culturally Grounded Framework',
    role: 'Co-Principal Investigator',
    organization: 'Robert Wood Johnson Foundation',
    mechanism: 'Research to Advance Racial and Indigenous Health Equity',
    amount: 499870,
    year: '2026',
    setting: 'United States',
    summary:
      'Examining how African knowledge systems and community perspectives can reshape the production and governance of health research.',
    category: 'current',
  },
  {
    id: 'cira-mist-pathways',
    title:
      'Migration, Social Bonds, Transnationalism, and HIV Prevention Pathways Among African Immigrants',
    role: 'Principal Investigator',
    organization:
      'Center for Interdisciplinary Research on AIDS (CIRA), Yale School of Public Health',
    mechanism:
      'Pilot Projects in HIV/AIDS Prevention Research Program (National Institute of Mental Health Grant No. P30MH062294)',
    amount: 25000,
    year: '2026',
    setting: 'United States',
    summary:
      'Pilot support for the MiST-Pathways study on how migration experiences, social bonds, and transnational connections shape HIV prevention decision-making among African immigrants.',
    category: 'current',
  },
  {
    id: 'pcori-whatsapp',
    title: 'Developing and Testing a Method for Engagement in Research Using WhatsApp',
    role: 'Principal Investigator (Multi-Principal Investigator)',
    organization: 'Patient-Centered Outcomes Research Institute (PCORI)',
    amount: 1892841,
    year: '2026',
    setting: 'United States',
    summary:
      'Developing and testing digital approaches that strengthen meaningful engagement of African immigrant communities in patient-centered research.',
    category: 'current',
  },
  {
    id: 'nimhd-lrp',
    title: 'Advancing HIV Prevention among African Immigrants in the United States',
    role: 'Principal Investigator',
    organization: 'National Institutes of Health (NIMHD)',
    mechanism: 'Loan Repayment Program (LRP)',
    amount: 20409.66,
    year: '2025',
    setting: 'United States',
    summary:
      'Loan repayment support for research advancing HIV prevention among African immigrant communities in the United States.',
    category: 'current',
  },
  {
    id: 'ub-seed-wise-woman',
    title:
      'Co-Developing a Women-Centered HIV Prevention Intervention to Reduce Stigma, Increase HIV Self-Testing, and Improve PrEP Awareness and Uptake in Ghana (WISE WOMAN Study)',
    role: 'Principal Investigator',
    organization: 'University at Buffalo (OIE and OVPRED)',
    mechanism:
      'Seed Funding for External Grants in Global and International Research',
    amount: 10000,
    year: '2025',
    setting: 'Ghana',
    summary:
      'Seed support for developing and testing WISE WOMAN, a women-centered HIV prevention intervention co-developed with community input in Ghana.',
    category: 'current',
  },
];

export const collaborativeAwards: FundingAward[] = [
  {
    id: 'hptn-096',
    title:
      'HPTN 096: Getting to Zero: A Community-Randomized Trial Testing Effects of a Multi-Level Integrated Intervention Strategy to Reduce HIV Incidence among Black MSM in the American South',
    role: 'Protocol Team Member (Co-Investigator)',
    organization: 'HIV Prevention Trials Network (HPTN)',
    year: '2022 - 2025',
    setting: 'United States',
    summary:
      'Participation on the protocol team for a community-randomized trial of a multi-level intervention strategy to reduce HIV incidence among Black men who have sex with men in the American South.',
    category: 'collaborative',
  },
  {
    id: 'fogarty-kappah',
    title:
      'Kumasi & Accra Partnership to Prevent Adolescent HIV (KAPPAH): An In-Country Implementation Science Alliance for Sexual Minority Youth to Optimize the Impact of Evidence on Sexual Minority Youth',
    role: 'Co-Investigator',
    organization: 'NIH Fogarty International Center',
    mechanism: 'Adolescent HIV Prevention and Treatment Implementation Science Alliance (AHISA), Small Collaborative Contracts',
    amount: 37199,
    year: '2024',
    setting: 'Ghana',
    summary:
      'Collaborative implementation science alliance working to optimize the impact of evidence on sexual minority youth in Ghana.',
    category: 'collaborative',
  },
];

export const pilotAwards: FundingAward[] = [
  {
    id: 'c4-fund-lg-studies',
    title:
      'Pilot Implementation of Client-Centered Care Coordination (C4) for HIV Prevention among Gay, Bisexual, and Other Men Who Have Sex with Men in Ghana',
    role: 'Principal Investigator',
    organization: 'Fund for Lesbian and Gay Studies, Yale University',
    amount: 5000,
    year: '2023',
    setting: 'Ghana',
    summary:
      'Pilot implementation of Client-Centered Care Coordination (C4) for HIV prevention in Ghana, the foundation of the lab\u2019s ongoing C4 community workshop series.',
    category: 'completed',
  },
  {
    id: 'c4-hifi-lab',
    title:
      'Pilot Implementation of Client-Centered Care Coordination (C4) for HIV Prevention among Gay, Bisexual, and Other Men Who Have Sex with Men in Ghana',
    role: 'Principal Investigator',
    organization: 'High Impact Field Based Implementation (HiFi) Lab, Yale University',
    amount: 10000,
    year: '2023',
    setting: 'Ghana',
    summary:
      'Field-based pilot support for implementing Client-Centered Care Coordination (C4) for HIV prevention in Ghana.',
    category: 'completed',
  },
  {
    id: 'mark-diamond',
    title:
      'Exploring the Acceptability and Potential Use of Oral Pre-Exposure Prophylaxis for HIV Prevention among Ghanaian Immigrants in the United States of America',
    role: 'Principal Investigator',
    organization: 'Mark Diamond Research Foundation, University at Buffalo',
    amount: 3000,
    year: '2022',
    setting: 'United States',
    summary:
      'Early-stage support for research on oral PrEP acceptability among Ghanaian immigrants in the United States.',
    category: 'pilot',
  },
  {
    id: 'chhb-dissertation',
    title:
      'Exploring the Acceptability and Potential Use of Oral Pre-Exposure Prophylaxis for HIV Prevention among Ghanaian Immigrants in the United States of America',
    role: 'Principal Investigator',
    organization:
      'Department of Community Health and Health Behavior, University at Buffalo',
    mechanism: 'Dissertation Award',
    amount: 1000,
    year: '2022',
    setting: 'United States',
    summary:
      'Dissertation support for research on oral PrEP acceptability among Ghanaian immigrants in the United States.',
    category: 'pilot',
  },
  {
    id: 'imd-award',
    title:
      'Exploring HIV Risk Perception and the Potential for PrEP Use among African Immigrants',
    role: 'Principal Investigator',
    organization: 'Initiative for Maximizing Student Development, University at Buffalo',
    mechanism: 'Research Award',
    amount: 539,
    year: '2021',
    setting: 'United States',
    summary:
      'Student development research award supporting early work on HIV risk perception and PrEP use among African immigrants.',
    category: 'pilot',
  },
];

/**
 * Approved funder and partner logos displayed on the Funding page and
 * the homepage research enterprise section.
 */
export const fundingPartners: FundingPartner[] = [
  {
    id: 'nih',
    name: 'National Institutes of Health',
    logo: '/images/funders/nih.png',
    relationship: 'Research support and training',
  },
  {
    id: 'pcori',
    name: 'Patient-Centered Outcomes Research Institute',
    logo: '/images/funders/pcori.png',
    relationship: 'Patient-centered engagement research',
  },
  {
    id: 'rwjf',
    name: 'Robert Wood Johnson Foundation',
    logo: '/images/funders/rwjf.png',
    relationship: 'Health equity research',
  },
  {
    id: 'yale',
    name: 'Yale University',
    logo: '/images/funders/yale.png',
    relationship: 'Pilot research and postdoctoral training',
  },
  {
    id: 'ub',
    name: 'University at Buffalo',
    logo: '/images/funders/ub.png',
    relationship: 'Seed and institutional research support',
  },
];

/** All awards combined. */
export const allAwards: FundingAward[] = [
  ...currentAwards,
  ...collaborativeAwards,
  ...pilotAwards,
];

/** Pilot & institutional awards still counting toward early-stage support. */
export const pilotSupportAwards: FundingAward[] = pilotAwards.filter(
  (award) => award.category === 'pilot',
);

/** Concluded awards, kept to show the evolution of the research program. */
export const completedAwards: FundingAward[] = pilotAwards.filter(
  (award) => award.category === 'completed',
);
