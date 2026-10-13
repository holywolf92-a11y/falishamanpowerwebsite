import type { Post, Media } from '@/payload-types'
import { getServerSideURL } from './getURL'
import { postImageSrc } from './postImageSrc'

// Best-available absolute image URL for a post: uploaded meta image (OG size) →
// hero image → hotlinked externalImage → site OG fallback.
function resolveImage(post: Post, base: string): string | undefined {
  const meta = post.meta?.image
  if (meta && typeof meta === 'object' && 'url' in meta) {
    const m = meta as Media
    const u = m.sizes?.og?.url || m.url
    if (u) return base + u
  }
  const hero = post.heroImage
  if (hero && typeof hero === 'object' && 'url' in hero) {
    const u = (hero as Media).url
    if (u) return base + u
  }
  if (post.externalImage) {
    const local = postImageSrc(post.externalImage)
    if (local) return local.startsWith('http') ? local : base + local
  }
  return `${base}/og-image.png`
}

// BlogPosting (Article) structured data for a blog post, for article rich results.
export function articleSchema(post: Post, path: string) {
  const base = getServerSideURL()
  const names = (post.populatedAuthors ?? [])
    .map((a) => a?.name)
    .filter((n): n is string => Boolean(n))
  const published = post.publishedAt || post.createdAt
  const modified = post.updatedAt || published

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    ...(post.meta?.description ? { description: post.meta.description } : {}),
    image: resolveImage(post, base),
    datePublished: published,
    dateModified: modified,
    author:
      names.length > 0
        ? names.map((name) => ({ '@type': 'Person', name }))
        : { '@type': 'Organization', name: 'Falisha Manpower' },
    publisher: {
      '@type': 'Organization',
      name: 'Falisha Manpower',
      logo: { '@type': 'ImageObject', url: `${base}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${base}${path}` },
  }
}
