'use client'

// Live talent-pool browse for the "Request Workforce" experience.
// Reads the recruitment portal's public Talent API (anonymized candidates,
// profession-normalized, never-empty). All enquiries route to Falisha on
// WhatsApp — recruiters go through the agency, never around it.

import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const API =
  (process.env.NEXT_PUBLIC_PORTAL_API_URL || 'https://glorious-flexibility-production.up.railway.app').replace(
    /\/$/,
    '',
  ) + '/api/talent'

type Prof = { profession: string; count: number }
type Category = { category: string; total: number; professions: Prof[] }
type Card = {
  code: string
  name: string | null
  title: string | null
  category: string
  profession: string
  nationality: string | null
  country_of_interest: string | null
  experience_years: number | null
  age: number | null
  gender: string | null
  skills: string[]
}
type Enquiry = { whatsapp: string; available_estimate: number; message: string | null }
type CandResp = { total: number; page: number; limit: number; candidates: Card[]; enquiry: Enquiry }

export const TalentPool: React.FC = () => {
  const [cats, setCats] = useState<Category[]>([])
  const [totalPool, setTotalPool] = useState(0)
  const [category, setCategory] = useState('')
  const [profession, setProfession] = useState('')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState<CandResp | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/professions`)
      .then((r) => r.json())
      .then((d) => {
        setCats(d.categories || [])
        setTotalPool(d.total || 0)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true)
      const p = new URLSearchParams()
      if (profession) p.set('profession', profession)
      else if (category) p.set('category', category)
      if (q) p.set('q', q)
      p.set('page', String(page))
      p.set('limit', '12')
      fetch(`${API}/candidates?${p.toString()}`)
        .then((r) => r.json())
        .then((d) => setData(d))
        .catch(() => setData(null))
        .finally(() => setLoading(false))
    }, 250)
    return () => clearTimeout(t)
  }, [category, profession, q, page])

  const professions = useMemo(
    () => cats.filter((c) => !category || c.category === category).flatMap((c) => c.professions),
    [cats, category],
  )

  const resetTo = (cat: string) => {
    setCategory(cat)
    setProfession('')
    setQ('')
    setPage(1)
  }

  return (
    <div className="grid gap-6">
      {/* Category tiles with live counts */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => resetTo('')}
          className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
            category === '' ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:bg-muted'
          }`}
        >
          All <span className="font-semibold">({totalPool.toLocaleString()})</span>
        </button>
        {cats.map((c) => (
          <button
            key={c.category}
            onClick={() => resetTo(c.category)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
              category === c.category
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card hover:bg-muted'
            }`}
          >
            {c.category} <span className="font-semibold">({c.total})</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 rounded-2xl border border-border bg-card p-4">
        <select
          value={profession}
          onChange={(e) => {
            setProfession(e.target.value)
            setPage(1)
          }}
          className="h-10 min-w-[200px] rounded-lg border border-input bg-background px-3 text-sm"
        >
          <option value="">{category ? `All ${category} roles` : 'All professions'}</option>
          {professions.map((p) => (
            <option key={p.profession} value={p.profession}>
              {p.profession} ({p.count})
            </option>
          ))}
        </select>
        <Input
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setPage(1)
          }}
          placeholder="Search a skill or keyword…"
          className="h-10 min-w-[200px] flex-1"
        />
      </div>

      {/* Results */}
      <div className="text-sm text-muted-foreground">
        {loading
          ? 'Searching…'
          : data
            ? data.total > 0
              ? `${data.total.toLocaleString()} candidate(s) available`
              : 'No exact matches for these filters — tell us what you need below.'
            : ''}
      </div>

      {data && data.candidates.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.candidates.map((c) => (
              <CandidateCard key={c.code} c={c} enquiry={data.enquiry} />
            ))}
          </div>
          {data.total > data.limit && (
            <div className="flex items-center justify-center gap-4 pt-2">
              <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                ← Prev
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {Math.ceil(data.total / data.limit)}
              </span>
              <Button
                variant="outline"
                disabled={page >= Math.ceil(data.total / data.limit)}
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </Button>
            </div>
          )}
        </>
      ) : (
        data &&
        !loading && (
          // Never-empty: route the recruiter to WhatsApp with a reassurance count.
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-lg font-semibold">
              {data.enquiry?.available_estimate ?? 50}+ candidates available on request
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
              {data.enquiry?.message ||
                'Tell us exactly what you need and our team will source it from our nationwide network.'}
            </p>
            <Button asChild className="mt-5">
              <a href={data.enquiry?.whatsapp || 'https://wa.me/923005547806'} target="_blank" rel="noopener noreferrer">
                Enquire on WhatsApp
              </a>
            </Button>
          </div>
        )
      )}
    </div>
  )
}

const CandidateCard: React.FC<{ c: Card; enquiry: Enquiry }> = ({ c, enquiry }) => {
  const meta = [
    c.nationality,
    c.country_of_interest ? `→ ${c.country_of_interest}` : null,
    c.experience_years != null ? `${c.experience_years}y exp` : null,
    c.age ? `${c.age} yrs` : null,
    c.gender,
  ].filter(Boolean)
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div>
        <div className="text-base font-semibold">{c.name || c.title || c.profession}</div>
        {c.name && (
          <div className="text-sm font-medium text-primary">{c.title || c.profession}</div>
        )}
      </div>
      <span className="self-start rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
        {c.category}
      </span>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
        {meta.map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>
      {c.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {c.skills.slice(0, 4).map((s) => (
            <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs text-foreground/70">
              {s}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto flex items-center justify-between border-t border-dashed border-border pt-3">
        <span className="text-xs text-muted-foreground">Ref: {c.code}</span>
        <a
          href={enquiry?.whatsapp || 'https://wa.me/923005547806'}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-110"
        >
          Enquire
        </a>
      </div>
    </div>
  )
}

export default TalentPool
