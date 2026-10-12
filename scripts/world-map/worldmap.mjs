import { readFileSync, writeFileSync } from 'fs'
import * as topojson from 'topojson-client'
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3-geo'

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

// Fit the projection to just the served region (so the map isn't mostly empty ocean),
// then crop the viewBox to that region plus padding. Land outside the viewBox is clipped.
const regionFC = {
  type: 'FeatureCollection',
  features: fc.features.filter((f) => SERVED.has(f.properties.name) || f.properties.name === 'Pakistan'),
}
const proj = geoNaturalEarth1().fitExtent([[0, 0], [W, W]], regionFC)
const path = geoPath(proj)
const round = (d) => (d ? d.replace(/-?\d+\.?\d*/g, (m) => String(Math.round(+m))) : '')

const names = new Set(fc.features.map((f) => f.properties.name))
const missing = [...SERVED].filter((n) => !names.has(n))

const [[rx0, ry0], [rx1, ry1]] = path.bounds(regionFC)
const rw = rx1 - rx0
const rh = ry1 - ry0
const padX = rw * 0.07
const padTop = rh * 0.1
const padBot = rh * 0.08
const vb = {
  x: Math.round(rx0 - padX),
  y: Math.round(ry0 - padTop),
  w: Math.round(rw + 2 * padX),
  h: Math.round(rh + padTop + padBot),
}
const VIEWBOX = [vb.x, vb.y, vb.w, vb.h].join(' ')
// Only keep land whose projected bounds intersect the viewBox (+ margin), so the Americas
// and far Pacific are dropped from the data entirely.
const M = 60
const inView = (f) => {
  const b = path.bounds(f)
  if (!Number.isFinite(b[0][0])) return false
  return b[1][0] >= vb.x - M && b[0][0] <= vb.x + vb.w + M && b[1][1] >= vb.y - M && b[0][1] <= vb.y + vb.h + M
}

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
  } else if (inView(f)) {
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
    viewBox: VIEWBOX,
    graticule: round(path(geoGraticule().extent([[-25, -10], [155, 72]]).step([15, 15])())),
    other: other.join(''),
    served: served.join(''),
    pak: pak.join(''),
    dots,
    pakCentroid,
  }),
)
console.log('served matched:', SERVED.size - missing.length, 'of', SERVED.size)
console.log('viewBox:', VIEWBOX)
console.log('dots:', dots.length, 'pakCentroid:', pakCentroid)
