// Rich, code-level content for specific destination countries, rendered on the
// country detail page (/countries/[slug]) in addition to (or instead of) the CMS
// data. Lets us publish detailed, SEO-strong per-country pages without a DB
// write — a country present here renders even when no CMS record exists yet.
// Extend this map to enrich or add more markets over time.

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
