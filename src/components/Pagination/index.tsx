'use client'
import { PaginationEllipsis } from '@/components/ui/pagination'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

// Crawlable, server-rendered pagination: real <a href> links (not JS onClick),
// so search engines can follow the blog archive beyond the first page and reach
// every post. Page 1 lives at the clean base URL (/posts) rather than
// /posts/page/1, to avoid a duplicate of the archive index.
export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number
  basePath?: string
}> = ({ className, page, totalPages, basePath = '/posts' }) => {
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1
  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const href = (n: number) => (n <= 1 ? basePath : `${basePath}/page/${n}`)

  const numberClass = (active: boolean) =>
    cn(buttonVariants({ size: 'icon', variant: active ? 'outline' : 'ghost' }))
  const stepClass = cn(buttonVariants({ size: 'default', variant: 'ghost' }), 'gap-1')

  return (
    <nav
      aria-label="pagination"
      role="navigation"
      className={cn('mx-auto my-12 flex w-full justify-center', className)}
    >
      <ul className="flex flex-row items-center gap-1">
        <li>
          {hasPrevPage ? (
            <Link
              href={href(page - 1)}
              rel="prev"
              aria-label="Go to previous page"
              className={cn(stepClass, 'pl-2.5')}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(stepClass, 'pointer-events-none pl-2.5 opacity-50')}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </span>
          )}
        </li>

        {hasExtraPrevPages && (
          <li>
            <PaginationEllipsis />
          </li>
        )}

        {hasPrevPage && (
          <li>
            <Link href={href(page - 1)} className={numberClass(false)}>
              {page - 1}
            </Link>
          </li>
        )}

        <li>
          <Link href={href(page)} aria-current="page" className={numberClass(true)}>
            {page}
          </Link>
        </li>

        {hasNextPage && (
          <li>
            <Link href={href(page + 1)} className={numberClass(false)}>
              {page + 1}
            </Link>
          </li>
        )}

        {hasExtraNextPages && (
          <li>
            <PaginationEllipsis />
          </li>
        )}

        <li>
          {hasNextPage ? (
            <Link
              href={href(page + 1)}
              rel="next"
              aria-label="Go to next page"
              className={cn(stepClass, 'pr-2.5')}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(stepClass, 'pointer-events-none pr-2.5 opacity-50')}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}
