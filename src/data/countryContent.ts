// Rich, code-level content for specific destination countries, rendered on the
// country detail page (/countries/[slug]) in addition to (or instead of) the CMS
// data. Lets us publish detailed, SEO-strong per-country pages without a DB
// write — a country present here renders even when no CMS record exists yet.
// Extend this map to enrich or add more markets over time.

/** A unique, per-country prose block rendered on the country page. */
export type CountrySection = { heading: string; body: string[] }

export type CountryContent = {
  /** Display name, e.g. "United Kingdom" (used when there is no CMS record). */
  name?: string
  /** Region key, matches the CMS `region` values. */
  region?: string
  /** Human-readable region label shown in the hero/quick-facts. */
  regionLabel?: string
  /** Short hero intro (CMS `intro` takes precedence when a record exists). */
  intro?: string
  /** Short sectors line for the quick-facts panel. */
  sectorsLabel?: string
  /** Fuller description paragraphs, shown under the header intro. */
  lead?: string[]
  /** Heading for the manpower-categories grid. */
  categoriesTitle?: string
  /** Manpower categories we recruit for this market. */
  categories?: string[]
  /** Short partnership line shown in the CTA band. */
  partnership?: string
  /** Unique, per-country deep-dive sections (market, roles, cities, process). */
  sections?: CountrySection[]
}

// ---- Regions ----------------------------------------------------------------

type Region = { key: string; label: string }
const R_GULF: Region = { key: 'gulf', label: 'Gulf / GCC' }
const R_EUROPE: Region = { key: 'europe', label: 'Europe' }
const R_EAST_ASIA: Region = { key: 'east-asia', label: 'East Asia' }
const R_SEA: Region = { key: 'sea', label: 'Southeast Asia' }
const R_CENTRAL_ASIA: Region = { key: 'central-asia', label: 'Central Asia & Caucasus' }
const R_MENA: Region = { key: 'mena', label: 'Middle East & North Africa' }

// ---- Shared building blocks -------------------------------------------------

const OFFICES_PARA =
  'With a nationwide sourcing network and offices in Rawalpindi (head office), Lahore, Karachi, Peshawar and Azad Jammu & Kashmir (AJK), our team manages candidate screening, documentation and full deployment coordination throughout the hiring process.'

function buildLead(grammaticalName: string, opener: string, sectors: string): string[] {
  return [
    opener,
    `As a Government of Pakistan–licensed Overseas Employment Promoter (OEP Licence No. 4035, BEOE-registered) with over 15 years of international recruitment experience, Falisha Manpower sources skilled, semi-skilled and unskilled Pakistani workers for employers in ${grammaticalName} across ${sectors}, in line with applicable work-permit and employment regulations.`,
    OFFICES_PARA,
  ]
}

function partnershipLine(grammaticalName: string): string {
  return `Employers and recruitment agencies in ${grammaticalName} — share your current or upcoming manpower requirements and our team will source, screen and mobilise suitable candidates for your projects.`
}

/**
 * Build a country entry. `name` may carry a leading article for grammar
 * ("the United Kingdom"); the display name strips it ("United Kingdom").
 */
function entry(name: string, opener: string, sectors: string, categories: string[], region: Region): CountryContent {
  const display = name.replace(/^the\s+/i, '')
  return {
    name: display,
    region: region.key,
    regionLabel: region.label,
    intro: opener,
    sectorsLabel: sectors,
    lead: buildLead(name, opener, sectors),
    categoriesTitle: `Manpower categories we recruit for ${name}`,
    categories,
    partnership: partnershipLine(name),
  }
}

// ---- Sector sentences (used in the licensing paragraph) ---------------------

const GULF_SECTORS =
  'construction, oil & gas, engineering, healthcare, hospitality, transport and facilities management'
const EUROPE_SECTORS =
  'construction, manufacturing, welding, logistics, agriculture, hospitality and caregiving'
const EAST_ASIA_SECTORS = 'manufacturing, caregiving, construction, agriculture and food processing'
const SEA_SECTORS = 'manufacturing, construction, plantation and services'
const CENTRAL_ASIA_SECTORS = 'oil & gas, construction, engineering and services'
const MENA_SECTORS = 'oil & gas, construction, infrastructure and reconstruction projects'
const UK_SECTORS = 'health & social care, construction, hospitality, logistics and engineering'

// ---- Manpower-category pools ------------------------------------------------

const GULF_CATEGORIES = [
  'Construction & Civil Workers',
  'Masons, Steel Fixers & Shuttering Carpenters',
  'Welders & Metal Fabricators',
  'Electricians & Plumbers',
  'HVAC & Refrigeration Technicians',
  'Mechanical & Industrial Technicians',
  'Oil, Gas & Petrochemical Workers',
  'Heavy & Light Vehicle Drivers',
  'Healthcare — Nurses & Paramedics',
  'Hospitality, Hotel & Restaurant Staff',
  'Chefs, Cooks & Kitchen Staff',
  'Housekeeping & Cleaning Staff',
  'Security Guards & Safety Officers',
  'Warehouse, Logistics & Storekeepers',
  'Facilities & Maintenance Staff',
  'General Labourers & Helpers',
]

const EUROPE_CATEGORIES = [
  'Construction & Civil Workers',
  'Welders & Metal Fabricators',
  'CNC & Machine Operators',
  'Manufacturing & Production Workers',
  'Warehouse & Logistics Workers',
  'Forklift Operators & Drivers',
  'LGV / HGV & Delivery Drivers',
  'Agriculture & Farm Workers',
  'Food-Processing & Packaging Workers',
  'Hospitality & Hotel Staff',
  'Chefs, Cooks & Kitchen Staff',
  'Caregivers & Domestic Staff',
  'Cleaners & Housekeeping Staff',
  'Electricians, Plumbers & Technicians',
  'General Labourers & Helpers',
]

const EAST_ASIA_CATEGORIES = [
  'Manufacturing & Factory Workers',
  'Machine & Equipment Operators',
  'Welders & Metal Fabricators',
  'Construction & Civil Workers',
  'Caregivers & Nursing-Care Workers',
  'Agriculture & Farm Workers',
  'Food & Beverage Processing Workers',
  'Food-Service & Restaurant Staff',
  'Automotive & Parts-Assembly Workers',
  'Shipbuilding & Marine Trades',
  'Warehouse & Logistics Workers',
  'General Labourers & Helpers',
]

const SEA_CATEGORIES = [
  'Manufacturing & Factory Workers',
  'Electronics & Assembly Operators',
  'Construction & Civil Workers',
  'Plantation & Agriculture Workers',
  'Welders & Fabricators',
  'Warehouse & Logistics Workers',
  'Forklift Operators & Drivers',
  'Hospitality & Restaurant Staff',
  'Housekeeping & Cleaning Staff',
  'Security Guards',
  'General Labourers & Helpers',
]

const CENTRAL_ASIA_CATEGORIES = [
  'Oil, Gas & Petrochemical Workers',
  'Construction & Civil Workers',
  'Welders & Metal Fabricators',
  'Electricians & Plumbers',
  'Mechanical & Industrial Technicians',
  'Heavy & Light Vehicle Drivers',
  'Warehouse & Logistics Workers',
  'Textile & Garment Workers',
  'Hospitality & Restaurant Staff',
  'General Labourers & Helpers',
]

const MENA_CATEGORIES = [
  'Oil, Gas & Petrochemical Workers',
  'Construction & Civil Workers',
  'Welders & Metal Fabricators',
  'Steel Fixers, Masons & Shuttering Carpenters',
  'Electricians & Plumbers',
  'Mechanical & HVAC Technicians',
  'Heavy & Light Vehicle Drivers',
  'Warehouse & Logistics Workers',
  'Hospitality & Catering Staff',
  'General Labourers & Helpers',
]

const UK_CATEGORIES = [
  'Registered Nurses (NMC)',
  'Doctors & Allied Health Professionals',
  'Chefs, Cooks & Kitchen Staff',
  'Hospitality & Hotel Staff',
  'Construction & Civil Workers',
  'Welders & Metal Fabricators',
  'Electricians, Plumbers & Technicians',
  'Warehouse & Logistics Workers',
  'LGV / HGV & Delivery Drivers',
  'Food-Processing & Packaging Workers',
  'Engineers & Technical Specialists',
  'General Labourers & Helpers',
]

// ---- Per-country content ----------------------------------------------------

// ---- Unique per-country deep-dive content (famous markets first) -----------
// Each block is written specifically for that market — no templated/duplicated
// text — to give the page real depth for readers and search engines.

const SAUDI_SECTIONS: CountrySection[] = [
  {
    heading: 'Why Saudi Arabia is our largest Gulf market',
    body: [
      'Saudi Arabia runs one of the biggest construction and infrastructure pipelines in the world, and Pakistani workers have helped build it for decades. Under Vision 2030 the Kingdom is delivering a wave of giga-projects — NEOM and its linear city THE LINE, the Red Sea tourism developments, Qiddiya, Diriyah Gate and the ROSHN housing programme — alongside the continuous expansion of Riyadh, Jeddah and the industrial Eastern Province. Each of these needs tens of thousands of trades, technicians and support staff on multi-year contracts, which is exactly the manpower Falisha Manpower mobilises from Pakistan.',
      'Demand is broad-based rather than tied to a single sector. Construction and MEP lead the way, but the Kingdom is also hiring hard in oil & gas and petrochemicals across the Aramco and SABIC supply chains, in healthcare as new hospitals and clinics open, and in hospitality and facilities management as religious tourism around Makkah and Madinah and the new leisure destinations scale up. Saudi employers value Pakistani candidates for their skills, discipline and familiarity with Gulf sites, and the long-standing Pakistan–Saudi labour relationship keeps the visa and deployment process well understood on both sides.',
    ],
  },
  {
    heading: 'Trades and professions in demand',
    body: [
      'On the technical side we regularly deploy civil and MEP teams — masons, steel fixers, shuttering carpenters, scaffolders, electricians, plumbers, HVAC technicians, pipe fitters and welders (SMAW, GTAW and structural). Heavy-equipment and crane operators, light- and heavy-vehicle drivers who convert to a Saudi licence, and warehouse and logistics staff see steady demand across projects and long-term facilities contracts.',
      'Beyond the trades we recruit healthcare professionals such as nurses and technicians who clear SCFHS and Prometric requirements, hospitality and catering staff — chefs, cooks, waiters and housekeeping — for hotels, worker camps and the growing tourism sector, and general labour and helpers for site and facilities work. For employers hiring at volume we run bulk mobilisation; for specialist, technical or supervisory roles we shortlist candidates and arrange interviews by video or in person.',
    ],
  },
  {
    heading: 'From Riyadh to the Red Sea — where we deploy',
    body: [
      'We place candidates right across the Kingdom: Riyadh and the Central Region; Jeddah, Makkah and Madinah in the west; Dammam, Khobar and Jubail in the oil-rich Eastern Province; and the emerging NEOM, Tabuk and Red Sea sites in the north-west. Wherever the project is, our team coordinates sourcing, trade testing and documentation from our Rawalpindi head office and branches in Lahore, Karachi, Peshawar and AJK.',
      'The deployment route is well established: offer and demand letter, GAMCA medical-fitness screening, Protector of Emigrants clearance in Pakistan, and the Enjaz work visa processed through the Saudi embassy and consulates — with attestation and travel handled end-to-end. We keep employers updated at every stage so mobilisation stays on schedule and candidates arrive ready to work.',
    ],
  },
  {
    heading: 'Pay, contracts and worker protection',
    body: [
      'Saudi labour law requires written employment contracts, and salaries are paid through the Wage Protection System (WPS), with employers managing visas, contracts and payroll on the government Qiwa and Mudad platforms and enrolling workers in GOSI. Wages, working hours and end-of-service entitlements are therefore documented and traceable.',
      'We make sure every placement is on a clear contract that states the role, salary, hours and benefits before travel, and we brief candidates on what to expect on site. Employers get workers who understand their terms, which reduces disputes and turnover during the contract.',
    ],
  },
  {
    heading: 'For Pakistani candidates — what to expect',
    body: [
      'If you are applying for work in Saudi Arabia, you will typically need a valid passport, relevant trade or education certificates, experience letters and a clear GAMCA medical. Many technical roles involve a short trade test to confirm your skills before selection; once selected, we guide you through the Enjaz visa, Protector of Emigrants clearance and travel.',
      'On arrival your employer sponsors your Iqama (residence permit) and arranges accommodation and transport in line with your contract. We brief every candidate on the role, salary and conditions before departure so you travel fully informed — and in keeping with BEOE and Protector rules, we never charge candidates unlawful fees.',
    ],
  },
]

const UAE_SECTIONS: CountrySection[] = [
  {
    heading: 'A diversified economy hiring at scale',
    body: [
      'The United Arab Emirates is one of the most sought-after destinations for Pakistani workers because its economy is diversified and always building. Dubai, Abu Dhabi and Sharjah run parallel pipelines in construction and real estate, hospitality and tourism, aviation and logistics, healthcare, retail and facilities management — so hiring rarely depends on a single industry. Mega-developments, airport and port expansions, and a constant flow of events and tourism keep demand for skilled and semi-skilled manpower high throughout the year.',
      'Pakistani workers form one of the largest expatriate communities in the UAE, and employers there know the quality and reliability they bring. Falisha Manpower supplies vetted candidates for Emirati main contractors, subcontractors, hospitality groups, logistics operators and manpower-supply companies, handling everything from a handful of specialists to large project mobilisations.',
    ],
  },
  {
    heading: 'Roles we place across the Emirates',
    body: [
      'In construction and MEP we supply masons, carpenters, steel fixers, scaffolders, electricians, plumbers, AC technicians and welders, plus foremen and site supervisors. Logistics and transport employers hire drivers, forklift and crane operators, storekeepers and warehouse staff for Jebel Ali, the airports and distribution hubs.',
      'Hospitality and services is a major corridor too — hotel and restaurant staff, chefs and cooks, waiters, housekeeping, cleaners and security guards for hotels, malls, facilities-management firms and camps. We also place retail staff, salon and spa workers, and general helpers, and for technical and supervisory positions we arrange video or in-person interviews before deployment.',
    ],
  },
  {
    heading: 'Where we deploy and how the visa works',
    body: [
      'We deploy across all seven emirates, with the heaviest demand in Dubai, Abu Dhabi, Sharjah and Ras Al Khaimah. Our team manages sourcing, trade testing and paperwork from Pakistan and coordinates closely with the sponsoring employer in the UAE.',
      'The standard route runs through an employment entry permit and work visa under MOHRE, a medical-fitness test and Emirates ID on arrival, and a labour contract — with GAMCA medical screening and Protector clearance completed in Pakistan first. We handle attestation, ticketing and onboarding so candidates reach site without delays.',
    ],
  },
  {
    heading: 'Pay, contracts and worker protection',
    body: [
      'Salaries in the UAE are paid through the Wage Protection System, so wages are transferred on time and on record, and every worker is on a standard labour contract that fixes salary, working hours, annual leave and end-of-service gratuity. These protections are a big part of why the UAE remains such a popular destination for Pakistani workers.',
      'We place candidates only on clear, documented contracts and brief them on the terms before travel. For employers that means fewer disputes and a workforce that understands exactly what it signed up for.',
    ],
  },
  {
    heading: 'For Pakistani candidates — what to expect',
    body: [
      'To work in the UAE you will usually need a valid passport, trade or education certificates, experience letters and a clear medical; many technical roles include a short trade test before selection. Once you are selected we arrange the entry permit and work visa, GAMCA medical and Protector of Emigrants clearance, then book travel.',
      'Your employer completes your residence visa, Emirates ID and medical on arrival and provides accommodation and transport as per contract. We brief you fully before you leave Pakistan and, in line with BEOE rules, never charge candidates unlawful fees.',
    ],
  },
  {
    heading: 'Where the demand is heading',
    body: [
      'The UAE hires steadily because several sectors move at once. Construction and fit-out follow a continuous pipeline of towers, infrastructure and the Etihad Rail network; logistics expands with Jebel Ali, the airports and e-commerce; and hospitality, retail and facilities management grow with tourism and a packed events calendar. For Pakistani workers that breadth means openings across skill levels throughout the year.',
      'We help employers stay ahead of it by holding a pre-screened candidate pool, so repeat requirements are filled fast, and we help candidates target the trades and sectors where demand is strongest.',
    ],
  },
  {
    heading: 'Spotlight: construction, logistics and hospitality',
    body: [
      'The UAE’s demand is broad because its biggest sectors all hire at once. Construction and fit-out follow a continuous pipeline of towers, infrastructure and the Etihad Rail network, needing civil and MEP trades — masons, steel fixers, carpenters, scaffolders, electricians, plumbers, AC technicians and welders — with foremen and supervisors to lead them.',
      'Logistics is a second engine: Jebel Ali, the airports and a fast-growing e-commerce sector hire drivers, forklift and crane operators, storekeepers and warehouse staff at scale. We trade-test technical candidates and can mobilise individuals or full teams.',
      'Hospitality, retail and facilities management form the third pillar, driven by tourism and a packed events calendar — hotel and restaurant staff, chefs, housekeeping, cleaners, security guards and maintenance teams. Across all three we source, screen and deploy Pakistani workers to UAE standards on a dependable timeline.',
    ],
  },
]

const QATAR_SECTIONS: CountrySection[] = [
  {
    heading: 'Beyond the World Cup — LNG and lasting infrastructure',
    body: [
      'Qatar invested heavily in infrastructure for the 2022 World Cup, and that momentum has continued well beyond it. The country is now expanding the North Field — the world’s largest liquefied-natural-gas project — and continuing to build roads, metro links, hotels, hospitals and mixed-use districts such as Lusail. For Pakistani workers that means sustained demand in oil & gas, construction, engineering, transport and hospitality rather than a one-off spike.',
      'Qatari main contractors, EPC companies and service providers hire Pakistani candidates for their technical skills and reliability. Falisha Manpower sources and screens trades, technicians, drivers and support staff and mobilises them under Qatar’s work-visa framework, handling the documentation from our offices in Pakistan.',
    ],
  },
  {
    heading: 'Skilled trades, drivers and technicians',
    body: [
      'We regularly place skilled engineers, technicians and tradespeople — electricians, plumbers, HVAC and mechanical technicians, welders and fabricators, steel fixers, shuttering carpenters and masons — along with the foremen and supervisors who lead them. Light- and heavy-vehicle drivers, bus drivers and equipment operators are in steady demand across projects and logistics.',
      'In services and hospitality we supply hotel and restaurant staff, cooks, housekeeping, cleaners, security guards and facilities-maintenance workers, plus general labour and helpers for site work. For niche or senior roles we arrange interviews and trade tests before selection.',
    ],
  },
  {
    heading: 'Doha, Lusail and Ras Laffan — deployment and process',
    body: [
      'Most placements are in and around Doha and Lusail, with industrial and energy roles concentrated at Ras Laffan and Mesaieed and infrastructure work spread across the country. Our team manages sourcing and documentation from Rawalpindi and our branch network.',
      'Candidates complete GAMCA medical screening and Protector of Emigrants clearance in Pakistan, and many roles require the Qatar Visa Centre (QVC) biometric and medical step before travel. We coordinate the work visa, attestation and travel so employers get candidates on site on time.',
    ],
  },
  {
    heading: 'Pay, contracts and worker protection',
    body: [
      'Qatar operates a non-discriminatory minimum wage and pays salaries through its Wage Protection System, transferring wages directly to bank accounts. Recent labour reforms let workers change jobs more freely and set clear rules on contracts and end-of-service benefits, so employment terms are transparent for Pakistani workers.',
      'We place candidates only on documented contracts that state salary, hours and benefits, and we brief them before departure. Employers get a workforce that understands its terms, and workers travel knowing exactly what to expect on arrival.',
    ],
  },
  {
    heading: 'For Pakistani candidates — what to expect',
    body: [
      'If you are applying for work in Qatar, you will usually need a valid passport, trade or education certificates, experience letters and a clear medical; technical roles often include a trade test. After selection we arrange the work visa, complete GAMCA and the Qatar Visa Centre (QVC) biometric and medical step, and handle Protector of Emigrants clearance and travel.',
      'On arrival your employer completes your residence permit and health card and provides accommodation and transport per contract. We brief every candidate before departure and, in line with BEOE and Protector rules, never charge candidates unlawful fees.',
    ],
  },
  {
    heading: 'Where the demand is heading',
    body: [
      'Qatar’s demand is anchored by two long-run drivers: the North Field LNG expansion, which runs for years and pulls in oil & gas, construction and technical trades, and the continued build-out and operation of Lusail, hotels and infrastructure from the World Cup era. The result is steady, multi-year hiring rather than short bursts.',
      'We help employers plan against that pipeline with pre-screened candidates ready to mobilise, and help Pakistani workers target the energy, construction and hospitality roles where Qatar is hiring most.',
    ],
  },
  {
    heading: 'Spotlight: LNG, energy and infrastructure',
    body: [
      'Qatar’s flagship driver is energy. The North Field expansion — the world’s largest LNG project — and the facilities at Ras Laffan and Mesaieed need a deep pool of technical manpower on long contracts: coded and pipeline welders, pipe fitters, riggers, scaffolders, instrument and electrical technicians, mechanical fitters and plant operators, plus HSE and QA/QC support.',
      'We trade-test these candidates before selection and supply certified welders and technicians to the standards EPC and energy contractors require, including experienced Gulf hands ready for shutdowns and turnarounds. It is exactly the manpower Qatar’s energy sector depends on.',
      'Alongside energy, Qatar continues to build and operate infrastructure, hotels and mixed-use districts, so we also place civil trades, drivers, and hospitality and facilities staff. Whether the requirement is a handful of specialists or a full project crew, we source, screen and mobilise on a predictable timeline.',
    ],
  },
]

const KUWAIT_SECTIONS: CountrySection[] = [
  {
    heading: 'An oil economy with steady manpower demand',
    body: [
      'Kuwait’s economy is built on oil, and the projects of Kuwait Oil Company (KOC), KNPC and the wider energy sector drive consistent demand for skilled and semi-skilled Pakistani workers. Alongside oil & gas, construction, maintenance, transport and services keep hiring across Kuwait City and the industrial areas, supported by long-standing bilateral labour ties between Pakistan and Kuwait.',
      'Employers and manpower-supply companies in Kuwait turn to Falisha Manpower for trades, technicians, drivers and support staff who can start quickly and work to Gulf standards. We source, trade-test and document candidates in Pakistan and mobilise them under Kuwait’s work-visa system.',
    ],
  },
  {
    heading: 'Trades, operators and support staff',
    body: [
      'We place construction and MEP trades — masons, steel fixers, carpenters, electricians, plumbers, HVAC and mechanical technicians, welders and pipe fitters — together with foremen and supervisors. Oil & gas and maintenance contracts also hire fabricators, riggers, scaffolders and plant operators.',
      'Transport and logistics employers need light- and heavy-vehicle drivers and equipment operators, while services and facilities contracts take cleaners, housekeeping, security guards, catering staff and general labour. We match candidates to each employer’s requirements and arrange interviews where needed.',
    ],
  },
  {
    heading: 'Deployment across Kuwait',
    body: [
      'Placements centre on Kuwait City and the surrounding governorates, with energy and industrial roles around Ahmadi and the oil belt. Sourcing, screening and paperwork are coordinated from our Pakistan offices.',
      'The process covers the work visa (Article 18 private-sector and related categories), GAMCA medical-fitness screening and Protector of Emigrants clearance in Pakistan, followed by attestation and travel — all managed end-to-end so mobilisation stays on track.',
    ],
  },
  {
    heading: 'Pay, contracts and worker protection',
    body: [
      'Kuwait routes private-sector salaries through its Wage Protection System and requires registered employment contracts that define salary, hours and benefits, with the Public Authority for Manpower overseeing the labour market. End-of-service indemnity and other entitlements are set by Kuwaiti labour law.',
      'Every candidate we deploy travels on a confirmed, documented contract, and we brief them on the role, pay and conditions beforehand so there are no surprises on arrival.',
    ],
  },
  {
    heading: 'For Pakistani candidates — what to expect',
    body: [
      'To work in Kuwait you will usually need a valid passport, trade or education certificates, experience letters and a clear GAMCA medical; many technical roles include a trade test before selection. After selection we arrange the work visa (Article 18 and related categories), complete Protector of Emigrants clearance, and handle attestation and travel.',
      'On arrival your employer completes your Civil ID and residence formalities and provides accommodation and transport as per contract. We brief you fully before departure and, in line with BEOE rules, never charge candidates unlawful fees.',
    ],
  },
  {
    heading: 'Where the demand is heading',
    body: [
      'Kuwait’s hiring is driven above all by its energy sector — Kuwait Oil Company, KNPC and the refineries and petrochemical complexes along the coast — supported by construction, maintenance and services contracts in and around Kuwait City. These are long programmes that need skilled trades, technicians and operators on a continuous basis.',
      'We help employers meet that demand with pre-screened, trade-tested candidates ready to mobilise, and help Pakistani workers aim for the oil & gas, construction and technical roles where Kuwait is hiring most.',
    ],
  },
  {
    heading: 'Spotlight: oil, gas and petrochemicals',
    body: [
      'Energy is the engine of Kuwait’s demand for Pakistani workers. Projects, turnarounds and maintenance contracts for Kuwait Oil Company, KNPC and the Al-Zour refinery and petrochemical complexes need a deep bench of technical trades — coded and pipeline welders, pipe fitters, riggers, scaffolders, instrument and electrical technicians, mechanical fitters and plant operators — plus the HSE and QA/QC staff that keep sites compliant.',
      'We trade-test these candidates before selection and can supply certified welders and technicians to the standards energy contractors require. Many are repeat deployments — experienced Gulf hands who already understand site discipline, permit-to-work systems and shutdown schedules — which is exactly what employers want on live plants.',
      'Beyond energy, Kuwait keeps hiring for building construction, roads and infrastructure and facilities contracts, so we also place civil trades, drivers, storekeepers and support staff. Whether you need two specialists or a full project crew, we source, screen and mobilise them on a predictable timeline.',
      'Kuwait’s energy projects run on tight schedules and strict standards, so employers prize manpower that can pass trade tests and start without a long learning curve. We maintain a standing pool of welders, fitters and technicians with Gulf experience, which lets us respond quickly when a turnaround, shutdown or new package is awarded. For larger mobilisations we coordinate phased intakes so the workforce arrives in step with the project plan, and we keep the sponsoring employer updated at every stage from selection through to boarding.',
    ],
  },
]

const OMAN_SECTIONS: CountrySection[] = [
  {
    heading: 'Ports, energy and tourism driving demand',
    body: [
      'Oman is investing steadily in logistics, energy, tourism and construction, and much of that growth is concentrated around its ports and free zones — Sohar, Salalah and the fast-developing Duqm Special Economic Zone. Oil & gas, petrochemicals, infrastructure and a growing hospitality sector create ongoing demand for skilled and semi-skilled Pakistani workers across the Sultanate.',
      'While Omanisation prioritises nationals for certain roles, there is continued demand for trades, technicians and specialists that local supply cannot fully meet. Falisha Manpower sources and screens those candidates in Pakistan and mobilises them for Omani employers, contractors and manpower-supply companies.',
    ],
  },
  {
    heading: 'Skilled and semi-skilled roles we supply',
    body: [
      'We deploy construction and MEP trades — masons, carpenters, steel fixers, electricians, plumbers, HVAC technicians, welders and fabricators — plus foremen and supervisors. Oil & gas, ports and industry hire riggers, scaffolders, plant and crane operators, fitters and maintenance technicians.',
      'In transport we place light- and heavy-vehicle drivers and equipment operators, and in services and hospitality we supply hotel and restaurant staff, cooks, housekeeping, cleaners, security guards and general labour. Candidates are trade-tested and documented before travel.',
    ],
  },
  {
    heading: 'Muscat, Sohar, Salalah and Duqm',
    body: [
      'Our placements span Muscat and the capital region, the industrial port cities of Sohar and Salalah, and the Duqm SEZ, with roles following each project and contract. Sourcing and documentation are handled from our Rawalpindi head office and branches.',
      'The route runs through an Omani employment visa and labour clearance, GAMCA medical-fitness screening and Protector of Emigrants clearance in Pakistan, with attestation and travel coordinated end-to-end so candidates arrive ready to start.',
    ],
  },
  {
    heading: 'Pay, contracts and worker protection',
    body: [
      'Oman’s labour law requires written employment contracts and routes wages through its Wage Protection System, with the employer responsible for the work visa, labour clearance and renewals. Salary, hours, leave and end-of-service benefits are set out in the contract and protected under Omani law.',
      'We confirm those terms before travel and brief each candidate, so workers arrive informed and employers onboard them without friction.',
    ],
  },
  {
    heading: 'For Pakistani candidates — what to expect',
    body: [
      'To work in Oman you will usually need a valid passport, trade or education certificates, experience letters and a clear GAMCA medical; technical roles may include a trade test before selection. After selection we arrange the employment visa and labour clearance, complete Protector of Emigrants clearance, and handle attestation and travel.',
      'On arrival the Royal Oman Police issue your residence card and your employer provides accommodation and transport per contract. We brief you fully before departure and, in line with BEOE rules, never charge candidates unlawful fees.',
    ],
  },
  {
    heading: 'Where the demand is heading',
    body: [
      'Oman’s growth is concentrated around its ports and free zones — Sohar, Salalah and the fast-developing Duqm Special Economic Zone — along with oil & gas, logistics, tourism and construction. These projects create ongoing demand for skilled trades, operators and technicians that the local workforce cannot fully meet.',
      'We help employers fill that gap with pre-screened candidates ready to deploy, and help Pakistani workers target the energy, ports, construction and hospitality roles where Oman is hiring most.',
    ],
  },
  {
    heading: 'Spotlight: ports, energy and logistics',
    body: [
      'Oman’s ports and free zones are reshaping its labour market. Sohar, Salalah and the Duqm Special Economic Zone are drawing refining, petrochemical, logistics and industrial investment, while established oil & gas fields continue to need maintenance and project manpower. For Pakistani workers that means sustained demand for technical trades and operators.',
      'We supply welders, pipe fitters, riggers, scaffolders, mechanical and electrical technicians, plant and crane operators and HSE staff for energy and industrial contracts, trade-testing candidates against the standards Omani contractors expect. Ports and logistics add forklift and equipment operators, drivers, storekeepers and warehouse staff.',
      'Construction, tourism and services create further demand across Muscat and the regions. We handle sourcing, screening, documentation and mobilisation end-to-end, supplying individual specialists or complete teams as each project requires.',
      'Oman balances Omanisation — reserving some roles for nationals — with a continued need for expatriate skills the local market cannot yet supply, particularly technical trades, operators and specialists on energy and port projects. We focus on exactly those categories, so the candidates we put forward fit where Omani employers are permitted and keen to hire, which keeps approvals and visas moving smoothly. We also track the growth of Duqm and the port cities, where new industrial tenants regularly open requirements, so employers scaling up there can source trained manpower at short notice rather than waiting on a slow pipeline.',
    ],
  },
]

const BAHRAIN_SECTIONS: CountrySection[] = [
  {
    heading: 'A compact Gulf hub for finance and industry',
    body: [
      'Bahrain is a regional financial and industrial hub with a long history of hiring Pakistani talent. Its economy spans banking and financial services, heavy industry led by Aluminium Bahrain (Alba), construction and real estate, logistics and a lively hospitality sector — a diverse base that keeps demand for skilled and semi-skilled manpower steady across the Kingdom.',
      'Bahraini contractors, industrial firms, hotels and facilities-management companies work with Falisha Manpower for reliable trades, technicians and support staff. We source, trade-test and document candidates in Pakistan and mobilise them under Bahrain’s work-permit system.',
    ],
  },
  {
    heading: 'Roles in demand across Bahrain',
    body: [
      'In construction and MEP we supply masons, carpenters, steel fixers, scaffolders, electricians, plumbers, HVAC technicians and welders, with foremen and supervisors to match. Industry and maintenance — including the aluminium and downstream sector — hire fabricators, riggers, operators and technicians.',
      'Services, hospitality and facilities contracts take hotel and restaurant staff, cooks, housekeeping, cleaners, security guards and drivers, along with general labour and helpers. We also support office and banking-operations roles, and arrange interviews for specialist or supervisory positions.',
    ],
  },
  {
    heading: 'Manama, Riffa and the industrial areas',
    body: [
      'Placements are concentrated in Manama and Riffa and the industrial zones around Sitra and Hidd, with project work across the island. Sourcing and paperwork are coordinated from our offices in Pakistan.',
      'The process runs through an LMRA work permit and employment visa, GAMCA medical-fitness screening and Protector of Emigrants clearance in Pakistan, followed by attestation and travel — managed end-to-end so employers get candidates on site without delay.',
    ],
  },
  {
    heading: 'Pay, contracts and worker protection',
    body: [
      'Bahrain administers expatriate employment through the Labour Market Regulatory Authority (LMRA) and pays wages via its Wage Protection System, with registered contracts setting salary, hours and benefits and end-of-service entitlements protected under Bahraini labour law.',
      'Candidates we place travel on clear, documented terms, and we brief them before departure so both employer and worker know exactly what to expect.',
    ],
  },
  {
    heading: 'For Pakistani candidates — what to expect',
    body: [
      'To work in Bahrain you will usually need a valid passport, trade or education certificates, experience letters and a clear GAMCA medical; technical roles may include a trade test before selection. After selection we arrange the LMRA work permit and employment visa, complete Protector of Emigrants clearance, and handle attestation and travel.',
      'On arrival you receive your CPR (identity card) and residence permit, and your employer provides accommodation and transport per contract. We brief you fully before departure and, in line with BEOE rules, never charge candidates unlawful fees.',
    ],
  },
  {
    heading: 'Where the demand is heading',
    body: [
      'Bahrain’s demand comes from a compact but diverse base: heavy industry led by Aluminium Bahrain (Alba) and the downstream sector, the Bapco refinery and its modernisation programme, construction and real estate, logistics, banking operations and a busy hospitality scene. That mix keeps hiring steady across skilled and semi-skilled roles.',
      'We help employers meet it with pre-screened, trade-tested candidates ready to mobilise, and help Pakistani workers target the industrial, construction, services and office roles where Bahrain is hiring most.',
    ],
  },
  {
    heading: 'Spotlight: industry, construction and services',
    body: [
      'Bahrain’s industrial base gives it steady, year-round demand. Aluminium Bahrain (Alba) and the downstream metals sector, the Bapco refinery and its modernisation programme, and a continuous flow of construction and real-estate work all need skilled trades and technicians that the local workforce cannot fully supply.',
      'We place welders, fabricators, riggers, scaffolders, mechanical and electrical technicians, plant operators and HSE staff for industrial and construction contracts, along with the civil trades — masons, carpenters, steel fixers and finishers — that building projects rely on. Candidates are trade-tested before selection.',
      'Bahrain’s services economy adds further demand: hospitality and facilities-management staff, drivers, security guards, and office and banking-operations support. We source, screen and mobilise for all of it, supplying anything from a single specialist to a full crew on a dependable timeline.',
      'Because Bahrain is compact, employers often need a reliable partner who can turn requirements around quickly rather than a large in-house hiring team. We fill that role — sourcing, trade-testing and documenting candidates in Pakistan and coordinating directly with the sponsoring company and the LMRA so permits and visas progress without delay. For industrial clients we can supply certified trades and technicians for shutdowns and expansions, and for hospitality and services employers we mobilise teams ahead of new openings, keeping the sponsoring employer updated from selection through to arrival.',
    ],
  },
]

const TURKEY_SECTIONS: CountrySection[] = [
  {
    heading: 'One of our strongest corridors',
    body: [
      'Türkiye is a key specialty market for Falisha Manpower, and one where we have deployed thousands of Pakistani workers. Turkish construction and EPC companies are among the most active in the world, running projects at home and across the region, while the country’s large manufacturing and textile base — from Istanbul and Bursa to the mills of Denizli and Gaziantep — hires continuously. That combination of contracting, industry and manufacturing creates sustained demand for skilled and semi-skilled Pakistani manpower.',
      'We work directly with employers, factories and recruitment agencies across Türkiye, sourcing and screening candidates in Pakistan and mobilising them in line with Turkish employment and work-permit regulations. Our long experience in this corridor means we understand what Turkish employers expect and how to move candidates efficiently from selection to arrival.',
    ],
  },
  {
    heading: 'Manufacturing, trades and textiles',
    body: [
      'Manufacturing and industry are the backbone of our Turkish placements — factory and production workers, machine and CNC operators, welders and metal fabricators, electricians, mechanical and HVAC technicians, and packaging and material-handling staff. Construction and EPC contracts add masons, steel fixers, carpenters, scaffolders and site trades, with foremen and supervisors to lead them.',
      'The textile and garment sector is a particular strength: we supply sewing-machine operators, tailors, cutters and finishing staff for garment units. We also place warehouse and logistics workers, forklift operators and drivers, hospitality and kitchen staff, and general labour — matching candidates to each employer’s exact requirement and trade-testing them beforehand.',
    ],
  },
  {
    heading: 'Istanbul, Bursa, Denizli and beyond',
    body: [
      'Our deployments span Türkiye’s main industrial centres — Istanbul, Bursa, Izmir, Ankara, Gaziantep and the textile hub of Denizli — following where factories and projects are hiring. Sourcing, screening and documentation are coordinated from our Rawalpindi head office and branches in Lahore, Karachi, Peshawar and AJK.',
      'The route runs through a Turkish work permit and work visa arranged with the sponsoring employer, with medical screening and Protector of Emigrants clearance completed in Pakistan, and attestation and travel handled end-to-end so candidates arrive ready to start.',
    ],
  },
  {
    heading: 'Pay, contracts and worker protection',
    body: [
      'In Türkiye employment is formalised through a work permit tied to the employer and registration with the SGK social-security system, with contracts setting out salary, working hours and benefits under Turkish labour law. That framework gives Pakistani workers documented terms and social-security cover.',
      'We place candidates on clear contracts and brief them before travel, so workers understand their terms and Turkish employers get a workforce that integrates quickly.',
    ],
  },
  {
    heading: 'For Pakistani candidates — what to expect',
    body: [
      'To work in Türkiye you will usually need a valid passport, trade or education certificates and experience letters; manufacturing and trade roles often include a skills or trade test before selection. After selection we coordinate the work permit and work visa with the sponsoring employer, complete medical screening and Protector of Emigrants clearance, and handle travel.',
      'On arrival you complete your residence permit (ikamet) and SGK registration, and your employer arranges accommodation and transport per contract. We brief you fully before departure and, in line with BEOE rules, never charge candidates unlawful fees.',
    ],
  },
  {
    heading: 'Where the demand is heading',
    body: [
      'Türkiye’s demand is unusual in the strength of its manufacturing and contracting base. Turkish construction and EPC firms win projects at home and across the region, while factories in Istanbul, Bursa, Izmir and the textile hub of Denizli hire continuously for production, machine operation and finishing work. For Pakistani workers that means openings in industry and trades through the year.',
      'We help employers source and trade-test at volume for factories and projects, and help Pakistani workers target the manufacturing, welding, textile and construction roles where Türkiye is hiring most.',
    ],
  },
  {
    heading: 'Spotlight: manufacturing, textiles and contracting',
    body: [
      'Türkiye’s strength is the breadth of its industrial base. Factories across Istanbul, Bursa, Izmir, Gaziantep and the textile hub of Denizli hire continuously for production, machine operation, assembly and finishing, while Turkish construction and EPC firms — among the most active contractors in the world — need site trades for projects at home and across the region.',
      'We supply factory and production workers, CNC and machine operators, welders and metal fabricators, electricians and mechanical technicians, and the sewing-machine operators, cutters and finishing staff that garment units rely on. Construction contracts add masons, steel fixers, carpenters, scaffolders and MEP trades. Candidates are trade-tested before selection.',
      'Warehouse and logistics workers, forklift operators, drivers and hospitality staff round out the demand. With long experience in this corridor, we source and screen at volume for factories and projects and mobilise candidates efficiently from selection to arrival.',
    ],
  },
]

export const COUNTRY_CONTENT: Record<string, CountryContent> = {
  turkey: {
    name: 'Türkiye',
    region: 'europe',
    regionLabel: 'Speciality market',
    intro:
      'Türkiye is one of our strongest corridors — we supply skilled and technical Pakistani workers to leading Turkish construction, EPC, energy and manufacturing companies.',
    sectorsLabel: 'manufacturing, construction, textiles, hospitality and engineering',
    lead: [
      'Türkiye is a key specialty market for Falisha Manpower. As a government-licensed Overseas Employment Promoter (OEP Licence No. 4035) with over 15 years of international recruitment experience, we have deployed thousands of Pakistani workers across skilled, semi-skilled and unskilled roles.',
      'We work with employers, companies and recruitment agencies across Türkiye to source manpower in line with your workforce requirements and applicable Turkish employment and work-permit regulations.',
      'With a nationwide sourcing network and offices in Rawalpindi (head office), Lahore, Karachi, Peshawar and Azad Jammu & Kashmir (AJK), our team provides reliable recruitment support, candidate screening and full coordination throughout the hiring process.',
    ],
    categoriesTitle: 'Manpower categories we recruit for Türkiye',
    categories: [
      'Manufacturing & Industrial Workers',
      'Factory & Production Workers',
      'Construction & Engineering Workers',
      'Welders & Metal Fabricators',
      'Electricians & Plumbers',
      'Mechanical & HVAC Technicians',
      'CNC & Machine Operators',
      'Textile & Garment Workers',
      'Sewing-Machine Operators & Tailors',
      'Warehouse & Logistics Workers',
      'Forklift Operators & Drivers',
      'Hospitality & Hotel Staff',
      'Chefs, Cooks & Restaurant Staff',
      'Housekeeping & Cleaning Staff',
      'Carpenters & Furniture Makers',
      'Automotive Mechanics',
      'General Labourers & Helpers',
      'Packaging & Material-Handling Workers',
      'Other Skilled, Semi-Skilled & Unskilled Workers',
    ],
    partnership:
      'Employers and recruitment agencies in Türkiye — share your current or upcoming manpower requirements and our team will source, screen and mobilise suitable candidates for your projects.',
  },

  // ---- Gulf / GCC ----
  'saudi-arabia': entry(
    'Saudi Arabia',
    "Saudi Arabia is the Gulf's largest labour market and a core destination for Falisha Manpower. Vision 2030 giga-projects — from NEOM and the Red Sea developments to Riyadh's rapid expansion — are driving sustained demand for Pakistani workers across construction, energy, healthcare and hospitality.",
    GULF_SECTORS,
    GULF_CATEGORIES,
    R_GULF,
  ),
  'united-arab-emirates': entry(
    'the United Arab Emirates',
    'The United Arab Emirates is one of the most sought-after destinations for Pakistani workers, with a diversified economy across Dubai, Abu Dhabi and Sharjah hiring in construction, hospitality, healthcare, logistics and facilities management.',
    GULF_SECTORS,
    GULF_CATEGORIES,
    R_GULF,
  ),
  qatar: entry(
    'Qatar',
    'Qatar continues to invest heavily in infrastructure, energy and services beyond its World Cup legacy, creating steady demand for skilled engineers, technicians, drivers and trades from Pakistan.',
    GULF_SECTORS,
    GULF_CATEGORIES,
    R_GULF,
  ),
  kuwait: entry(
    'Kuwait',
    "Kuwait's oil, construction and services sectors offer long-standing opportunities for skilled and professional Pakistani candidates, supported by established bilateral labour ties.",
    GULF_SECTORS,
    GULF_CATEGORIES,
    R_GULF,
  ),
  oman: entry(
    'Oman',
    "Oman's growing investment in oil & gas, logistics, construction and tourism is creating fresh openings for skilled and semi-skilled Pakistani workers.",
    GULF_SECTORS,
    GULF_CATEGORIES,
    R_GULF,
  ),
  bahrain: entry(
    'Bahrain',
    'Bahrain is a regional financial and industrial hub that hires Pakistani talent across construction, manufacturing, banking operations and hospitality.',
    GULF_SECTORS,
    GULF_CATEGORIES,
    R_GULF,
  ),

  // ---- Europe ----
  'united-kingdom': entry(
    'the United Kingdom',
    "The United Kingdom offers sponsored routes for skilled Pakistani workers across England, Scotland, Wales and Northern Ireland, under its Skilled Worker and Health & Care Worker visas — with demand across construction, engineering, welding, hospitality, logistics, food processing and registered nursing.",
    UK_SECTORS,
    UK_CATEGORIES,
    R_EUROPE,
  ),
  romania: entry(
    'Romania',
    "Romania has become one of Europe's most active markets for Pakistani workers, with strong demand in construction, manufacturing, welding and logistics backed by EU work rights.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  poland: entry(
    'Poland',
    "Poland's expanding industrial and logistics base is driving demand for construction, warehouse, manufacturing and production workers from Pakistan.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  croatia: entry(
    'Croatia',
    "Croatia's construction, tourism and hospitality sectors along the Adriatic coast are recruiting skilled and semi-skilled Pakistani workers, with EU work permits.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  hungary: entry(
    'Hungary',
    "Hungary's automotive, manufacturing and logistics industries in Central Europe offer structured opportunities for skilled Pakistani workers.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  serbia: entry(
    'Serbia',
    "Serbia's construction and infrastructure boom is hiring skilled trades and general labour from Pakistan on long-term projects.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  portugal: entry(
    'Portugal',
    'Portugal offers agriculture, construction and hospitality placements with EU work rights and a clear route to legal, documented employment.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  greece: entry(
    'Greece',
    'Greece recruits across agriculture, tourism and construction on the mainland and islands, offering seasonal and long-term roles for Pakistani workers.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  germany: entry(
    'Germany',
    "Germany's shortage of skilled labour is opening structured routes for Pakistani professionals and tradespeople in engineering, healthcare, IT and the skilled trades.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  italy: entry(
    'Italy',
    'Italy hires Pakistani workers across agriculture, manufacturing, hospitality and caregiving, including placements under its seasonal and non-seasonal flow (Decreto Flussi) quotas.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  cyprus: entry(
    'Cyprus',
    'Cyprus recruits across hospitality, construction and services in the eastern Mediterranean, offering structured employment for Pakistani workers.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  lithuania: entry(
    'Lithuania',
    "Lithuania's transport, logistics, manufacturing and construction sectors in the Baltics are hiring Pakistani workers with EU work authorisation.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  austria: entry(
    'Austria',
    "Austria's construction, manufacturing, tourism and healthcare sectors in the heart of Europe offer structured, well-regulated opportunities for skilled Pakistani workers, with EU work authorisation.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  ireland: entry(
    'Ireland',
    'Ireland recruits across construction, healthcare, hospitality and ICT, with General and Critical Skills employment-permit routes open to qualified Pakistani workers.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  switzerland: entry(
    'Switzerland',
    'Switzerland hires skilled professionals and tradespeople across construction, engineering, hospitality and healthcare, with structured permit routes for qualified Pakistani candidates.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  norway: entry(
    'Norway',
    "Norway's construction, engineering, maritime and services sectors offer well-regulated opportunities for skilled Pakistani workers, with residence- and work-permit routes.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  luxembourg: entry(
    'Luxembourg',
    'Luxembourg recruits across construction, logistics, finance operations and hospitality in the heart of the EU, offering structured employment for skilled Pakistani workers.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  russia: entry(
    'Russia',
    "Russia's construction, energy and large-scale industrial projects recruit skilled trades, engineers and general labour from Pakistan on contract.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  iceland: entry(
    'Iceland',
    "Iceland's construction, tourism, fisheries and energy sectors offer seasonal and long-term opportunities for Pakistani workers, with EEA work authorisation.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  finland: entry(
    'Finland',
    "Finland's construction, manufacturing, healthcare and services sectors are opening structured routes for skilled Pakistani workers, with EU work rights.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  france: entry(
    'France',
    'France recruits Pakistani workers across construction, agriculture, hospitality and logistics, with structured work-permit pathways.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  'czech-republic': entry(
    'the Czech Republic',
    "The Czech Republic's manufacturing, automotive and logistics industries in Central Europe offer structured opportunities for skilled Pakistani workers, with EU work rights.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  moldova: entry(
    'Moldova',
    "Moldova's construction, agriculture and services sectors offer emerging opportunities for skilled and semi-skilled Pakistani workers.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  belgium: entry(
    'Belgium',
    'Belgium recruits across construction, logistics, manufacturing and hospitality in the heart of the EU, offering structured employment for Pakistani workers.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  denmark: entry(
    'Denmark',
    "Denmark's construction, agriculture, hospitality and green-energy sectors offer structured opportunities for skilled Pakistani workers, with EU work authorisation.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  sweden: entry(
    'Sweden',
    'Sweden recruits across construction, manufacturing, healthcare and services, offering well-regulated employment routes for skilled Pakistani workers.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  netherlands: entry(
    'the Netherlands',
    "The Netherlands' logistics, horticulture, construction and manufacturing sectors recruit Pakistani workers at scale, with EU work rights.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  spain: entry(
    'Spain',
    'Spain hires Pakistani workers across agriculture, construction, hospitality and logistics, with structured work and residence permits.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  malta: entry(
    'Malta',
    'Malta recruits across hospitality, construction, maritime and services in the Mediterranean, offering structured EU employment for Pakistani workers.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
    R_EUROPE,
  ),
  england: entry(
    'England',
    'England — part of the United Kingdom — offers sponsored routes under the Skilled Worker and Health & Care Worker visas, with strong demand across health & social care, construction, hospitality and logistics.',
    UK_SECTORS,
    UK_CATEGORIES,
    R_EUROPE,
  ),
  scotland: entry(
    'Scotland',
    "Scotland — part of the United Kingdom — recruits across health & social care, construction, hospitality and energy, under the UK's Skilled Worker and Health & Care Worker visa routes.",
    UK_SECTORS,
    UK_CATEGORIES,
    R_EUROPE,
  ),

  // ---- East Asia ----
  japan: entry(
    'Japan',
    "Japan's Specified Skilled Worker (SSW) and technical-intern programmes are opening structured, well-regulated routes for Pakistani workers in manufacturing, caregiving, construction and food processing.",
    EAST_ASIA_SECTORS,
    EAST_ASIA_CATEGORIES,
    R_EAST_ASIA,
  ),
  'south-korea': entry(
    'South Korea',
    "South Korea's Employment Permit System (EPS) offers manufacturing, agriculture and industrial opportunities for Pakistani workers under a transparent, government-to-government framework.",
    EAST_ASIA_SECTORS,
    EAST_ASIA_CATEGORIES,
    R_EAST_ASIA,
  ),

  // ---- Southeast Asia ----
  malaysia: entry(
    'Malaysia',
    'Malaysia remains a major destination for Pakistani workers, with manufacturing, construction, plantation and services employers recruiting at scale.',
    SEA_SECTORS,
    SEA_CATEGORIES,
    R_SEA,
  ),

  // ---- Central Asia / Caucasus ----
  azerbaijan: entry(
    'Azerbaijan',
    "Azerbaijan's oil & gas, construction and services sectors in the Caspian region offer opportunities for skilled and semi-skilled Pakistani workers.",
    CENTRAL_ASIA_SECTORS,
    CENTRAL_ASIA_CATEGORIES,
    R_CENTRAL_ASIA,
  ),
  kazakhstan: entry(
    'Kazakhstan',
    "Kazakhstan's energy, construction and industrial projects across Central Asia are recruiting skilled trades and technical staff from Pakistan.",
    CENTRAL_ASIA_SECTORS,
    CENTRAL_ASIA_CATEGORIES,
    R_CENTRAL_ASIA,
  ),
  uzbekistan: entry(
    'Uzbekistan',
    "Uzbekistan's construction, textiles and infrastructure development programmes are creating demand for Pakistani workers and supervisors.",
    CENTRAL_ASIA_SECTORS,
    CENTRAL_ASIA_CATEGORIES,
    R_CENTRAL_ASIA,
  ),
  georgia: entry(
    'Georgia',
    "Georgia's construction, hospitality and services sectors in the Caucasus offer growing opportunities for Pakistani workers.",
    CENTRAL_ASIA_SECTORS,
    CENTRAL_ASIA_CATEGORIES,
    R_CENTRAL_ASIA,
  ),

  // ---- MENA ----
  iraq: entry(
    'Iraq',
    "Iraq's oil, construction and reconstruction projects are hiring skilled trades, engineers and general labour from Pakistan on large-scale contracts.",
    MENA_SECTORS,
    MENA_CATEGORIES,
    R_MENA,
  ),
  jordan: entry(
    'Jordan',
    'Jordan recruits Pakistani workers across manufacturing, construction and hospitality, with established labour pathways.',
    MENA_SECTORS,
    MENA_CATEGORIES,
    R_MENA,
  ),
  libya: entry(
    'Libya',
    "Libya's oil & gas, construction and infrastructure rebuilding programmes offer opportunities for skilled and semi-skilled Pakistani workers.",
    MENA_SECTORS,
    MENA_CATEGORIES,
    R_MENA,
  ),
}

// Attach the unique, per-country deep-dive sections to their markets.
// (Famous markets first — Türkiye + the Gulf; more will be added over time.)
COUNTRY_CONTENT['saudi-arabia'].sections = SAUDI_SECTIONS
COUNTRY_CONTENT['united-arab-emirates'].sections = UAE_SECTIONS
COUNTRY_CONTENT.qatar.sections = QATAR_SECTIONS
COUNTRY_CONTENT.kuwait.sections = KUWAIT_SECTIONS
COUNTRY_CONTENT.oman.sections = OMAN_SECTIONS
COUNTRY_CONTENT.bahrain.sections = BAHRAIN_SECTIONS
COUNTRY_CONTENT.turkey.sections = TURKEY_SECTIONS
