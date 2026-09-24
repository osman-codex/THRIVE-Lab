export type MemberRole =
  | 'principal-investigator'
  | 'graduate-student'
  | 'postdoc'
  | 'research-assistant'
  | 'staff'
  | 'affiliate';

export interface LabMember {
  id: string;
  name: string;
  title: string;
  role: MemberRole;
  roleLabel: string;
  bio: string;
  /** Path to the member photo. When omitted, initials are shown instead. */
  imageUrl?: string;
  /** Never displayed; individual emails are not published on the site. */
  email?: string;
  orcid?: string;
  linkedin?: string;
  website?: string;
}

/** Display order of role groups on the Team page. */
export const ROLE_ORDER: MemberRole[] = [
  'principal-investigator',
  'postdoc',
  'graduate-student',
  'staff',
  'research-assistant',
  'affiliate',
];

export const ROLE_LABELS: Record<MemberRole, string> = {
  'principal-investigator': 'Principal Investigator',
  'postdoc': 'Postdoctoral Fellows',
  'graduate-student': 'Graduate Students',
  'staff': 'Lab Staff',
  'research-assistant': 'Lab Members',
  'affiliate': 'Affiliates & Collaborators',
};

export const members: LabMember[] = [
  {
    id: 'dr-aidoo-frimpong',
    name: 'Dr. Gloria Aidoo-Frimpong',
    title: 'Principal Investigator, Department of Social and Behavioural Sciences, VCU School of Public Health',
    role: 'principal-investigator',
    roleLabel: 'Principal Investigator',
    bio: 'Dr. Gloria Aidoo-Frimpong is the founder and director of The THRIVE Lab. She is an assistant professor in the Department of Social and Behavioural Sciences at the Virginia Commonwealth University School of Public Health. Her research focuses on global HIV prevention and care, immigrant and refugee health, health disparities, and implementation science. She earned her PhD from the University at Buffalo and an MPH and MA from Ohio University, and completed a T32 NIMH postdoctoral fellowship at the Center for Interdisciplinary Research on AIDS at Yale University.',
    imageUrl: '/images/members/dr-aidoo-frimpong.png',
    orcid: '0000-0002-1413-5658',
    linkedin: 'https://www.linkedin.com/in/gloria-aidoo-frimpong-phd-mph-ma-b2a42460',
  },
  {
    id: 'iddrisu',
    name: 'Osman Abdul-Fatawu Iddrisu',
    title: 'Graduate Student, MPhil Public Health (Field Epidemiology and Applied Biostatistics), KNUST',
    role: 'graduate-student',
    roleLabel: 'Graduate Students',
    bio: 'Osman Abdul-Fatawu Iddrisu is a graduate student at The THRIVE Lab reading for an MPhil in Public Health, specialising in Field Epidemiology and Applied Biostatistics at the Kwame Nkrumah University of Science and Technology (KNUST). His thesis uses mathematical modelling to simulate HIV transmission dynamics in Ghana and evaluate testing, treatment, and prevention strategies. He holds a BSc in Actuarial Science from KNUST and works as a data analyst at the Kumasi Center for Collaborative Research in Tropical Medicine. His research interests span mathematical modelling, spatial and Bayesian statistics, and statistical machine learning.',
    imageUrl: '/images/members/osman.jpg',
    orcid: '0009-0009-4816-7233',
    linkedin: 'http://www.linkedin.com/in/osman-abdul-fatawu-iddrisu-mphil-msc-bsc-48a81334a',
  },
  {
    id: 'nath',
    name: 'Nihith Nath',
    title: 'Graduate Research Assistant',
    role: 'graduate-student',
    roleLabel: 'Graduate Students',
    bio: 'Nihith Nath is a graduate research assistant at The THRIVE Lab, supporting data science and analytical efforts for the lab\u2019s HIV prevention studies. Profile coming soon.',
  },
  {
    id: 'mensa',
    name: 'Winfred Kofi Mensa',
    title: 'Lab Member',
    role: 'research-assistant',
    roleLabel: 'Lab Members',
    bio: 'Winfred Kofi Mensa contributes to The THRIVE Lab\u2019s research on HIV and PrEP stigma among African immigrants, with a focus on epidemiological methods and community-based studies. He is based at the Department of Theoretical and Applied Biosciences at KNUST in Kumasi, Ghana, and has co-authored the lab\u2019s work on religiosity, gender norms, and stigma among Ghanaian immigrant communities. Full profile coming soon.',
    orcid: '0009-0004-1184-8373',
  },
  {
    id: 'obeng',
    name: 'Yaa Adutwumwaa Obeng',
    title: 'Lab Member',
    role: 'research-assistant',
    roleLabel: 'Lab Members',
    bio: 'Yaa Adutwumwaa Obeng is a biostatistician and health data specialist from Offinso, Ghana, with over a decade of experience in health data analysis and management. She holds a BSc in Statistics from the University of Cape Coast and is completing an MSc in Health Informatics at KNUST. She serves as a Biostatistics Officer at St. Patrick\u2019s Hospital and contributes to THRIVE Lab studies on HIV prevention and stigma among Ghanaian immigrant communities, with abstracts presented at USCHA and APHA. Beyond data, she advocates for inclusive health through dyslexia awareness and deaf community empowerment.',
    imageUrl: '/images/members/obeng.jpg',
    orcid: '0009-0002-0465-5816',
    linkedin: 'https://gh.linkedin.com/in/yaaadutwumwaa',
  },
  {
    id: 'abubakar',
    name: 'Abass Tando Abubakar',
    title: 'Lab Member',
    role: 'research-assistant',
    roleLabel: 'Lab Members',
    bio: 'Abass Tando Abubakar works at the intersection of HIV and PrEP stigma, religion, and gender norms, particularly among communities where cultural identity shapes how prevention is understood and used. He serves the lab from Ghana\u2019s Eastern Region, where he works in medical statistics at Hawa Memorial Saviour Hospital in Osiem, and has co-authored the lab\u2019s studies on stigma among Ghanaian immigrants and youth-led HIV prevention through Y-FIT Ghana.',
    orcid: '0009-0001-5888-0237',
    linkedin: 'https://gh.linkedin.com/in/abasabu',
  },
  {
    id: 'biddah',
    name: 'Senam Aku Biddah',
    title: 'Lab Member',
    role: 'research-assistant',
    roleLabel: 'Lab Members',
    bio: 'Senam Aku Biddah contributes to the lab\u2019s youth engagement and communications work on Y-FIT Ghana, including the team\u2019s research on leveraging social media for youth engagement in HIV prevention. Full profile coming soon.',
  },
  {
    id: 'angela',
    name: 'Angela',
    title: 'Lab Member',
    role: 'research-assistant',
    roleLabel: 'Lab Members',
    bio: 'Profile coming soon.',
  },
  {
    id: 'brian',
    name: 'Brian',
    title: 'Lab Member',
    role: 'research-assistant',
    roleLabel: 'Lab Members',
    bio: 'Profile coming soon.',
  },
  {
    id: 'dorcas',
    name: 'Dorcas',
    title: 'Lab Member',
    role: 'research-assistant',
    roleLabel: 'Lab Members',
    bio: 'Profile coming soon.',
  },
  {
    id: 'maame-araba',
    name: 'Maame Araba',
    title: 'Lab Member',
    role: 'research-assistant',
    roleLabel: 'Lab Members',
    bio: 'Profile coming soon.',
  },
  {
    id: 'dr-david',
    name: 'Dr. David',
    title: 'Lab Member',
    role: 'research-assistant',
    roleLabel: 'Lab Members',
    bio: 'Profile coming soon.',
  },
  {
    id: 'anyidoho',
    name: 'Daniel Selase Anyidoho',
    title: 'Research Collaborator',
    role: 'affiliate',
    roleLabel: 'Affiliates & Collaborators',
    bio: 'Daniel Selase Anyidoho is an applied health researcher based in Accra, Ghana, affiliated with the Department of Health Services at Brigham Young University Idaho. He collaborates with The THRIVE Lab on research examining the social and cultural determinants of HIV prevention among African immigrant populations and on youth-led prevention through Y-FIT Ghana.',
    linkedin: 'https://gh.linkedin.com/in/dsanyidoho',
  },
  {
    id: 'asare',
    name: 'Ebenezer Asare',
    title: 'Research Collaborator, West Africa AIDS Foundation',
    role: 'affiliate',
    roleLabel: 'Affiliates & Collaborators',
    bio: 'Ebenezer Asare collaborates with The THRIVE Lab through the West Africa AIDS Foundation on community-based HIV prevention research in West Africa.',
  },
  {
    id: 'azasu',
    name: 'Enock Azasu',
    title: 'Assistant Professor, School of Social Work, University at Buffalo (SUNY)',
    role: 'affiliate',
    roleLabel: 'Affiliates & Collaborators',
    bio: 'Enock Azasu is an Assistant Professor in the School of Social Work at the University at Buffalo (SUNY). His collaborative work with The THRIVE Lab includes research on how Ghanaian adolescents make meaning of sexual health and frame suicide as sin, taboo, and crime, with implications for HIV prevention and adolescent wellbeing.',
  },
];
