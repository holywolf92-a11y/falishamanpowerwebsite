import React from 'react'
import { GEO } from './turkeyGlobeGeo'

// Official Türkiye flag emblem (crescent + star) — public-domain geometry taken
// verbatim from the national flag SVG. In its own coordinate space: crescent outer
// circle Ø30000 centred (30000,0), inner Ø24000 centred (33750,0); five-point star
// (Ø15000) centred (49250,0) with one point facing the crescent. The emblem's bbox
// spans x∈[15000,55318], y∈[-8021,8021] (centre ≈ (35159,0)).
const EMBLEM_PATH =
  'm41750 0 13568-4408-8386 11541V-7133l8386 11541zm925 8021a15000 15000 0 1 1 0-16042 12000 12000 0 1 0 0 16042z'

// City markers over Türkiye, pre-projected into the same 0–520 viewBox as the geometry
// (orthographic, scale 545, centred on Türkiye). `a` = label side relative to the dot.
type City = { name: string; x: number; y: number; a: 'start' | 'end' | 'middle'; dx: number; dy: number; capital?: boolean }
const CITIES: City[] = [
  { name: 'İstanbul', x: 215.2, y: 249.4, a: 'end', dx: -4, dy: -1 },
  { name: 'Bursa', x: 215.2, y: 257.2, a: 'end', dx: -4, dy: 8 },
  { name: 'İzmir', x: 199.8, y: 272.9, a: 'end', dx: -4, dy: 3 },
  { name: 'Antalya', x: 225.5, y: 289.2, a: 'middle', dx: 0, dy: 10 },
  { name: 'Konya', x: 239.3, y: 280.5, a: 'middle', dx: -2, dy: 10 },
  { name: 'Ankara', x: 242.6, y: 261, a: 'start', dx: 5, dy: -2, capital: true },
  { name: 'Kayseri', x: 261.9, y: 272.6, a: 'start', dx: 5, dy: 3 },
  { name: 'Adana', x: 260.6, y: 289.1, a: 'middle', dx: 2, dy: 10 },
  { name: 'Gaziantep', x: 276.2, y: 288.2, a: 'start', dx: 4, dy: 5 },
  { name: 'Samsun', x: 267.8, y: 248.3, a: 'start', dx: 4, dy: -1 },
  { name: 'Trabzon', x: 292.1, y: 250.3, a: 'start', dx: 4, dy: 3 },
]
// Sea labels (italic, letter-spaced) and dull neighbour-country labels, same projection.
const SEAS: { name: string; x: number; y: number }[] = [
  { name: 'BLACK SEA', x: 256, y: 227 },
]
const SEA_STACK = { lines: ['MEDITERRANEAN', 'SEA'], x: 223, y: 309 }
const NEIGHBORS: { name: string; x: number; y: number }[] = [
  { name: 'BULGARIA', x: 196, y: 233 },
  { name: 'GEORGIA', x: 314, y: 239 },
  { name: 'IRAN', x: 330, y: 270 },
  { name: 'IRAQ', x: 322, y: 305 },
  { name: 'SYRIA', x: 286, y: 309 },
  { name: 'CYPRUS', x: 243, y: 306 },
]
const LABEL_FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif'

// "Flights from Pakistan": Pakistan lies east of Türkiye, just past this globe's
// ESE edge, so its silhouette is anchored there (Natural Earth outline, equirectangular,
// in its own 54×49.6 box placed at PAK_MAP) and routes sweep in to the main airport
// cities, starting at PAK — Pakistan's Türkiye-facing edge.
const PAKISTAN_D =
  'M45.5 0.0 L47.8 1.7 L48.8 4.6 L54.0 6.1 L50.9 9.2 L47.4 9.7 L42.5 8.8 L41.0 10.4 L42.1 13.6 L43.2 16.1 L45.8 17.9 L43.1 20.1 L43.1 22.7 L40.0 26.4 L38.0 30.2 L34.7 34.0 L31.0 33.8 L27.5 37.6 L29.6 39.3 L30.0 42.1 L31.7 44.0 L32.4 47.2 L25.4 47.2 L23.2 49.6 L20.9 48.7 L20.0 46.0 L17.5 43.2 L11.6 43.9 L6.5 44.0 L2.0 44.5 L3.2 40.2 L7.8 38.3 L7.5 36.6 L6.0 36.0 L5.9 32.8 L2.9 31.1 L1.6 28.9 L0.0 27.0 L5.3 28.8 L8.5 28.3 L10.4 28.8 L11.1 28.0 L13.3 28.3 L17.4 26.7 L17.5 23.6 L19.3 21.5 L21.7 21.5 L22.0 20.5 L24.5 20.0 L25.6 20.3 L26.9 19.3 L26.7 17.1 L28.1 14.9 L30.1 13.9 L28.8 11.5 L31.9 11.6 L32.7 10.3 L32.6 8.9 L34.2 7.3 L33.8 5.5 L33.1 3.9 L34.9 2.3 L38.3 1.5 L42.0 1.1 L43.6 0.4 L45.5 0.0Z'
const PAK_MAP = { tx: 428.3, ty: 374.7, s: 1.1 }
// Pakistani airport cities, projected into the same box as the silhouette.
type PakCity = { name: string; x: number; y: number; a: 'start' | 'end' | 'middle'; dx: number; dy: number }
const PAKISTAN_CITIES: PakCity[] = [
  { name: 'Islamabad', x: 471, y: 388.6, a: 'start', dx: 3, dy: -3 },
  { name: 'Peshawar', x: 465.8, y: 387.3, a: 'end', dx: -3, dy: -3 },
  { name: 'Lahore', x: 475.6, y: 397.4, a: 'start', dx: 4, dy: 1 },
  { name: 'Multan', x: 465.4, y: 402.8, a: 'end', dx: -4, dy: 4 },
  { name: 'Karachi', x: 449.8, y: 424.5, a: 'end', dx: -3, dy: 3 },
]
// Türkiye destination coords and the Pakistan → Türkiye airport routes.
const TUR_POS: Record<string, [number, number]> = {
  İstanbul: [215.2, 249.4],
  Ankara: [242.6, 261],
  İzmir: [199.8, 272.9],
  Antalya: [225.5, 289.2],
  Gaziantep: [276.2, 288.2],
  Trabzon: [292.1, 250.3],
}
const ROUTES: [string, string][] = [
  ['Islamabad', 'İstanbul'],
  ['Lahore', 'İstanbul'],
  ['Karachi', 'İstanbul'],
  ['Lahore', 'Ankara'],
  ['Peshawar', 'İzmir'],
  ['Karachi', 'Antalya'],
  ['Multan', 'Gaziantep'],
  ['Islamabad', 'Trabzon'],
]
// Airplane glyph (Material "flight", nose up); rotated to follow each route's heading.
const PLANE_D =
  'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z'

// A royal-blue 3D-style globe (true orthographic projection centred on Türkiye) with
// the neighbouring countries drawn dull and Türkiye raised, red and flag-filled, so it
// clearly stands out. City markers, sea and neighbour labels are projected into the
// same space so it reads as a rich annotated map. Geometry is pre-projected in
// ./turkeyGlobeGeo (0–520 viewBox).
export function TurkeyGlobe({ className }: { className?: string }) {
  const { CX, CY, R, turkeyD, landD, graticuleD } = GEO

  // Place the official flag emblem over the central body of Anatolia: scale so the
  // crescent's outer circle (Ø30000) renders ~40px, and centre the emblem's bbox.
  const emScale = 44 / 30000
  const emCx = 252
  const emCy = 272
  const emblemTransform = `translate(${(emCx - emScale * 35159).toFixed(2)} ${emCy}) scale(${emScale.toFixed(6)})`

  // Flight arcs: a quadratic curve from each Pakistani airport city to its Türkiye
  // destination, bowed away from the globe centre so the routes lift off the surface.
  const pakPos = (name: string): [number, number] => {
    const c = PAKISTAN_CITIES.find((p) => p.name === name)!
    return [c.x, c.y]
  }
  const flights = ROUTES.map(([from, to], i) => {
    const [ox, oy] = pakPos(from)
    const [cx, cy] = TUR_POS[to]
    const mx = (ox + cx) / 2
    const my = (oy + cy) / 2
    const dx = cx - ox
    const dy = cy - oy
    const len = Math.hypot(dx, dy) || 1
    let nx = -dy / len
    let ny = dx / len
    if (nx * (mx - CX) + ny * (my - CY) < 0) {
      nx = -nx
      ny = -ny
    }
    const lift = Math.min(60, len * 0.3)
    const d = `M${ox} ${oy} Q${(mx + nx * lift).toFixed(1)} ${(my + ny * lift).toFixed(1)} ${cx} ${cy}`
    // Duration ∝ route length so every plane cruises at the same (calm) visual speed.
    const dur = `${(len / 40).toFixed(2)}s`
    return { name: `${from}-${to}`, d, dur, begin: `${(i * 0.6).toFixed(2)}s` }
  })
  // Unique Türkiye arrival cities, for a soft "landing" pulse at each.
  const dests = [...new Set(ROUTES.map(([, to]) => to))]

  return (
    <svg
      viewBox="167 211 346 242"
      className={className}
      role="img"
      aria-label="Globe centred on Türkiye with neighbouring countries shown dull — Falisha Manpower's speciality recruitment market"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @media (max-width: 500px) { .tg-pakcity { display: none; } }
        @media (prefers-reduced-motion: reduce) { .tg-plane, .tg-pulse { display: none; } }
      `}</style>
      <defs>
        <radialGradient id="tg-ocean" cx="34%" cy="28%" r="82%">
          <stop offset="0%" stopColor="#5b86ff" />
          <stop offset="45%" stopColor="#2a51d6" />
          <stop offset="78%" stopColor="#15317f" />
          <stop offset="100%" stopColor="#0a1d57" />
        </radialGradient>
        <radialGradient id="tg-spec" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tg-redglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff2b38" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#e30a17" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e30a17" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tg-flagglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tg-pakglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#16a34a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tg-pakfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2cc866" />
          <stop offset="100%" stopColor="#0c7a37" />
        </linearGradient>
        <linearGradient id="tg-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f23642" />
          <stop offset="100%" stopColor="#c90812" />
        </linearGradient>
        <radialGradient id="tg-ambient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b63e0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3b63e0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tg-landfade" gradientUnits="userSpaceOnUse" cx={CX} cy={CY} r={R}>
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#ffffff" />
          <stop offset="97%" stopColor="#000000" />
        </radialGradient>
        <mask id="tg-landmask">
          <circle cx={CX} cy={CY} r={R} fill="url(#tg-landfade)" />
        </mask>
        <clipPath id="tg-globe">
          <circle cx={CX} cy={CY} r={R} />
        </clipPath>
        <clipPath id="tg-turkey">
          <path d={turkeyD} />
        </clipPath>
        <filter id="tg-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#060f30" floodOpacity="0.6" />
        </filter>
        <filter id="tg-liftwhite" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" floodColor="#7a0009" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* ambient halo behind the globe */}
      <circle cx={CX} cy={CY} r={R + 24} fill="url(#tg-ambient)" />

      {/* globe sphere */}
      <circle cx={CX} cy={CY} r={R} fill="url(#tg-ocean)" />

      {/* dull neighbouring landmasses (edge-faded so they recede into the ocean) */}
      <g clipPath="url(#tg-globe)" mask="url(#tg-landmask)">
        <path d={landD} fill="#48588c" fillOpacity="0.9" />
        <path d={landD} fill="none" stroke="#a9bcef" strokeOpacity="0.18" strokeWidth="0.5" />
      </g>

      {/* graticule */}
      <g clipPath="url(#tg-globe)">
        <path d={graticuleD} fill="none" stroke="#dbe5ff" strokeOpacity="0.12" strokeWidth="0.75" />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#dbe5ff" strokeOpacity="0.22" strokeWidth="1" />
      </g>

      {/* specular highlight */}
      <ellipse cx={CX - 78} cy={CY - 92} rx="120" ry="92" fill="url(#tg-spec)" opacity="0.6" />

      {/* red glow + raised Türkiye */}
      <circle cx="259" cy="268" r="120" fill="url(#tg-redglow)" />
      <g filter="url(#tg-soft)">
        <path d={turkeyD} fill="url(#tg-red)" />
        <path d={turkeyD} fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.1" />
      </g>

      {/* soft glow behind the flag so it reads clearly on the red, clipped to Türkiye */}
      <g clipPath="url(#tg-turkey)">
        <circle cx={emCx} cy={emCy} r="36" fill="url(#tg-flagglow)" />
      </g>

      {/* official flag emblem (crescent + star), clipped to Türkiye so it never spills out */}
      <g clipPath="url(#tg-turkey)" filter="url(#tg-liftwhite)">
        <path d={EMBLEM_PATH} transform={emblemTransform} fill="#ffffff" />
      </g>

      {/* crisp rim light */}
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="#9fb8ff"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />

      {/* flights from Pakistani airport cities sweeping into the Turkish cities */}
      <g fontFamily={LABEL_FONT}>
        {flights.map((f) => (
          <path
            key={'fg' + f.name}
            d={f.d}
            fill="none"
            stroke="#ffd86b"
            strokeOpacity="0.12"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        ))}
        {flights.map((f) => (
          <path
            key={'fl' + f.name}
            d={f.d}
            fill="none"
            stroke="#ffd86b"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="2.5 4.5"
          >
            <animate attributeName="stroke-dashoffset" from="14" to="0" dur="2.6s" repeatCount="indefinite" />
          </path>
        ))}
        {dests.map((name, i) => {
          const [cx, cy] = TUR_POS[name]
          return (
            <circle key={'p' + name} className="tg-pulse" cx={cx} cy={cy} r="2" fill="none" stroke="#ffd86b" strokeWidth="0.8">
              <animate
                attributeName="r"
                values="1.5;6"
                dur="2.6s"
                begin={`${(i * 0.4).toFixed(1)}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.7;0"
                dur="2.6s"
                begin={`${(i * 0.4).toFixed(1)}s`}
                repeatCount="indefinite"
              />
            </circle>
          )
        })}
        {flights.map((f) => (
          <g key={'fc' + f.name} className="tg-plane">
            <animateMotion dur={f.dur} begin={f.begin} repeatCount="indefinite" rotate="auto" path={f.d} />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.85;1"
              dur={f.dur}
              begin={f.begin}
              repeatCount="indefinite"
            />
            <circle r="5" fill="#ffd86b" opacity="0.18" />
            <g transform="rotate(90) scale(0.46) translate(-12 -12)">
              <path d={PLANE_D} fill="#ffffff" />
            </g>
          </g>
        ))}
        {/* Pakistan — country silhouette with its five airport cities */}
        <circle
          cx={PAK_MAP.tx + (54 * PAK_MAP.s) / 2}
          cy={PAK_MAP.ty + (49.6 * PAK_MAP.s) / 2}
          r="40"
          fill="url(#tg-pakglow)"
        />
        <g transform={`translate(${PAK_MAP.tx} ${PAK_MAP.ty}) scale(${PAK_MAP.s})`}>
          <path
            d={PAKISTAN_D}
            fill="url(#tg-pakfill)"
            stroke="#eafff0"
            strokeOpacity="0.9"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </g>
        {PAKISTAN_CITIES.map((c) => (
          <g key={c.name}>
            <circle cx={c.x} cy={c.y} r="1.4" fill="#ffffff" stroke="#07351c" strokeWidth="0.6" />
            <text
              className="tg-pakcity"
              x={c.x + c.dx}
              y={c.y + c.dy}
              textAnchor={c.a}
              fontSize="6"
              fontWeight="600"
              fill="#eafff0"
              paintOrder="stroke"
              stroke="#07351c"
              strokeWidth="1.7"
              strokeLinejoin="round"
            >
              {c.name}
            </text>
          </g>
        ))}
        <text
          x={PAK_MAP.tx + (54 * PAK_MAP.s) / 2}
          y={PAK_MAP.ty + 49.6 * PAK_MAP.s + 10}
          textAnchor="middle"
          fontSize="8"
          fontWeight="800"
          letterSpacing="1.2"
          fill="#e8b64c"
          paintOrder="stroke"
          stroke="#07351c"
          strokeWidth="2.3"
          strokeLinejoin="round"
        >
          PAKISTAN
        </text>
      </g>

      {/* annotated-map labels: seas, dull neighbours, then city markers on top */}
      <g fontFamily={LABEL_FONT}>
        {SEAS.map((s) => (
          <text
            key={s.name}
            x={s.x}
            y={s.y}
            textAnchor="middle"
            fontSize="8.5"
            fontStyle="italic"
            fontWeight="500"
            letterSpacing="2"
            fill="#9db4f0"
            opacity="0.7"
          >
            {s.name}
          </text>
        ))}
        <text
          x={SEA_STACK.x}
          y={SEA_STACK.y}
          textAnchor="middle"
          fontSize="8.5"
          fontStyle="italic"
          fontWeight="500"
          letterSpacing="2"
          fill="#9db4f0"
          opacity="0.7"
        >
          <tspan x={SEA_STACK.x}>{SEA_STACK.lines[0]}</tspan>
          <tspan x={SEA_STACK.x} dy="10">
            {SEA_STACK.lines[1]}
          </tspan>
        </text>
        {NEIGHBORS.map((n) => (
          <text
            key={n.name}
            x={n.x}
            y={n.y}
            textAnchor="middle"
            fontSize="7"
            fontWeight="600"
            letterSpacing="1.4"
            fill="#aab8e4"
            opacity="0.5"
          >
            {n.name}
          </text>
        ))}
        {CITIES.map((c) => (
          <g key={c.name}>
            <circle
              cx={c.x}
              cy={c.y}
              r={c.capital ? 2.4 : 1.7}
              fill="#ffffff"
              stroke="#0b1b4d"
              strokeWidth="0.7"
            />
            {c.capital && (
              <circle
                cx={c.x}
                cy={c.y}
                r="4.2"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.55"
                strokeWidth="0.8"
              />
            )}
            <text
              x={c.x + c.dx}
              y={c.y + c.dy}
              textAnchor={c.a}
              fontSize="8.2"
              fontWeight="600"
              fill="#ffffff"
              paintOrder="stroke"
              stroke="#0a1838"
              strokeWidth="2.3"
              strokeLinejoin="round"
            >
              {c.name}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
