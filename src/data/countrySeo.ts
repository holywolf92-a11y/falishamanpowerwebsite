// Per-country SEO enrichment: visa/work routes and FAQs, rendered on the country
// detail page (/countries/[slug]) and used for FAQPage structured data. This is
// the content that makes each market page genuinely unique (not thin/duplicate).
// Kept separate from countryContent.ts so the rich copy is easy to extend.

export type VisaRoute = { name: string; detail: string }
export type Faq = { q: string; a: string }

export type CountrySeo = {
  visaRoutes?: VisaRoute[]
  faqs?: Faq[]
}

// ---- Shared GCC FAQ builder (parameterised per country) ---------------------

function gccFaqs(name: string, idDoc: string): Faq[] {
  return [
    {
      q: `How can I get a job in ${name} from Pakistan?`,
      a: `Apply through a licensed Overseas Employment Promoter: submit your CV, get shortlisted for a matching vacancy, pass the interview and trade test, then complete your medical, work visa and BEOE / Protector formalities before deployment. Browse our current ${name} openings or upload your CV to begin.`,
    },
    {
      q: `Who sponsors the work visa for ${name}?`,
      a: `Your employer in ${name} sponsors the work visa and issues the employment contract. Falisha Manpower (OEP Licence No. 4035) manages sourcing, screening, documentation, visa processing and mobilisation in line with Pakistani and ${name} regulations.`,
    },
    {
      q: `What documents do I need?`,
      a: `Typically a valid passport, an updated CV, trade / education certificates and experience letters, plus a Gulf-approved (GAMCA) medical. Your work visa and ${idDoc} are processed around arrival. We confirm the exact checklist for each role.`,
    },
    {
      q: `What salary and benefits can I expect in ${name}?`,
      a: `Salary depends on your trade, experience and employer. Skilled trades — welders, electricians, HVAC and mechanical technicians — typically earn more than general labour, and most ${name} contracts include free accommodation, transport and medical cover. We confirm the exact salary, benefits and contract terms for every role before you accept.`,
    },
    {
      q: `Do I have to pay fees to get the job?`,
      a: `Falisha Manpower works within Pakistan's regulated overseas-employment framework. We never charge unlawful or hidden fees — any applicable, lawful charges are disclosed transparently and in line with BEOE / Protector rules. Be cautious of anyone demanding large upfront payments.`,
    },
  ]
}

// ---- Generic (non-GCC) builders --------------------------------------------

function workFaqs(name: string, routeAnswer: string): Faq[] {
  return [
    { q: `How can I get a job in ${name} from Pakistan?`, a: routeAnswer },
    {
      q: `Who sponsors the work visa or permit?`,
      a: `Your employer in ${name} sponsors the work permit and issues the employment contract. Falisha Manpower (OEP Licence No. 4035) manages sourcing, screening, documentation and mobilisation in line with Pakistani and ${name} regulations.`,
    },
    {
      q: `What documents do I need?`,
      a: `Typically a valid passport, an updated CV, trade / education certificates and experience letters, plus any role-specific skill or qualification evidence and a medical where required. We confirm the exact checklist for each role in ${name}.`,
    },
    {
      q: `What salary and benefits can I expect in ${name}?`,
      a: `Salary depends on your role, experience, employer and local regulations. Skilled roles typically pay more than general labour, and your contract sets out the salary, hours and any benefits. We confirm the exact terms for every role before you accept.`,
    },
    {
      q: `Do I have to pay fees to get the job?`,
      a: `Falisha Manpower works within Pakistan's regulated overseas-employment framework. We never charge unlawful or hidden fees — any applicable, lawful charges are disclosed transparently and in line with BEOE / Protector rules.`,
    },
  ]
}

function routeAnswerFor(name: string, primary: VisaRoute): string {
  return `Your employer in ${name} secures the required work authorisation (${primary.name}); you then complete the visa, documentation, medical and BEOE / Protector formalities in Pakistan before deployment. Browse our ${name} openings or upload your CV to begin.`
}

const blueCard = (name: string): VisaRoute => ({
  name: 'EU Blue Card',
  detail: `For university graduates with a qualifying job offer in ${name} meeting the salary threshold — a fast route to EU residence.`,
})

function euSeo(name: string, primary: VisaRoute, withBlueCard = true): CountrySeo {
  return {
    visaRoutes: withBlueCard ? [primary, blueCard(name)] : [primary],
    faqs: workFaqs(name, routeAnswerFor(name, primary)),
  }
}

function simpleSeo(name: string, primary: VisaRoute): CountrySeo {
  return { visaRoutes: [primary], faqs: workFaqs(name, routeAnswerFor(name, primary)) }
}

const UK_VISA: VisaRoute[] = [
  {
    name: 'Skilled Worker visa',
    detail:
      'For eligible occupations with a licensed UK sponsor. Requires a Certificate of Sponsorship (CoS), meeting the salary threshold and an approved English-language test.',
  },
  {
    name: 'Health & Care Worker visa',
    detail:
      'For eligible health and adult-social-care roles (care assistants, senior carers, nurses) sponsored by an approved employer — reduced fees and no Immigration Health Surcharge.',
  },
]

export const COUNTRY_SEO: Record<string, CountrySeo> = {
  // ---- Gulf / GCC ----
  'saudi-arabia': {
    visaRoutes: [
      {
        name: 'Employer-sponsored Work Visa',
        detail:
          'Your Saudi employer issues the work visa (block visa / authorisation); it is then stamped via Enjaz at the Saudi embassy in Islamabad before travel.',
      },
      {
        name: 'Iqama (residence permit)',
        detail:
          'After arrival, your employer issues your Iqama, authorising you to live and work in the Kingdom for the contract period.',
      },
    ],
    faqs: gccFaqs('Saudi Arabia', 'Iqama'),
  },
  'united-arab-emirates': {
    visaRoutes: [
      {
        name: 'Employment Entry Permit',
        detail:
          'Your UAE employer applies through MOHRE for an entry permit; the job offer and labour contract are approved before you travel.',
      },
      {
        name: 'Residence Visa & Emirates ID',
        detail: 'After arrival and a medical, your residence visa is stamped and Emirates ID issued for the contract period.',
      },
    ],
    faqs: gccFaqs('the UAE', 'Emirates ID'),
  },
  qatar: {
    visaRoutes: [
      {
        name: 'Employer-sponsored Work Visa',
        detail: 'Your Qatari employer secures the work visa and approved contract; documents are attested before travel.',
      },
      { name: 'Qatar ID (QID)', detail: 'After arrival, a medical and biometrics, your QID is issued for the contract period.' },
    ],
    faqs: gccFaqs('Qatar', 'Qatar ID (QID)'),
  },
  kuwait: {
    visaRoutes: [
      {
        name: 'Work Visa (Article 18)',
        detail: 'Private-sector work is sponsored under an Article 18 visa issued by your Kuwaiti employer.',
      },
      { name: 'Civil ID', detail: 'After arrival and a medical, your residence is stamped and Civil ID issued for the contract period.' },
    ],
    faqs: gccFaqs('Kuwait', 'Civil ID'),
  },
  oman: {
    visaRoutes: [
      {
        name: 'Employment Visa',
        detail: 'Your Omani employer secures the employment visa and labour clearance before travel.',
      },
      { name: 'Resident Card', detail: 'After arrival and a medical, your resident card is issued for the contract period.' },
    ],
    faqs: gccFaqs('Oman', 'Resident Card'),
  },
  bahrain: {
    visaRoutes: [
      {
        name: 'Work Visa via LMRA',
        detail: 'Your Bahraini employer sponsors the work visa through the Labour Market Regulatory Authority (LMRA).',
      },
      { name: 'CPR (ID card)', detail: 'After arrival and a medical, your residence permit and CPR card are issued for the contract period.' },
    ],
    faqs: gccFaqs('Bahrain', 'CPR card'),
  },

  // ---- United Kingdom ----
  'united-kingdom': {
    visaRoutes: [
      {
        name: 'Skilled Worker visa',
        detail:
          'For eligible occupations with a licensed UK sponsor. Requires a Certificate of Sponsorship (CoS), meeting the salary threshold and an approved English-language test.',
      },
      {
        name: 'Health & Care Worker visa',
        detail:
          'For eligible health and adult-social-care roles (care assistants, senior carers, nurses) sponsored by an approved employer — reduced fees and no Immigration Health Surcharge.',
      },
    ],
    faqs: [
      {
        q: 'How can I get a UK work visa from Pakistan?',
        a: 'You first need a job offer from a UK employer who holds a sponsor licence and can issue a Certificate of Sponsorship (CoS). You then apply for the Skilled Worker or Health & Care Worker visa, meeting the English-language and salary requirements for the role.',
      },
      {
        q: 'Do I need IELTS or an English test?',
        a: 'Yes. Most UK work visas require you to prove English at the required level, usually through an approved Secure English Language Test (such as IELTS for UKVI) unless you qualify for an exemption.',
      },
      {
        q: 'Which roles are most in demand in the UK?',
        a: 'Health and social care (care assistants, senior carers, nurses) is the largest route, alongside construction, hospitality, food processing and logistics.',
      },
      {
        q: 'Does an employer have to sponsor me?',
        a: 'Yes — UK Skilled Worker and Health & Care routes require a licensed sponsor and a Certificate of Sponsorship. We work with employers and partners to match you to sponsored roles.',
      },
    ],
  },

  // ---- Germany ----
  germany: {
    visaRoutes: [
      {
        name: 'Skilled Worker visa (Skilled Immigration Act)',
        detail:
          'For applicants with a recognised vocational or academic qualification and a job offer. Your Pakistani qualification is assessed for recognition (Anerkennung).',
      },
      {
        name: 'EU Blue Card',
        detail: 'For university graduates with a qualifying job offer meeting the salary threshold — a fast track to residence.',
      },
      {
        name: 'Opportunity Card (Chancenkarte)',
        detail: 'A points-based job-seeker route that lets qualified applicants come to Germany to look for work.',
      },
    ],
    faqs: [
      {
        q: 'Do I need my qualification recognised to work in Germany?',
        a: 'For most skilled roles, yes — your Pakistani vocational or academic qualification is assessed for recognition (Anerkennung) so it is comparable to the German standard. We guide you through the process for your trade or profession.',
      },
      {
        q: 'Do I need to speak German?',
        a: 'Many skilled and healthcare roles require German at around A2–B1 level, while some engineering and IT roles accept English. The exact requirement depends on the employer and occupation.',
      },
      {
        q: 'What is the Opportunity Card (Chancenkarte)?',
        a: 'It is a points-based route that lets qualified applicants enter Germany to search for a job, with points for qualifications, experience, language skills and age.',
      },
      {
        q: 'Which fields are most in demand in Germany?',
        a: 'Engineering and skilled trades, healthcare and nursing, IT, logistics and construction are among the strongest areas of demand.',
      },
    ],
  },

  // ---- Japan ----
  japan: {
    visaRoutes: [
      {
        name: 'Specified Skilled Worker (SSW)',
        detail:
          'SSW (i) covers designated sectors such as construction, caregiving, food service and manufacturing; SSW (ii) allows longer stays and family. Requires a skills test and a Japanese-language test (JLPT N4 / JFT-Basic).',
      },
      {
        name: 'Technical Intern Training (TITP)',
        detail: 'A structured training route into Japanese industry for selected occupations.',
      },
    ],
    faqs: [
      {
        q: 'How can I work in Japan from Pakistan?',
        a: 'The main route is the Specified Skilled Worker (SSW) programme: you pass a sector skills test and a Japanese-language test (JLPT N4 or JFT-Basic), then match with a Japanese employer who sponsors your visa.',
      },
      {
        q: 'Do I need to learn Japanese?',
        a: 'Yes — SSW requires a basic Japanese-language qualification (JLPT N4 or JFT-Basic) in addition to the sector skills test.',
      },
      {
        q: 'Which sectors hire under SSW?',
        a: 'Designated sectors include construction, caregiving, manufacturing, food & beverage, agriculture, food service, shipbuilding and more.',
      },
    ],
  },

  // ---- South Korea ----
  'south-korea': {
    visaRoutes: [
      {
        name: 'Employment Permit System (EPS)',
        detail:
          'A government-to-government (G2G) programme. You pass the EPS-TOPIK Korean-language test and join the roster; employers then select workers for manufacturing, agriculture, fishing and construction (E-9 visa).',
      },
    ],
    faqs: [
      {
        q: 'How can I get a job in South Korea from Pakistan?',
        a: 'South Korea hires mainly through the Employment Permit System (EPS). You must pass the EPS-TOPIK Korean-language test and register in the roster, after which Korean employers select workers for eligible sectors.',
      },
      {
        q: 'What is the EPS-TOPIK test?',
        a: 'EPS-TOPIK is the Korean-language and skills test required to qualify for the Employment Permit System. A pass places you in the pool from which employers select workers.',
      },
      {
        q: 'Which sectors recruit under EPS?',
        a: 'Manufacturing, agriculture and livestock, fishing, and construction are the main EPS sectors for foreign workers.',
      },
    ],
  },

  // ---- Türkiye ----
  turkey: simpleSeo('Türkiye', {
    name: 'Work Permit (Çalışma İzni)',
    detail:
      'Issued by the Turkish Ministry of Labour and Social Security when your employer applies; it also serves as your residence authorisation for the contract period.',
  }),

  // ---- Europe (EU) ----
  romania: euSeo('Romania', {
    name: 'Work Permit + Long-stay (D/AM) Visa',
    detail:
      'Your Romanian employer obtains a work permit (aviz de angajare); you then apply for a long-stay employment visa and residence permit.',
  }),
  poland: euSeo('Poland', {
    name: 'Work Permit (Type A) + National (D) Visa',
    detail:
      'Your Polish employer secures a Type A work permit; you then apply for a national visa and temporary residence & work permit.',
  }),
  croatia: euSeo('Croatia', {
    name: 'Residence & Work Permit',
    detail: 'Croatia issues a combined residence-and-work permit when your employer applies.',
  }),
  hungary: euSeo('Hungary', {
    name: 'Combined Work & Residence Permit',
    detail: 'Hungary issues a single combined permit for work and residence through a one-stop procedure.',
  }),
  portugal: euSeo('Portugal', {
    name: 'Residence Visa for Subordinate Work',
    detail: 'With a Portuguese job offer you apply for a work residence visa; Portugal also offers a job-seeker visa.',
  }),
  greece: euSeo('Greece', {
    name: 'Work Visa (Type D) + Residence Permit',
    detail:
      'Greece admits workers under annual quotas; your employer secures approval, then you apply for the national visa and residence permit.',
  }),
  italy: euSeo('Italy', {
    name: 'Decreto Flussi Work Visa',
    detail:
      'Italy admits non-EU workers under annual quotas (Decreto Flussi); your employer applies for the nulla osta, then you apply for the visa.',
  }),
  cyprus: euSeo(
    'Cyprus',
    {
      name: 'Temporary Residence & Employment Permit',
      detail: 'Employer-sponsored; the permit authorises work and residence for the contract period.',
    },
    false,
  ),
  lithuania: euSeo('Lithuania', {
    name: 'National (D) Visa + Work Permit',
    detail: 'Your Lithuanian employer secures the work-permit decision; you then apply for a national visa and residence permit.',
  }),
  austria: euSeo('Austria', {
    name: 'Red-White-Red Card',
    detail: 'A points-based route for skilled workers with a job offer, authorising both work and residence.',
  }),
  ireland: euSeo(
    'Ireland',
    {
      name: 'Critical Skills / General Employment Permit',
      detail: 'Ireland issues employment permits for eligible occupations; Critical Skills permits target high-demand roles.',
    },
    false,
  ),
  luxembourg: euSeo('Luxembourg', {
    name: 'Salaried Worker Authorisation',
    detail: 'With a job offer you obtain a combined work-and-residence authorisation to live and work in Luxembourg.',
  }),
  finland: euSeo('Finland', {
    name: 'Residence Permit for an Employed Person',
    detail: 'Finland issues a residence permit based on a job offer, authorising work in the relevant sector.',
  }),
  france: euSeo('France', {
    name: '"Salarié" Work Visa / Talent Passport',
    detail:
      'With a French job offer and work authorisation you obtain a long-stay work visa; the Talent Passport (Passeport Talent) covers skilled and qualified roles.',
  }),
  'czech-republic': euSeo('the Czech Republic', {
    name: 'Employee Card',
    detail: 'The Czech Employee Card (zaměstnanecká karta) is a combined work-and-residence permit tied to a specific job.',
  }),
  belgium: euSeo('Belgium', {
    name: 'Single Permit',
    detail: 'Belgium issues a combined single permit for work and residence when your employer applies.',
  }),
  denmark: euSeo(
    'Denmark',
    {
      name: 'Positive List / Pay Limit scheme',
      detail: 'Denmark admits skilled workers whose occupation is on the Positive List, or whose salary meets the Pay Limit threshold.',
    },
    false,
  ),
  sweden: euSeo('Sweden', {
    name: 'Work Permit',
    detail: 'Sweden issues a work permit based on a job offer meeting collective-agreement pay and conditions.',
  }),
  netherlands: euSeo('the Netherlands', {
    name: 'Single Permit (GVVA)',
    detail: 'The Dutch single permit combines work and residence; the Highly Skilled Migrant route covers qualified roles.',
  }),
  spain: euSeo('Spain', {
    name: 'Work & Residence Authorisation',
    detail: 'Spain issues a work-and-residence authorisation (por cuenta ajena); shortage roles are listed in the Catálogo de Ocupaciones.',
  }),
  malta: euSeo('Malta', {
    name: 'Single Permit',
    detail: 'Malta issues a single work-and-residence permit; the Key Employee Initiative fast-tracks skilled roles.',
  }),

  // ---- Europe (EEA / EFTA) ----
  norway: simpleSeo('Norway', {
    name: 'Skilled Worker Residence Permit',
    detail: 'Norway grants a residence permit for skilled workers with a concrete job offer meeting pay and qualification requirements.',
  }),
  iceland: simpleSeo('Iceland', {
    name: 'Work & Residence Permit',
    detail: 'Iceland issues work and residence permits for specialists and shortage occupations under the EEA framework.',
  }),
  switzerland: simpleSeo('Switzerland', {
    name: 'Work Permit (employer-sponsored)',
    detail: 'Switzerland admits non-EU/EFTA workers under annual quotas; your employer must show the role could not be filled locally.',
  }),

  // ---- Europe (non-EU) ----
  russia: simpleSeo('Russia', {
    name: 'Work Permit + Work Visa',
    detail: 'Your Russian employer obtains a work permit and invitation; you then receive a work visa for the contract period.',
  }),
  moldova: simpleSeo('Moldova', {
    name: 'Work Permit + Long-stay Visa',
    detail: 'Your Moldovan employer secures a work permit; you then apply for a long-stay employment visa and residence.',
  }),
  serbia: simpleSeo('Serbia', {
    name: 'Single Work & Residence Permit',
    detail: 'Serbia issues a combined work-and-residence permit when your employer applies.',
  }),

  // ---- United Kingdom (England & Scotland) ----
  england: {
    visaRoutes: UK_VISA,
    faqs: workFaqs(
      'England',
      'To work in England you need a job offer from a UK employer who holds a sponsor licence and can issue a Certificate of Sponsorship, then apply for the Skilled Worker or Health & Care Worker visa. Demand is strongest in health & social care, construction, hospitality and logistics.',
    ),
  },
  scotland: {
    visaRoutes: UK_VISA,
    faqs: workFaqs(
      'Scotland',
      'Scotland uses the UK Skilled Worker and Health & Care Worker visa routes: secure a job offer from a licensed sponsor and a Certificate of Sponsorship, then apply for the visa. Care, hospitality, energy and construction are key areas of demand.',
    ),
  },

  // ---- Southeast Asia ----
  malaysia: simpleSeo('Malaysia', {
    name: 'Employment Pass / Temporary Employment Pass',
    detail:
      'Skilled roles use an Employment Pass; sector workers use a Temporary Employment Pass processed through the Foreign Worker Centralised Management System (FWCMS).',
  }),

  // ---- Central Asia & Caucasus ----
  azerbaijan: simpleSeo('Azerbaijan', {
    name: 'Work Permit + Temporary Residence Permit',
    detail: 'Your employer obtains a work permit; you then receive a work visa and temporary residence permit.',
  }),
  kazakhstan: simpleSeo('Kazakhstan', {
    name: 'Work Permit + Work Visa',
    detail: 'Kazakh employers hire foreign workers under a quota and permit system; you then obtain a work visa.',
  }),
  uzbekistan: simpleSeo('Uzbekistan', {
    name: 'Work Permit + Work Visa',
    detail: 'Your Uzbek employer secures a work permit and confirmation; you then obtain a work visa.',
  }),
  georgia: simpleSeo('Georgia', {
    name: 'Work Residence Permit',
    detail: 'Georgia has a relatively open regime; after entry you obtain a work residence permit tied to your employment.',
  }),

  // ---- Middle East & North Africa ----
  iraq: simpleSeo('Iraq', {
    name: 'Employer-sponsored Work Visa + Residence',
    detail: 'Your Iraqi employer secures the work visa and residence; large projects sponsor workers directly.',
  }),
  jordan: simpleSeo('Jordan', {
    name: 'Work Permit + Residence',
    detail: 'Your Jordanian employer obtains a work permit; residence follows for the contract period.',
  }),
  libya: simpleSeo('Libya', {
    name: 'Employer-sponsored Work Visa + Residence',
    detail: 'Your Libyan employer secures the work visa and residence for project-based employment.',
  }),
}
