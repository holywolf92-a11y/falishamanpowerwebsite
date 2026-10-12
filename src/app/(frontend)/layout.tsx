import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { CookieConsent } from '@/components/visual/CookieConsent'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { organizationSchema } from '@/utilities/orgSchema'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// The shared Header/Footer read live CMS data from Postgres, which is not reachable during
// the container build — render the frontend at runtime rather than prerendering at build.
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <link href="/favicon.png" rel="icon" type="image/png" sizes="32x32" />
        <link href="/icon.png" rel="icon" type="image/png" sizes="512x512" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: 'Falisha Manpower | Overseas Recruitment Agency in Pakistan',
  description:
    'BEOE-licensed overseas recruitment agency in Pakistan (OEP 4035). We place skilled, technical and professional workers across the Gulf, Türkiye and beyond — visa, attestation and mobilisation included.',
  applicationName: 'Falisha Manpower',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
