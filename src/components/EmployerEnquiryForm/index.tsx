'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type State = 'idle' | 'submitting' | 'success' | 'error'

export const EmployerEnquiryForm: React.FC<{ hideHeader?: boolean }> = ({ hideHeader = false }) => {
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')
  const [reference, setReference] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('submitting')
    setMessage('')
    const form = e.currentTarget
    try {
      const res = await fetch('/next/employer-to-portal', { method: 'POST', body: new FormData(form) })
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
        <h3 className="text-xl font-semibold">Thank you — your requirement has been received ✓</h3>
        <p className="mt-2 text-muted-foreground">
          Our team will review your workforce requirement and get back to you with a sourcing plan.
          {reference ? (
            <>
              {' '}Your reference is <strong className="text-foreground">{reference}</strong>.
            </>
          ) : null}
        </p>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/hire-from-pakistan">Our employer services</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-7">
      {!hideHeader && (
        <div>
          <h3 className="text-xl font-semibold">Request your workforce</h3>
          <p className="mt-1 text-sm text-muted-foreground">A few essentials to start — fields marked * are required.</p>
        </div>
      )}

      {/* The essentials */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="emp-company">Company name *</Label>
          <Input id="emp-company" name="companyName" required autoComplete="organization" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="emp-contact">Contact name *</Label>
          <Input id="emp-contact" name="contactName" required autoComplete="name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="emp-email">Email *</Label>
          <Input id="emp-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="emp-phone">Phone / WhatsApp</Label>
          <Input id="emp-phone" name="phone" autoComplete="tel" placeholder="+92 3XX XXXXXXX" />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="emp-professions">Roles / trades needed *</Label>
        <Input
          id="emp-professions"
          name="professions"
          required
          placeholder="e.g. Welders, Electricians, Civil Engineers"
        />
      </div>

      <div className="grid gap-2 sm:max-w-[55%]">
        <Label htmlFor="emp-quantity">Number of workers</Label>
        <Input id="emp-quantity" name="quantity" placeholder="e.g. 50" inputMode="numeric" />
      </div>

      {/* Optional detail — collapsed so the form stays short */}
      <details className="group rounded-xl border border-border bg-background/50">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
          Add job details (optional)
          <span className="text-muted-foreground transition-transform group-open:rotate-180">⌄</span>
        </summary>
        <div className="grid gap-4 border-t border-border p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="emp-country">Country</Label>
              <Input id="emp-country" name="country" placeholder="e.g. Saudi Arabia, UAE" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-city">City</Label>
              <Input id="emp-city" name="city" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-salary">Salary range</Label>
              <Input id="emp-salary" name="salaryRange" placeholder="e.g. SAR 1500–2500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-duty">Duty hours</Label>
              <Input id="emp-duty" name="dutyHours" placeholder="e.g. 8 hrs/day, 6 days" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-contract">Contract duration</Label>
              <Input id="emp-contract" name="contractDuration" placeholder="e.g. 2 years" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-benefits">Benefits included</Label>
              <Input id="emp-benefits" name="benefitsIncluded" placeholder="Food, accommodation, transport" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="emp-comments">Additional details</Label>
            <Textarea
              id="emp-comments"
              name="comments"
              rows={3}
              placeholder="Project details, mobilisation timeline, selection preferences…"
            />
          </div>
        </div>
      </details>

      <label htmlFor="emp-consent" className="flex items-start gap-2.5 text-sm text-muted-foreground">
        <input
          id="emp-consent"
          name="consent"
          type="checkbox"
          required
          value="yes"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[var(--primary)]"
        />
        <span>
          I consent to Falisha Manpower storing and processing this enquiry for recruitment purposes, as described in
          the{' '}
          <Link href="/privacy" className="font-medium text-primary hover:underline" target="_blank">
            Privacy &amp; Cookie Policy
          </Link>
          . *
        </span>
      </label>

      {state === 'error' && <p className="text-sm text-red-600">{message}</p>}

      <Button type="submit" disabled={state === 'submitting'} size="lg" className="w-full rounded-full">
        {state === 'submitting' ? (
          'Submitting…'
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" /> Send requirement
          </>
        )}
      </Button>
    </form>
  )
}

export default EmployerEnquiryForm
