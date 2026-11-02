// Per-industry editorial content for the industry detail pages
// (/industries/[slug]). Code-level so each sector reads as genuinely distinct
// -- a specific overview, the real certifications/tickets that matter in that
// sector, and how candidates for it are screened -- instead of the shared
// "we source, screen and deploy" boilerplate. Keys are the CMS industry slugs.
//
// Accuracy note: qualifications below are real, publicly-standard industry
// certifications/licences for a Pakistani BEOE-licensed overseas recruitment
// agency (OEP 4035) placing workers in the Gulf, Europe and Asia. No client
// names, project names, award figures or invented statistics.

export type IndustryDetail = {
  overview: string // 2-3 sentences unique to this industry
  qualifications: string[] // 4-6 real, publicly-standard certifications / tickets / licences
  screening: string // 2 sentences on how candidates for this sector are screened
}

export const INDUSTRY_DETAIL: Record<string, IndustryDetail> = {
  construction: {
    overview:
      "Construction is Falisha's largest recruitment sector, supplying skilled trades and site teams for infrastructure, high-rise, industrial and Vision-2030-scale projects across the Gulf. We mobilise everything from individual tradespeople to complete project workforces, trade-tested to employer and consultant specifications.",
    qualifications: [
      'Trade certificates (masonry, shuttering, steel-fixing, plastering)',
      'CSCS-style site safety awareness',
      'CISRS scaffolding tickets',
      'Formwork & falsework experience',
      'Rigging & signalling for crane work',
      'Verified site/project experience letters',
    ],
    screening:
      'Candidates complete a practical trade test and tool-handling assessment before shortlisting, with site-experience letters and references verified. Safety awareness and physical fitness are confirmed as part of pre-deployment checks.',
  },

  'oil--gas': {
    overview:
      "Oil, gas and petrochemical projects demand a workforce that can clear stringent safety and competency gates before reaching site, from refineries and gas plants to offshore platforms. Falisha supplies coded welders, pipe fitters, instrument and process technicians, riggers and HSE staff for new-build, maintenance and shutdown or turnaround campaigns across the Gulf. Because demand peaks sharply around planned maintenance windows, we keep a ready pool of safety-certified, trade-tested hands.",
    qualifications: [
      'BOSIET / HUET offshore survival training',
      'H2S awareness & gas-testing certification',
      'Offshore medical fitness (OGUK / OEUK-style)',
      'ASME IX / API coded welding tickets (up to 6G)',
      'Confined-space entry & work-at-height training',
      'NDT & inspection certs (CSWIP / ASNT)',
    ],
    screening:
      "Welders are tested to the client's welding procedure and are often third-party coded (up to 6G) before mobilisation, while technicians face discipline-specific competency checks. Valid safety certificates such as BOSIET and H2S, offshore medicals and prior plant or refinery experience are all verified before deployment.",
  },

  healthcare: {
    overview:
      "Healthcare is one of Falisha's fastest-growing sectors, placing registered nurses, doctors, pharmacists and allied-health professionals into hospitals and clinics across the Gulf and Europe. Gulf employers require candidates to clear a licensing examination and primary-source credential verification before a visa is issued, so our focus is on exam-ready, fully documented professionals. With the UK closed to new overseas care-worker applications since July 2025, our UK pipeline now centres on NMC-registered nurses and allied-health roles rather than care assistants.",
    qualifications: [
      'PNC / PNMC registration for nurses',
      'DataFlow primary-source verification (PSV)',
      'Gulf licensing exams (Prometric, DHA, MOH, SCFHS, DOH)',
      'NMC registration for UK-bound nurses',
      'OET or IELTS English proficiency',
      'PMDC registration & verified degrees for doctors',
    ],
    screening:
      'Qualifications, registration and experience are verified at source (for example through DataFlow) and candidates are prepared for the relevant Prometric or health-regulator licensing exam before shortlisting. English-language evidence (OET or IELTS) and clinical references are confirmed as part of pre-deployment checks.',
  },

  'information-technology': {
    overview:
      "Falisha recruits software developers, network and cloud engineers, and IT support professionals for technology teams, enterprises and digital-transformation programmes across the Gulf and beyond. Pakistan's deep pool of English-speaking, degree-qualified IT graduates makes it a strong and cost-effective source market for both junior and experienced hires. Demand is strongest for cloud, cybersecurity and infrastructure skills backed by current vendor certifications.",
    qualifications: [
      'Cloud certifications (AWS, Azure, Google Cloud)',
      'Cisco networking (CCNA / CCNP)',
      'CompTIA A+, Network+, Security+',
      'Cybersecurity certs (CEH, CISSP)',
      'Microsoft, Oracle or Red Hat administration',
      'Degree in computer science or a related field',
    ],
    screening:
      'Candidates are screened against role-specific technical requirements, with certifications and degrees verified and portfolios or code samples reviewed where relevant. Technical ability and English communication are assessed, usually through a client or partner technical interview, before selection.',
  },

  hospitality: {
    overview:
      "Hospitality is a high-volume sector for Falisha, staffing hotels, resorts, restaurants and catering operations across the Gulf, a region whose tourism and events calendar drives constant demand for front- and back-of-house teams. We supply chefs, cooks, baristas, waiting, housekeeping and front-desk staff, with a strong emphasis on grooming, guest-service manner and spoken English. Cruise-line and large-event staffing calls for additional safety certification, which we screen for where required.",
    qualifications: [
      'Food safety & hygiene (HACCP, Level 2 Food Safety)',
      'Culinary & commis-chef diplomas',
      'Barista & food-and-beverage service training',
      'Hotel management or hospitality diplomas',
      'Housekeeping & front-office experience',
      'STCW basic safety training (cruise roles)',
    ],
    screening:
      'Candidates are assessed for guest-service experience, grooming and spoken-English fluency, with practical trade tests for chefs and cooks and food-hygiene certificates verified. Prior hotel or restaurant references, and STCW certification for cruise roles, are confirmed before deployment.',
  },

  engineering: {
    overview:
      "Falisha supplies mechanical, electrical, civil and QA/QC engineers for projects, plants and maintenance operations across the Gulf, Europe and Asia. Pakistan produces a large cohort of PEC-registered, degree-qualified engineers, giving employers access to both fresh graduates and seasoned project professionals. Requirements are usually specification-driven, so candidates are matched closely to discipline, software and sector experience.",
    qualifications: [
      'Pakistan Engineering Council (PEC) registration',
      'Accredited engineering degree (bachelor or master)',
      'Project management (PMP, Primavera P6)',
      'QA/QC & inspection certs (CSWIP, ASNT)',
      'Design software (AutoCAD, Revit, SolidWorks)',
      'Verified project & site experience letters',
    ],
    screening:
      'Degrees and PEC registration are verified and candidates are matched to the required engineering discipline, design software and sector experience. Technical competence is confirmed through client interviews and, where relevant, design or calculation tests before selection.',
  },

  'banking--finance': {
    overview:
      "Falisha places banking and financial-services professionals, including relationship managers, credit and risk analysts, compliance officers and operations staff, with banks and financial institutions in the Gulf and beyond. The sector's tight regulatory environment means employers prioritise recognised finance qualifications and a clean compliance record. We focus on degree-qualified, often professionally certified candidates suited to customer-facing and back-office banking roles.",
    qualifications: [
      'Finance qualifications (CFA, ACCA, ACMA)',
      'AML / KYC compliance certification (CAMS)',
      'Risk management credentials (FRM)',
      'Banking diplomas (IBP / JAIBP)',
      'Degree in finance, commerce or business',
      'Credit analysis & IFRS knowledge',
    ],
    screening:
      "Candidates are screened for relevant banking experience, professional qualifications and product knowledge, with degrees and certifications verified. Reference and conduct checks on compliance history are carried out before shortlisting, reflecting the sector's regulatory expectations.",
  },

  'accountancy--finance': {
    overview:
      "Falisha recruits accountants, auditors, and finance and payroll professionals for companies, groups and accountancy practices across the Gulf and Europe. Pakistan's strong professional-accountancy base, with ACCA, ICAP and ICMAP qualified and part-qualified candidates, makes it a reliable source for both practice and industry finance roles. Demand ranges from bookkeepers and accounts assistants through to chief accountants and finance managers.",
    qualifications: [
      'Chartered / certified accountancy (ACCA, CA-ICAP, CPA)',
      'Cost & management accounting (ICMAP / CIMA)',
      'IFRS & international standards knowledge',
      'ERP & accounting software (SAP, Oracle, QuickBooks)',
      'Degree in accounting, commerce or finance',
      'Audit, tax or payroll specialisation',
    ],
    screening:
      'Professional qualifications and degrees are verified and candidates are tested on practical accounting, IFRS and relevant software such as SAP or Oracle where required. Audit and finance references are checked, and part-qualified candidates are matched to the appropriate level of role before shortlisting.',
  },

  textile: {
    overview:
      "Textiles and garments are a home-ground strength for Pakistan, and Falisha draws on that depth to supply machine operators, tailors, knitting and dyeing technicians and production supervisors to mills and garment units at home and abroad. Candidates typically arrive with direct factory-floor experience on the same categories of machinery used by overseas employers. Demand spans mass-production stitching lines through to technical-textile and quality-control roles.",
    qualifications: [
      'Textile & apparel trade certificates',
      'Textile engineering degree / diploma (e.g. NTU)',
      'Industrial sewing, knitting & dyeing experience',
      'Quality inspection & ISO 9001 awareness',
      'Pattern-making, cutting & merchandising skills',
      'Verified production-line experience letters',
    ],
    screening:
      'Operators and technicians complete a practical machine test on the relevant equipment, whether stitching, knitting or dyeing, with speed and output quality assessed before shortlisting. Factory experience letters and supervisor references are verified as part of pre-deployment checks.',
  },

  agriculture: {
    overview:
      "Falisha supplies agronomists, farm managers, machinery operators and skilled farm workers for commercial agriculture, greenhouse and agri-food operations, particularly the Gulf's expanding food-security projects. Candidates are drawn from Pakistan's large rural and agricultural-graduate workforce, combining hands-on field experience with formal training. Roles range from tractor and irrigation technicians to degree-qualified agronomists and food technologists.",
    qualifications: [
      'Agriculture / agronomy degree or diploma',
      'Tractor, harvester & farm-machinery operation',
      'Irrigation, drip & greenhouse systems experience',
      'Pesticide & agrochemical handling training',
      'Good Agricultural Practice (GAP / GlobalG.A.P.) awareness',
      'Food technology & post-harvest handling',
    ],
    screening:
      'Candidates are screened for relevant crop, machinery or greenhouse experience, with degrees and training certificates verified and practical skills such as machinery operation confirmed. Field references and physical fitness for outdoor agricultural work are checked before deployment.',
  },

  security: {
    overview:
      "Falisha recruits security guards, supervisors, CCTV operators and safety officers for facilities, commercial sites and events across the Gulf. Markets such as the UAE require guards to complete regulator-approved training and licensing (for example Dubai's SIRA) after arrival, so we prioritise disciplined, physically fit candidates, many of them ex-services, who can clear those gates. Height, fitness and conduct standards are set by the employer and the destination regulator.",
    qualifications: [
      'Guard training & destination licensing (SIRA, SIA-style)',
      'First aid & basic life support',
      'Fire safety / fire-warden training',
      'CCTV & access-control operation',
      'Ex-military or police service (preferred)',
      'Clean police character / background certificate',
    ],
    screening:
      'Candidates are screened for physical fitness, height and conduct, with police character certificates and any prior security or armed-forces service verified. First-aid and fire-safety certificates are confirmed, and candidates are briefed on destination licensing requirements such as SIRA before deployment.',
  },

  'power--energy': {
    overview:
      "Falisha supplies electrical and power-plant engineers, high-voltage technicians, turbine and solar specialists and transmission linemen for generation, transmission and renewable-energy projects across the Gulf. As the region invests heavily in solar, wind and grid expansion under its diversification drive, demand has grown for both conventional-power and renewables skills. These roles carry strict electrical-safety and authorisation requirements that candidates must evidence.",
    qualifications: [
      'Electrical trade certification & HV / LV authorisation',
      'Power-plant & turbine operation and maintenance',
      'Solar PV & renewable-systems training',
      'High-voltage switching & substation safety',
      'HSE certification (NEBOSH / IOSH)',
      'Engineering degree or diploma (PEC-registered)',
    ],
    screening:
      'Candidates are matched to voltage level, plant type and discipline, with electrical certifications, HV authorisations and safety training verified. Practical or technical assessment and prior plant or grid experience are confirmed before deployment, given the safety-critical nature of the work.',
  },

  education: {
    overview:
      "Falisha places schoolteachers, subject specialists, lecturers and academic staff with schools, colleges and training institutes in the Gulf and beyond. International and curriculum schools in the region value Pakistan's large pool of degree-qualified, English-medium educators across the sciences, mathematics, languages and the humanities. Requirements are usually subject- and curriculum-specific, with English-language ability a common prerequisite.",
    qualifications: [
      'Teaching qualifications (B.Ed / M.Ed)',
      'Subject degree in the teaching area',
      'English-teaching certs (TEFL / TESOL / CELTA)',
      'IELTS / English proficiency where required',
      'Curriculum experience (British, American, IB)',
      'Clean police character / child-protection clearance',
    ],
    screening:
      'Candidates are screened for subject expertise, curriculum experience and English fluency, with degrees and teaching qualifications verified. Teaching references and police or child-protection clearances are confirmed, and demonstration lessons or interviews are arranged with the employer before selection.',
  },

  fmcg: {
    overview:
      "Falisha staffs FMCG manufacturing, warehousing and distribution operations with production supervisors, machine operators, quality controllers and supply-chain staff for food, beverage and consumer-goods employers in the Gulf. High-throughput production lines and cold-chain logistics drive steady demand for hands-on operators and QC staff. We also supply sales and merchandising teams for the region's retail and distribution networks.",
    qualifications: [
      'Food safety & GMP (HACCP, ISO 22000)',
      'Quality management awareness (ISO 9001)',
      'Production & machine-operation experience',
      'Forklift & materials-handling licences',
      'Supply-chain or warehouse-management training',
      'Relevant diploma / degree for technical & sales roles',
    ],
    screening:
      'Operators and QC staff are assessed for line experience and food-safety awareness such as HACCP and GMP, with machine and forklift competencies and certificates verified. Production references and, for sales roles, track-record checks are confirmed before deployment.',
  },

  livestock: {
    overview:
      "Falisha supplies livestock supervisors, dairy and poultry workers, herdsmen and veterinary assistants for commercial farms and agri-food operations, notably the Gulf's growing dairy and poultry sector. Pakistan's extensive livestock economy provides workers experienced in large-herd dairy, poultry sheds and feedlot operations. Roles range from hands-on animal handlers to degree-qualified veterinary and nutrition staff.",
    qualifications: [
      'Veterinary degree / diploma (DVM) or vet-assistant training',
      'Animal husbandry & dairy / poultry management',
      'Artificial insemination & herd-health training',
      'Animal nutrition & feed-mill knowledge',
      'Farm biosecurity & hygiene awareness',
      'Verified farm experience letters',
    ],
    screening:
      'Candidates are screened for hands-on experience with the relevant animals, whether dairy cattle, poultry or feedlot stock, and for practical handling skills, with veterinary qualifications verified where applicable. Farm references, biosecurity awareness and physical fitness for farm work are confirmed before deployment.',
  },

  'steel-fabrication': {
    overview:
      "Steel fabrication is a specialist, test-driven sector for Falisha, supplying coded welders, fabricators, fitters and QC inspectors for structural-steel, pressure-vessel and heavy-fabrication workshops across the Gulf. Because fabrication quality is weld-dependent, employers insist on welders who can pass a coded test to the project's welding procedure before hire. We maintain a pool of trade-tested welders across MIG, TIG and arc processes and positions up to 6G.",
    qualifications: [
      'Coded welding certification (AWS D1.1, ASME IX)',
      'Welder qualification to client WPS / PQR, up to 6G',
      'MIG / TIG / arc / flux-cored process competence',
      'Welding inspection (CSWIP, AWS CWI)',
      'NDT methods awareness (RT, UT, MT, PT)',
      'Drawing reading & fabrication experience',
    ],
    screening:
      "Welders sit a practical weld test to the client's welding procedure, frequently third-party witnessed and checked by NDT, with position and process confirmed before selection. Fabricators and fitters are assessed on drawing interpretation and prior workshop experience, with references verified.",
  },

  transportation: {
    overview:
      "Falisha supplies professional drivers, heavy-equipment operators, fleet supervisors and logistics staff for transport, distribution and construction fleets across the Gulf. Light- and heavy-vehicle drivers are in constant demand, and candidates must hold the correct licence category and convert it to the destination country's standard on arrival. We also place diesel mechanics and logistics coordinators who keep those fleets running.",
    qualifications: [
      'Valid driving licence of the correct category',
      'Heavy-vehicle (C / C+E) or bus (D) entitlement',
      'Dangerous-goods / tanker endorsement (ADR-style)',
      'Defensive-driving & road-safety training',
      'Heavy-equipment certificates (crane, forklift)',
      'Diesel-mechanic trade certificate (workshop roles)',
    ],
    screening:
      "Drivers' licences and category entitlements are verified and a practical driving or equipment test is arranged where the employer requires it. Driving records, experience letters and medical or eyesight fitness are checked, and candidates are briefed on destination licence-conversion rules before deployment.",
  },

  'travel--tourism': {
    overview:
      "Falisha recruits travel consultants, ticketing and reservations agents, tour operators and airport and cabin-crew staff for the Gulf's travel, aviation and tourism industry. The region's position as a global aviation and tourism hub sustains demand for GDS-trained, customer-facing and often multilingual staff. Roles range from retail travel and ground handling through to airline cabin crew, each with its own training and certification path.",
    qualifications: [
      'IATA / UFTAA travel & ticketing certification',
      'GDS proficiency (Amadeus, Galileo, Sabre)',
      'Cabin-crew & aviation-regulator certification',
      'Customer-service & tourism diplomas',
      'First aid & emergency-procedures training',
      'Multilingual ability / English proficiency',
    ],
    screening:
      'Candidates are assessed for customer-service manner, grooming and spoken-English and other language ability, with GDS and ticketing skills tested for reservations roles. Travel or aviation certifications and prior experience are verified, and cabin-crew applicants are prepared for airline assessment days before selection.',
  },
}

// SEO audit (27 Oct 2026), Issue 7 — the industry pages shared one boilerplate
// "nationwide network / offices in Rawalpindi" paragraph and an identical templated
// FAQ across every sector, which read as generic. This map gives each sector its own
// demand paragraph (where the overseas demand actually is, and why) and two bespoke
// FAQs, so no two industry pages say the same thing. Markets and certifications are
// real and publicly standard; no invented clients or statistics. British spelling.

export type IndustryExtra = {
  demand: string // sector-specific: which markets are hiring and why
  faqs: { q: string; a: string }[] // 2 bespoke FAQs, prepended ahead of the generic ones
}

export const INDUSTRY_EXTRA: Record<string, IndustryExtra> = {
  construction: {
    demand:
      "The heaviest demand is in the Gulf, where Saudi Arabia's Vision 2030 giga-projects (NEOM, Qiddiya, the Red Sea and Diriyah), alongside continued building in the UAE and Qatar, run for years rather than months — which means steady, repeatable requirements for complete site teams rather than one-off vacancies.",
    faqs: [
      {
        q: 'Which markets have the most construction demand right now?',
        a: "Saudi Arabia leads, driven by the Vision 2030 giga-projects, followed by the UAE and Qatar. These are multi-year pipelines, so we can mobilise trades in waves as a project ramps up.",
      },
      {
        q: 'Do construction candidates have to pass a trade test?',
        a: 'Yes — masons, steel fixers, shuttering carpenters, electricians and the like complete a practical trade test and tool-handling assessment, and site-experience letters are verified, before you interview and select.',
      },
    ],
  },
  'oil--gas': {
    demand:
      "Oil, gas and petrochemical demand concentrates in Saudi Arabia, the UAE, Qatar and the wider Gulf, and peaks sharply around planned shutdown and turnaround windows — so we keep a ready pool of safety-certified, often third-party-coded hands who can mobilise at short notice.",
    faqs: [
      {
        q: 'Can you supply third-party coded welders?',
        a: "Yes. Welders are tested to the client's welding procedure and are frequently coded up to 6G before mobilisation, with ASME/API tickets and NDT certifications verified.",
      },
      {
        q: 'What safety certifications do oil & gas workers need?',
        a: 'Depending on the site, BOSIET/HUET offshore survival, H2S awareness, confined-space and work-at-height training and an offshore-style medical are checked before deployment.',
      },
    ],
  },
  healthcare: {
    demand:
      "Healthcare demand runs on two tracks: the Gulf (Saudi Arabia, the UAE and Qatar), where nurses and doctors must clear a licensing exam and primary-source verification, and the UK and Europe, where our pipeline now centres on NMC-registered nurses and allied-health professionals rather than care assistants.",
    faqs: [
      {
        q: 'Do nurses need DataFlow and a Gulf licensing exam?',
        a: 'Yes. Gulf-bound nurses complete DataFlow primary-source verification and the relevant licensing exam (Prometric, DHA, MOH, SCFHS or DOH) before a visa is issued; we focus on exam-ready, fully documented candidates.',
      },
      {
        q: 'Can you supply nurses for the UK?',
        a: 'We place NMC-registered nurses and allied-health professionals for the UK with OET or IELTS English proficiency. Note the UK has been closed to new overseas care-worker applications since July 2025.',
      },
    ],
  },
  'information-technology': {
    demand:
      "IT demand is driven by Gulf digital-transformation and smart-city programmes (particularly in Saudi Arabia and the UAE) and by selected European tech employers, with the strongest pull for software engineers, cloud and DevOps specialists, data and cybersecurity professionals.",
    faqs: [
      {
        q: 'What IT roles are most in demand overseas?',
        a: 'Software and full-stack engineers, cloud and DevOps specialists, data engineers and analysts, cybersecurity professionals and ERP/SAP consultants see the strongest demand across the Gulf and Europe.',
      },
      {
        q: 'How are IT candidates screened?',
        a: 'Experience and project portfolios are verified and, where an employer requires it, a technical assessment or coding test is arranged alongside the interview.',
      },
    ],
  },
  hospitality: {
    demand:
      "Hospitality demand tracks the Gulf's tourism expansion — Saudi Arabia's opening to tourism, the UAE and Qatar's hotel and events sector — with additional openings in Europe, for chefs, F&B and front-of-house staff who can show grooming, service manner and English.",
    faqs: [
      {
        q: 'Which hospitality roles do you recruit for?',
        a: 'Chefs and cooks (by cuisine), waiters and F&B service, baristas, housekeeping, front-office and reservations, and hotel supervisory staff — for hotels, restaurants and catering across the Gulf and Europe.',
      },
      {
        q: 'How do you assess hospitality candidates?',
        a: 'Candidates are assessed for service manner, grooming and spoken English, with a practical skills test (for example a cooking trial) arranged for chef and specialist roles before selection.',
      },
    ],
  },
  engineering: {
    demand:
      "Engineering demand follows the Gulf's project pipeline — oil and gas, construction, power and manufacturing in Saudi Arabia, the UAE and Qatar — with degree-qualified mechanical, electrical, civil and QA/QC engineers also sought by selected European employers.",
    faqs: [
      {
        q: 'Do you verify engineering degrees and experience?',
        a: 'Yes — degrees, professional memberships and project-experience letters are verified, and discipline-specific competency is confirmed before the employer interviews the candidate.',
      },
      {
        q: 'Which engineering disciplines are most requested?',
        a: 'Mechanical, electrical, civil, QA/QC, planning and project engineers are the most frequently requested across Gulf oil & gas, construction and power projects.',
      },
    ],
  },
  'banking--finance': {
    demand:
      "Banking and finance demand centres on the Gulf's financial hubs — the UAE, Saudi Arabia and Qatar — for relationship managers, credit and risk analysts, compliance and AML specialists and finance professionals who hold recognised qualifications.",
    faqs: [
      {
        q: 'What qualifications do banking candidates need?',
        a: 'Recognised professional qualifications (such as ACCA, CFA or equivalent) and verified degrees, plus sector experience in banking, credit, risk or compliance, depending on the role.',
      },
      {
        q: 'Which markets hire the most finance staff?',
        a: 'The UAE, Saudi Arabia and Qatar, where expanding banking, investment and fintech sectors recruit experienced, qualified professionals.',
      },
    ],
  },
  'accountancy--finance': {
    demand:
      "Accountancy demand is steady across the Gulf (the UAE, Saudi Arabia and Qatar), where businesses need qualified and part-qualified accountants, auditors, and accounts and payroll staff familiar with VAT and local reporting requirements.",
    faqs: [
      {
        q: 'Do you supply qualified and part-qualified accountants?',
        a: 'Yes — from accounts assistants and payroll staff through to qualified accountants and auditors (ACCA, CA, CMA or equivalent), with qualifications and experience verified.',
      },
      {
        q: 'Is VAT or local-reporting experience checked?',
        a: 'Where the employer requires it, familiarity with VAT and local reporting standards is confirmed as part of screening for accounting and audit roles.',
      },
    ],
  },
  textile: {
    demand:
      "Textile and garment demand comes from manufacturing employers in the Gulf and beyond who need experienced machine operators, cutters, stitchers, quality controllers and production supervisors drawn from Pakistan's large, skilled textile workforce.",
    faqs: [
      {
        q: 'Which textile roles do you recruit for?',
        a: 'Stitching and sewing-machine operators, cutters, pattern masters, quality controllers, dyeing and finishing hands and production supervisors — with practical skill tested before selection.',
      },
      {
        q: 'Are textile candidates skill-tested?',
        a: 'Yes — machine operators and specialist hands complete a practical test, and prior factory experience is verified, so employers receive production-ready workers.',
      },
    ],
  },
  agriculture: {
    demand:
      "Agricultural demand comes from large-scale Gulf farming and dairy producers (particularly in Saudi Arabia and the UAE) and from seasonal and year-round operations in parts of Europe, for farm workers, machinery operators, greenhouse and dairy staff.",
    faqs: [
      {
        q: 'What agricultural roles are in demand?',
        a: 'General farm workers, tractor and machinery operators, greenhouse and irrigation hands, and dairy and livestock workers for large Gulf agribusinesses and European seasonal operations.',
      },
      {
        q: 'Do candidates need specific farming experience?',
        a: 'Relevant experience is verified and, for machinery and dairy roles, practical competence is checked before deployment.',
      },
    ],
  },
  security: {
    demand:
      "Security demand is strongest in the Gulf — Qatar, Saudi Arabia and the UAE — for licensed security guards and supervisors across facilities, events, retail and corporate sites, where physical fitness and local licensing (such as SIRA) matter.",
    faqs: [
      {
        q: 'Do security guards need local licensing?',
        a: 'Many Gulf markets require local security licensing (for example SIRA in the UAE); candidates are prepared for these requirements, and height, fitness and background checks are completed before selection.',
      },
      {
        q: 'What security roles can you supply?',
        a: 'Security guards, CCTV and control-room operators, and security supervisors for facilities, events, retail and corporate clients across the Gulf.',
      },
    ],
  },
  'power--energy': {
    demand:
      "Power and energy demand follows the Gulf's generation, transmission and fast-growing renewables build-out — including Saudi Arabia's solar and NEOM energy programmes — for plant operators, high-voltage and instrumentation technicians and turbine and solar specialists.",
    faqs: [
      {
        q: 'Do you supply renewables as well as conventional power staff?',
        a: 'Yes — alongside conventional plant operators and high-voltage technicians, we recruit solar PV and turbine technicians for the Gulf renewables programmes.',
      },
      {
        q: 'How are power & energy technicians screened?',
        a: 'Discipline-specific competency, certifications and prior plant experience are verified, with a practical or safety assessment where the employer requires it.',
      },
    ],
  },
  education: {
    demand:
      "Education demand comes mainly from Gulf schools and training institutes (in the UAE, Saudi Arabia and Qatar) seeking qualified teachers, subject specialists and academic support staff with recognised teaching qualifications and strong English.",
    faqs: [
      {
        q: 'What teaching roles do you recruit for?',
        a: 'Subject teachers (maths, science, English and more), early-years and special-needs staff, lecturers and academic coordinators for schools and institutes across the Gulf.',
      },
      {
        q: 'Are teaching qualifications verified?',
        a: 'Yes — degrees, teaching qualifications (such as B.Ed or PGCE) and experience are verified, and English proficiency is confirmed before the employer interviews.',
      },
    ],
  },
  fmcg: {
    demand:
      "FMCG demand comes from Gulf distribution, retail and food-and-beverage companies needing merchandisers, sales and distribution staff, warehouse and logistics hands and production operatives to support fast-moving supply chains.",
    faqs: [
      {
        q: 'Which FMCG roles are most requested?',
        a: 'Merchandisers, van salesmen and distribution staff, warehouse and inventory hands, and production and packaging operatives for Gulf retail and food-and-beverage businesses.',
      },
      {
        q: 'How are FMCG candidates screened?',
        a: 'Experience is verified and, for sales and distribution roles, driving licences and customer-facing ability are checked before selection.',
      },
    ],
  },
  livestock: {
    demand:
      "Livestock demand comes from large Gulf dairy, poultry and meat producers — particularly in Saudi Arabia and the UAE — for herdsmen, milking-parlour and poultry-farm operatives, and veterinary support staff on industrial-scale farms.",
    faqs: [
      {
        q: 'What livestock roles do you recruit for?',
        a: 'Herdsmen and cattle handlers, milking-parlour operatives, poultry-farm workers and veterinary assistants for large Gulf dairy, poultry and meat producers.',
      },
      {
        q: 'Is hands-on livestock experience required?',
        a: 'Relevant farm experience is verified, and practical competence with animals or parlour equipment is checked where the employer requires it.',
      },
    ],
  },
  'steel-fabrication': {
    demand:
      "Steel-fabrication demand feeds the Gulf's oil & gas, construction and industrial sectors (Saudi Arabia, the UAE and Qatar), for fabricators, fitters, coded welders and riggers who can work to drawing and to specification.",
    faqs: [
      {
        q: 'Can you supply fabricators who work to drawing?',
        a: 'Yes — fabricators and fitters are trade-tested on reading drawings and working to specification, and coded welders are tested to the relevant procedure before mobilisation.',
      },
      {
        q: 'Which sectors hire steel-fabrication trades?',
        a: 'Gulf oil & gas, construction, shipyards and heavy industry, especially around fabrication yards in Saudi Arabia, the UAE and Qatar.',
      },
    ],
  },
  transportation: {
    demand:
      "Transport and logistics demand is strong across the Gulf, driven by e-commerce, distribution and construction haulage, for light- and heavy-vehicle (HTV) drivers, delivery riders, warehouse staff and logistics coordinators.",
    faqs: [
      {
        q: 'Do you supply heavy-vehicle (HTV) drivers?',
        a: 'Yes — light- and heavy-vehicle drivers are supplied with licences and category entitlements verified and a practical driving test arranged where the employer requires it.',
      },
      {
        q: 'Are drivers briefed on licence conversion?',
        a: 'Yes — candidates are briefed on the destination’s licence-conversion rules before deployment, and driving records and medical/eyesight fitness are checked.',
      },
    ],
  },
  'travel--tourism': {
    demand:
      "Travel and tourism demand centres on the Gulf's role as a global aviation and tourism hub (the UAE, Qatar and a fast-opening Saudi Arabia), for GDS-trained travel and ticketing agents, tour operators and airport and cabin-crew staff.",
    faqs: [
      {
        q: 'Do travel agents need GDS experience?',
        a: 'For reservations and ticketing roles, GDS proficiency (Amadeus, Galileo or Sabre) and IATA/UFTAA certification are tested and verified before selection.',
      },
      {
        q: 'Can you prepare cabin-crew candidates?',
        a: 'Yes — cabin-crew applicants are screened for grooming, service manner and English and prepared for airline assessment days before the employer’s selection.',
      },
    ],
  },
}
