'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = 'fm-cookie-consent'

type Choice = 'all' | 'essential'

/**
 * Consent-ready cookie banner.
 *
 * The site currently sets only strictly-necessary storage (the Payload admin
 * auth cookie and a theme preference), so nothing here loads a tracker. When
 * analytics/marketing tags are added later, gate them on `hasConsent('all')`
 * and listen for the `fm-consent-change` event so they start only after opt-in.
 */
export function hasConsent(kind: Choice = 'all'): boolean {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    if (!v) return false
    const parsed = JSON.parse(v) as { choice?: Choice }
    return kind === 'essential' ? Boolean(parsed.choice) : parsed.choice === 'all'
  } catch {
    return false
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // Private mode / storage blocked — show the notice once for this view.
      setVisible(true)
    }
  }, [])

  const decide = (choice: Choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, ts: Date.now() }))
      window.dispatchEvent(new CustomEvent('fm-consent-change', { detail: { choice } }))
    } catch {
      // ignore — choice simply won't persist in this browser context
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="container">
        <div className="relative mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-border bg-card/95 p-5 shadow-2xl backdrop-blur md:flex-row md:items-center md:gap-6">
          <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary sm:grid">
            <Cookie className="h-5 w-5" />
          </span>
          <div className="pr-6 text-sm text-muted-foreground">
            <p>
              We use essential cookies to keep this site working and to remember your preferences. We
              don&apos;t use tracking or advertising cookies. See our{' '}
              <Link href="/privacy" className="font-medium text-primary hover:underline">
                Privacy &amp; Cookie Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex shrink-0 gap-2.5">
            <button
              type="button"
              onClick={() => decide('essential')}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => decide('all')}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110"
            >
              Accept
            </button>
          </div>
          <button
            type="button"
            onClick={() => decide('essential')}
            aria-label="Dismiss (essential only)"
            className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
