import { getPayload } from 'payload'
import config from '@payload-config'

// Dev-only seed for Falisha Manpower demo content.
// Hit GET /next/seed-recruitment to (re)populate. Idempotent: clears first.

type RichText = ReturnType<typeof rt>
function rt(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr' as const,
        textFormat: 0,
        children: [
          { type: 'text', version: 1, text, detail: 0, format: 0, mode: 'normal', style: '' },
        ],
      })),
    },
  }
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Seeding is disabled in production.' }, { status: 403 })
  }

  const payload = await getPayload({ config })

  // Loose alias: this dev seed passes published-style data that trips Payload's strict
  // create() generics (draft/publish overloads). Runtime behaviour is unchanged.
  const create = payload.create.bind(payload) as (args: unknown) => Promise<{ id: number | string }>

  const clear = async (collection: string) => {
    try {
      await payload.delete({ collection: collection as never, where: { id: { exists: true } } })
    } catch {
      /* empty collection */
    }
  }

  // Order matters: remove referencing docs first.
  for (const c of [
    'applications',
    'jobs',
    'countries',
    'industries',
    'services',
    'team',
    'testimonials',
  ]) {
    await clear(c)
  }

  // ---- Countries ----
  const countryData: { name: string; region: string; intro: string }[] = [
    { name: 'Saudi Arabia', region: 'gcc', intro: 'The Gulf’s largest labour market, driven by Vision 2030 mega-projects across construction, energy and healthcare.' },
    { name: 'United Arab Emirates', region: 'gcc', intro: 'A diversified economy hiring across hospitality, healthcare, IT, logistics and construction.' },
    { name: 'Qatar', region: 'gcc', intro: 'Sustained infrastructure and energy investment creating demand for engineers and skilled trades.' },
    { name: 'Kuwait', region: 'gcc', intro: 'Oil, construction and services roles for skilled and professional candidates.' },
    { name: 'Oman', region: 'gcc', intro: 'Growing demand in oil & gas, logistics and hospitality.' },
    { name: 'Bahrain', region: 'gcc', intro: 'A regional financial and industrial hub hiring across banking, construction and services.' },
    { name: 'Malaysia', region: 'southeast-asia', intro: 'Manufacturing, construction and services opportunities across Southeast Asia.' },
    { name: 'Romania', region: 'europe', intro: 'European placements in construction, manufacturing and logistics.' },
  ]
  const countries: Record<string, number | string> = {}
  for (const c of countryData) {
    const doc = await create({
      collection: 'countries',
      data: {
        _status: 'published',
        name: c.name,
        region: c.region as never,
        intro: c.intro,
        content: rt([`Falisha Manpower is a licensed recruitment partner placing skilled Pakistani professionals with employers in ${c.name}.`]) as never,
      },
    })
    countries[c.name] = doc.id
  }

  // ---- Industries & Professions ----
  const industryData: { title: string; kind: string; summary: string }[] = [
    { title: 'Construction', kind: 'industry', summary: 'Civil, MEP and finishing trades for large-scale Gulf projects.' },
    { title: 'Oil & Gas', kind: 'industry', summary: 'Upstream to downstream technical and safety roles.' },
    { title: 'Healthcare', kind: 'industry', summary: 'Nurses, physicians and allied health professionals.' },
    { title: 'Information Technology', kind: 'industry', summary: 'Software, infrastructure and support specialists.' },
    { title: 'Hospitality', kind: 'industry', summary: 'Hotels, F&B and facilities staff.' },
    { title: 'Engineering', kind: 'profession', summary: 'Civil, mechanical, electrical and industrial engineers.' },
    { title: 'Accountancy & Finance', kind: 'profession', summary: 'Accountants, analysts and finance managers.' },
    { title: 'Sales', kind: 'profession', summary: 'Field, retail and B2B sales professionals.' },
  ]
  const industries: Record<string, number | string> = {}
  for (const i of industryData) {
    const doc = await create({
      collection: 'industries',
      data: {
        _status: 'published',
        title: i.title,
        kind: i.kind as never,
        summary: i.summary,
        content: rt([`We recruit experienced ${i.title} talent from Pakistan for employers across the Gulf and beyond.`]) as never,
      },
    })
    industries[i.title] = doc.id
  }

  // ---- Services ----
  const serviceData: { title: string; serviceType: string; featured: boolean; summary: string }[] = [
    { title: 'Bulk & Mass Recruitment', serviceType: 'recruitment', featured: true, summary: 'Source, screen and mobilise large workforces quickly and compliantly.' },
    { title: 'Permanent Recruitment', serviceType: 'recruitment', featured: true, summary: 'End-to-end placement of skilled and professional staff.' },
    { title: 'Executive Search', serviceType: 'recruitment', featured: true, summary: 'Confidential search for senior and business-critical roles.' },
    { title: 'Global Mobility', serviceType: 'recruitment', featured: false, summary: 'Cross-border deployment with full immigration support.' },
    { title: 'Work Visa Processing', serviceType: 'advisory', featured: true, summary: 'Work, business and visit visa processing for the GCC.' },
    { title: 'Document Attestation', serviceType: 'advisory', featured: true, summary: 'Degree, personal and commercial document attestation for Gulf employment.' },
    { title: 'Payroll Outsourcing', serviceType: 'advisory', featured: false, summary: 'Compliant payroll management for Middle East operations.' },
    { title: 'HR Management', serviceType: 'advisory', featured: false, summary: 'Outsourced HR, compliance and workforce administration.' },
  ]
  for (const s of serviceData) {
    await create({
      collection: 'services',
      data: {
        _status: 'published',
        title: s.title,
        serviceType: s.serviceType as never,
        featured: s.featured,
        summary: s.summary,
        content: rt([s.summary, `Falisha Manpower delivers ${s.title.toLowerCase()} with transparency, speed and full legal compliance.`]) as never,
      },
    })
  }

  // ---- Team ----
  const teamData = [
    { name: 'Makhdoom Asim', role: 'Country Business Director', department: 'business-development', order: 1 },
    { name: 'Arslan Akhtar', role: 'Senior Recruitment Manager', department: 'recruitment', order: 2 },
    { name: 'Usama Bin Hafeez', role: 'Visa Processing Manager', department: 'processing', order: 3 },
    { name: 'Muntazir Abbas', role: 'Accounts Manager', department: 'accounts', order: 4 },
  ]
  for (const t of teamData) {
    await create({
      collection: 'team',
      data: { name: t.name, role: t.role, department: t.department as never, order: t.order },
    })
  }

  // ---- Testimonials ----
  const testimonialData = [
    { name: 'Ahmed Khan', roleOrCompany: 'Placed as Site Engineer, Riyadh', quote: 'Falisha handled everything from interview to visa. I was on-site in Saudi within weeks.', rating: '5', featured: true },
    { name: 'Sarah Malik', roleOrCompany: 'HR Manager, Gulf Contracting Co.', quote: 'Reliable bulk hiring with candidates who actually match the spec. Our go-to partner.', rating: '5', featured: true },
    { name: 'Bilal Aslam', roleOrCompany: 'Placed as Nurse, Dubai', quote: 'Professional, transparent, and never asked for any hidden fees. Highly recommended.', rating: '5', featured: true },
  ]
  for (const t of testimonialData) {
    await create({
      collection: 'testimonials',
      data: { name: t.name, roleOrCompany: t.roleOrCompany, quote: t.quote, rating: t.rating as never, featured: t.featured },
    })
  }

  // ---- Jobs ----
  const jobData: {
    title: string
    country: string
    industry: string
    city: string
    positions: number
    employmentType: string
    workplace: string
    salaryMin: number
    salaryMax: number
    salaryCurrency: string
    vacancyStatus: string
    requirements: string[]
  }[] = [
    { title: 'Ammonia Refrigeration Technician', country: 'Saudi Arabia', industry: 'Oil & Gas', city: 'Jubail', positions: 15, employmentType: 'contract', workplace: 'on-site', salaryMin: 2500, salaryMax: 3500, salaryCurrency: 'SAR', vacancyStatus: 'open', requirements: ['3+ years in industrial refrigeration', 'Ammonia systems experience', 'Valid trade certificate'] },
    { title: 'Registered Nurse', country: 'United Arab Emirates', industry: 'Healthcare', city: 'Dubai', positions: 20, employmentType: 'full-time', workplace: 'on-site', salaryMin: 5000, salaryMax: 7000, salaryCurrency: 'AED', vacancyStatus: 'open', requirements: ['BSc Nursing', 'DHA/MOH eligibility preferred', '2+ years clinical experience'] },
    { title: 'Civil Engineer', country: 'Qatar', industry: 'Engineering', city: 'Doha', positions: 5, employmentType: 'full-time', workplace: 'on-site', salaryMin: 8000, salaryMax: 12000, salaryCurrency: 'QAR', vacancyStatus: 'open', requirements: ['BE Civil Engineering', '5+ years infrastructure projects', 'Gulf experience a plus'] },
    { title: 'Heavy Bus Driver', country: 'Saudi Arabia', industry: 'Construction', city: 'Riyadh', positions: 40, employmentType: 'contract', workplace: 'on-site', salaryMin: 2000, salaryMax: 2800, salaryCurrency: 'SAR', vacancyStatus: 'open', requirements: ['Valid heavy vehicle licence', '2+ years driving experience', 'Clean record'] },
    { title: 'IT Support Specialist', country: 'Kuwait', industry: 'Information Technology', city: 'Kuwait City', positions: 3, employmentType: 'full-time', workplace: 'on-site', salaryMin: 400, salaryMax: 550, salaryCurrency: 'KWD', vacancyStatus: 'open', requirements: ['Diploma/Degree in IT', 'Windows & networking support', 'English proficiency'] },
    { title: 'Accountant', country: 'Oman', industry: 'Accountancy & Finance', city: 'Muscat', positions: 2, employmentType: 'full-time', workplace: 'on-site', salaryMin: 500, salaryMax: 700, salaryCurrency: 'OMR', vacancyStatus: 'closed', requirements: ['ACCA/CA part-qualified', 'ERP experience', '3+ years in finance'] },
  ]
  let openCount = 0
  for (const j of jobData) {
    await create({
      collection: 'jobs',
      data: {
        _status: 'published',
        title: j.title,
        country: countries[j.country] as never,
        industry: industries[j.industry] as never,
        city: j.city,
        positions: j.positions,
        employmentType: j.employmentType as never,
        workplace: j.workplace as never,
        salaryMin: j.salaryMin,
        salaryMax: j.salaryMax,
        salaryCurrency: j.salaryCurrency as never,
        salaryPeriod: 'month',
        vacancyStatus: j.vacancyStatus as never,
        description: rt([
          `Falisha Manpower is hiring ${j.positions} x ${j.title} for a leading employer in ${j.city}, ${j.country}.`,
          'This is an overseas placement with full visa and mobilisation support provided by Falisha Manpower.',
        ]) as never,
        requirements: j.requirements.map((item) => ({ item })),
        applyEmail: 'careers@falishamanpower.com',
      },
    })
    if (j.vacancyStatus === 'open') openCount++
  }

  // ---- Header navigation ----
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { link: { type: 'custom', label: 'Jobs', url: '/jobs', newTab: false } },
        { link: { type: 'custom', label: 'Services', url: '/services', newTab: false } },
        { link: { type: 'custom', label: 'Countries', url: '/countries', newTab: false } },
        { link: { type: 'custom', label: 'Industries', url: '/industries', newTab: false } },
        { link: { type: 'custom', label: 'Contact', url: '/contact', newTab: false } },
      ],
    } as never,
  })

  return Response.json({
    ok: true,
    created: {
      countries: countryData.length,
      industries: industryData.length,
      services: serviceData.length,
      team: teamData.length,
      testimonials: testimonialData.length,
      jobs: jobData.length,
      jobsOpenOnBoard: openCount,
    },
  })
}
