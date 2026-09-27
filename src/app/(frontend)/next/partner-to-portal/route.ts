import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PORTAL_API_URL = (process.env.PORTAL_API_URL || 'https://glorious-flexibility-production.up.railway.app').replace(/\/$/, '')

// Website field -> Portal /api/public-portal/partner field (same names, whitelisted).
const FORWARD_FIELDS = [
  'applicantName',
  'email',
  'phone',
  'companyName',
  'cityCountry',
  'district',
  'cnic',
  'partnerType',
] as const

const PARTNER_TYPES = ['sub_agent', 'company', 'overseas_recruiter', 'other']

export async function POST(req: NextRequest) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 })
  }

  const applicantName = String(form.get('applicantName') || '').trim()
  const email = String(form.get('email') || '').trim()
  const partnerType = String(form.get('partnerType') || '').trim()
  const consent = form.get('consent')

  if (!applicantName) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  if (partnerType && !PARTNER_TYPES.includes(partnerType))
    return NextResponse.json({ error: 'Please choose a valid partner type.' }, { status: 400 })
  if (!consent) return NextResponse.json({ error: 'Please accept the privacy consent.' }, { status: 400 })

  const out = new FormData()
  for (const key of FORWARD_FIELDS) {
    const v = form.get(key)
    if (typeof v === 'string' && v.trim()) out.append(key, v.trim())
  }

  try {
    const res = await fetch(`${PORTAL_API_URL}/api/public-portal/partner`, { method: 'POST', body: out })
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; reference?: string; message?: string }
    if (!res.ok || data.success === false) {
      return NextResponse.json(
        { error: data.message || 'The recruitment portal could not process your application.' },
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
