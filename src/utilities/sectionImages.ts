// Curated recruitment imagery (Unsplash, verified). These are fallbacks —
// upload real photos to the Media collection and swap when available.
const IMG = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`

const INDUSTRY_IMAGES: [RegExp, string][] = [
  [/construction/, IMG('1759922378222-47ad736a174d')], // workers in hi-vis + helmets
  [/oil|gas|power|nuclear/, IMG('1678984238170-00e65a997e34')], // refinery
  [/health|pharma|life/, IMG('1584432810601-6c7f27d2362b')], // nurse
  [/information|tech|software/, IMG('1551434678-e076c223a692')], // developers
  [/hospitality|hotel|tourism/, IMG('1580842402762-6f5868c17412')], // hotel staff
  [/engineer|architecture|manufactur/, IMG('1768677903496-becc4be07258')], // site engineers
  [/account|finance|bank/, IMG('1556761175-b413da4baf72')], // office meeting
  [/sales|retail|market/, IMG('1522071820081-009f0129c71c')], // team at laptops
  [/logistic|supply|transport|warehous/, IMG('1553413077-190dd305871c', 900)], // warehouse
  [/\bmep\b|hvac|plumb/, IMG('1621905251189-08b45d6a269e')], // electrician wiring an electrical box
  [/energy|utilit|solar|renewable/, IMG('1508514177221-188b1cf16e9d')], // solar panel field
  [/heavy equipment|crane|excavat|fleet/, IMG('1504307651254-35680f356dfd')], // heavy industrial site crew
  [/automotive|vehicle|\bauto\b/, IMG('1487754180451-c456f719a1fc')], // mechanic servicing an engine
  [/facilit/, IMG('1581578731548-c64695cc6952')], // maintenance / cleaning worker
  [/agricultur|farming|food/, IMG('1625246333195-78d9c38ad449')], // crop seedlings in a field
  [/telecom|\bit\b|network/, IMG('1581094794329-c8112a89af12')], // developer at a workstation
]

export function industryImage(name: string): string {
  const n = (name || '').toLowerCase()
  for (const [re, url] of INDUSTRY_IMAGES) {
    if (re.test(n)) return url
  }
  return IMG('1521737604893-d14cc237f11d') // generic team
}

// Group of Gulf-bound workers — used as the hero's 3D back layer.
export const WORKERS_PHOTO = IMG('1759922378222-47ad736a174d')

// Custom 3D service icons (generated, transparent WebP in /public/icons/services).
const SERVICE_ICONS_3D: [RegExp, string][] = [
  [/bulk|mass/, '/icons/services/bulk.webp'],
  [/permanent/, '/icons/services/permanent.webp'],
  [/executive/, '/icons/services/executive.webp'],
  [/mobility|global/, '/icons/services/mobility.webp'],
  [/visa/, '/icons/services/visa.webp'],
  [/attestation|document/, '/icons/services/attestation.webp'],
  [/payroll/, '/icons/services/payroll.webp'],
  [/\bhr\b|human/, '/icons/services/hr.webp'],
]

// Employer/client logos in /public/logos. c01–c04 are white-on-transparent
// (hero variants) and invisible on white tiles, so the wall uses c05–c28.
// NOTE: sourced from the user's reference — trim to actual Falisha clients before launch.
export const CLIENT_LOGOS: string[] = Array.from({ length: 24 }, (_, i) => `/logos/c${String(i + 5).padStart(2, '0')}.webp`)

export function service3dIcon(name: string): string | undefined {
  const n = (name || '').toLowerCase()
  for (const [re, path] of SERVICE_ICONS_3D) {
    if (re.test(n)) return path
  }
  return undefined
}
