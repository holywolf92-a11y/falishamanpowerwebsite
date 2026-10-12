// Assembles the company-profile JPGs into a single downloadable PDF.
// Usage: node build-pdf.mjs <jpg-dir> <out.pdf>
// Needs `pdf-lib` (not a project dependency — install ad-hoc where you run it).
import { PDFDocument } from 'pdf-lib'
import { readFileSync, writeFileSync, readdirSync } from 'fs'

const JPG = process.argv[2]
const OUT = process.argv[3]
if (!JPG || !OUT) throw new Error('usage: node build-pdf.mjs <jpg-dir> <out.pdf>')

const files = readdirSync(JPG)
  .filter((f) => /^p\d+\.jpg$/.test(f))
  .sort()
const pdf = await PDFDocument.create()
pdf.setTitle('Falisha Manpower — Company Profile')
pdf.setAuthor('Falisha Manpower')
pdf.setSubject('Company Profile')
const PAGE_W = 595 // A4 width in points; each page keeps the image aspect ratio
for (const f of files) {
  const img = await pdf.embedJpg(readFileSync(JPG + '/' + f))
  const h = (img.height * PAGE_W) / img.width
  const page = pdf.addPage([PAGE_W, h])
  page.drawImage(img, { x: 0, y: 0, width: PAGE_W, height: h })
}
const bytes = await pdf.save()
writeFileSync(OUT, bytes)
console.log('wrote', OUT, Math.round(bytes.length / 1024) + 'KB', 'pages:', files.length)
