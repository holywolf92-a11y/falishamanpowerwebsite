import { getPayload } from 'payload'
import config from '@payload-config'

// Seeds real Türkiye vacancies into the Jobs collection.
// Trigger: GET /next/seed-turkey-jobs  (in production you must be logged in at /admin).
// Idempotent: it removes existing Türkiye jobs first, then re-creates the set.

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

const CLOSE = 'Shared accommodation, transport and medical cover are provided by the employer as per contract. Falisha Manpower (BEOE Overseas Employment Promoter Licence No. 4035) manages the full process — trade testing, documentation, visa and Turkish work-permit processing, Protector formalities and mobilisation.'

type JobSeed = {
  title: string
  city: string
  industry: string
  positions: number
  min: number
  max: number
  deadline: string
  lead: string
  reqs: string[]
}

const JOBS: JobSeed[] = [
  {
    title: 'Welders & Metal Fabricators (MIG / TIG / Arc)',
    city: 'Istanbul',
    industry: 'Steel Fabrication',
    positions: 25,
    min: 650,
    max: 900,
    deadline: '2026-12-31',
    lead: 'Falisha Manpower is recruiting experienced welders and metal fabricators for a leading steel-fabrication and manufacturing group in Istanbul, Türkiye. Candidates must be able to read basic fabrication drawings and weld to industry standards.',
    reqs: [
      '3+ years’ experience in MIG, TIG or arc welding',
      'Able to read fabrication drawings and work to tolerance',
      'Trade certificate or equivalent practical test',
      'Valid passport (minimum 18 months)',
    ],
  },
  {
    title: 'Masons, Steel Fixers & Shuttering Carpenters',
    city: 'Ankara',
    industry: 'Construction',
    positions: 50,
    min: 550,
    max: 750,
    deadline: '2027-01-31',
    lead: 'Falisha Manpower is hiring masons, steel fixers and shuttering carpenters for large-scale building and infrastructure projects in Ankara, Türkiye, with a leading Turkish contractor.',
    reqs: [
      '2+ years on commercial / infrastructure construction sites',
      'Experience in block/brick work, rebar fixing or formwork',
      'Physically fit for on-site work',
      'Valid passport (minimum 18 months)',
    ],
  },
  {
    title: 'Electricians & Plumbers',
    city: 'Izmir',
    industry: 'Construction',
    positions: 18,
    min: 600,
    max: 800,
    deadline: '2026-12-31',
    lead: 'Falisha Manpower is sourcing qualified electricians and plumbers for building and MEP installation projects in Izmir, Türkiye.',
    reqs: [
      '3+ years in building electrical or plumbing installation',
      'Able to work from drawings and follow safety procedures',
      'Relevant trade certification',
      'Valid passport (minimum 18 months)',
    ],
  },
  {
    title: 'Mechanical & HVAC Technicians',
    city: 'Istanbul',
    industry: 'Engineering',
    positions: 12,
    min: 700,
    max: 950,
    deadline: '2027-01-31',
    lead: 'Falisha Manpower is recruiting mechanical and HVAC technicians for industrial and commercial projects in Istanbul, Türkiye — installation, servicing and maintenance of HVAC and mechanical systems.',
    reqs: [
      '3+ years as an HVAC / mechanical technician',
      'Experience with chillers, AHUs, ducting or refrigeration',
      'Diploma or trade certificate in a relevant field',
      'Valid passport (minimum 18 months)',
    ],
  },
  {
    title: 'CNC & Machine Operators',
    city: 'Bursa',
    industry: 'Steel Fabrication',
    positions: 12,
    min: 650,
    max: 900,
    deadline: '2026-12-31',
    lead: 'Falisha Manpower is hiring CNC and production machine operators for a manufacturing plant in Bursa, Türkiye — Türkiye’s automotive and industrial manufacturing hub.',
    reqs: [
      '2+ years operating CNC or production machinery',
      'Able to read job cards and measure to tolerance',
      'Awareness of machine safety and quality control',
      'Valid passport (minimum 18 months)',
    ],
  },
  {
    title: 'Textile & Garment Factory Workers',
    city: 'Denizli',
    industry: 'Textile',
    positions: 40,
    min: 500,
    max: 650,
    deadline: '2027-01-31',
    lead: 'Falisha Manpower is recruiting textile and garment factory workers for established mills and garment units in Denizli, Türkiye, a major Turkish textile centre.',
    reqs: [
      'Experience in spinning, weaving, dyeing or garment production',
      'Able to work shift rotations in a factory environment',
      'Attention to quality and output targets',
      'Valid passport (minimum 18 months)',
    ],
  },
  {
    title: 'Sewing-Machine Operators & Tailors',
    city: 'Istanbul',
    industry: 'Textile',
    positions: 30,
    min: 520,
    max: 700,
    deadline: '2026-12-31',
    lead: 'Falisha Manpower is sourcing skilled sewing-machine operators and tailors for garment manufacturers in Istanbul, Türkiye.',
    reqs: [
      '2+ years on industrial sewing machines (single/overlock/flatlock)',
      'Able to meet daily production and quality targets',
      'Experience in woven or knitwear garment production',
      'Valid passport (minimum 18 months)',
    ],
  },
  {
    title: 'Warehouse & Forklift Operators',
    city: 'Gebze, Kocaeli',
    industry: 'Transportation',
    positions: 20,
    min: 560,
    max: 740,
    deadline: '2027-01-31',
    lead: 'Falisha Manpower is hiring warehouse workers and certified forklift operators for a logistics and distribution operation in Gebze (Kocaeli), Türkiye.',
    reqs: [
      '2+ years in warehouse / logistics operations',
      'Valid forklift licence (for operator roles)',
      'Able to handle picking, packing and stock movement',
      'Valid passport (minimum 18 months)',
    ],
  },
  {
    title: 'Hotel & Restaurant Staff (Waiters / Stewards)',
    city: 'Antalya',
    industry: 'Hospitality',
    positions: 35,
    min: 550,
    max: 750,
    deadline: '2026-12-31',
    lead: 'Falisha Manpower is recruiting hotel and restaurant service staff — waiters, stewards and F&B assistants — for resorts and hotels in Antalya, Türkiye, the country’s leading tourism destination.',
    reqs: [
      'Experience in hotel / restaurant service preferred',
      'Basic English; presentable and customer-focused',
      'Able to work shifts during the tourist season',
      'Valid passport (minimum 18 months)',
    ],
  },
  {
    title: 'Chefs, Cooks & Kitchen Staff',
    city: 'Antalya',
    industry: 'Hospitality',
    positions: 15,
    min: 650,
    max: 950,
    deadline: '2027-01-31',
    lead: 'Falisha Manpower is sourcing chefs, cooks and kitchen staff for hotels and restaurants in Antalya, Türkiye. Continental, Asian and grill experience are all in demand.',
    reqs: [
      '3+ years in a professional kitchen',
      'Specialisation in continental, Asian, grill or bakery an advantage',
      'Food-hygiene awareness',
      'Valid passport (minimum 18 months)',
    ],
  },
  {
    title: 'Automotive Mechanics',
    city: 'Bursa',
    industry: 'Engineering',
    positions: 10,
    min: 650,
    max: 880,
    deadline: '2026-12-31',
    lead: 'Falisha Manpower is hiring automotive mechanics for workshops and the automotive manufacturing sector in Bursa, Türkiye.',
    reqs: [
      '3+ years as an automotive mechanic / auto technician',
      'Experience in engine, transmission or general servicing',
      'Trade certificate preferred',
      'Valid passport (minimum 18 months)',
    ],
  },
  {
    title: 'General Construction Labourers & Helpers',
    city: 'Ankara',
    industry: 'Construction',
    positions: 60,
    min: 450,
    max: 600,
    deadline: '2027-01-31',
    lead: 'Falisha Manpower is recruiting general labourers and trade helpers for construction and infrastructure projects across Ankara, Türkiye.',
    reqs: [
      'Physically fit and willing to work on construction sites',
      'Previous site / labouring experience an advantage',
      'Willing to work outdoors in all seasons',
      'Valid passport (minimum 18 months)',
    ],
  },
]

export async function GET(req: Request) {
  const payload = await getPayload({ config })

  // Admin-gated in production: the logged-in site owner triggers it from their browser.
  if (process.env.NODE_ENV === 'production') {
    const { user } = await payload.auth({ headers: req.headers })
    if (!user) {
      return Response.json({ error: 'Unauthorized — log in at /admin first.' }, { status: 401 })
    }
  }

  const create = payload.create.bind(payload) as (args: unknown) => Promise<{ id: number | string }>

  // Resolve Türkiye.
  const tr = await payload.find({
    collection: 'countries',
    where: { slug: { equals: 'turkey' } } as never,
    limit: 1,
    depth: 0,
  })
  const turkeyId = (tr.docs[0] as { id?: number | string } | undefined)?.id
  if (!turkeyId) {
    return Response.json(
      { error: 'Türkiye country not found — run /next/seed-recruitment first.' },
      { status: 400 },
    )
  }

  // Map industry title -> id.
  const ind = await payload.find({
    collection: 'industries',
    limit: 200,
    depth: 0,
    select: { title: true } as never,
  })
  const industryId: Record<string, number | string> = {}
  for (const d of ind.docs as Array<{ id: number | string; title: string }>) {
    industryId[d.title] = d.id
  }

  // Idempotent: clear existing Türkiye jobs before re-creating.
  let removed = 0
  try {
    const del = await payload.delete({
      collection: 'jobs',
      where: { country: { equals: turkeyId } } as never,
    })
    removed = Array.isArray((del as { docs?: unknown[] })?.docs)
      ? (del as { docs: unknown[] }).docs.length
      : 0
  } catch {
    /* none to remove */
  }

  let created = 0
  const skipped: string[] = []
  for (const j of JOBS) {
    const industry = industryId[j.industry]
    try {
      await create({
        collection: 'jobs',
        data: {
          _status: 'published',
          title: j.title,
          country: turkeyId,
          city: j.city,
          ...(industry ? { industry } : {}),
          positions: j.positions,
          employmentType: 'contract',
          workplace: 'on-site',
          salaryMin: j.min,
          salaryMax: j.max,
          salaryCurrency: 'USD',
          salaryPeriod: 'month',
          vacancyStatus: 'open',
          deadline: j.deadline,
          description: rt([j.lead, CLOSE]),
          requirements: j.reqs.map((item) => ({ item })),
          applyEmail: 'info@falishamanpower.com',
          meta: {
            title: `${j.title} in ${j.city}, Türkiye`,
            description: j.lead.slice(0, 155),
          },
        },
      })
      created++
    } catch (e) {
      skipped.push(`${j.title}: ${(e as Error).message}`)
    }
  }

  return Response.json({ ok: true, turkeyId, removed, created, total: JOBS.length, skipped })
}
