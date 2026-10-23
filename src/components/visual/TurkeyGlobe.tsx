import React from 'react'
import { MAP } from '@/data/turkeyMapGeo'

// Official Türkiye flag emblem (crescent + star), public-domain geometry from the
// national flag SVG. bbox centre ≈ (35159, 0); crescent outer circle Ø30000.
const EMBLEM_PATH =
  'm41750 0 13568-4408-8386 11541V-7133l8386 11541zm925 8021a15000 15000 0 1 1 0-16042 12000 12000 0 1 0 0 16042z'
// Airplane glyph (Material "flight", nose up); rotated to follow each route's heading.
const PLANE_D =
  'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z'
const LABEL_FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif'

type Place = ['start' | 'end' | 'middle', number, number]
// City label placement: [text-anchor, dx, dy].
const TLAB: Record<string, Place> = {
  İstanbul: ['end', -4, -2], Bursa: ['end', -4, 7], İzmir: ['end', -4, 3], Ankara: ['middle', 0, -6],
  Konya: ['middle', 0, 11], Antalya: ['middle', 0, 11], Adana: ['middle', 2, 12], Gaziantep: ['start', 5, 5],
  Kayseri: ['start', 5, 2], Samsun: ['middle', 0, -6], Trabzon: ['start', 5, -2],
}
const PLAB: Record<string, Place> = {
  Islamabad: ['start', 4, -3], Peshawar: ['end', -4, -3], Lahore: ['start', 5, 2],
  Multan: ['end', -4, 4], Karachi: ['end', -4, 4],
}
// Pakistan airport city → Türkiye destination (İstanbul is the hub).
const ROUTES: [string, string][] = [
  ['Islamabad', 'İstanbul'], ['Lahore', 'İstanbul'], ['Karachi', 'İstanbul'], ['Lahore', 'Ankara'],
  ['Peshawar', 'İzmir'], ['Karachi', 'Antalya'], ['Multan', 'Gaziantep'], ['Islamabad', 'Trabzon'],
]

// Each neighbouring country → a palette slot (0–4), hand-assigned so adjacent
// countries never share a colour (political-atlas look); anything unlisted hashes
// to a slot as a fallback. Palette fills live in the SVG <style> below (tm-l0…4).
const LAND_IDX: Record<string, number> = {
  Iran: 0, Iraq: 2, Syria: 1, 'Saudi Arabia': 3, Afghanistan: 4, Turkmenistan: 1, Egypt: 2,
  Kazakhstan: 2, Uzbekistan: 0, India: 3, China: 1, Russia: 4, Azerbaijan: 2, Armenia: 3, Georgia: 1,
  Jordan: 4, Kuwait: 4, Qatar: 0, 'United Arab Emirates': 1, Oman: 0, Tajikistan: 2, Kyrgyzstan: 3,
  Bulgaria: 0, Greece: 3, Cyprus: 1, 'N. Cyprus': 3, Israel: 3, Lebanon: 0, Palestine: 4, Libya: 0,
}
const landIdx = (n: string) => {
  if (n in LAND_IDX) return LAND_IDX[n]
  let h = 0
  for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) >>> 0
  return h % 5
}

// A flat Mercator map of the Türkiye→Pakistan recruitment corridor: both countries
// highlighted at the same scale, surrounding land for context, and animated flight
// routes from Pakistan's airport cities into Türkiye. Pure SVG/SMIL, no client JS.
export function TurkeyGlobe({ className }: { className?: string }) {
  const [vx, vy, vw, vh] = MAP.vb
  const tCities = MAP.turkeyCities as Record<string, number[]>
  const pCities = MAP.pakCities as Record<string, number[]>
  const tb = MAP.turkeyBounds
  const pb = MAP.pakBounds

  // Flag emblem centred on Anatolia.
  const tcx = (tb[0][0] + tb[1][0]) / 2
  const tcy = (tb[0][1] + tb[1][1]) / 2
  const emScale = 58 / 30000
  const emT = `translate(${(tcx - emScale * 35159).toFixed(1)} ${tcy.toFixed(1)}) scale(${emScale.toFixed(6)})`

  // Flight arcs bowed upward off the map; plane duration ∝ route length (consistent speed).
  const flights = ROUTES.map(([from, to], i) => {
    const [ox, oy] = pCities[from]
    const [cx, cy] = tCities[to]
    const mx = (ox + cx) / 2
    const my = (oy + cy) / 2
    const dx = cx - ox
    const dy = cy - oy
    const len = Math.hypot(dx, dy) || 1
    let nx = -dy / len
    let ny = dx / len
    if (ny > 0) {
      nx = -nx
      ny = -ny
    }
    const lift = Math.min(90, len * 0.2)
    const d = `M${ox} ${oy} Q${(mx + nx * lift).toFixed(1)} ${(my + ny * lift).toFixed(1)} ${cx} ${cy}`
    return { name: `${from}-${to}`, d, dur: `${(len / 80).toFixed(2)}s`, begin: `${(i * 0.6).toFixed(2)}s` }
  })
  const dests = [...new Set(ROUTES.map(([, to]) => to))]

  return (
    <svg
      viewBox={`${vx} ${vy} ${vw} ${vh}`}
      className={className}
      role="img"
      aria-label="Flight-route map from Pakistan's airport cities to Türkiye — Falisha Manpower's speciality recruitment corridor"
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={LABEL_FONT}
    >
      <style>{`
        /* Premium political-atlas palette, theme-aware (dark default; light via the
           site's data-theme). tm-l0…4 are the five land tones; tm-land is the border. */
        .tm-ocean-a { stop-color: #1b3b78; }
        .tm-ocean-b { stop-color: #0a1c46; }
        .tm-land { stroke: rgba(170,190,230,0.16); stroke-width: 0.5; stroke-linejoin: round; }
        .tm-l0 { fill: #2e3652; } .tm-l1 { fill: #2b4140; } .tm-l2 { fill: #3a3450; }
        .tm-l3 { fill: #39412f; } .tm-l4 { fill: #3c333f; }
        .tm-grat { stroke: #9fb8ff; }
        .tm-sea { fill: #9db4f0; }
        .tm-neigh { fill: #c6d0ea; }
        :root[data-theme="light"] .tm-ocean-a { stop-color: #aacfe8; }
        :root[data-theme="light"] .tm-ocean-b { stop-color: #c8e0f0; }
        :root[data-theme="light"] .tm-land { stroke: rgba(80,100,130,0.42); }
        :root[data-theme="light"] .tm-l0 { fill: #ecdcac; } :root[data-theme="light"] .tm-l1 { fill: #cfe0bb; }
        :root[data-theme="light"] .tm-l2 { fill: #f2d7b6; } :root[data-theme="light"] .tm-l3 { fill: #d2dde3; }
        :root[data-theme="light"] .tm-l4 { fill: #e8cbd2; }
        :root[data-theme="light"] .tm-grat { stroke: #6f93c8; }
        :root[data-theme="light"] .tm-sea { fill: #5a76b0; }
        :root[data-theme="light"] .tm-neigh { fill: #55657f; }
        /* flight lines + planes: blue, theme-aware (bright azure on dark, royal blue on light). */
        .tm-route { stroke: #5ea0ff; }
        .tm-glow { stroke: #5ea0ff; }
        .tm-pulse-s { stroke: #7cb8ff; }
        .tm-plane-glow { fill: #5ea0ff; }
        .tm-plane-body { fill: #ffffff; }
        :root[data-theme="light"] .tm-route { stroke: #1b47c4; }
        :root[data-theme="light"] .tm-glow { stroke: #3b63d6; }
        :root[data-theme="light"] .tm-pulse-s { stroke: #1b47c4; }
        :root[data-theme="light"] .tm-plane-glow { fill: #3b63d6; }
        :root[data-theme="light"] .tm-plane-body { fill: #14307a; }
        @media (prefers-reduced-motion: reduce) { .tg-plane, .tg-pulse { display: none; } }
        @media (prefers-reduced-motion: reduce) { .tm-route, .tm-glow { stroke-dashoffset: 0 !important; stroke-opacity: 0.5 !important; } }
      `}</style>
      <defs>
        <linearGradient id="tm-ocean" x1="0" y1="0" x2="0" y2="1">
          <stop className="tm-ocean-a" offset="0%" stopColor="#1b3b78" />
          <stop className="tm-ocean-b" offset="100%" stopColor="#0a1c46" />
        </linearGradient>
        <linearGradient id="tm-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f23642" />
          <stop offset="100%" stopColor="#c90812" />
        </linearGradient>
        <linearGradient id="tm-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2cc866" />
          <stop offset="100%" stopColor="#0c7a37" />
        </linearGradient>
        <filter id="tm-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#04102e" floodOpacity="0.55" />
        </filter>
      </defs>

      <rect x={vx} y={vy} width={vw} height={vh} fill="url(#tm-ocean)" />
      <path className="tm-grat" d={MAP.graticuleD} fill="none" stroke="#9fb8ff" strokeOpacity="0.08" strokeWidth="0.6" />
      {/* surrounding countries, each its own atlas tone */}
      {MAP.lands.map(({ n, d }) => (
        <path key={n} className={`tm-land tm-l${landIdx(n)}`} d={d} />
      ))}

      {/* sea + neighbour-country labels (map detail, hidden on phones) */}
      <g className="tg-detail">
        {Object.entries(MAP.seaPos).map(([n, [x, y]]) => (
          <text key={n} className="tm-sea" x={x} y={y} textAnchor="middle" fontSize="9" fontStyle="italic" fontWeight="500" letterSpacing="1.5" fill="#9db4f0" opacity="0.72">
            {n}
          </text>
        ))}
        {Object.entries(MAP.neighPos).map(([n, [x, y]]) => (
          <text key={n} className="tm-neigh" x={x} y={y} textAnchor="middle" fontSize="8" fontWeight="600" letterSpacing="1.1" fill="#c6d0ea" opacity="0.58">
            {n}
          </text>
        ))}
      </g>

      {/* Türkiye (red) + national flag emblem */}
      <g filter="url(#tm-shadow)">
        <path d={MAP.turkeyD} fill="url(#tm-red)" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1" />
      </g>
      <path d={EMBLEM_PATH} transform={emT} fill="#ffffff" fillOpacity="0.95" />

      {/* Pakistan (green) */}
      <g filter="url(#tm-shadow)">
        <path d={MAP.pakistanD} fill="url(#tm-green)" stroke="#eafff0" strokeOpacity="0.85" strokeWidth="1" />
      </g>

      {/* Flight lines that draw in *behind* each plane (the route is never pre-drawn):
          pathLength=1 + dasharray "1 1" + dashoffset 1→0 reveals the arc from the origin
          up to the plane's position, in sync with the plane's motion; it fades out as the
          plane lands so the loop never flashes a full line. Glow under a crisp line. */}
      <g>
        {flights.map((f) => (
          <path key={'glow' + f.name} className="tm-glow" d={f.d} fill="none" strokeWidth="3.5" strokeLinecap="round" pathLength="1" strokeDasharray="1 1" strokeDashoffset="1" strokeOpacity="0.22">
            <animate attributeName="stroke-dashoffset" from="1" to="0" dur={f.dur} begin={f.begin} repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.22;0.22;0" keyTimes="0;0.8;1" dur={f.dur} begin={f.begin} repeatCount="indefinite" />
          </path>
        ))}
        {flights.map((f) => (
          <path key={'line' + f.name} className="tm-route" d={f.d} fill="none" strokeWidth="1.5" strokeLinecap="round" pathLength="1" strokeDasharray="1 1" strokeDashoffset="1" strokeOpacity="0.9">
            <animate attributeName="stroke-dashoffset" from="1" to="0" dur={f.dur} begin={f.begin} repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.9;0.9;0" keyTimes="0;0.8;1" dur={f.dur} begin={f.begin} repeatCount="indefinite" />
          </path>
        ))}
        {dests.map((name, i) => {
          const [cx, cy] = tCities[name]
          return (
            <circle key={'p' + name} className="tg-pulse tm-pulse-s" cx={cx} cy={cy} r="2.5" fill="none" strokeWidth="1">
              <animate attributeName="r" values="2;9" dur="2.6s" begin={`${(i * 0.4).toFixed(1)}s`} repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.7;0" dur="2.6s" begin={`${(i * 0.4).toFixed(1)}s`} repeatCount="indefinite" />
            </circle>
          )
        })}
        {flights.map((f) => (
          <g key={'c' + f.name} className="tg-plane">
            <animateMotion dur={f.dur} begin={f.begin} repeatCount="indefinite" rotate="auto" path={f.d} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.03;0.92;1" dur={f.dur} begin={f.begin} repeatCount="indefinite" />
            <circle className="tm-plane-glow" r="6" opacity="0.2" />
            <g transform="rotate(90) scale(0.62) translate(-12 -12)">
              <path className="tm-plane-body" d={PLANE_D} />
            </g>
          </g>
        ))}
      </g>

      {/* country titles */}
      <text x={tb[0][0] + 46} y={tb[1][1] + 18} textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1.5" fill="#ffd0d3" paintOrder="stroke" stroke="#3a0608" strokeWidth="3" strokeLinejoin="round">
        TÜRKİYE
      </text>
      <text x={(pb[0][0] + pb[1][0]) / 2} y={pb[1][1] + 15} textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1.5" fill="#e8b64c" paintOrder="stroke" stroke="#07351c" strokeWidth="3" strokeLinejoin="round">
        PAKISTAN
      </text>

      {/* city markers */}
      {Object.entries(tCities).map(([n, [x, y]]) => {
        const [a, dx, dy] = TLAB[n] || ['start', 4, 1]
        return (
          <g key={n}>
            <circle cx={x} cy={y} r="2" fill="#ffffff" stroke="#0a1838" strokeWidth="0.8" />
            <text x={x + dx} y={y + dy} textAnchor={a} fontSize="9" fontWeight="600" fill="#ffffff" paintOrder="stroke" stroke="#0a1838" strokeWidth="2.6" strokeLinejoin="round">
              {n}
            </text>
          </g>
        )
      })}
      {Object.entries(pCities).map(([n, [x, y]]) => {
        const [a, dx, dy] = PLAB[n] || ['start', 4, 1]
        return (
          <g key={n} className="tg-detail">
            <circle cx={x} cy={y} r="2" fill="#ffffff" stroke="#0a1838" strokeWidth="0.8" />
            <text x={x + dx} y={y + dy} textAnchor={a} fontSize="9" fontWeight="600" fill="#ffffff" paintOrder="stroke" stroke="#0a1838" strokeWidth="2.6" strokeLinejoin="round">
              {n}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
