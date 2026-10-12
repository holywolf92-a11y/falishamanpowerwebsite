# Company profile page assets

The `/profile` page (`src/app/(frontend)/profile/page.tsx`) displays the 24-page
Falisha Manpower company-profile brochure, migrated from
`profile.falishamanpower.com` (a WordPress/Elementor page that showed the brochure
as `Frame-*.png` images). The optimised assets live in `public/profile/`:

- `p01.webp … p24.webp` — the 24 brochure pages, in reading order, WebP (~2.9 MB total)
- `falisha-company-profile.pdf` — the same pages assembled into a downloadable PDF

## Regenerate

1. **Download** the source `Frame-*.png` pages in display order to `p01.png … p24.png`
   (the reading order is NOT numeric — it was read from the live page's DOM/vertical
   order). See the file list in git history or re-derive it from the live page.
2. **WebP** for the page: `node scripts/profile/process.mjs <png-dir>` → `public/profile/pNN.webp`.
3. **PDF** for download: convert the PNGs to JPG first (sharp, width 1200, q80), then
   `node scripts/profile/build-pdf.mjs <jpg-dir> public/profile/falisha-company-profile.pdf`
   (`build-pdf.mjs` needs `pdf-lib`, installed ad-hoc — it is not a project dependency).

`process.mjs` uses `sharp` (already a project dependency). Neither script adds a
runtime dependency; they only produce the static files in `public/profile/`.
