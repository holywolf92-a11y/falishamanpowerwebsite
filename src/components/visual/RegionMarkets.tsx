import type React from 'react'

import { Flag } from '@/components/visual/Flag'

export type RegionMarketsRegion = {
  /** Display name of the region (e.g. "Gulf / GCC"). */
  region: string
  /** Country names shown as flag chips; unmatched names still render via Flag's fallback. */
  countries: string[]
}

export type RegionMarketsProps = {
  regions: RegionMarketsRegion[]
  /** Optional muted footnote rendered under the grid. */
  note?: string
}

/**
 * Grid of region cards, each listing its destination countries as flag chips.
 * Pure and presentational (no hooks) — safe to render inside server components.
 */
export const RegionMarkets: React.FC<RegionMarketsProps> = ({ regions, note }) => {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {regions.map((r) => (
          <div
            key={r.region}
            className="bg-card rounded-2xl p-6 ring-1 ring-border shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-bold text-lg text-foreground">{r.region}</h3>
            <div className="h-1 w-8 bg-[var(--gold)] rounded-full mt-1 mb-4" aria-hidden="true" />
            <ul className="flex flex-wrap gap-2">
              {r.countries.map((country) => (
                <li
                  key={country}
                  className="rounded-full border border-border px-3 py-1.5 text-sm flex items-center gap-1.5 text-foreground"
                >
                  <Flag name={country} className="h-3.5 w-5 rounded-[2px]" />
                  <span>{country}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {note ? <p className="mt-4 text-sm text-muted-foreground">{note}</p> : null}
    </div>
  )
}
