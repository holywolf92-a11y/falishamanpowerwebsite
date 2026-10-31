'use client'

// Compact, read-only snapshot of the recruitment portal's live talent pool —
// total pre-screened candidates plus the biggest categories with counts.
// Reuses the same endpoint as the Browse-talent panel; falls back gracefully
// (hides the category chips) when the portal is unreachable.

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'

const API =
  (process.env.NEXT_PUBLIC_PORTAL_API_URL || 'https://glorious-flexibility-production.up.railway.app').replace(
    /\/$/,
    '',
  ) + '/api/talent/professions'

type Category = { category: string; total: number }

export const LiveTalentStats: React.FC<{ className?: string }> = ({ className }) => {
  const [total, setTotal] = useState<number | null>(null)
  const [cats, setCats] = useState<Category[]>([])

  useEffect(() => {
    let active = true
    fetch(API)
      .then((r) => r.json())
      .then((d) => {
        if (!active) return
        if (typeof d?.total === 'number' && d.total > 0) setTotal(d.total)
        if (Array.isArray(d?.categories)) setCats(d.categories)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  const top = [...cats].sort((a, b) => (b.total || 0) - (a.total || 0)).slice(0, 8)

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
          <Users className="h-5 w-5" />
        </span>
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">Our live talent pool</p>
      </div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight">
        <span className="text-primary">{total != null ? total.toLocaleString() : '5,000+'}</span> pre-screened
        candidates ready to deploy
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        A live snapshot of our nationwide talent pool by category — vetted and trade-tested, ready for overseas
        placement across the Gulf, Türkiye and Europe.
      </p>

      {top.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {top.map((c) => (
            <span
              key={c.category}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm"
            >
              {c.category}
              <span className="font-semibold text-primary">{(c.total || 0).toLocaleString()}</span>
            </span>
          ))}
        </div>
      )}

      <Link
        href="/fill-a-vacancy"
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
      >
        Browse the full talent pool <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

export default LiveTalentStats
