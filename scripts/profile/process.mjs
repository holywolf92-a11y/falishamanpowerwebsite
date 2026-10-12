// Converts the downloaded company-profile page PNGs to web-optimized WebP in
// public/profile/. Usage: node scripts/profile/process.mjs <source-dir>
// Source images are the Frame-*.png brochure pages from profile.falishamanpower.com,
// downloaded in display order as p01.png … p24.png.
import sharp from 'sharp'
import { readdirSync, mkdirSync, statSync } from 'fs'
import { resolve, join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = process.argv[2]
if (!SRC) throw new Error('pass the source dir as argv[2]')
const OUT = resolve(__dirname, '../../public/profile')
mkdirSync(OUT, { recursive: true })

const files = readdirSync(SRC)
  .filter((f) => /^p\d+\.png$/.test(f))
  .sort()

const meta = []
let total = 0
for (const f of files) {
  const name = f.replace('.png', '.webp')
  const info = await sharp(join(SRC, f))
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(OUT, name))
  total += info.size
  meta.push({ name, w: info.width, h: info.height, kb: Math.round(info.size / 1024) })
}
console.log(JSON.stringify(meta))
console.log('files:', meta.length, 'total:', Math.round(total / 1024) + 'KB')
