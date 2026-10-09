export type PublicationType =
  | 'journal-article'
  | 'book-chapter'
  | 'report'
  | 'conference-paper'
  | 'preprint'
  | 'commentary';

/** Top-level categories shown as sections on the Publications page. */
export type PublicationCategory = 'peer-reviewed' | 'preprint' | 'conference' | 'under-review';

export const CATEGORY_LABELS: Record<PublicationCategory, string> = {
  'peer-reviewed': 'Peer-Reviewed Publications',
  'preprint': 'Pre-prints',
  'conference': 'Conference Presentations',
  'under-review': 'In Press & Under Review',
};

export const CATEGORY_ORDER: PublicationCategory[] = [
  'peer-reviewed',
  'preprint',
  'conference',
  'under-review',
];

export const CATEGORY_DESCRIPTIONS: Record<PublicationCategory, string> = {
  'peer-reviewed':
    'Published work in peer-reviewed journals, led by or co-authored with lab members.',
  'preprint':
    'Findings shared ahead of formal peer review.',
  'conference':
    'Talks, posters, and workshops presented by the team.',
  'under-review':
    'Manuscripts currently in press or under journal review.',
};

/** Map publication types to their display category. */
const TYPE_TO_CATEGORY: Record<PublicationType, PublicationCategory> = {
  'journal-article': 'peer-reviewed',
  'commentary': 'peer-reviewed',
  'book-chapter': 'peer-reviewed',
  'report': 'peer-reviewed',
  'preprint': 'preprint',
  'conference-paper': 'conference',
};

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  abstract: string;
  tags: string[];
  type: PublicationType;
  /** Overrides the category derived from `type` when set. */
  category?: PublicationCategory;
  /** Presented at, e.g. "USCHA 2024, New Orleans, LA". */
  venue?: string;
  /** Presentation format for conference entries. */
  presentationType?: 'Oral' | 'Poster' | 'Workshop' | 'Roundtable';
}

export function getPublicationCategory(pub: Publication): PublicationCategory {
  return pub.category ?? TYPE_TO_CATEGORY[pub.type];
}

export const publications: Publication[] = [
  // -------------------------------------------------------------
  // Peer-reviewed publications with at least one lab member
  // -------------------------------------------------------------
  {
    id: 'pub-religiosity-2026',
    title: 'Religiosity and Gender Norms as Determinants of HIV and PrEP Stigma among Ghanaian Immigrants in the United States',
    authors: ['Abubakar, A.T.', 'Obeng, Y.A.', 'Mensa, W.K.', 'Anyidoho, D.S.', 'Aidoo-Frimpong, G.'],
    journal: 'Journal of Racial and Ethnic Health Disparities',
    year: 2026,
    doi: '10.1007/s40615-026-02924-0',
    abstract: 'Beyond biomedical advances, sociocultural forces such as stigma, religiosity, and gender norms continue to drive HIV disparities among African immigrants in the United States. This cross-sectional study with 764 Ghanaian immigrants found that higher religiosity was associated with greater PrEP stigma and HIV stigma, and endorsement of inequitable gender norms showed stronger associations with both. Interventions that engage faith leaders and promote gender equity are critical to reducing stigma and ensuring equitable access to prevention tools.',
    tags: ['African immigrants', 'Gender norms', 'HIV stigma', 'PrEP stigma', 'Religiosity', 'Health disparities'],
    type: 'journal-article',
  },
  {
    id: 'pub-yfit-crowdsourcing-2026',
    title: 'Strategies to Promote HIV Self-Testing and Long-Acting Injectable PrEP Among Ghanaian Youth: Results from the Y-FIT GH National Crowdsourcing Open Call',
    authors: ['Aidoo-Frimpong, G.', 'Abubakar, A.T.', 'Obeng, Y.A.', 'Mensa, W.K.', 'Anyidoho, D.S.', 'Ortsin, E.', 'Addo, S.A.', 'Affum-Adjei Awuah, A.', 'Nwaozuru, U.', 'Vanderpuye, N.A.', 'Sowah, P.', 'Ojo, T.', 'Iwelunmor, J.', 'Ni, Z.', 'Y-FIT GH Study Team'],
    journal: 'AIDS and Behavior',
    year: 2026,
    doi: '10.1007/s10461-026-05295-z',
    abstract: 'This paper reports results from the Y-FIT GH national crowdsourcing open call, which invited young people across Ghana to submit bold ideas for improving HIV self-testing and long-acting injectable PrEP uptake. The open call surfaced youth-driven strategies that reflect the lived realities of Ghanaian youth and directly shaped the design of the next phases of the Y-FIT Ghana innovation pipeline.',
    tags: ['youth', 'HIV self-testing', 'PrEP', 'Ghana', 'crowdsourcing', 'participatory research'],
    type: 'journal-article',
  },
  {
    id: 'pub-human-centered-security-2026',
    title: 'Human-Centered Security in Practice: Evidence from Y-FIT Ghana on Privacy, Trust, and Youth Engagement in Health Technology Systems for HIV Prevention',
    authors: ['Aidoo-Frimpong, G.', 'Abubakar, A.T.', 'Owusu, E.'],
    journal: 'Frontiers in Computer Science',
    year: 2026,
    doi: '10.3389/fcomp.2026.1859464',
    abstract: 'This paper examines the application of human-centered security principles in the Y-FIT Ghana project, providing evidence-based insights into how digital health interventions for HIV prevention can be designed with security and privacy considerations at the forefront.',
    tags: ['human-centered design', 'digital health', 'security', 'HIV prevention', 'Ghana'],
    type: 'journal-article',
  },
  {
    id: 'pub-divergent-stigma-2026',
    title: 'Divergent Effects of HIV and Pre-Exposure Prophylaxis Stigma on Willingness to Adopt Preventive Tools among African Immigrants in the United States',
    authors: ['Mensa, W.K.', 'Obeng, Y.A.', 'Abubakar, A.T.', 'Anyidoho, D.S.', 'Aidoo-Frimpong, G.'],
    journal: 'AIDS Care',
    year: 2026,
    doi: '10.1080/09540121.2026.2645447',
    abstract: 'This study examines how HIV-related stigma and PrEP-related stigma exert divergent effects on willingness to adopt preventive tools among African immigrants, highlighting the need for distinct approaches to addressing each form of stigma in this population.',
    tags: ['HIV stigma', 'PrEP stigma', 'African immigrants', 'prevention'],
    type: 'journal-article',
  },
  {
    id: 'pub-suicide-adolescents-2026',
    title: '"It\u2019s a Sin Against God": Understanding How Ghanaian Adolescents Frame Suicide as Sin, Taboo, and Crime',
    authors: ['Azasu, E.K.', 'Lateef, A.', 'Zulu, G.', 'Ali, E.', 'Obeng, Y.A.', 'Abubakar, A.T.', 'Aidoo-Frimpong, G.'],
    journal: 'International Journal of Adolescent Medicine and Health',
    year: 2026,
    doi: '10.1515/ijamh-2025-0202',
    abstract: 'This study explored how Ghanaian adolescents construct meaning around suicide through lenses of sin, taboo, and crime, with implications for HIV prevention and mental health interventions targeting young people in this community.',
    tags: ['adolescents', 'Ghana', 'suicide', 'mental health', 'cultural factors', 'HIV'],
    type: 'journal-article',
  },
  // -------------------------------------------------------------
  // Pre-prints
  // -------------------------------------------------------------
  {
    id: 'pub-yfit-ghana-2026',
    title: 'Y-FIT Ghana: A Study Protocol for a Youth-Led Participatory Approach to Promote Youth-Friendly HIV Self-Testing, Oral and Long-Acting Injectable Pre-Exposure Prophylaxis Uptake in Ghana',
    authors: ['Aidoo-Frimpong, G.', 'Abubakar, A.T.', 'Obeng, Y.A.', 'Mensa, W.K.', 'Anyidoho, D.S.', 'Ortsin, E.', 'Y-FIT GH Study Team'],
    journal: 'medRxiv (Preprint)',
    year: 2026,
    doi: '10.64898/2026.02.23.26346606',
    abstract: 'This study protocol outlines a youth-led participatory approach to promote youth-friendly HIV self-testing (oral and long-acting injectable) and PrEP uptake in Ghana. The Y-FIT intervention combines human-centered design with community-based implementation science methods to address barriers to HIV prevention among young people.',
    tags: ['youth', 'HIV self-testing', 'PrEP', 'Ghana', 'participatory research', 'implementation science'],
    type: 'preprint',
  },
  {
    id: 'pub-wise-woman-protocol-2026',
    title: 'Co-Developing a Women-Centered HIV Prevention Intervention to Reduce Stigma, Increase HIV Self-Testing, and Improve Pre-Exposure Prophylaxis (PrEP) Uptake in Ghana (WISE WOMAN): A Study Protocol',
    authors: ['Aidoo-Frimpong, G.', 'Obeng, Y.A.', 'Abubakar, A.T.', 'Mensa, W.K.', 'Anyidoho, D.S.'],
    journal: 'medRxiv (Preprint)',
    year: 2026,
    doi: '10.64898/2026.04.01.26349993',
    abstract: 'This paper describes the protocol for the WISE WOMAN study, a women-centered HIV prevention intervention co-developed with community input to reduce stigma, increase HIV self-testing, and improve PrEP uptake in Ghana, integrating culturally responsive design principles throughout.',
    tags: ['women-centered', 'HIV prevention', 'co-development', 'cultural responsiveness', 'intervention design'],
    type: 'preprint',
  },
  {
    id: 'pub-mist-pathways-2026',
    title: 'Examining Migration, Social Bonds, Transnationalism, and HIV Prevention Pathways among African Immigrants (MiST-Pathways): A Study Protocol',
    authors: ['Aidoo-Frimpong, G.', 'MiST-Pathways Study Team'],
    journal: 'medRxiv (Preprint)',
    year: 2026,
    doi: '10.64898/2026.05.27.26354266',
    abstract: 'This study protocol examines how migration experiences, social bonds, and transnational connections shape HIV prevention decision-making pathways among African immigrants in the United States. The MiST-Pathways study employs mixed methods to explore the complex interplay between social networks and prevention engagement.',
    tags: ['migration', 'African immigrants', 'HIV prevention', 'transnationalism', 'social bonds', 'mixed methods'],
    type: 'preprint',
  },
  // -------------------------------------------------------------
  // Conference presentations with lab members
  // -------------------------------------------------------------
  {
    id: 'pub-uscha-2024',
    title: 'Autonomy and Trust Impact PrEP Discussions among African Immigrants',
    authors: ['Obeng, Y.A.', 'Abubakar, A.T.', 'Ekpor, E.', 'Baah Konadu, B.', 'Kpeli Sam, A.A.', 'Aidoo-Frimpong, G.'],
    journal: 'United States Conference on HIV/AIDS (USCHA)',
    year: 2024,
    abstract: 'Workshop presentation at the 2024 United States Conference on HIV/AIDS exploring how autonomy and trust shape PrEP discussions among African immigrant communities.',
    tags: ['conference', 'PrEP', 'autonomy', 'trust', 'African immigrants'],
    type: 'conference-paper',
    venue: '2024 United States Conference on HIV/AIDS (USCHA), New Orleans, LA',
    presentationType: 'Workshop',
  },
  {
    id: 'pub-apha-2024-prep-stigma',
    title: 'Exploring the Association between PrEP Stigma, HIV Stigma, and Willingness for PrEP Uptake among US-based African Immigrants',
    authors: ['Ekpor, E.', 'Obeng, Y.A.', 'Abubakar, A.T.', 'Baah Konadu, B.', 'Kpeli Sam, A.A.', 'Aidoo-Frimpong, G.'],
    journal: 'American Public Health Association Annual Meeting & Expo',
    year: 2024,
    abstract: 'Oral presentation at the 2024 American Public Health Association Annual Meeting & Expo examining associations between PrEP stigma, HIV stigma, and willingness to take up PrEP among US-based African immigrants.',
    tags: ['conference', 'PrEP stigma', 'HIV stigma', 'African immigrants'],
    type: 'conference-paper',
    venue: '2024 APHA Annual Meeting & Expo, Minneapolis, MN',
    presentationType: 'Oral',
  },
  {
    id: 'pub-apha-2024-gender-religiosity',
    title: 'Examining the Influence of Gender Norms and Religiosity on HIV and PrEP Stigma to Enhance Prevention Strategies among African Immigrants in the United States',
    authors: ['Abubakar, A.T.', 'Baah Konadu, B.', 'Ekpor, E.', 'Kpeli Sam, A.A.', 'Obeng, Y.A.', 'Aidoo-Frimpong, G.'],
    journal: 'American Public Health Association Annual Meeting & Expo',
    year: 2024,
    abstract: 'Poster presentation at the 2024 American Public Health Association Annual Meeting & Expo on how gender norms and religiosity influence HIV and PrEP stigma among African immigrants, informing prevention strategies.',
    tags: ['conference', 'gender norms', 'religiosity', 'HIV stigma', 'PrEP stigma'],
    type: 'conference-paper',
    venue: '2024 APHA Annual Meeting & Expo, Minneapolis, MN',
    presentationType: 'Poster',
  },
  // -------------------------------------------------------------
  // In press / under review, with lab members
  // -------------------------------------------------------------
  {
    id: 'pub-youth-generated-framework',
    title: 'A Youth-Generated Digital Engagement Framework for HIV Prevention and Care: Findings from the Y-FIT GH National Open Call in Ghana',
    authors: ['Aidoo-Frimpong, G.', 'Abubakar, A.T.', 'Obeng, Y.A.', 'Oduro, M.A.', 'Awini Asitanga, D.', 'Kingori, C.', 'Sowah, P.', 'Olagoke, A.', 'Iwelunmor, J.', 'Ni, Z.', 'Y-FIT GH Study Team'],
    journal: 'BMC Digital Health',
    year: 2026,
    abstract: 'Develops a youth-generated digital engagement framework for HIV prevention and care based on findings from the Y-FIT GH national open call in Ghana.',
    tags: ['youth engagement', 'digital health', 'Ghana', 'HIV prevention'],
    type: 'journal-article',
    category: 'under-review',
  },
  {
    id: 'pub-communicating-within-systems',
    title: 'Communicating within Systems: Lessons from Y-FIT on Youth-Driven HIV Prevention Communication in Ghana',
    authors: ['Aidoo-Frimpong, G.', 'Awini Asitanga, D.', 'Abubakar, A.T.', 'Kommey, M.', 'Oduro, M.A.', 'Adom, D.A.', 'Obeng, Y.A.'],
    journal: 'Journal of Health Communication',
    year: 2026,
    abstract: 'Draws lessons from Y-FIT Ghana on how young people drive HIV prevention communication within existing health and social systems.',
    tags: ['health communication', 'youth', 'Ghana', 'HIV prevention'],
    type: 'journal-article',
    category: 'under-review',
  },
  {
    id: 'pub-visibility-surveillance',
    title: 'Visibility, Surveillance, and Social Risk in Pre-Exposure Prophylaxis Decision-Making among Ghanaians: A Qualitative Analysis',
    authors: ['Adom, D.A.', 'Abubakar, A.T.', 'Obeng, Y.A.', 'Oduro, M.A.', 'Aidoo-Frimpong, G.'],
    journal: 'AIDS Care',
    year: 2026,
    abstract: 'A qualitative analysis of how visibility, surveillance, and social risk shape PrEP decision-making among Ghanaians.',
    tags: ['PrEP', 'qualitative research', 'Ghana', 'social risk'],
    type: 'journal-article',
    category: 'under-review',
  },
  {
    id: 'pub-multilevel-determinants-yfit',
    title: 'Multilevel Determinants of Implementing Y-FIT GH, a Youth-Led Social Innovation Pipeline for HIV Prevention in Ghana: A Qualitative Analysis',
    authors: ['Aidoo-Frimpong, G.', 'Oduro, M.A.', 'Abubakar, A.T.', 'Sowah, P.', 'Ortsin, E.', 'Addo, S.A.', 'Y-FIT GH Study Team'],
    journal: 'Prevention Science',
    year: 2026,
    abstract: 'A qualitative analysis of the multilevel determinants of implementing Y-FIT GH, a youth-led social innovation pipeline for HIV prevention in Ghana.',
    tags: ['implementation science', 'youth', 'Ghana', 'HIV prevention'],
    type: 'journal-article',
    category: 'under-review',
  },
  {
    id: 'pub-wise-woman-plos-one',
    title: 'Co-Developing a Women-Centered HIV Prevention Intervention to Reduce Stigma, Increase HIV Self-Testing, and Improve Pre-Exposure Prophylaxis Uptake in Ghana: The WISE WOMAN Study Protocol',
    authors: ['Aidoo-Frimpong, G.', 'Obeng, Y.A.', 'Abubakar, A.T.', 'Mensa, W.K.', 'Anyidoho, D.S.'],
    journal: 'PLOS ONE',
    year: 2026,
    abstract: 'Journal version of the WISE WOMAN study protocol, under review at PLOS ONE.',
    tags: ['women-centered', 'HIV prevention', 'protocol', 'Ghana'],
    type: 'journal-article',
    category: 'under-review',
  },
  {
    id: 'pub-autonomy-medical-mistrust',
    title: 'Autonomy Support, Medical Mistrust, and Willingness to Discuss Pre-Exposure Prophylaxis among Ghanaian Immigrants in the United States',
    authors: ['Obeng, Y.A.', 'Abubakar, A.T.', 'Mensa, W.K.', 'Adzrago, D.', 'Aidoo-Frimpong, G.'],
    journal: 'Journal of Racial and Ethnic Health Disparities',
    year: 2026,
    abstract: 'Examines how autonomy support and medical mistrust relate to willingness to discuss PrEP among Ghanaian immigrants in the United States.',
    tags: ['PrEP', 'autonomy', 'medical mistrust', 'Ghanaian immigrants'],
    type: 'journal-article',
    category: 'under-review',
  },
  {
    id: 'pub-social-media-yfit',
    title: 'Leveraging Social Media for Youth Engagement in HIV Prevention: Findings from the Y-FIT GH Open Call Campaign in Ghana',
    authors: ['Aidoo-Frimpong, G.', 'Biddah, S.A.', 'Oduro, M.A.', 'Abubakar, A.T.', 'Obeng, Y.A.', 'Adom, D.A.', 'Mensa, W.K.', 'Ankrah, B.', 'Anyidoho, D.S.', 'Sowah, P.', 'Ortsin, E.', 'Addo, S.A.', 'Kingori, C.', 'Iwelunmor, J.', 'Y-FIT GH Study Team'],
    journal: 'Health Promotion International',
    year: 2026,
    abstract: 'Findings from the Y-FIT GH open call campaign on leveraging social media for youth engagement in HIV prevention in Ghana.',
    tags: ['social media', 'youth engagement', 'Ghana', 'HIV prevention'],
    type: 'journal-article',
    category: 'under-review',
  },
  {
    id: 'pub-wise-woman-cocreation',
    title: 'Co-Developing a Women-Centered HIV Prevention Intervention in Ghana: Report from the WISE WOMAN Co-Creation Workshop',
    authors: ['Aidoo-Frimpong, G.', 'Mensa, W.K.', 'Anyidoho, D.S.', 'Obeng, Y.A.', 'Abubakar, A.T.', 'Oduro, M.A.'],
    journal: 'BMC Health Services Research',
    year: 2026,
    abstract: 'A report from the WISE WOMAN co-creation workshop documenting the co-development of a women-centered HIV prevention intervention in Ghana.',
    tags: ['co-creation', 'women-centered', 'HIV prevention', 'Ghana'],
    type: 'journal-article',
    category: 'under-review',
  },
  {
    id: 'pub-not-taught-adolescents',
    title: '"We Are Not Taught, We Just Know Little": A Qualitative Exploration of Ghanaian Adolescents\u2019 Meaning-Making of Sexual Health',
    authors: ['Aidoo-Frimpong, G.', 'Mohammed, A.', 'Adom, D.A.', 'Oduro, M.A.', 'Obeng, Y.A.', 'Abubakar, A.T.', 'Azasu, E.K.'],
    journal: 'Youth & Society',
    year: 2026,
    abstract: 'A qualitative exploration of how Ghanaian adolescents make meaning of sexual health, with implications for youth-centered prevention programming.',
    tags: ['adolescents', 'sexual health', 'Ghana', 'qualitative research'],
    type: 'journal-article',
    category: 'under-review',
  },
];

/** Group publications into display categories, sorted by year descending. */
export function getPublicationsByCategory(): Record<PublicationCategory, Publication[]> {
  const grouped: Record<PublicationCategory, Publication[]> = {
    'peer-reviewed': [],
    'preprint': [],
    'conference': [],
    'under-review': [],
  };
  const sorted = [...publications].sort(
    (a, b) => b.year - a.year || a.title.localeCompare(b.title),
  );
  for (const pub of sorted) {
    grouped[getPublicationCategory(pub)].push(pub);
  }
  return grouped;
}

/** Group publications by year (sorted year descending, then title ascending). */
export function getPublicationsByYear(): Record<number, Publication[]> {
  const sorted = [...publications].sort(
    (a, b) => b.year - a.year || a.title.localeCompare(b.title),
  );
  const grouped: Record<number, Publication[]> = {};
  for (const pub of sorted) {
    if (!grouped[pub.year]) grouped[pub.year] = [];
    grouped[pub.year].push(pub);
  }
  return grouped;
}

export function getUniqueTags(): string[] {
  const tags = new Set<string>();
  for (const pub of publications) {
    for (const tag of pub.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}
