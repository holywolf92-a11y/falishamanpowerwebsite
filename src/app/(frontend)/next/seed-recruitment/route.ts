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

export async function GET(req: Request) {
  const payload = await getPayload({ config })

  // In production this is gated behind an authenticated admin session: the
  // logged-in site owner triggers it from their browser (no credentials leave Railway).
  if (process.env.NODE_ENV === 'production') {
    const { user } = await payload.auth({ headers: req.headers })
    if (!user) {
      return Response.json({ error: 'Unauthorized — log in at /admin first.' }, { status: 401 })
    }
  }

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

  // ---- Countries (core destination markets migrated from falishamanpower.com) ----
  const countryData: { name: string; region: string; intro: string }[] = [
    // Gulf / GCC
    { name: 'Saudi Arabia', region: 'gcc', intro: 'The Gulf’s largest labour market — Vision 2030 mega-projects drive sustained demand across construction, energy, healthcare and hospitality.' },
    { name: 'United Arab Emirates', region: 'gcc', intro: 'A diversified economy hiring Pakistani talent across hospitality, healthcare, IT, logistics and construction.' },
    { name: 'Qatar', region: 'gcc', intro: 'Ongoing infrastructure and energy investment creating demand for engineers, technicians and skilled trades.' },
    { name: 'Kuwait', region: 'gcc', intro: 'Oil, construction and services roles for skilled and professional Pakistani candidates.' },
    { name: 'Oman', region: 'gcc', intro: 'Growing opportunities in oil & gas, logistics, construction and hospitality.' },
    { name: 'Bahrain', region: 'gcc', intro: 'A regional financial and industrial hub hiring across banking, construction and services.' },
    // Europe
    { name: 'Turkey', region: 'europe', intro: 'A key specialty market for Falisha — manufacturing, construction, textiles and energy projects hiring skilled Pakistani workers.' },
    { name: 'Romania', region: 'europe', intro: 'European placements in construction, manufacturing, logistics and welding trades.' },
    { name: 'Poland', region: 'europe', intro: 'Growing demand for construction, warehouse, manufacturing and logistics workers.' },
    { name: 'Croatia', region: 'europe', intro: 'Construction, tourism and hospitality roles along the Adriatic coast.' },
    { name: 'Hungary', region: 'europe', intro: 'Manufacturing, automotive and logistics opportunities in Central Europe.' },
    { name: 'Serbia', region: 'europe', intro: 'Construction and infrastructure projects hiring skilled trades and labour.' },
    { name: 'Portugal', region: 'europe', intro: 'Agriculture, construction and hospitality placements with EU work rights.' },
    { name: 'Greece', region: 'europe', intro: 'Agriculture, tourism and construction roles across the mainland and islands.' },
    { name: 'Germany', region: 'europe', intro: 'Skilled and professional roles in engineering, healthcare, IT and the trades.' },
    { name: 'Italy', region: 'europe', intro: 'Agriculture, manufacturing, hospitality and caregiving opportunities.' },
    { name: 'Cyprus', region: 'europe', intro: 'Hospitality, construction and services roles in the eastern Mediterranean.' },
    { name: 'Lithuania', region: 'europe', intro: 'Transport, logistics, manufacturing and construction placements in the Baltics.' },
    // East Asia
    { name: 'Japan', region: 'east-asia', intro: 'Skilled-worker and technical-intern programmes in manufacturing, caregiving and construction.' },
    { name: 'South Korea', region: 'east-asia', intro: 'EPS-scheme manufacturing, agriculture and industrial opportunities.' },
    // Southeast Asia
    { name: 'Malaysia', region: 'southeast-asia', intro: 'Manufacturing, construction, plantation and services opportunities across Malaysia.' },
    // Central Asia / other
    { name: 'Azerbaijan', region: 'other', intro: 'Oil & gas, construction and services roles in the Caspian region.' },
    { name: 'Kazakhstan', region: 'other', intro: 'Energy, construction and industrial projects across Central Asia.' },
    { name: 'Uzbekistan', region: 'other', intro: 'Construction, textiles and infrastructure development roles.' },
    { name: 'Georgia', region: 'other', intro: 'Construction, hospitality and services opportunities in the Caucasus.' },
    // MENA
    { name: 'Iraq', region: 'mena', intro: 'Oil, construction and reconstruction projects hiring skilled trades and engineers.' },
    { name: 'Jordan', region: 'mena', intro: 'Manufacturing, construction and hospitality placements.' },
    { name: 'Libya', region: 'mena', intro: 'Oil & gas, construction and infrastructure opportunities.' },
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
        content: rt([
          c.intro,
          `Falisha Manpower is a BEOE-licensed Overseas Employment Promoter (OEP No. 4035) placing skilled, semi-skilled and professional Pakistani workers with verified employers in ${c.name} — managing sourcing, screening, documentation, visas and deployment end to end.`,
        ]) as never,
        meta: {
          title: `Recruitment Agency for ${c.name} in Pakistan | Falisha Manpower`,
          description: c.intro.slice(0, 155),
        },
      },
    })
    countries[c.name] = doc.id
  }

  // ---- Industries & Professions ----
  const industryData: { title: string; kind: string; summary: string }[] = [
    { title: 'Construction', kind: 'industry', summary: 'Civil, MEP and finishing trades for large-scale Gulf and European projects.' },
    { title: 'Oil & Gas', kind: 'industry', summary: 'Upstream to downstream technical, mechanical and safety roles.' },
    { title: 'Healthcare', kind: 'industry', summary: 'Nurses, physicians, paramedics and allied health professionals.' },
    { title: 'Information Technology', kind: 'industry', summary: 'Software, infrastructure, telecom and IT support specialists.' },
    { title: 'Hospitality', kind: 'industry', summary: 'Hotels, restaurants, F&B and facilities staff.' },
    { title: 'Engineering', kind: 'profession', summary: 'Civil, mechanical, electrical and industrial engineers.' },
    { title: 'Accountancy & Finance', kind: 'profession', summary: 'Accountants, analysts and finance managers.' },
    { title: 'Textile', kind: 'industry', summary: 'Garment, spinning, weaving and quality-control staff.' },
    { title: 'Banking & Finance', kind: 'industry', summary: 'Banking operations, sales and back-office professionals.' },
    { title: 'Security', kind: 'industry', summary: 'Trained security guards, supervisors and safety officers.' },
    { title: 'Agriculture', kind: 'industry', summary: 'Farm, greenhouse, dairy and agri-processing workers.' },
    { title: 'Power & Energy', kind: 'industry', summary: 'Power generation, transmission and renewable-energy technicians.' },
    { title: 'Education', kind: 'industry', summary: 'Teachers, lecturers and academic support staff.' },
    { title: 'FMCG', kind: 'industry', summary: 'Production, packaging, sales and distribution staff for fast-moving consumer goods.' },
    { title: 'Livestock', kind: 'industry', summary: 'Dairy, poultry and livestock-farm workers and supervisors.' },
    { title: 'Steel Fabrication', kind: 'industry', summary: 'Fabricators, welders, fitters and structural steel trades.' },
    { title: 'Transportation', kind: 'industry', summary: 'Drivers, logistics, fleet and warehouse personnel.' },
    { title: 'Travel & Tourism', kind: 'industry', summary: 'Travel, tour, aviation and tourism-services staff.' },
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
