// SEO audit (27 Oct 2026), Issue 2 — the migrated blog carried ~33 near-duplicate
// "Good News / Great News — Saudi Arabia [month] 2026" posts all chasing the same
// query, which splits ranking signal (keyword cannibalisation) and reads as thin,
// dated filler. This module rewrites the ten highest-value of those into genuinely
// distinct, evergreen guides — each targeting a different real search intent — and
// renames a few percent-encoded/emoji slugs to clean URLs.
//
// Mechanism: posts live in the Payload/Postgres DB (seeded once from wp-posts.json).
// `/next/patch-posts` (authenticated, idempotent) pushes these corrections into the
// live DB; the same transforms are mirrored into wp-posts.json so a fresh import is
// clean too. Slug renames get 301s in redirects.ts.
//
// Accuracy: content below is general guidance written for a Pakistani BEOE-licensed
// Overseas Employment Promoter (OEP 4035). Processes, laws and figures are described
// in broad, publicly-standard terms; salary bands are explicitly indicative. No
// invented clients, project wins, guarantees or precise statistics. British spelling.

export type Block = { tag: 'p' | 'h2' | 'h3' | 'h4'; text: string }

export type PostPatch = {
  /** Original slug as imported into the DB. */
  match: string
  /** New clean slug (triggers a rename + 301 in redirects.ts). Omit to keep slug. */
  slug?: string
  title?: string
  metaTitle?: string
  metaDescription?: string
  /** Category title to move the post to (upserted). Omit to leave as-is. */
  category?: string
  /** Full replacement body. Omit for rename/metadata-only patches. */
  blocks?: Block[]
}

// --- Shared closing sections reused across the guides (kept consistent, not duplicated
// verbatim in the cannibalisation sense — these are short trust/safeguard blocks). ---

const howFalishaHelps = (what: string): Block[] => [
  { tag: 'h2', text: 'How Falisha Manpower helps' },
  {
    tag: 'p',
    text: `Falisha Manpower is a Government of Pakistan–licensed Overseas Employment Promoter (OEP Licence No. 4035, BEOE-registered) with over 15 years of experience placing Pakistani workers abroad. For ${what}, we source and screen candidates, arrange trade tests and interviews, and manage medicals, documentation, visa processing and travel end to end.`,
  },
  {
    tag: 'p',
    text: 'Every placement is made on a documented employment contract, and in keeping with BEOE and Protector of Emigrants rules we never charge candidates unlawful fees.',
  },
]

const staySafe: Block[] = [
  { tag: 'h2', text: 'Protect yourself from fraud' },
  {
    tag: 'p',
    text: 'Only deal with a BEOE-licensed recruitment agency and confirm its OEP licence number before paying anything or handing over your passport. Be wary of “free visa” offers, guaranteed-job promises and demands for large upfront cash — these are the most common signs of a scam.',
  },
  {
    tag: 'p',
    text: 'Always get your offer and contract in writing, verify the employer and visa authorisation through official channels, and keep copies of every document and receipt.',
  },
]

// ---------------------------------------------------------------------------

export const POST_PATCHES: PostPatch[] = [
  // 1 — broken emoji slug → Saudi salary guide (by trade)
  {
    match: '%f0%9f%87%b8%f0%9f%87%a6-saudi-arabia-jobs-2026-big-opportunity-for-pakistanis',
    slug: 'saudi-arabia-salary-guide-for-pakistani-workers',
    title: 'Saudi Arabia Salary Guide for Pakistani Workers (Indicative 2026 Bands)',
    metaTitle: 'Saudi Arabia Salary Guide for Pakistani Workers',
    metaDescription:
      'Indicative monthly salary ranges in Saudi Arabia by trade for Pakistani workers — labourers, drivers, technicians and more — plus what affects your pay.',
    category: 'Guides',
    blocks: [
      {
        tag: 'p',
        text: 'One of the first questions every Pakistani worker asks about Saudi Arabia is simple: how much will I actually earn? There is no single answer — pay depends on your trade, your experience and certificates, the employer and the terms of your contract. This guide gives honest, indicative monthly ranges so you can judge an offer sensibly.',
      },
      {
        tag: 'p',
        text: 'Important: the figures below are broad market indications in Saudi Riyals (SAR) per month, not guarantees. The only number that matters is the basic salary written in the contract you sign. Always read it carefully before you agree.',
      },
      { tag: 'h2', text: 'Indicative monthly salary bands by role' },
      {
        tag: 'p',
        text: 'General / unskilled labour, helpers and cleaners: roughly SAR 1,000–1,500, usually with food and accommodation provided by the employer.',
      },
      {
        tag: 'p',
        text: 'Skilled construction trades (mason, steel fixer, shuttering carpenter, plumber): roughly SAR 1,500–2,800, depending on skill level and trade test result.',
      },
      {
        tag: 'p',
        text: 'Electricians, welders and HVAC technicians: roughly SAR 2,000–3,800, with coded or certified welders at the higher end.',
      },
      {
        tag: 'p',
        text: 'Drivers (light vehicle) and heavy-vehicle (HTV) drivers: roughly SAR 1,800–3,200, higher for specialised or long-haul driving.',
      },
      {
        tag: 'p',
        text: 'Technicians, supervisors and foremen: roughly SAR 3,000–6,000, depending on discipline and responsibility.',
      },
      {
        tag: 'p',
        text: 'Engineers and degree-qualified professionals: typically SAR 6,000 and above, set case by case.',
      },
      { tag: 'h2', text: 'What else makes up your package' },
      {
        tag: 'p',
        text: 'Basic salary is only part of the picture. Ask whether accommodation and food are provided or paid as an allowance, whether transport is covered, how overtime is paid (Saudi law requires 1.5× the hourly rate), and what the annual air ticket and end-of-service benefit (gratuity) arrangements are.',
      },
      {
        tag: 'p',
        text: 'Salaries in Saudi Arabia must be paid through the Wage Protection System (WPS) into a bank account, which protects you against non-payment. Confirm your employer uses it.',
      },
      { tag: 'h2', text: 'What raises your pay' },
      {
        tag: 'p',
        text: 'Verified experience, recognised trade certificates, a passed trade test, a valid driving licence for driver roles, and English or Arabic ability all push an offer towards the top of its band. It pays to get your documents and certificates in order before you apply.',
      },
      ...howFalishaHelps('roles across every band above'),
      ...staySafe,
    ],
  },

  // 2 — broken emoji slug → "free visa" explained (anti-fraud)
  {
    match: '%f0%9f%87%b8%f0%9f%87%a6-saudi-arabia-good-news-for-pakistanis-february-2026-update',
    slug: 'free-visa-to-saudi-arabia-from-pakistan-explained',
    title: 'Free Visa to Saudi Arabia from Pakistan: What It Really Means (and the Risks)',
    metaTitle: 'Free Visa to Saudi Arabia from Pakistan — Explained',
    metaDescription:
      'What a Saudi “free visa” (azad visa) actually is, why it is risky and often illegal, and the safe, legal way to work in Saudi Arabia from Pakistan.',
    category: 'Guides',
    blocks: [
      {
        tag: 'p',
        text: 'Search for Saudi jobs online and you will see the phrase “free visa” everywhere. It sounds like an easy route to work in the Kingdom — but it is one of the most misunderstood and risky terms in overseas recruitment. Here is what it really means and how to protect yourself.',
      },
      { tag: 'h2', text: 'What a “free visa” actually is' },
      {
        tag: 'p',
        text: 'A so-called “free visa” (often called an azad visa) does not mean a visa that costs nothing. It usually means a visa under which the holder is expected to find their own work after arriving, rather than joining the employer who sponsored them.',
      },
      {
        tag: 'p',
        text: 'The problem is that Saudi law ties your legal status (your iqama, or residence permit) to the sponsor who brought you in. Working for anyone other than your sponsor on such an arrangement is generally unlawful.',
      },
      { tag: 'h2', text: 'Why it is risky' },
      {
        tag: 'p',
        text: 'Workers on these arrangements frequently have no genuine employment contract, no guaranteed salary and no legal protection. If a labour inspection finds you working outside your sponsorship, you can face fines, detention and deportation — and the person who sold you the visa disappears.',
      },
      {
        tag: 'p',
        text: 'Many “free visa” offers are also outright scams: money is taken for a visa that never materialises, or for one that cannot legally be used to work.',
      },
      { tag: 'h2', text: 'The safe, legal alternative' },
      {
        tag: 'p',
        text: 'The lawful route is a proper employment (work) visa arranged by a licensed employer and processed through a BEOE-registered Overseas Employment Promoter in Pakistan. Your visa is tied to a real job, with a written contract, a defined salary paid through the Wage Protection System, and the protection of the Protector of Emigrants.',
      },
      {
        tag: 'p',
        text: 'It may feel slower than a “free visa”, but it is the only route that gives you a job you can legally hold and rights you can enforce.',
      },
      ...howFalishaHelps('legal, documented employment in Saudi Arabia'),
      ...staySafe,
    ],
  },

  // 3 — Vision 2030 giga-projects
  {
    match: 'may-2026-positive-news-for-pakistanis-as-saudi-arabia-expands-job-market',
    slug: 'saudi-vision-2030-projects-jobs-for-pakistani-workers',
    title: 'Saudi Vision 2030 Giga-Projects and the Jobs They Create for Pakistani Workers',
    metaTitle: 'Saudi Vision 2030 Projects & Jobs for Pakistani Workers',
    metaDescription:
      'How Saudi Arabia’s Vision 2030 giga-projects — NEOM, Qiddiya, the Red Sea and more — are driving demand for Pakistani construction, hospitality and technical workers.',
    category: 'Guides',
    blocks: [
      {
        tag: 'p',
        text: 'Saudi Arabia’s Vision 2030 is reshaping the country’s economy and, with it, its labour market. A series of enormous “giga-projects” is under construction across the Kingdom, and they are creating sustained demand for the skilled and semi-skilled workers Pakistan supplies.',
      },
      { tag: 'h2', text: 'The giga-projects driving demand' },
      {
        tag: 'p',
        text: 'NEOM — a vast new region in the north-west, including the linear city known as The Line — requires construction trades, technicians and support staff on a large scale.',
      },
      {
        tag: 'p',
        text: 'Qiddiya (entertainment and sports city near Riyadh), Red Sea Global (luxury tourism along the coast), Diriyah Gate (heritage and cultural development) and ROSHN (large-scale housing) add further long-term demand for labour.',
      },
      { tag: 'h2', text: 'The roles these projects need' },
      {
        tag: 'p',
        text: 'Construction and infrastructure lead: masons, steel fixers, shuttering carpenters, scaffolders, electricians, plumbers, welders, heavy-equipment operators and general labourers.',
      },
      {
        tag: 'p',
        text: 'As projects move from building to operating, demand grows for hospitality and tourism staff, facilities-management and maintenance technicians, drivers and security personnel.',
      },
      { tag: 'h2', text: 'Why this matters for Pakistani workers' },
      {
        tag: 'p',
        text: 'Unlike short-term vacancies, giga-project pipelines run for years, which means steadier opportunities and clearer progression for workers who arrive with the right certificates and a passed trade test. Getting your documents in order early puts you ahead.',
      },
      ...howFalishaHelps('Vision 2030 project roles across construction, technical and hospitality trades'),
      ...staySafe,
    ],
  },

  // 4 — Saudi driver jobs
  {
    match: 'may-2026-big-opportunity-for-pakistanis-as-saudi-arabia-expands-hiring',
    slug: 'driver-jobs-in-saudi-arabia-for-pakistanis',
    title: 'Driver Jobs in Saudi Arabia for Pakistanis: Licence, Pay and How to Apply',
    metaTitle: 'Driver Jobs in Saudi Arabia for Pakistanis',
    metaDescription:
      'A guide to driver jobs in Saudi Arabia for Pakistani workers — light and heavy (HTV) roles, the Saudi driving licence, indicative pay and how to apply.',
    category: 'Guides',
    blocks: [
      {
        tag: 'p',
        text: 'Driving is one of the most consistent sources of overseas work for Pakistani men in Saudi Arabia, from company and delivery driving to heavy trucks and buses. This guide explains the roles, the licence you need and how to apply safely.',
      },
      { tag: 'h2', text: 'Types of driving roles' },
      {
        tag: 'p',
        text: 'Light-vehicle (LTV) roles include company drivers, delivery and courier drivers, and family/private drivers. Heavy-vehicle (HTV) roles include truck, trailer, tanker and bus drivers, as well as drivers of plant and equipment on construction sites.',
      },
      { tag: 'h2', text: 'The driving licence you need' },
      {
        tag: 'p',
        text: 'To drive legally in Saudi Arabia you need a valid Saudi driving licence. Many workers convert a valid Pakistani licence after arrival, or obtain a Saudi licence locally; heavy-vehicle roles require the appropriate HTV category. Your employer will usually guide you through the process once you are there.',
      },
      {
        tag: 'p',
        text: 'A clean driving record and genuine experience matter — for HTV and specialised roles you may be asked to demonstrate your driving before selection.',
      },
      { tag: 'h2', text: 'Indicative pay' },
      {
        tag: 'p',
        text: 'As a broad indication, light-vehicle drivers earn in the region of SAR 1,800–2,500 per month and heavy-vehicle drivers around SAR 2,200–3,200, often with accommodation and transport provided. Actual pay depends on the employer, the route and your experience — always check the contract.',
      },
      { tag: 'h2', text: 'How to apply' },
      {
        tag: 'p',
        text: 'Prepare a valid passport, your Pakistani driving licence, experience letters and a GAMCA-approved medical. Apply only through a BEOE-licensed agency against a genuine, documented vacancy.',
      },
      ...howFalishaHelps('light- and heavy-vehicle driver vacancies'),
      ...staySafe,
    ],
  },

  // 5 — unskilled / general labour
  {
    match: 'may-2026-great-news-for-pakistanis-seeking-jobs-in-saudi-arabia',
    slug: 'unskilled-labour-jobs-in-saudi-arabia-from-pakistan',
    title: 'Unskilled & General Labour Jobs in Saudi Arabia from Pakistan',
    metaTitle: 'Unskilled & General Labour Jobs in Saudi Arabia',
    metaDescription:
      'A clear, honest guide to unskilled and general labour jobs in Saudi Arabia for Pakistani workers — the roles, what the work involves, pay and how to apply safely.',
    category: 'Guides',
    blocks: [
      {
        tag: 'p',
        text: 'Not every overseas job needs a trade certificate. Saudi Arabia hires large numbers of general and unskilled workers, and for many Pakistani families this is the first step to working abroad. This guide sets out the roles honestly — what the work is, what you can expect to earn and how to apply without being cheated.',
      },
      { tag: 'h2', text: 'Common general-labour roles' },
      {
        tag: 'p',
        text: 'Typical roles include construction helpers and labourers, cleaners and housekeeping staff, loaders and packers, warehouse helpers, agricultural workers and kitchen helpers. These jobs are physically demanding but require no formal qualification.',
      },
      { tag: 'h2', text: 'Pay and conditions' },
      {
        tag: 'p',
        text: 'As a broad indication, general-labour pay is around SAR 1,000–1,500 per month, and most employers provide accommodation, food (or a food allowance) and transport, which means much of your salary can be saved or sent home.',
      },
      {
        tag: 'p',
        text: 'Your salary must be paid through the Wage Protection System into a bank account, working hours and overtime are set by Saudi labour law, and you are entitled to the end-of-service benefit at the end of your contract.',
      },
      { tag: 'h2', text: 'How to apply' },
      {
        tag: 'p',
        text: 'You will need a valid passport and a GAMCA-approved medical; a basic reference or experience letter helps. Apply only through a BEOE-licensed agency against a real, documented vacancy — and be especially careful of “free visa” offers for labour roles, which are a common trap.',
      },
      ...howFalishaHelps('general and unskilled labour vacancies'),
      ...staySafe,
    ],
  },

  // 6 — Saudi work contract: what to check
  {
    match: 'may-2026-great-news-for-pakistanis-seeking-jobs-in-saudi-arabia-2',
    slug: 'saudi-work-contract-what-to-check-before-signing',
    title: 'Your Saudi Work Contract: What to Check Before You Sign',
    metaTitle: 'Saudi Work Contract — What to Check Before Signing',
    metaDescription:
      'Before you sign a Saudi Arabia employment contract, check these points — salary, hours, overtime, leave, air ticket, accommodation and end-of-service benefit.',
    category: 'Guides',
    blocks: [
      {
        tag: 'p',
        text: 'The single most important document in your overseas journey is your employment contract. A good contract protects you; a vague one causes disputes later. Before you sign anything for a job in Saudi Arabia, check the following carefully.',
      },
      { tag: 'h2', text: 'Salary — and what is included' },
      {
        tag: 'p',
        text: 'Confirm the basic salary in figures, and whether accommodation, food and transport are provided or paid as separate allowances. A high “package” figure can shrink quickly once you remove allowances, so look at the basic salary first.',
      },
      { tag: 'h2', text: 'Hours, overtime and leave' },
      {
        tag: 'p',
        text: 'Saudi labour law sets standard working hours (reduced during Ramadan for Muslim employees) and requires overtime to be paid at 1.5× the normal hourly rate. Check your contract states the hours and the overtime rate, and confirms paid annual leave and the air ticket home.',
      },
      { tag: 'h2', text: 'End-of-service benefit and term' },
      {
        tag: 'p',
        text: 'Saudi workers are entitled to an end-of-service benefit (gratuity) based on length of service — confirm this is reflected. Check the contract term, any probation period, and that the job title and duties match what you were told.',
      },
      { tag: 'h2', text: 'Red flags' },
      {
        tag: 'p',
        text: 'Be cautious if there is no written contract, if the salary is only spoken rather than written, if the duties are left vague, or if you are asked to sign a different contract on arrival. Keep a signed copy of everything.',
      },
      ...howFalishaHelps('documented, contract-backed placements'),
      ...staySafe,
    ],
  },

  // 7 — GAMCA / Wafid medical
  {
    match: 'april-2026-hiring-update-saudi-arabia-brings-new-opportunities-for-pakistanis',
    slug: 'gamca-wafid-medical-test-for-gulf-jobs',
    title: 'GAMCA / Wafid Medical Test for Gulf Jobs: Process, Centres and “Unfit” Reasons',
    metaTitle: 'GAMCA / Wafid Medical Test for Gulf Jobs — Guide',
    metaDescription:
      'What the GAMCA (Wafid) medical test for Gulf jobs involves, how to book an approved centre, what is tested and the common reasons candidates are marked unfit.',
    category: 'Guides',
    blocks: [
      {
        tag: 'p',
        text: 'Before you can get a work visa for Saudi Arabia or any other Gulf country, you must pass a mandatory medical examination at an approved centre. This is one of the most common stages where a candidate is held up, so it pays to understand it.',
      },
      { tag: 'h2', text: 'What GAMCA and Wafid are' },
      {
        tag: 'p',
        text: 'GAMCA (the Gulf Approved Medical Centres Association) coordinates the pre-employment medical required by GCC countries. Appointments are now booked through the Wafid platform, which assigns you to an approved medical centre — you cannot simply use any clinic.',
      },
      { tag: 'h2', text: 'What is tested' },
      {
        tag: 'p',
        text: 'The examination typically includes blood tests (for conditions such as HIV, hepatitis B and C, and syphilis), a chest X-ray to screen for tuberculosis, a general physical check, blood pressure and, for women, a pregnancy test. Requirements can vary by country and role.',
      },
      { tag: 'h2', text: 'Common reasons for an “unfit” result' },
      {
        tag: 'p',
        text: 'The most common reasons a candidate is marked unfit are active tuberculosis, hepatitis B or C, HIV, and sometimes uncontrolled conditions such as high blood pressure or diabetes. Some conditions are treatable, after which a re-test may be possible.',
      },
      { tag: 'h2', text: 'Tips' },
      {
        tag: 'p',
        text: 'Carry your passport and the correct photographs, be honest about your medical history, and attend a genuinely approved centre booked through the proper platform. The medical report is valid for a limited period, so coordinate its timing with your visa processing.',
      },
      ...howFalishaHelps('candidates through the GAMCA/Wafid medical and the rest of the visa process'),
      ...staySafe,
    ],
  },

  // 8 — Qatar guide
  {
    match: 'good-news-for-pakistani-workers-job-opportunities-in-qatar-february-2026',
    slug: 'working-in-qatar-guide-for-pakistani-workers',
    title: 'Working in Qatar: A Guide for Pakistani Job Seekers',
    metaTitle: 'Working in Qatar — Guide for Pakistani Workers',
    metaDescription:
      'A practical guide to working in Qatar for Pakistani job seekers — in-demand sectors, the Qatar ID and work visa, wage protection, labour reforms and how to apply.',
    category: 'Guides',
    blocks: [
      {
        tag: 'p',
        text: 'Qatar remains a strong destination for Pakistani workers, with demand continuing across infrastructure, hospitality and services after years of major development. This guide covers the sectors, the paperwork and your rights.',
      },
      { tag: 'h2', text: 'In-demand sectors' },
      {
        tag: 'p',
        text: 'Construction and infrastructure maintenance, hospitality and facilities management, retail and services, transport and logistics, healthcare and security all recruit overseas workers. Skilled trades and certified technicians are especially sought after.',
      },
      { tag: 'h2', text: 'Visa, Qatar ID and wage protection' },
      {
        tag: 'p',
        text: 'You work in Qatar on an employer-sponsored work visa and are issued a Qatar ID (QID) as your residence permit. Salaries must be paid through the Wage Protection System (WPS) into a bank account, which safeguards you against non-payment.',
      },
      { tag: 'h2', text: 'Labour reforms worth knowing' },
      {
        tag: 'p',
        text: 'Qatar has reformed parts of its labour system in recent years, including changes that make it easier for workers to change employer and removed some exit-permit requirements, alongside a non-discriminatory minimum wage plus allowances. Confirm the current rules that apply to your contract.',
      },
      { tag: 'h2', text: 'How to apply' },
      {
        tag: 'p',
        text: 'Prepare a valid passport, trade certificates and experience letters, and a GAMCA-approved medical. Apply through a BEOE-licensed agency against a genuine, documented vacancy, and read your contract before you sign.',
      },
      ...howFalishaHelps('Qatar vacancies across trades, services and technical roles'),
      ...staySafe,
    ],
  },

  // 9 — UAE guide
  {
    match: 'good-news-for-pakistani-workers-job-opportunities-in-uae-2026',
    slug: 'working-in-the-uae-guide-for-pakistani-workers',
    title: 'Working in the UAE: A Guide for Pakistani Job Seekers',
    metaTitle: 'Working in the UAE — Guide for Pakistani Workers',
    metaDescription:
      'A practical guide to working in the UAE for Pakistani job seekers — Dubai and Abu Dhabi sectors, MOHRE work permit, Emirates ID, wage protection and how to apply.',
    category: 'Guides',
    blocks: [
      {
        tag: 'p',
        text: 'The United Arab Emirates — Dubai, Abu Dhabi, Sharjah and the other emirates — is one of the most popular destinations for Pakistani workers, with a diverse economy and steady demand. Here is what you need to know.',
      },
      { tag: 'h2', text: 'In-demand sectors' },
      {
        tag: 'p',
        text: 'Construction and real estate, hospitality and tourism, retail, transport and logistics, facilities management, healthcare and the growing services economy all recruit from Pakistan — from general labour to skilled trades and professionals.',
      },
      { tag: 'h2', text: 'Work permit, Emirates ID and wage protection' },
      {
        tag: 'p',
        text: 'Private-sector employment is regulated by the Ministry of Human Resources and Emiratisation (MOHRE). You work on a MOHRE work permit and labour card, hold an Emirates ID as your residence document, and your salary is paid through the Wage Protection System.',
      },
      { tag: 'h2', text: 'Contracts' },
      {
        tag: 'p',
        text: 'The UAE uses fixed-term employment contracts under its current labour law, setting out salary, hours, leave and end-of-service benefits. Make sure the contract matches the offer you accepted.',
      },
      { tag: 'h2', text: 'How to apply' },
      {
        tag: 'p',
        text: 'Have your passport, certificates, experience letters and a GAMCA-approved medical ready. Apply only through a BEOE-licensed agency against a documented vacancy, and be cautious of visit-visa “job hunting” offers that leave you without legal work status.',
      },
      ...howFalishaHelps('UAE vacancies across trades, services and professional roles'),
      ...staySafe,
    ],
  },

  // 10 — Iraq guide (sober)
  {
    match: 'good-news-for-pakistani-workers-job-opportunities-in-iraq-2026',
    slug: 'jobs-in-iraq-for-pakistani-workers',
    title: 'Jobs in Iraq for Pakistani Workers: Sectors, Pay and Safety',
    metaTitle: 'Jobs in Iraq for Pakistani Workers — Guide',
    metaDescription:
      'An honest guide to jobs in Iraq for Pakistani workers — oil, gas and construction demand, how the work visa works, pay, and the safety points to weigh first.',
    category: 'Guides',
    blocks: [
      {
        tag: 'p',
        text: 'Iraq’s oil, gas and reconstruction sectors create real demand for overseas labour, and wages for technical roles can be competitive. We are also candid that conditions vary significantly by region, so this guide covers both the opportunity and the things you should weigh before accepting a role.',
      },
      { tag: 'h2', text: 'Where the demand is' },
      {
        tag: 'p',
        text: 'The south, around Basra, is the centre of the oil-and-gas industry and draws welders, pipe fitters, riggers, mechanical and instrument technicians and HSE staff. Construction and reconstruction create demand for masons, steel fixers, carpenters, electricians, plumbers and heavy-equipment operators.',
      },
      { tag: 'h2', text: 'Visa and documentation' },
      {
        tag: 'p',
        text: 'You work in Iraq on an employer-sponsored work visa arranged under Iraqi immigration rules. Fitness-for-work medicals and Protector of Emigrants clearance are completed in Pakistan, and the agency manages attestation, the visa file and travel.',
      },
      { tag: 'h2', text: 'Safety — weigh it honestly' },
      {
        tag: 'p',
        text: 'Security conditions differ from region to region. A reputable agency will only deploy where it is safe and lawful to do so, will be clear about the employer and the site, and will never pressure you into a placement you are uneasy about. Ask direct questions about location, camp security and the employer before you commit.',
      },
      { tag: 'h2', text: 'Pay' },
      {
        tag: 'p',
        text: 'Pay for oil-sector and project roles reflects their technical demands and the location, and is set on a documented contract. Treat any offer that seems unusually high with caution and confirm it in writing.',
      },
      ...howFalishaHelps('Iraq oil-sector, technical and construction vacancies, deployed only where it is safe and lawful'),
      ...staySafe,
    ],
  },

  // 11 — Almarai: broken Arabic slug → clean rename (metadata only, keep body)
  {
    match:
      'almarai-jobs-2025-free-visa-free-accommodation-salary-up-to-4-lakh-apply-now-for-skilled-unskilled-roles-from-pakistan-%d8%a7%d9%84%d9%85%d8%b1%d8%a7%d8%b9%db%8c-%d8%ac%d8%a7%d8%a8%d8%b2-2',
    slug: 'almarai-jobs-saudi-arabia-for-pakistani-workers',
    title: 'Almarai Jobs in Saudi Arabia for Pakistani Workers: Roles and How to Apply',
    metaTitle: 'Almarai Jobs in Saudi Arabia for Pakistani Workers',
    metaDescription:
      'Almarai jobs in Saudi Arabia for Pakistani workers — the kinds of skilled and unskilled roles recruited, and how to apply safely through a licensed agency.',
  },
]

// --- Global text cleaners applied to EVERY post (idempotent) -----------------

// Old trading name that lingered in a few imported bodies/titles. Replace only the
// company-specific phrases, never the generic word "enterprises" (other agencies,
// "IT enterprises", "SMEs" all legitimately use it).
export function fixBrand(s: string): string {
  if (!s) return s
  return s
    .replace(/Falisha\s+Enterprises/g, 'Falisha Manpower')
    .replace(/Falisha\s+Associates/g, 'Falisha Manpower')
}

// Strip flag/emoji and other pictographic characters that crept into some titles
// (e.g. the Saudi flag), plus any leftover leading separator/space.
export function stripEmoji(s: string): string {
  if (!s) return s
  return s
    .replace(
      /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{1F1E6}-\u{1F1FF}\u{FE0F}\u{200D}]/gu,
      '',
    )
    .replace(/\s{2,}/g, ' ')
    .replace(/^[\s\-–—|]+/, '')
    .trim()
}

export function cleanText(s: string): string {
  return stripEmoji(fixBrand(s))
}

// Slug renames (old → new) with the preserved old WordPress root URL, consumed by
// redirects.ts to 301 both the old /posts/<slug> and the old root URL to the new one.
export const POST_RENAMES: { oldSlug: string; newSlug: string }[] = POST_PATCHES.filter(
  (p) => p.slug && p.slug !== p.match,
).map((p) => ({ oldSlug: p.match, newSlug: p.slug as string }))
