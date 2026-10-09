import type { Metadata } from 'next/types'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tilt3D } from '@/components/visual/Tilt3D'
import { ServiceIcon } from '@/components/visual/ServiceIcon'

export const dynamic = 'force-dynamic'

const GROUPS: { key: string; label: string; blurb: string }[] = [
  { key: 'recruitment', label: 'Recruitment', blurb: 'Sourcing and placing the right people, at any scale.' },
  { key: 'advisory', label: 'Advisory & Support', blurb: 'Everything around the hire — visas, attestation, payroll and HR.' },
]

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    overrideAccess: false,
    limit: 100,
    depth: 0,
    sort: 'title',
  })

  return (
    <div className="container py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">What we do</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Our services</h1>
        <p className="mt-3 text-muted-foreground">
          End-to-end recruitment and advisory services for overseas employers and candidates.
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {GROUPS.map((g) => {
          const list = (services.docs as Record<string, any>[]).filter((s) => s.serviceType === g.key)
          if (list.length === 0) return null
          return (
            <div key={g.key}>
              <h2 className="text-2xl font-bold tracking-tight">{g.label}</h2>
              <p className="mt-1 text-muted-foreground">{g.blurb}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {list.map((s) => (
                  <Tilt3D key={s.id} max={6}>
                    <Link href={`/services/${s.slug}`} className="group block h-full">
                      <Card className="h-full transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
                        <CardHeader>
                          <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                            <ServiceIcon name={s.title} className="h-7 w-7" />
                          </div>
                          <CardTitle className="text-lg">{s.title}</CardTitle>
                        </CardHeader>
                        {s.summary && <CardContent className="text-sm text-muted-foreground">{s.summary}</CardContent>}
                      </Card>
                    </Link>
                  </Tilt3D>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Recruitment & Advisory Services | Falisha Manpower',
    description: 'Bulk and executive recruitment, visa processing, attestation, payroll and HR services from Falisha Manpower.',
  }
}
