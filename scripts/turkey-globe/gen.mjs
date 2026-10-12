import { readFileSync, writeFileSync } from 'fs'
import * as topojson from 'topojson-client'
import { geoOrthographic, geoPath, geoCentroid, geoGraticule10 } from 'd3-geo'

const R = 248 // ocean-circle radius in the SVG
const CX = 260
const CY = 260
const SCALE = 545 // > R → a "zoomed" globe showing a cap around Türkiye
const CLIP = Math.asin(R / SCALE) * (180 / Math.PI) + 1.5 // cap just past the circle edge

// Türkiye crisp (50m); dull neighbours coarse (110m) to keep the inline data small.
const topo = JSON.parse(readFileSync('./countries-50m.json', 'utf8'))
const fc = topojson.feature(topo, topo.objects.countries)
const topoLand = JSON.parse(readFileSync('./countries-110m.json', 'utf8'))
const fcLand = topojson.feature(topoLand, topoLand.objects.countries)
const turkey = fc.features.find((f) => f.properties.name === 'Turkey')
if (!turkey) throw new Error('Turkey not found')

// Centre the globe on Türkiye, nudged slightly so the country sits a touch above
// the equator line of the sphere for a nicer composition.
const c = geoCentroid(turkey) // [lon, lat]
const centerLon = c[0]
const centerLat = c[1] + 1

const proj = geoOrthographic()
  .scale(SCALE)
  .translate([CX, CY])
  .clipAngle(CLIP)
  .rotate([-centerLon, -centerLat])
const path = geoPath(proj)

const roundN = (dec) => (d) =>
  d == null
    ? ''
    : d.replace(/[-+]?\d*\.?\d+(?:e[-+]?\d+)?/gi, (m) => {
        const n = +m
        return Number.isFinite(n) ? String(Math.round(n * 10 ** dec) / 10 ** dec) : m
      })
const round = roundN(1) // Türkiye: 1 decimal
const roundInt = roundN(0) // dull land: integer

const turkeyD = round(path(turkey))

const others = []
for (const f of fcLand.features) {
  if (f.properties.name === 'Turkey') continue
  if (f.properties.name === 'Antarctica') continue
  const d = path(f)
  if (d) others.push(roundInt(d))
}
const landD = others.join('')

const graticuleD = roundInt(path(geoGraticule10()))
const bounds = path.bounds(turkey) // [[x0,y0],[x1,y1]]
const centroidPx = path.centroid(turkey)

const out = {
  center: [centerLon, centerLat],
  R,
  CX,
  CY,
  turkeyD,
  landD,
  graticuleD,
  turkeyBounds: bounds,
  turkeyCentroid: centroidPx.map((v) => Math.round(v * 10) / 10),
  counts: { others: others.length, turkeyBytes: turkeyD.length, landBytes: landD.length },
}
writeFileSync('./out.json', JSON.stringify(out))
console.log('center lon/lat:', out.center.map((v) => v.toFixed(2)))
console.log('turkey bounds:', JSON.stringify(bounds.map((p) => p.map((v) => Math.round(v)))))
console.log('turkey centroid px:', out.turkeyCentroid)
console.log('counts:', out.counts)
