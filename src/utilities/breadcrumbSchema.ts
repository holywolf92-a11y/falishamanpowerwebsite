import { getServerSideURL } from './getURL'
import { canonicalPath } from '@/data/legacyUrlMap'

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const base = getServerSideURL()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      // Use the preserved old URL for any leaf page that has one (no-op otherwise).
      item: `${base}${canonicalPath(it.path)}`,
    })),
  }
}
