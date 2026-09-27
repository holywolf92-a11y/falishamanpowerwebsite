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
  const [reference, setReference] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('submitting')
    setMessage('')
    const form = e.currentTarget
    try {
      // Multipart: candidate goes to the Falisha Portal via the shared proxy route.
      const res = await fetch('/next/cv-to-portal', { method: 'POST', body: new FormData(form) })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to submit')
      setReference(json?.reference || null)
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
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold">Apply for this role</h3>

      {/* Job context sent to the Portal */}
      <input type="hidden" name="position" value={jobTitle} />
      <input type="hidden" name="additionalInfo" value={`Applied via website job board — ${jobTitle} (job #${jobId})`} />

      <div className="grid gap-2">
        <Label htmlFor="apply-name">Full name *</Label>
        <Input id="apply-name" name="fullName" required autoComplete="name" />
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
        <Input id="apply-city" name="currentLocation" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="apply-note">Message</Label>
        <Textarea id="apply-note" name="comments" rows={4} placeholder="Tell us about your experience…" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="apply-cv">Attach your CV (optional)</Label>
        <input
          id="apply-cv"
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
          className="block w-full rounded-lg border border-input bg-background text-sm file:mr-4 file:cursor-pointer file:border-0 file:bg-primary file:px-4 file:py-2 file:font-medium file:text-primary-foreground hover:file:brightness-110"
        />
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
