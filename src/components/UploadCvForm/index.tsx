'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { FileCheck2, UploadCloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/ui'

type State = 'idle' | 'submitting' | 'success' | 'error'

export const UploadCvForm: React.FC = () => {
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')
  const [reference, setReference] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && inputRef.current) {
      const dt = new DataTransfer()
      dt.items.add(file)
      inputRef.current.files = dt.files
      setFileName(file.name)
    }
  }

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
      setFileName('')
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
              {' '}Your reference number is <strong className="text-foreground">{reference}</strong> — please
              keep it for future correspondence.
            </>
          ) : null}
        </p>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/jobs">Browse open jobs</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
      <input type="hidden" name="cvRequired" value="1" />
      <input type="hidden" name="nationality" value="Pakistani" />

      {/* Prominent CV uploader — first thing on the form */}
      <div className="grid gap-2">
        <Label htmlFor="cv-file">Your CV *</Label>
        <label
          htmlFor="cv-file"
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors',
            dragging ? 'border-primary bg-primary/5' : 'border-input hover:border-primary/60 hover:bg-accent/40',
          )}
        >
          {fileName ? (
            <>
              <FileCheck2 className="h-8 w-8 text-primary" />
              <span className="text-sm font-semibold text-foreground">{fileName}</span>
              <span className="text-xs text-muted-foreground">Click to choose a different file</span>
            </>
          ) : (
            <>
              <UploadCloud className="h-8 w-8 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Drag &amp; drop your CV, or <span className="text-primary underline">browse</span>
              </span>
              <span className="text-xs text-muted-foreground">PDF, DOC, DOCX or image · max 25&nbsp;MB</span>
            </>
          )}
          <input
            ref={inputRef}
            id="cv-file"
            name="cv"
            type="file"
            required
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
          />
        </label>
      </div>

      {/* The few essentials */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="cv-name">Full name *</Label>
          <Input id="cv-name" name="fullName" required autoComplete="name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cv-phone">Phone / WhatsApp *</Label>
          <Input id="cv-phone" name="phone" required autoComplete="tel" placeholder="+92 3XX XXXXXXX" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cv-email">Email *</Label>
        <Input id="cv-email" name="email" type="email" required autoComplete="email" />
      </div>

      {/* Optional extra detail — collapsed by default so the form stays short */}
      <details className="group rounded-xl border border-border bg-background/50">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
          Add more details (optional)
          <span className="text-muted-foreground transition-transform group-open:rotate-180">⌄</span>
        </summary>
        <div className="grid gap-5 border-t border-border p-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="cv-position">Position / trade</Label>
            <Input id="cv-position" name="position" placeholder="e.g. Electrician, Civil Engineer" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cv-country">Country of interest</Label>
            <Input id="cv-country" name="countryOfInterest" placeholder="e.g. Saudi Arabia, UAE" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cv-experience">Years of experience</Label>
            <Input id="cv-experience" name="experience" placeholder="e.g. 5" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cv-location">Current location</Label>
            <Input id="cv-location" name="currentLocation" placeholder="City, Country" />
          </div>
        </div>
      </details>

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
          I consent to Falisha Manpower storing my details and CV for recruitment purposes, as described in
          the{' '}
          <Link href="/privacy" className="font-medium text-primary hover:underline" target="_blank">
            Privacy &amp; Cookie Policy
          </Link>
          . *
        </span>
      </label>

      {state === 'error' && <p className="text-sm text-red-600">{message}</p>}

      <Button type="submit" disabled={state === 'submitting'} size="lg" className="w-full rounded-full sm:w-fit sm:px-8">
        {state === 'submitting' ? 'Submitting…' : 'Submit CV'}
      </Button>
    </form>
  )
}

export default UploadCvForm
