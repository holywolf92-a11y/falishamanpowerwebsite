import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Falisha Manpower is a BEOE-licensed overseas recruitment agency in Pakistan (OEP 4035) placing skilled, technical and professional workers across the Gulf, Türkiye and beyond — sourcing, visas, attestation and mobilisation, end to end.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Falisha Manpower — Overseas Recruitment Agency in Pakistan',
    },
  ],
  locale: 'en_US',
  siteName: 'Falisha Manpower',
  title: 'Falisha Manpower | Overseas Recruitment Agency in Pakistan',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
