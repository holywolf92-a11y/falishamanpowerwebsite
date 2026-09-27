import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { jobId, name, email, phone, city, coverNote } = body ?? {}

    if (!name || !email) {
      return Response.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'applications',
      // Respect access control (public "create" is allowed via `anyone`).
      overrideAccess: false,
      data: {
        name,
        email,
        phone: phone || undefined,
        city: city || undefined,
        coverNote: coverNote || undefined,
        job: jobId || undefined,
      },
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Application submit failed:', err)
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
