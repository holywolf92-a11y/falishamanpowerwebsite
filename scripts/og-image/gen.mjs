// Generates public/og-image.png — the branded social-share card (1200×630).
// Run from the project root: `node scripts/og-image/gen.mjs`
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../../public/og-image.png')

const W = 1200
const H = 630

// A faint graticule for the globe motif on the right.
const grat = []
for (let i = 1; i < 6; i++) {
  const ry = (260 * i) / 6
  grat.push(`<ellipse cx="1010" cy="315" rx="260" ry="${ry.toFixed(0)}" />`)
  grat.push(`<ellipse cx="1010" cy="315" rx="${ry.toFixed(0)}" ry="260" />`)
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1e5c"/>
      <stop offset="55%" stop-color="#0a1540"/>
      <stop offset="100%" stop-color="#070f2e"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="32%" r="55%">
      <stop offset="0%" stop-color="#2e52cf" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#2e52cf" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="globe" cx="40%" cy="32%" r="75%">
      <stop offset="0%" stop-color="#4f79ff"/>
      <stop offset="60%" stop-color="#23469f"/>
      <stop offset="100%" stop-color="#122a66"/>
    </radialGradient>
    <clipPath id="globeclip"><circle cx="1010" cy="315" r="260"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- globe motif -->
  <circle cx="1010" cy="315" r="300" fill="#2e52cf" opacity="0.10"/>
  <circle cx="1010" cy="315" r="260" fill="url(#globe)"/>
  <g clip-path="url(#globeclip)" fill="none" stroke="#cfdcff" stroke-opacity="0.18" stroke-width="1.5">
    ${grat.join('\n    ')}
  </g>
  <circle cx="1010" cy="315" r="260" fill="none" stroke="#9fb8ff" stroke-opacity="0.45" stroke-width="2"/>
  <!-- Türkiye accent dot (speciality market) -->
  <circle cx="930" cy="300" r="26" fill="#e30a17"/>
  <circle cx="930" cy="300" r="26" fill="none" stroke="#ffffff" stroke-opacity="0.6" stroke-width="2"/>

  <!-- text block -->
  <text x="80" y="176" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" letter-spacing="3" fill="#f4b740">OVERSEAS RECRUITMENT AGENCY · PAKISTAN</text>
  <text x="78" y="286" font-family="Arial, Helvetica, sans-serif" font-size="88" font-weight="700" fill="#ffffff">Falisha Manpower</text>
  <text x="80" y="360" font-family="Arial, Helvetica, sans-serif" font-size="33" font-weight="400" fill="#c9d4f5">Skilled Pakistani workforce for the Gulf,</text>
  <text x="80" y="406" font-family="Arial, Helvetica, sans-serif" font-size="33" font-weight="400" fill="#c9d4f5">Türkiye &amp; beyond — sourced &amp; mobilised, end to end.</text>

  <!-- credential pill -->
  <rect x="80" y="470" width="470" height="58" rx="29" fill="#f4b740" fill-opacity="0.12" stroke="#f4b740" stroke-opacity="0.55" stroke-width="1.5"/>
  <text x="112" y="507" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#f4b740">BEOE Licensed · OEP Licence No. 4035</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(OUT)
console.log('wrote', OUT)
