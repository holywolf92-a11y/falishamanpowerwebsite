'use client'

// The employer's two primary actions as one control:
//   • Browse talent  — the live, searchable talent pool (shown by default)
//   • Request workforce — the enquiry form
// Both views stay mounted (hidden, not unmounted) so switching is instant and
// the talent-pool filters keep their state. Each view cross-links to the other
// so neither action is ever buried.

import React, { useState } from 'react'
import { Search, Send } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { TalentPool } from '@/components/TalentPool'
import { EmployerEnquiryForm } from '@/components/EmployerEnquiryForm'

type Tab = 'browse' | 'request'

export const EmployerActionPanel: React.FC = () => {
  const [tab, setTab] = useState<Tab>('browse')
  const isBrowse = tab === 'browse'

  const tabClass = (active: boolean) =>
    cn(
      'flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition sm:text-[15px]',
      active
        ? 'bg-[var(--primary)] text-primary-foreground shadow'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
    )

  return (
    <div>
      {/* Segmented toggle — floats over the hero */}
      <div className="mx-auto grid w-full max-w-xl grid-cols-2 gap-1.5 rounded-2xl border border-border bg-card p-1.5 shadow-xl shadow-black/10">
        <button type="button" onClick={() => setTab('browse')} aria-pressed={isBrowse} className={tabClass(isBrowse)}>
          <Search className="h-4 w-4" /> Browse talent
        </button>
        <button type="button" onClick={() => setTab('request')} aria-pressed={!isBrowse} className={tabClass(!isBrowse)}>
          <Send className="h-4 w-4" /> Request workforce
        </button>
      </div>

      {/* Browse view */}
      <div className={cn('mt-10', isBrowse ? 'block' : 'hidden')}>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight">Browse our live talent pool</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Filter pre-screened candidates by trade, nationality and destination. Found who you need? Enquire and we
              handle screening, documentation, visas and mobilisation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setTab('request')}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Can&apos;t find the exact match? Request workforce →
          </button>
        </div>
        <TalentPool />
      </div>

      {/* Request view */}
      <div className={cn('mx-auto mt-10 max-w-3xl', isBrowse ? 'hidden' : 'block')}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Tell us exactly what you need</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Hiring in bulk or need a specific skill set? Share your requirement and our team sources it from our
            nationwide network.{' '}
            <button
              type="button"
              onClick={() => setTab('browse')}
              className="font-semibold text-primary hover:underline"
            >
              Or browse available talent →
            </button>
          </p>
        </div>
        <EmployerEnquiryForm hideHeader />
      </div>
    </div>
  )
}

export default EmployerActionPanel
