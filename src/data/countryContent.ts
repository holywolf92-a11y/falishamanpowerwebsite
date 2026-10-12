// Rich, code-level content for specific destination countries, rendered on the
// country detail page (/countries/[slug]) in addition to the CMS data. Lets us
// publish detailed, SEO-strong per-country content without a DB write. Extend
// this map to enrich more markets over time.

export type CountryContent = {
  /** Fuller description paragraphs, shown under the header intro. */
  lead?: string[]
  /** Heading for the manpower-categories grid. */
  categoriesTitle?: string
  /** Manpower categories we recruit for this market. */
  categories?: string[]
  /** Short partnership line shown in the CTA band. */
  partnership?: string
}

// ---- Shared building blocks -------------------------------------------------

const OFFICES_PARA =
  'With a nationwide sourcing network and offices in Rawalpindi (head office), Lahore, Karachi, Peshawar and Azad Jammu & Kashmir (AJK), our team manages candidate screening, documentation and full deployment coordination throughout the hiring process.'

function buildLead(name: string, opener: string, sectors: string): string[] {
  return [
    opener,
    `As a Government of Pakistan–licensed Overseas Employment Promoter (OEP Licence No. 4035, BEOE-registered) with over 15 years of international recruitment experience, Falisha Manpower sources skilled, semi-skilled and unskilled Pakistani workers for employers in ${name} across ${sectors}, in line with applicable work-permit and employment regulations.`,
    OFFICES_PARA,
  ]
}

function partnershipLine(name: string): string {
  return `Employers and recruitment agencies in ${name} — share your current or upcoming manpower requirements and our team will source, screen and mobilise suitable candidates for your projects.`
}

function entry(name: string, opener: string, sectors: string, categories: string[]): CountryContent {
  return {
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

// ---- Per-country content ----------------------------------------------------

export const COUNTRY_CONTENT: Record<string, CountryContent> = {
  turkey: {
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
  ),
  'united-arab-emirates': entry(
    'the United Arab Emirates',
    'The United Arab Emirates is one of the most sought-after destinations for Pakistani workers, with a diversified economy across Dubai, Abu Dhabi and Sharjah hiring in construction, hospitality, healthcare, logistics and facilities management.',
    GULF_SECTORS,
    GULF_CATEGORIES,
  ),
  qatar: entry(
    'Qatar',
    'Qatar continues to invest heavily in infrastructure, energy and services beyond its World Cup legacy, creating steady demand for skilled engineers, technicians, drivers and trades from Pakistan.',
    GULF_SECTORS,
    GULF_CATEGORIES,
  ),
  kuwait: entry(
    'Kuwait',
    "Kuwait's oil, construction and services sectors offer long-standing opportunities for skilled and professional Pakistani candidates, supported by established bilateral labour ties.",
    GULF_SECTORS,
    GULF_CATEGORIES,
  ),
  oman: entry(
    'Oman',
    "Oman's growing investment in oil & gas, logistics, construction and tourism is creating fresh openings for skilled and semi-skilled Pakistani workers.",
    GULF_SECTORS,
    GULF_CATEGORIES,
  ),
  bahrain: entry(
    'Bahrain',
    'Bahrain is a regional financial and industrial hub that hires Pakistani talent across construction, manufacturing, banking operations and hospitality.',
    GULF_SECTORS,
    GULF_CATEGORIES,
  ),

  // ---- Europe ----
  romania: entry(
    'Romania',
    "Romania has become one of Europe's most active markets for Pakistani workers, with strong demand in construction, manufacturing, welding and logistics backed by EU work rights.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
  ),
  poland: entry(
    'Poland',
    "Poland's expanding industrial and logistics base is driving demand for construction, warehouse, manufacturing and production workers from Pakistan.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
  ),
  croatia: entry(
    'Croatia',
    "Croatia's construction, tourism and hospitality sectors along the Adriatic coast are recruiting skilled and semi-skilled Pakistani workers, with EU work permits.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
  ),
  hungary: entry(
    'Hungary',
    "Hungary's automotive, manufacturing and logistics industries in Central Europe offer structured opportunities for skilled Pakistani workers.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
  ),
  serbia: entry(
    'Serbia',
    "Serbia's construction and infrastructure boom is hiring skilled trades and general labour from Pakistan on long-term projects.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
  ),
  portugal: entry(
    'Portugal',
    'Portugal offers agriculture, construction and hospitality placements with EU work rights and a clear route to legal, documented employment.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
  ),
  greece: entry(
    'Greece',
    'Greece recruits across agriculture, tourism and construction on the mainland and islands, offering seasonal and long-term roles for Pakistani workers.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
  ),
  germany: entry(
    'Germany',
    "Germany's shortage of skilled labour is opening structured routes for Pakistani professionals and tradespeople in engineering, healthcare, IT and the skilled trades.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
  ),
  italy: entry(
    'Italy',
    'Italy hires Pakistani workers across agriculture, manufacturing, hospitality and caregiving, including placements under its seasonal and non-seasonal flow (Decreto Flussi) quotas.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
  ),
  cyprus: entry(
    'Cyprus',
    'Cyprus recruits across hospitality, construction and services in the eastern Mediterranean, offering structured employment for Pakistani workers.',
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
  ),
  lithuania: entry(
    'Lithuania',
    "Lithuania's transport, logistics, manufacturing and construction sectors in the Baltics are hiring Pakistani workers with EU work authorisation.",
    EUROPE_SECTORS,
    EUROPE_CATEGORIES,
  ),

  // ---- East Asia ----
  japan: entry(
    'Japan',
    "Japan's Specified Skilled Worker (SSW) and technical-intern programmes are opening structured, well-regulated routes for Pakistani workers in manufacturing, caregiving, construction and food processing.",
    EAST_ASIA_SECTORS,
    EAST_ASIA_CATEGORIES,
  ),
  'south-korea': entry(
    'South Korea',
    "South Korea's Employment Permit System (EPS) offers manufacturing, agriculture and industrial opportunities for Pakistani workers under a transparent, government-to-government framework.",
    EAST_ASIA_SECTORS,
    EAST_ASIA_CATEGORIES,
  ),

  // ---- Southeast Asia ----
  malaysia: entry(
    'Malaysia',
    'Malaysia remains a major destination for Pakistani workers, with manufacturing, construction, plantation and services employers recruiting at scale.',
    SEA_SECTORS,
    SEA_CATEGORIES,
  ),

  // ---- Central Asia / Caucasus ----
  azerbaijan: entry(
    'Azerbaijan',
    "Azerbaijan's oil & gas, construction and services sectors in the Caspian region offer opportunities for skilled and semi-skilled Pakistani workers.",
    CENTRAL_ASIA_SECTORS,
    CENTRAL_ASIA_CATEGORIES,
  ),
  kazakhstan: entry(
    'Kazakhstan',
    "Kazakhstan's energy, construction and industrial projects across Central Asia are recruiting skilled trades and technical staff from Pakistan.",
    CENTRAL_ASIA_SECTORS,
    CENTRAL_ASIA_CATEGORIES,
  ),
  uzbekistan: entry(
    'Uzbekistan',
    "Uzbekistan's construction, textiles and infrastructure development programmes are creating demand for Pakistani workers and supervisors.",
    CENTRAL_ASIA_SECTORS,
    CENTRAL_ASIA_CATEGORIES,
  ),
  georgia: entry(
    'Georgia',
    "Georgia's construction, hospitality and services sectors in the Caucasus offer growing opportunities for Pakistani workers.",
    CENTRAL_ASIA_SECTORS,
    CENTRAL_ASIA_CATEGORIES,
  ),

  // ---- MENA ----
  iraq: entry(
    'Iraq',
    "Iraq's oil, construction and reconstruction projects are hiring skilled trades, engineers and general labour from Pakistan on large-scale contracts.",
    MENA_SECTORS,
    MENA_CATEGORIES,
  ),
  jordan: entry(
    'Jordan',
    'Jordan recruits Pakistani workers across manufacturing, construction and hospitality, with established labour pathways.',
    MENA_SECTORS,
    MENA_CATEGORIES,
  ),
  libya: entry(
    'Libya',
    "Libya's oil & gas, construction and infrastructure rebuilding programmes offer opportunities for skilled and semi-skilled Pakistani workers.",
    MENA_SECTORS,
    MENA_CATEGORIES,
  ),
}
