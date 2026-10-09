import { getPayload } from 'payload'
import config from '@payload-config'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

// Dev-only importer for the 170 blog posts migrated from falishamanpower.com.
// Reads scripts/wp-posts.json (produced by scratchpad/fetch_wp_posts.py) and
// creates Posts. Idempotent: skips slugs that already exist.
// GET /next/import-posts         -> import all
// GET /next/import-posts?limit=5 -> import only the first 5 (sample/test)
// GET /next/import-posts?reset=1 -> delete all posts first, then import

type Block = { tag: string; text: string }
type WpPost = {
  slug: string
  title: string
  date: string | null
  image: string
  categories: string[]
  metaTitle: string
  metaDescription: string
  blocks: Block[]
}

function textNode(text: string) {
  return { type: 'text', version: 1, text, detail: 0, format: 0, mode: 'normal', style: '' }
}

function blocksToLexical(blocks: Block[]) {
  const children = blocks.map((b) => {
    if (b.tag === 'h2' || b.tag === 'h3' || b.tag === 'h4') {
      return {
        type: 'heading',
        tag: b.tag,
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr' as const,
        children: [textNode(b.text)],
      }
    }
    return {
      type: 'paragraph',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr' as const,
      textFormat: 0,
      children: [textNode(b.text)],
    }
  })
  return {
    root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr' as const, children },
  }
}

export async function GET(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Import is disabled in production.' }, { status: 403 })
  }

  const url = new URL(req.url)
  const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined
  const reset = url.searchParams.get('reset') === '1'

  let raw: string
  try {
    raw = await readFile(path.join(process.cwd(), 'scripts', 'wp-posts.json'), 'utf-8')
  } catch {
    return Response.json({ error: 'scripts/wp-posts.json not found. Run the fetcher first.' }, { status: 404 })
  }
  let posts = JSON.parse(raw) as WpPost[]
  if (limit) posts = posts.slice(0, limit)

  const payload = await getPayload({ config })
  const create = payload.create.bind(payload) as (args: unknown) => Promise<{ id: number | string }>

  if (reset) {
    try {
      await payload.delete({ collection: 'posts' as never, where: { id: { exists: true } } })
    } catch {
      /* empty */
    }
  }

  // Upsert categories by title.
  const catCache: Record<string, number | string> = {}
  async function catId(name: string): Promise<number | string> {
    if (catCache[name]) return catCache[name]
    const found = await payload.find({
      collection: 'categories',
      where: { title: { equals: name } },
      limit: 1,
      overrideAccess: true,
    })
    let id: number | string | undefined = found.docs?.[0]?.id
    if (!id) {
      const d = await create({ collection: 'categories', data: { title: name } })
      id = d.id
    }
    catCache[name] = id
    return id
  }

  let created = 0
  let skipped = 0
  const errors: { slug: string; error: string }[] = []

  for (const p of posts) {
    try {
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: p.slug } },
        limit: 1,
        overrideAccess: true,
      })
      if (existing.docs?.length) {
        skipped++
        continue
      }

      const categories =
        p.categories && p.categories.length
          ? await Promise.all(p.categories.map((c) => catId(c)))
          : undefined

      await create({
        collection: 'posts',
        data: {
          _status: 'published',
          title: p.title,
          slug: p.slug,
          slugLock: true,
          publishedAt: p.date || undefined,
          externalImage: p.image || undefined,
          content: blocksToLexical(p.blocks),
          ...(categories ? { categories } : {}),
          meta: {
            title: p.metaTitle,
            description: p.metaDescription,
          },
        },
      })
      created++
    } catch (e) {
      errors.push({ slug: p.slug, error: e instanceof Error ? e.message : String(e) })
    }
  }

  return Response.json({
    ok: true,
    total: posts.length,
    created,
    skipped,
    errorCount: errors.length,
    errors: errors.slice(0, 10),
  })
}
