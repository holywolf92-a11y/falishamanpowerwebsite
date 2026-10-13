import { getPayload } from 'payload'
import config from '@payload-config'
import { COUNTRY_CONTENT } from '@/data/countryContent'

// Seeds code-level destination markets into the Countries collection so every
// market also appears in CMS-driven UI (header Destinations menu, footer, grids).
// Trigger: GET /next/seed-countries  (in production you must be logged in at /admin).
// Idempotent: countries that already exist (matched by slug) are left untouched;
// only missing markets are created and published. Safe to run multiple times.

// Code region keys -> CMS `region` select values (see Countries collection).
const REGION_MAP: Record<string, string> = { gulf: 'gcc', sea: 'southeast-asia' }
const VALID_REGIONS = new Set(['gcc', 'europe', 'east-asia', 'southeast-asia', 'mena', 'other'])

function toCmsRegion(code?: string): string {
  const mapped = code ? (REGION_MAP[code] ?? code) : 'other'
  return VALID_REGIONS.has(mapped) ? mapped : 'other'
}

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

  // Existing country slugs.
  const existing = await payload.find({
    collection: 'countries',
    limit: 500,
    depth: 0,
    select: { slug: true } as never,
  })
  const have = new Set(
    (existing.docs as Array<{ slug?: string }>).map((d) => d.slug).filter(Boolean) as string[],
  )

  const created: string[] = []
  const skipped: string[] = []
  const failed: string[] = []

  for (const [slug, c] of Object.entries(COUNTRY_CONTENT)) {
    if (!c.name) continue
    if (have.has(slug)) {
      skipped.push(slug)
      continue
    }
    try {
      await create({
        collection: 'countries',
        data: {
          _status: 'published',
          name: c.name,
          slug,
          region: toCmsRegion(c.region),
          intro: c.intro ?? '',
          meta: {
            title: `Recruitment Agency in Pakistan for ${c.name} | Falisha Manpower`,
            description: (
              c.intro ??
              `Hire skilled Pakistani workers for ${c.name}, or find work in ${c.name}, with Falisha Manpower (BEOE OEP 4035).`
            ).slice(0, 155),
          },
        },
      })
      created.push(slug)
    } catch (e) {
      failed.push(`${slug}: ${(e as Error).message}`)
    }
  }

  const total = Object.values(COUNTRY_CONTENT).filter((c) => c.name).length
  return Response.json({
    ok: true,
    total,
    createdCount: created.length,
    skippedCount: skipped.length,
    failedCount: failed.length,
    created,
    skipped,
    failed,
  })
}
