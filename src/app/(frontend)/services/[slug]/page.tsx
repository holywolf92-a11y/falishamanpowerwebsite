import type { Metadata } from 'next/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { service3dIcon } from '@/utilities/sectionImages'

export const dynamic = 'force-dynamic'

async function getService(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } } as never,
    overrideAccess: false,
    depth: 0,
    limit: 1,
  })
  return res.docs[0] as Record<string, any> | undefined
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()

  return (
    <div className="container py-16 md:py-24">
      <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground">← All services</Link>
      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)] capitalize">
          {service.serviceType}
        </p>
        <div className="mt-2 flex items-center gap-4">
          {service3dIcon(service.title) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={service3dIcon(service.title)}
              alt=""
              aria-hidden
              className="h-16 w-16 object-contain drop-shadow-md"
            />
          )}
          <h1 className="text-4xl font-bold tracking-tight">{service.title}</h1>
        </div>
        {service.summary && <p className="mt-3 text-lg text-muted-foreground">{service.summary}</p>}
      </header>

      {service.content && (
        <div className="prose dark:prose-invert mt-8 max-w-3xl">
          <RichText data={service.content} enableGutter={false} />
        </div>
      )}

      <div className="mt-12 rounded-xl border border-border bg-card p-8">
        <h2 className="text-xl font-semibold">Interested in {service.title}?</h2>
        <p className="mt-2 text-muted-foreground">Talk to our team about your requirements.</p>
        <Button asChild className="mt-4"><Link href="/contact">Get in touch</Link></Button>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return { title: 'Service not found | Falisha Manpower' }
  return {
    title: service.meta?.title || `${service.title} | Falisha Manpower`,
    description: service.meta?.description || service.summary || `${service.title} from Falisha Manpower.`,
  }
}
