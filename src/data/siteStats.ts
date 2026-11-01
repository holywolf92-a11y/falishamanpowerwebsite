import { COUNTRY_CONTENT } from './countryContent'

// Single source of truth for the "how many destinations" figure shown across the
// site (home hero, About, Profile, Countries). Derived from the actual country
// pages that exist — minus the England/Scotland pages that 301 to the UK — so the
// number can never drift from reality or disagree between pages.
//
// The SEO audit (27 Oct 2026) flagged homepage/About/Countries showing different
// counts (48+, 50+, 28, 46+). This keeps every surface honest and consistent.
export const DESTINATION_COUNT = Object.entries(COUNTRY_CONTENT).filter(
  ([slug, c]) => c.name && slug !== 'england' && slug !== 'scotland',
).length

// Established 2011 as an overseas recruitment agency.
export const YEARS_EXPERIENCE = 15
