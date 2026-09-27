'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type State = 'idle' | 'submitting' | 'success' | 'error'

const PARTNER_TYPES = [
  { value: 'sub_agent', label: 'Sub-agent' },
  { value: 'company', label: 'Company' },
  { value: 'overseas_recruiter', label: 'Overseas recruiter' },
  { value: 'other', label: 'Other' },
]

export const PartnerApplicationForm: React.FC = () => {
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')
  const [reference, setReference] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('submitting')
    setMessage('')
    const form = e.currentTarget
    try {
      const res = await fetch('/next/partner-to-portal', { method: 'POST', body: new FormData(form) })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Submission failed.')
      setReference(json?.reference || null)
      setState('success')
      form.reset()
    } catch (err) {
      setState('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h3 className="text-xl font-semibold">Thank you — your partnership application has been received ✓</h3>
        <p className="mt-2 text-muted-foreground">
          Our team will review your application and be in touch about working together.
          {reference ? (
            <>
              {' '}Your reference is <strong className="text-foreground">{reference}</strong>.
            </>
          ) : null}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
      <div>
        <h3 className="text-xl font-semibold">Partner with us</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          For agencies, sub-agents and overseas recruiters. Fields marked * are required.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="pt-name">Your name *</Label>
          <Input id="pt-name" name="applicantName" required autoComplete="name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pt-email">Email *</Label>
          <Input id="pt-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pt-phone">Phone / WhatsApp</Label>
          <Input id="pt-phone" name="phone" autoComplete="tel" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pt-company">Company / agency name</Label>
          <Input id="pt-company" name="companyName" autoComplete="organization" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pt-loc">City / country</Label>
          <Input id="pt-loc" name="cityCountry" placeholder="e.g. Lahore, Pakistan" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pt-district">District</Label>
          <Input id="pt-district" name="district" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pt-cnic">CNIC (if applicable)</Label>
          <Input id="pt-cnic" name="cnic" inputMode="numeric" placeholder="XXXXX-XXXXXXX-X" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pt-type">Partner type</Label>
          <select
            id="pt-type"
            name="partnerType"
            defaultValue=""
            className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select…</option>
            {PARTNER_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <label htmlFor="pt-consent" className="flex items-start gap-2.5 text-sm text-muted-foreground">
        <input
          id="pt-consent"
          name="consent"
          type="checkbox"
          required
          value="yes"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[var(--primary)]"
        />
        <span>
          I consent to Falisha Manpower storing and processing this application, as described in the{' '}
          <Link href="/privacy" className="font-medium text-primary hover:underline" target="_blank">
            Privacy &amp; Cookie Policy
          </Link>
          . *
        </span>
      </label>

      {state === 'error' && <p className="text-sm text-red-600">{message}</p>}

      <Button type="submit" disabled={state === 'submitting'} className="w-fit">
        {state === 'submitting' ? 'Submitting…' : 'Submit application'}
      </Button>
    </form>
  )
}

export default PartnerApplicationForm
