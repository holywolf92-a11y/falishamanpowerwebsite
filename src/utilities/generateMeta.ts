import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

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

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Falisha Manpower'
    : 'Falisha Manpower'

  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : (doc?.slug ?? '')
  const path =
    collection === 'posts'
      ? `/posts/${slug}`
      : !slug || slug === 'home'
        ? '/'
        : `/${slug}`

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
