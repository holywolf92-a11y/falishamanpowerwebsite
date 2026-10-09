import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

// One-time data migration: load the 28 core destination countries + 18 industries
// migrated from falishamanpower.com into the database on deploy. Kept intentionally
// LIGHT (small inline data, ~46 upserts) so it is safe to run during Payload init
// without risking the container's boot memory/time. The heavier 170-post import is
// handled on-demand by the admin-gated /next/import-posts route, NOT at boot.
// Fully wrapped in try/catch so it can never fail the deploy; idempotent (upsert by name).

const COUNTRIES: { name: string; region: string; intro: string }[] = [
  { name: 'Saudi Arabia', region: 'gcc', intro: 'The Gulf’s largest labour market — Vision 2030 mega-projects drive sustained demand across construction, energy, healthcare and hospitality.' },
  { name: 'United Arab Emirates', region: 'gcc', intro: 'A diversified economy hiring Pakistani talent across hospitality, healthcare, IT, logistics and construction.' },
  { name: 'Qatar', region: 'gcc', intro: 'Ongoing infrastructure and energy investment creating demand for engineers, technicians and skilled trades.' },
  { name: 'Kuwait', region: 'gcc', intro: 'Oil, construction and services roles for skilled and professional Pakistani candidates.' },
  { name: 'Oman', region: 'gcc', intro: 'Growing opportunities in oil & gas, logistics, construction and hospitality.' },
  { name: 'Bahrain', region: 'gcc', intro: 'A regional financial and industrial hub hiring across banking, construction and services.' },
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
  { name: 'Japan', region: 'east-asia', intro: 'Skilled-worker and technical-intern programmes in manufacturing, caregiving and construction.' },
  { name: 'South Korea', region: 'east-asia', intro: 'EPS-scheme manufacturing, agriculture and industrial opportunities.' },
  { name: 'Malaysia', region: 'southeast-asia', intro: 'Manufacturing, construction, plantation and services opportunities across Malaysia.' },
  { name: 'Azerbaijan', region: 'other', intro: 'Oil & gas, construction and services roles in the Caspian region.' },
  { name: 'Kazakhstan', region: 'other', intro: 'Energy, construction and industrial projects across Central Asia.' },
  { name: 'Uzbekistan', region: 'other', intro: 'Construction, textiles and infrastructure development roles.' },
  { name: 'Georgia', region: 'other', intro: 'Construction, hospitality and services opportunities in the Caucasus.' },
  { name: 'Iraq', region: 'mena', intro: 'Oil, construction and reconstruction projects hiring skilled trades and engineers.' },
  { name: 'Jordan', region: 'mena', intro: 'Manufacturing, construction and hospitality placements.' },
  { name: 'Libya', region: 'mena', intro: 'Oil & gas, construction and infrastructure opportunities.' },
]

const INDUSTRIES: { title: string; kind: string; summary: string }[] = [
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

function textNode(text: string) {
  return { type: 'text', version: 1, text, detail: 0, format: 0, mode: 'normal', style: '' }
}
function rt(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((t) => ({
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        textFormat: 0,
        children: [textNode(t)],
      })),
    },
  }
}

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Never throw: a content-load failure must not break the deploy/boot.
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = payload as any
    const log = (m: string) => {
      try {
        p.logger?.info(`[import_wp_content] ${m}`)
      } catch {
        /* noop */
      }
    }

    for (const c of COUNTRIES) {
      try {
        const data = {
          _status: 'published',
          name: c.name,
          region: c.region,
          intro: c.intro,
          content: rt([
            c.intro,
            `Falisha Manpower is a BEOE-licensed Overseas Employment Promoter (OEP No. 4035) placing skilled, semi-skilled and professional Pakistani workers with verified employers in ${c.name} — managing sourcing, screening, documentation, visas and deployment end to end.`,
          ]),
          meta: {
            title: `Recruitment Agency for ${c.name} in Pakistan | Falisha Manpower`,
            description: c.intro.slice(0, 155),
          },
        }
        const ex = await p.find({ collection: 'countries', where: { name: { equals: c.name } }, limit: 1, overrideAccess: true })
        if (ex.docs?.[0]?.id) await p.update({ collection: 'countries', id: ex.docs[0].id, data })
        else await p.create({ collection: 'countries', data })
      } catch (e) {
        log(`country ${c.name} failed: ${String(e)}`)
      }
    }

    for (const i of INDUSTRIES) {
      try {
        const data = {
          _status: 'published',
          title: i.title,
          kind: i.kind,
          summary: i.summary,
          content: rt([`We recruit experienced ${i.title} talent from Pakistan for employers across the Gulf and beyond.`]),
        }
        const ex = await p.find({ collection: 'industries', where: { title: { equals: i.title } }, limit: 1, overrideAccess: true })
        if (ex.docs?.[0]?.id) await p.update({ collection: 'industries', id: ex.docs[0].id, data })
        else await p.create({ collection: 'industries', data })
      } catch (e) {
        log(`industry ${i.title} failed: ${String(e)}`)
      }
    }
    log('countries + industries upserted')
  } catch (e) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(payload as any)?.logger?.error(`[import_wp_content] non-fatal migration error: ${String(e)}`)
    } catch {
      /* noop */
    }
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // No-op: this content load is not reversed automatically.
}
