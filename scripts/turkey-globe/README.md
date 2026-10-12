# Türkiye globe geometry generator

Generates `src/components/visual/turkeyGlobeGeo.ts` — the pre-projected SVG paths
used by `TurkeyGlobe.tsx` (the homepage "Our speciality market" globe).

It builds a **d3 orthographic (globe) projection centred on Türkiye**, zoomed to a
cap so Türkiye is prominent with its immediate neighbours around it. Türkiye is traced
at 50m detail (crisp, the focus); the dull neighbour landmasses at 110m (small inline
payload). All output paths are already in the component's `0 0 520 520` viewBox space —
no transform needed when rendering.

## Regenerate

These deps are **not** project dependencies (generation-time only). Run from this folder:

```bash
npm init -y
npm i d3-geo@3.1.1 topojson-client@3.1.0
curl -s https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json  -o countries-50m.json
curl -s https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json -o countries-110m.json
node gen.mjs    # writes out.json (+ prints Türkiye bounds/centroid)
node emit.mjs   # writes ../../src/components/visual/turkeyGlobeGeo.ts
```

## Tuning (in `gen.mjs`)

- `SCALE` (> `R`) — how zoomed-in the globe is. Higher = Türkiye bigger, fewer neighbours visible.
- `centerLat` nudge — shifts Türkiye up/down in the frame.
- `R` / `CX` / `CY` — must match the `viewBox` and ocean circle in `TurkeyGlobe.tsx` (520² canvas).

After regenerating, re-check the flag emblem placement (`emScale` / `emCx` / `emCy`) in
`TurkeyGlobe.tsx` against the printed Türkiye bounds, and verify in the browser.
