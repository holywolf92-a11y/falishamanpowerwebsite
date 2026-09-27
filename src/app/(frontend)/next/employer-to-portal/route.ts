import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PORTAL_API_URL = (process.env.PORTAL_API_URL || 'https://glorious-flexibility-production.up.railway.app').replace(/\/$/, '')

// Website field -> Portal /api/public-portal/employer field (same names, whitelisted).
const FORWARD_FIELDS = [
  'companyName',
  'contactName',
  'email',
  'phone',
  'country',
  'city',
  'professions',
  'quantity',
  'salaryRange',
  'dutyHours',
  'contractDuration',
  'benefitsIncluded',
  'comments',
] as const

export async function POST(req: NextRequest) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 })
  }

  const companyName = String(form.get('companyName') || '').trim()
  const contactName = String(form.get('contactName') || '').trim()
  const email = String(form.get('email') || '').trim()
  const professions = String(form.get('professions') || '').trim()
  const consent = form.get('consent')

  if (!companyName) return NextResponse.json({ error: 'Please enter your company name.' }, { status: 400 })
  if (!contactName) return NextResponse.json({ error: 'Please enter a contact name.' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  if (!professions) return NextResponse.json({ error: 'Please tell us which roles you need.' }, { status: 400 })
  if (!consent) return NextResponse.json({ error: 'Please accept the privacy consent.' }, { status: 400 })

  const out = new FormData()
  for (const key of FORWARD_FIELDS) {
    const v = form.get(key)
    if (typeof v === 'string' && v.trim()) out.append(key, v.trim())
  }

  try {
    const res = await fetch(`${PORTAL_API_URL}/api/public-portal/employer`, { method: 'POST', body: out })
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; reference?: string; message?: string }
    if (!res.ok || data.success === false) {
      return NextResponse.json(
        { error: data.message || 'The recruitment portal could not process your request.' },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true, reference: data.reference ?? null })
  } catch {
    return NextResponse.json(
      { error: 'Could not reach the recruitment portal right now. Please try again, or email us.' },
      { status: 502 },
    )
  }
}
