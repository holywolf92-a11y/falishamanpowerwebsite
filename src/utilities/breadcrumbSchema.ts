import { getServerSideURL } from './getURL'

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const base = getServerSideURL()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${base}${it.path}`,
    })),
  }
}
