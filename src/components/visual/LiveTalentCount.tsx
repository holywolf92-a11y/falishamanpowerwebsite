'use client'

// Tiny live reader of the recruitment portal's talent pool size, for hero copy.
// Falls back gracefully to a safe estimate if the API is unreachable.

import React, { useEffect, useState } from 'react'

const API =
  (process.env.NEXT_PUBLIC_PORTAL_API_URL || 'https://glorious-flexibility-production.up.railway.app').replace(
    /\/$/,
    '',
  ) + '/api/talent/professions'

export const LiveTalentCount: React.FC<{ className?: string; fallback?: string }> = ({
  className,
  fallback = '5,000+',
}) => {
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    fetch(API)
      .then((r) => r.json())
      .then((d) => {
        if (active && typeof d?.total === 'number' && d.total > 0) setTotal(d.total)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  return <span className={className}>{total != null ? total.toLocaleString() : fallback}</span>
}

export default LiveTalentCount
