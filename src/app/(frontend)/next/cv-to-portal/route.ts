import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Falisha Portal (recruitment-portal-backend) — source of truth for candidates.
// Override per-environment with PORTAL_API_URL; falls back to the current Railway URL.
const PORTAL_API_URL = (process.env.PORTAL_API_URL || 'https://glorious-flexibility-production.up.railway.app').replace(/\/$/, '')

// Website form field -> Portal /api/public-portal/candidate field (same names, whitelisted).
const FORWARD_FIELDS = [
  'fullName',
  'email',
  'phone',
  'nationality',
  'currentLocation',
  'countryOfInterest',
  'position',
  'experience',
  'skills',
  'languages',
  'additionalInfo',
  'comments',
] as const

const MAX_CV_BYTES = 25 * 1024 * 1024 // 25 MB (Portal allows 30; keep a margin)

export async function POST(req: NextRequest) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 })
  }

  const fullName = String(form.get('fullName') || '').trim()
  const email = String(form.get('email') || '').trim()
  const cv = form.get('cv')
  const consent = form.get('consent')
  const cvRequired = String(form.get('cvRequired') || '') === '1'
  const hasCv = cv instanceof File && cv.size > 0

  if (!fullName) return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  if (cvRequired && !hasCv)
    return NextResponse.json({ error: 'Please attach your CV.' }, { status: 400 })
  if (hasCv && (cv as File).size > MAX_CV_BYTES)
    return NextResponse.json({ error: 'Your CV must be under 25 MB.' }, { status: 400 })
  if (!consent) return NextResponse.json({ error: 'Please accept the privacy consent.' }, { status: 400 })

  // Rebuild a clean multipart payload for the Portal.
  const out = new FormData()
  for (const key of FORWARD_FIELDS) {
    const v = form.get(key)
    if (typeof v === 'string' && v.trim()) out.append(key, v.trim())
  }
  if (hasCv) out.append('cv', cv as File, (cv as File).name || 'cv')

  try {
    const res = await fetch(`${PORTAL_API_URL}/api/public-portal/candidate`, {
      method: 'POST',
      body: out,
      // Do NOT set Content-Type — fetch adds the correct multipart boundary.
    })
    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean
      reference?: string
      onboardingLink?: string
      message?: string
    }
    if (!res.ok || data.success === false) {
      return NextResponse.json(
        { error: data.message || 'The recruitment portal could not process your submission.' },
        { status: 502 },
      )
    }
    return NextResponse.json({
      ok: true,
      reference: data.reference ?? null,
      onboardingLink: data.onboardingLink ?? null,
    })
  } catch {
    return NextResponse.json(
      { error: 'Could not reach the recruitment portal right now. Please try again, or email your CV.' },
      { status: 502 },
    )
  }
}
