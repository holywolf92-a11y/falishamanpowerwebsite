import { readFileSync, writeFileSync } from 'fs'
import * as topojson from 'topojson-client'
import { geoNaturalEarth1, geoPath, geoGraticule10 } from 'd3-geo'

const W = 1000
const H = 505

const topo = JSON.parse(readFileSync('./countries-110m.json', 'utf8'))
const fc = topojson.feature(topo, topo.objects.countries)

const SERVED = new Set([
  'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Oman', 'Bahrain',
  'Turkey', 'Romania', 'Poland', 'Croatia', 'Hungary', 'Serbia', 'Portugal',
  'Greece', 'Germany', 'Italy', 'Cyprus', 'Lithuania', 'Japan', 'South Korea',
  'Malaysia', 'Azerbaijan', 'Kazakhstan', 'Uzbekistan', 'Georgia', 'Iraq',
  'Jordan', 'Libya',
])

const proj = geoNaturalEarth1().fitExtent([[8, 8], [W - 8, H - 8]], { type: 'Sphere' })
const path = geoPath(proj)
const round = (d) => (d ? d.replace(/-?\d+\.?\d*/g, (m) => String(Math.round(+m))) : '')

const names = new Set(fc.features.map((f) => f.properties.name))
const missing = [...SERVED].filter((n) => !names.has(n))

const served = []
const pak = []
const other = []
const dots = []
for (const f of fc.features) {
  const d = path(f)
  if (!d) continue
  const name = f.properties.name
  if (name === 'Pakistan') {
    pak.push(round(d))
  } else if (SERVED.has(name)) {
    served.push(round(d))
    const c = path.centroid(f)
    if (c && !Number.isNaN(c[0])) dots.push([Math.round(c[0] * 10) / 10, Math.round(c[1] * 10) / 10])
  } else {
    other.push(round(d))
  }
}
const pakCentroid = (() => {
  const f = fc.features.find((x) => x.properties.name === 'Pakistan')
  const c = f ? path.centroid(f) : null
  return c ? [Math.round(c[0] * 10) / 10, Math.round(c[1] * 10) / 10] : null
})()

writeFileSync(
  'worldmap.json',
  JSON.stringify({
    W,
    H,
    graticule: round(path(geoGraticule10())),
    sphere: round(path({ type: 'Sphere' })),
    other: other.join(''),
    served: served.join(''),
    pak: pak.join(''),
    dots,
    pakCentroid,
  }),
)
console.log('served matched:', SERVED.size - missing.length, 'of', SERVED.size)
console.log('missing (name mismatch):', missing)
console.log('dots:', dots.length, 'pakCentroid:', pakCentroid)
