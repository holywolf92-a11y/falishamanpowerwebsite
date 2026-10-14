import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { canonicalPath } from '@/data/legacyUrlMap'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/og-image.png'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  collection?: 'posts' | 'pages'
}): Promise<Metadata> => {
  const { doc, collection = 'pages' } = args

  const ogImage = getImageURL(doc?.meta?.image)

  // Strip any trailing "|" / "| Falisha Manpower" the imported meta.title may
  // already carry (some old Yoast titles ended in a stray separator) so we never
  // render a double separator like "… | | Falisha Manpower".
  const cleanTitle = (doc?.meta?.title ?? '').replace(/\s*\|\s*(Falisha Manpower\s*)?$/i, '').trim()
  const title = cleanTitle ? `${cleanTitle} | Falisha Manpower` : 'Falisha Manpower'

  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : (doc?.slug ?? '')
  const rawPath =
    collection === 'posts'
      ? `/posts/${slug}`
      : !slug || slug === 'home'
        ? '/'
        : `/${slug}`
  // Preserved old WordPress URLs stay canonical (e.g. a post keeps its original
  // root slug instead of /posts/<slug>). No-op for paths without an old URL.
  const path = canonicalPath(rawPath)

  return {
    description: doc?.meta?.description,
    alternates: { canonical: path },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: path,
    }),
    title,
  }
}
