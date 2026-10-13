import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Linkedin } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const DEPT_LABELS: Record<string, string> = {
  'business-development': 'Business Development',
  recruitment: 'Recruitment',
  processing: 'Processing',
  media: 'Media & Marketing',
  accounts: 'Accounts & Finance',
  management: 'Management',
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('')
}

export default async function TeamPage() {
  const payload = await getPayload({ config: configPromise })
  const team = await payload.find({ collection: 'team', overrideAccess: false, limit: 100, depth: 0, sort: 'order' })

  const byDept = new Map<string, Record<string, any>[]>()
  for (const m of team.docs as Record<string, any>[]) {
    const k = m.department || 'management'
    if (!byDept.has(k)) byDept.set(k, [])
    byDept.get(k)!.push(m)
  }

  return (
    <div>
      {/* Hero banner */}
      <section className="border-b border-border bg-secondary/40 py-16 text-foreground md:py-20">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Our people</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Meet the team</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The specialists behind Falisha Manpower — across business development, recruitment, visa
            processing, media and accounts.
          </p>
        </div>
      </section>

      <div className="container py-16 md:py-20">
        {team.totalDocs === 0 ? (
          <p className="text-muted-foreground">Team members will appear here once added in the admin panel.</p>
        ) : (
          <div className="space-y-14">
            {[...byDept.entries()].map(([dept, members]) => (
              <div key={dept}>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {DEPT_LABELS[dept] || dept}
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {members.map((m) => (
                    <div key={m.id} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                        {initials(m.name)}
                      </div>
                      <h3 className="mt-4 font-semibold">{m.name}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">{m.role}</p>
                      {m.linkedin && (
                        <Link
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                        >
                          <Linkedin className="h-4 w-4" /> LinkedIn
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    alternates: { canonical: '/our-team' },
    title: 'Our Team | Falisha Manpower',
    description: 'Meet the specialists behind Falisha Manpower — recruitment, processing, business development and more.',
  }
}
