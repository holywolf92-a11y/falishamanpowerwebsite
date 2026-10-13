import React from 'react'

export type TickerCredential = {
  title: string
  sub: string
  logo: string
  alt: string
}

const CREDENTIALS: TickerCredential[] = [
  {
    title: 'Government Registered',
    sub: 'BEOE Licensed · OEP 4035',
    logo: '/logos/credentials/beoe.webp',
    alt: 'Bureau of Emigration & Overseas Employment',
  },
  {
    title: 'ISO Certified',
    sub: 'ISO 9001:2015',
    logo: '/logos/credentials/iso.webp',
    alt: 'ISO 9001:2015 Certified',
  },
  {
    title: 'RCCI Member',
    sub: 'Rawalpindi Chamber of Commerce',
    logo: '/logos/credentials/rcci.webp',
    alt: 'Rawalpindi Chamber of Commerce & Industry',
  },
  {
    title: 'POEPA Member',
    sub: 'Overseas Employment Promoters',
    logo: '/logos/credentials/poepa.webp',
    alt: 'Pakistan Overseas Employment Promoters Association',
  },
]

function Item({ c }: { c: TickerCredential }) {
  return (
    <div className="flex shrink-0 items-center gap-3.5">
      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/[0.06]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.logo} alt={c.alt} className="h-11 w-11 object-contain" loading="lazy" />
      </span>
      <div className="whitespace-nowrap">
        <div className="text-[15px] font-semibold leading-tight text-foreground">{c.title}</div>
        <div className="text-xs leading-tight text-muted-foreground">{c.sub}</div>
      </div>
    </div>
  )
}

export function CredentialTicker() {
  // Duplicated enough times that one animated half already overflows wide screens,
  // so translateX(-50%) loops seamlessly with no gap.
  const loop = [...CREDENTIALS, ...CREDENTIALS, ...CREDENTIALS, ...CREDENTIALS]

  return (
    <section aria-label="Accreditations and memberships" className="border-b border-border bg-secondary/40 py-6">
      <style>{`
        @keyframes fm-ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .fm-ticker-track { animation: fm-ticker-scroll 34s linear infinite; }
        .fm-ticker-wrap:hover .fm-ticker-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .fm-ticker-track { animation: none; transform: none; } }
      `}</style>
      <div
        className="fm-ticker-wrap relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]"
      >
        <div className="fm-ticker-track flex w-max items-center gap-10">
          {loop.map((c, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10">
              <Item c={c} />
              <span aria-hidden className="h-9 w-px shrink-0 bg-border" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
