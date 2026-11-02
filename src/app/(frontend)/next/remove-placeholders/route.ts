import { getPayload } from 'payload'
import config from '@payload-config'

// One-off cleanup: the initial seed populated the Team and Testimonials collections
// with placeholder content that must not stay live —
//   • Team: four people copied from the reference site (Delta International /
//     ditrc.com) — that agency's REAL staff, not Falisha's.
//   • Testimonials: three invented placeholder people/quotes (not real clients).
// This route deletes exactly those records from the live DB so the pages fall back
// to their honest empty states. Add genuine team members / testimonials via /admin.
//   GET /next/remove-placeholders        -> delete the known placeholders
//   GET /next/remove-placeholders?dry=1  -> report what WOULD be deleted
// Authenticated in production; idempotent (a second run finds nothing left).

const DITRC_TEAM_NAMES = ['Makhdoom Asim', 'Arslan Akhtar', 'Usama Bin Hafeez', 'Muntazir Abbas']
const PLACEHOLDER_TESTIMONIAL_NAMES = ['Ahmed Khan', 'Sarah Malik', 'Bilal Aslam']

export async function GET(req: Request) {
  const dry = new URL(req.url).searchParams.get('dry') === '1'
  const payload = await getPayload({ config })

  if (process.env.NODE_ENV === 'production') {
    const { user } = await payload.auth({ headers: req.headers })
    if (!user) return Response.json({ error: 'Unauthorized — log in at /admin first.' }, { status: 401 })
  }

  const find = payload.find.bind(payload) as (args: unknown) => Promise<{ docs: any[] }>
  const del = payload.delete.bind(payload) as (args: unknown) => Promise<unknown>

  async function purge(collection: string, names: string[]) {
    const removed: string[] = []
    for (const name of names) {
      const res = await find({ collection, where: { name: { equals: name } }, limit: 10, overrideAccess: true })
      for (const doc of res.docs) {
        if (!dry) await del({ collection, id: doc.id, overrideAccess: true })
        removed.push(`${name} (${doc.role || doc.roleOrCompany || ''})`.trim())
      }
    }
    return removed
  }

  const team = await purge('team', DITRC_TEAM_NAMES)
  const testimonials = await purge('testimonials', PLACEHOLDER_TESTIMONIAL_NAMES)

  return Response.json({
    ok: true,
    dry,
    teamRemovedCount: team.length,
    testimonialsRemovedCount: testimonials.length,
    teamRemoved: team,
    testimonialsRemoved: testimonials,
  })
}
