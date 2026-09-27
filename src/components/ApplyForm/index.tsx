'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type Props = {
  jobId: number | string
  jobTitle: string
}

export const ApplyForm: React.FC<Props> = ({ jobId, jobTitle }) => {
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('submitting')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/next/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, jobId }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed')
      setState('success')
      form.reset()
    } catch (err) {
      setState('error')
      setMessage(err instanceof Error ? err.message : 'Failed to submit')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">Application received ✓</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for applying to <strong>{jobTitle}</strong>. Our team will review your details
          and be in touch if you’re shortlisted.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold">Apply for this role</h3>
      <div className="grid gap-2">
        <Label htmlFor="apply-name">Full name *</Label>
        <Input id="apply-name" name="name" required autoComplete="name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="apply-email">Email *</Label>
          <Input id="apply-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="apply-phone">Phone / WhatsApp</Label>
          <Input id="apply-phone" name="phone" autoComplete="tel" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="apply-city">Current city</Label>
        <Input id="apply-city" name="city" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="apply-note">Message</Label>
        <Textarea id="apply-note" name="coverNote" rows={4} placeholder="Tell us about your experience…" />
      </div>
      <label htmlFor="apply-consent" className="flex items-start gap-2.5 text-sm text-muted-foreground">
        <input
          id="apply-consent"
          name="consent"
          type="checkbox"
          required
          value="yes"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[var(--primary)]"
        />
        <span>
          I consent to Falisha Manpower storing and processing my details for recruitment purposes,
          including sharing them with prospective employers, as described in the{' '}
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

export default ApplyForm
