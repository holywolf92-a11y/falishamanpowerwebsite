'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type State = 'idle' | 'submitting' | 'success' | 'error'

export const UploadCvForm: React.FC = () => {
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')
  const [reference, setReference] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('submitting')
    setMessage('')
    const form = e.currentTarget
    try {
      const res = await fetch('/next/cv-to-portal', { method: 'POST', body: new FormData(form) })
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
        <h3 className="text-xl font-semibold">Thank you — your CV has been received ✓</h3>
        <p className="mt-2 text-muted-foreground">
          Our team will review your profile and be in touch about suitable overseas roles.
          {reference ? (
            <>
              {' '}Your reference number is <strong className="text-foreground">{reference}</strong> — please keep it for future correspondence.
            </>
          ) : null}
        </p>
        <div className="mt-6">
          <Button asChild variant="outline"><Link href="/jobs">Browse open jobs</Link></Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
      <div>
        <h3 className="text-xl font-semibold">Submit your CV</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fields marked * are required. We accept PDF, DOC, DOCX and image files (max 25&nbsp;MB).
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="cv-name">Full name *</Label>
          <Input id="cv-name" name="fullName" required autoComplete="name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cv-email">Email *</Label>
          <Input id="cv-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cv-phone">Phone / WhatsApp</Label>
          <Input id="cv-phone" name="phone" autoComplete="tel" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cv-nationality">Nationality</Label>
          <Input id="cv-nationality" name="nationality" defaultValue="Pakistani" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cv-location">Current location</Label>
          <Input id="cv-location" name="currentLocation" placeholder="City, Country" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cv-country">Country of interest</Label>
          <Input id="cv-country" name="countryOfInterest" placeholder="e.g. Saudi Arabia, UAE" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cv-position">Position / trade</Label>
          <Input id="cv-position" name="position" placeholder="e.g. Electrician, Civil Engineer" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cv-experience">Years of experience</Label>
          <Input id="cv-experience" name="experience" placeholder="e.g. 5" />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="cv-skills">Key skills</Label>
        <Input id="cv-skills" name="skills" placeholder="Comma-separated, e.g. welding, AutoCAD" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="cv-comments">Anything else you'd like us to know</Label>
        <Textarea id="cv-comments" name="comments" rows={3} placeholder="Availability, preferred roles, salary expectations…" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="cv-file">Your CV *</Label>
        <input
          id="cv-file"
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
          className="block w-full rounded-lg border border-input bg-background text-sm file:mr-4 file:cursor-pointer file:border-0 file:bg-primary file:px-4 file:py-2.5 file:font-medium file:text-primary-foreground hover:file:brightness-110"
        />
      </div>

      <label htmlFor="cv-consent" className="flex items-start gap-2.5 text-sm text-muted-foreground">
        <input
          id="cv-consent"
          name="consent"
          type="checkbox"
          required
          value="yes"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[var(--primary)]"
        />
        <span>
          I consent to Falisha Manpower storing and processing my details and CV for recruitment purposes,
          including sharing them with prospective employers, as described in the{' '}
          <Link href="/privacy" className="font-medium text-primary hover:underline" target="_blank">
            Privacy &amp; Cookie Policy
          </Link>
          . *
        </span>
      </label>

      {state === 'error' && <p className="text-sm text-red-600">{message}</p>}

      <Button type="submit" disabled={state === 'submitting'} className="w-fit">
        {state === 'submitting' ? 'Submitting…' : 'Submit CV'}
      </Button>
    </form>
  )
}

export default UploadCvForm
