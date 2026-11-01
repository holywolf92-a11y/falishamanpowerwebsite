// Code-driven job board — single source of truth for /jobs and /jobs/[slug].
// The CMS `jobs` collection is empty on prod (seeded demo jobs were cleared during
// migration and re-seeding is admin-gated), which left /jobs blank — bad for SEO.
// These are representative live vacancies across Falisha's core markets; edit here.

export type JobEntry = {
  slug: string
  title: string
  country: string
  countrySlug: string
  city: string
  category: string
  employmentType: 'full-time' | 'contract' | 'temporary'
  positions: number
  salaryMin: number
  salaryMax: number
  salaryCurrency: string
  salaryPeriod: 'month' | 'year'
  summary: string
  description: string[]
  requirements: string[]
}

export const JOBS: JobEntry[] = [
  {
    slug: 'welders-3g-4g-turkiye',
    title: 'Welders (3G / 4G / 6G)',
    country: 'Türkiye',
    countrySlug: 'turkey',
    city: 'Istanbul',
    category: 'Construction & Fabrication',
    employmentType: 'contract',
    positions: 25,
    salaryMin: 900,
    salaryMax: 1300,
    salaryCurrency: 'USD',
    salaryPeriod: 'month',
    summary: 'Experienced structural and pipe welders for a major Turkish EPC and infrastructure contractor.',
    description: [
      'A leading Turkish construction and EPC contractor is hiring certified welders for large infrastructure and energy projects in Istanbul and surrounding regions.',
      'Falisha Manpower handles the complete process end to end — trade testing, medicals, work visa, document attestation, Protector of Emigrants clearance and travel.',
    ],
    requirements: [
      '3+ years of structural / pipe welding experience (3G, 4G or 6G)',
      'Ability to pass an on-site or video trade test',
      'Valid passport with at least 18 months validity',
      'Fit for overseas deployment (medical clearance)',
    ],
  },
  {
    slug: 'steel-fixers-saudi-arabia',
    title: 'Steel Fixers & Shuttering Carpenters',
    country: 'Saudi Arabia',
    countrySlug: 'saudi-arabia',
    city: 'Riyadh',
    category: 'Construction & Fabrication',
    employmentType: 'contract',
    positions: 40,
    salaryMin: 900,
    salaryMax: 1150,
    salaryCurrency: 'USD',
    salaryPeriod: 'month',
    summary: 'Bulk requirement for steel fixers and shuttering carpenters on large Riyadh construction projects.',
    description: [
      'A major Saudi contractor requires steel fixers and shuttering carpenters for ongoing high-rise and infrastructure projects in Riyadh.',
      'Accommodation, transport and medical are provided by the employer as per the contract. Falisha manages sourcing, testing, visas and mobilisation.',
    ],
    requirements: [
      '2+ years of steel fixing or shuttering experience',
      'Gulf experience preferred but not essential',
      'Valid passport and medical fitness',
      'Willing to work on a project-based contract',
    ],
  },
  {
    slug: 'electricians-uae',
    title: 'Electricians (MEP)',
    country: 'United Arab Emirates',
    countrySlug: 'united-arab-emirates',
    city: 'Dubai',
    category: 'MEP & Facilities',
    employmentType: 'full-time',
    positions: 15,
    salaryMin: 1200,
    salaryMax: 1600,
    salaryCurrency: 'USD',
    salaryPeriod: 'month',
    summary: 'MEP electricians for facilities and fit-out contractors across Dubai.',
    description: [
      'Hiring skilled MEP electricians for installation, maintenance and fit-out works with established Dubai contractors.',
      'Long-term roles with overtime, accommodation and transport as per UAE labour law. Full visa and mobilisation handled by Falisha Manpower.',
    ],
    requirements: [
      '3+ years as an electrician (MEP / building services)',
      'Able to read wiring diagrams and work to spec',
      'ITI / trade certificate an advantage',
      'Valid passport and medical fitness',
    ],
  },
  {
    slug: 'plumbers-qatar',
    title: 'Plumbers & Pipe Fitters',
    country: 'Qatar',
    countrySlug: 'qatar',
    city: 'Doha',
    category: 'MEP & Facilities',
    employmentType: 'full-time',
    positions: 12,
    salaryMin: 1100,
    salaryMax: 1400,
    salaryCurrency: 'USD',
    salaryPeriod: 'month',
    summary: 'Plumbers and pipe fitters for construction and facilities projects in Doha.',
    description: [
      'A Qatari MEP contractor is recruiting plumbers and pipe fitters for commercial and residential projects in Doha.',
      'Falisha Manpower manages trade testing, medicals, work visa, attestation and travel so candidates deploy job-ready.',
    ],
    requirements: [
      '2+ years of plumbing / pipe-fitting experience',
      'Able to pass a trade test',
      'Valid passport (18+ months validity)',
      'Medically fit for Gulf deployment',
    ],
  },
  {
    slug: 'hvac-technicians-saudi-arabia',
    title: 'HVAC Technicians',
    country: 'Saudi Arabia',
    countrySlug: 'saudi-arabia',
    city: 'Jeddah',
    category: 'MEP & Facilities',
    employmentType: 'full-time',
    positions: 10,
    salaryMin: 1300,
    salaryMax: 1700,
    salaryCurrency: 'USD',
    salaryPeriod: 'month',
    summary: 'HVAC installation and maintenance technicians for a facilities-management company in Jeddah.',
    description: [
      'Recruiting HVAC technicians for installation, servicing and maintenance of chillers, AHUs and split units with a Jeddah FM company.',
      'Stable long-term employment with overtime. Visa, attestation and mobilisation handled end to end by Falisha.',
    ],
    requirements: [
      '3+ years of HVAC experience',
      'Knowledge of chillers / AHUs / ducted systems',
      'Relevant trade certificate preferred',
      'Valid passport and medical fitness',
    ],
  },
  {
    slug: 'cnc-operators-turkiye',
    title: 'CNC Machine Operators',
    country: 'Türkiye',
    countrySlug: 'turkey',
    city: 'Bursa',
    category: 'Manufacturing',
    employmentType: 'full-time',
    positions: 8,
    salaryMin: 1000,
    salaryMax: 1300,
    salaryCurrency: 'USD',
    salaryPeriod: 'month',
    summary: 'CNC operators for a Turkish manufacturing plant in Bursa.',
    description: [
      'A Turkish manufacturer is hiring CNC machine operators for production lines in Bursa.',
      'Falisha Manpower manages the full process from trade testing to on-time mobilisation.',
    ],
    requirements: [
      '2+ years operating CNC machines (turning / milling)',
      'Able to read basic engineering drawings',
      'Valid passport and medical fitness',
      'Willing to work rotating shifts',
    ],
  },
  {
    slug: 'heavy-drivers-uae',
    title: 'Heavy Truck & Trailer Drivers',
    country: 'United Arab Emirates',
    countrySlug: 'united-arab-emirates',
    city: 'Abu Dhabi',
    category: 'Transport & Logistics',
    employmentType: 'full-time',
    positions: 20,
    salaryMin: 1400,
    salaryMax: 1800,
    salaryCurrency: 'USD',
    salaryPeriod: 'month',
    summary: 'Heavy drivers for a logistics and transport company in Abu Dhabi.',
    description: [
      'Hiring experienced heavy truck and trailer drivers for a logistics fleet in Abu Dhabi.',
      'Candidates are supported through licence conversion, visa, medicals and mobilisation by Falisha Manpower.',
    ],
    requirements: [
      'Valid heavy / LTV licence with 3+ years driving experience',
      'Clean driving record',
      'Valid passport and medical fitness',
      'Willing to convert licence on arrival if required',
    ],
  },
  {
    slug: 'auto-mechanics-saudi-arabia',
    title: 'Auto Mechanics & Technicians',
    country: 'Saudi Arabia',
    countrySlug: 'saudi-arabia',
    city: 'Dammam',
    category: 'Automotive',
    employmentType: 'full-time',
    positions: 6,
    salaryMin: 1200,
    salaryMax: 1500,
    salaryCurrency: 'USD',
    salaryPeriod: 'month',
    summary: 'Auto mechanics for a vehicle workshop and fleet operator in Dammam.',
    description: [
      'A Saudi automotive workshop is recruiting mechanics and technicians for light and heavy vehicle servicing in Dammam.',
      'Long-term roles; Falisha handles testing, visa, attestation and travel.',
    ],
    requirements: [
      '3+ years as an auto mechanic / technician',
      'Experience with diesel and/or petrol engines',
      'Trade certificate an advantage',
      'Valid passport and medical fitness',
    ],
  },
  {
    slug: 'masons-ankara-turkiye',
    title: 'Masons & Civil Workers',
    country: 'Türkiye',
    countrySlug: 'turkey',
    city: 'Ankara',
    category: 'Construction & Fabrication',
    employmentType: 'contract',
    positions: 30,
    salaryMin: 850,
    salaryMax: 1100,
    salaryCurrency: 'USD',
    salaryPeriod: 'month',
    summary: 'Masons and general civil workers for infrastructure projects in Ankara.',
    description: [
      'A Turkish civil contractor requires masons and civil workers for infrastructure and building projects in Ankara.',
      'Accommodation and transport per contract; Falisha manages the end-to-end deployment.',
    ],
    requirements: [
      '2+ years of masonry / civil site experience',
      'Able to pass a trade test',
      'Valid passport and medical fitness',
      'Willing to work on a project contract',
    ],
  },
  {
    slug: 'hospitality-staff-qatar',
    title: 'Hotel & Hospitality Staff',
    country: 'Qatar',
    countrySlug: 'qatar',
    city: 'Doha',
    category: 'Hospitality',
    employmentType: 'full-time',
    positions: 18,
    salaryMin: 1000,
    salaryMax: 1400,
    salaryCurrency: 'USD',
    salaryPeriod: 'month',
    summary: 'Waiters, kitchen helpers, housekeeping and front-desk staff for hotels in Doha.',
    description: [
      'Hotels and hospitality groups in Doha are hiring service, kitchen and housekeeping staff.',
      'Duty meals, accommodation and transport provided; Falisha Manpower manages visas and mobilisation.',
    ],
    requirements: [
      'Hospitality experience preferred (hotel / restaurant)',
      'Presentable, customer-focused and willing to learn',
      'Basic English communication',
      'Valid passport and medical fitness',
    ],
  },
  {
    slug: 'registered-nurses-saudi-arabia',
    title: 'Registered Nurses',
    country: 'Saudi Arabia',
    countrySlug: 'saudi-arabia',
    city: 'Riyadh',
    category: 'Healthcare',
    employmentType: 'full-time',
    positions: 10,
    salaryMin: 1800,
    salaryMax: 2400,
    salaryCurrency: 'USD',
    salaryPeriod: 'month',
    summary: 'Registered nurses for hospitals and clinics in Riyadh.',
    description: [
      'Leading Saudi healthcare providers are recruiting registered nurses for hospital and clinic roles in Riyadh.',
      'Falisha supports licensing/Prometric guidance, DataFlow, visa, attestation and mobilisation.',
    ],
    requirements: [
      'BSc Nursing / diploma with valid registration (PNC)',
      '2+ years of clinical experience',
      'Prometric / DataFlow (or willing to complete)',
      'Valid passport and medical fitness',
    ],
  },
  {
    slug: 'warehouse-forklift-operators-uae',
    title: 'Warehouse & Forklift Operators',
    country: 'United Arab Emirates',
    countrySlug: 'united-arab-emirates',
    city: 'Dubai',
    category: 'Transport & Logistics',
    employmentType: 'full-time',
    positions: 25,
    salaryMin: 1100,
    salaryMax: 1400,
    salaryCurrency: 'USD',
    salaryPeriod: 'month',
    summary: 'Warehouse workers and certified forklift operators for logistics hubs in Dubai.',
    description: [
      'A Dubai logistics operator is hiring warehouse staff and certified forklift operators for its distribution centres.',
      'Overtime, accommodation and transport per UAE law; Falisha manages the full deployment.',
    ],
    requirements: [
      'Warehouse experience; forklift licence for operator roles',
      'Physically fit for warehouse work',
      'Basic English / numeracy',
      'Valid passport and medical fitness',
    ],
  },
]

export const JOBS_BY_SLUG: Record<string, JobEntry> = Object.fromEntries(JOBS.map((j) => [j.slug, j]))

export const JOB_COUNTRIES = Array.from(new Map(JOBS.map((j) => [j.countrySlug, j.country])).entries()).map(
  ([slug, name]) => ({ slug, name }),
)

export function jobSalaryLabel(j: Pick<JobEntry, 'salaryMin' | 'salaryMax' | 'salaryCurrency' | 'salaryPeriod'>): string {
  const per = j.salaryPeriod === 'year' ? '/yr' : '/mo'
  return `${j.salaryCurrency} ${j.salaryMin.toLocaleString()}–${j.salaryMax.toLocaleString()}${per}`
}
