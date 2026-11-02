import { getPayload } from 'payload'
import config from '@payload-config'
import { POST_PATCHES, cleanText, type Block } from '@/data/postPatches'

// SEO audit (27 Oct 2026), Issue 2 — update the already-imported blog posts in the
// live DB: rewrite the ten cannibalising "good news" posts into distinct evergreen
// guides, rename a few percent-encoded/emoji slugs, strip stray emoji from titles,
// and fix the old "Falisha Enterprises" trading name. Mirrors the import-posts route:
//   GET /next/patch-posts            -> apply every patch + global text clean
//   GET /next/patch-posts?dry=1      -> report what WOULD change, write nothing
// Idempotent: re-running finds renamed posts by their new slug and re-applies the
// same clean values, so a second run reports zero changes. Gated behind an
// authenticated admin session in production (the logged-in owner runs it).

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

// Recursively clean every text node in a Lexical tree. Returns [newTree, changed].
function cleanLexical(node: unknown): boolean {
  let changed = false
  const walk = (n: any): void => {
    if (!n || typeof n !== 'object') return
    if (typeof n.text === 'string') {
      const cleaned = cleanText(n.text)
      if (cleaned !== n.text) {
        n.text = cleaned
        changed = true
      }
    }
    if (Array.isArray(n.children)) n.children.forEach(walk)
  }
  walk((node as any)?.root ?? node)
  return changed
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const dry = url.searchParams.get('dry') === '1'
  const payload = await getPayload({ config })

  if (process.env.NODE_ENV === 'production') {
    const { user } = await payload.auth({ headers: req.headers })
    if (!user) {
      return Response.json({ error: 'Unauthorized — log in at /admin first.' }, { status: 401 })
    }
  }

  const find = payload.find.bind(payload) as (args: unknown) => Promise<{ docs: any[] }>
  const update = payload.update.bind(payload) as (args: unknown) => Promise<unknown>
  const create = payload.create.bind(payload) as (args: unknown) => Promise<{ id: number | string }>

  // Resolve (and cache) the "Guides" category so rewritten pillars can move off "News".
  const catCache: Record<string, number | string> = {}
  async function catId(name: string): Promise<number | string> {
    if (catCache[name]) return catCache[name]
    const found = await find({ collection: 'categories', where: { title: { equals: name } }, limit: 1, overrideAccess: true })
    let id: number | string | undefined = found.docs?.[0]?.id
    if (!id && !dry) id = (await create({ collection: 'categories', data: { title: name } })).id
    if (id) catCache[name] = id
    return id as number | string
  }

  const patched: string[] = []
  const renamed: { from: string; to: string }[] = []
  const notFound: string[] = []
  const cleaned: string[] = []

  // --- 1. Targeted patches (rewrites + slug renames) ---
  for (const p of POST_PATCHES) {
    // Find by original slug, or by the new slug if a previous run already renamed it.
    let doc = (await find({ collection: 'posts', where: { slug: { equals: p.match } }, limit: 1, overrideAccess: true })).docs?.[0]
    if (!doc && p.slug) {
      doc = (await find({ collection: 'posts', where: { slug: { equals: p.slug } }, limit: 1, overrideAccess: true })).docs?.[0]
    }
    if (!doc) {
      notFound.push(p.match)
      continue
    }

    const data: Record<string, unknown> = {}
    if (p.slug && doc.slug !== p.slug) {
      data.slug = p.slug
      data.slugLock = true
      renamed.push({ from: doc.slug, to: p.slug })
    }
    if (p.title) data.title = p.title
    if (p.blocks) data.content = blocksToLexical(p.blocks)
    if (p.title || p.metaTitle || p.metaDescription) {
      data.meta = {
        ...(doc.meta ?? {}),
        title: p.metaTitle ?? doc.meta?.title,
        description: p.metaDescription ?? doc.meta?.description,
      }
    }
    if (p.category) {
      const id = await catId(p.category)
      if (id) data.categories = [id]
    }

    if (Object.keys(data).length) {
      if (!dry) await update({ collection: 'posts', id: doc.id, data, overrideAccess: true })
      patched.push(p.slug ?? p.match)
    }
  }

  // --- 2. Global text clean across all posts (brand + emoji) ---
  const all = await find({ collection: 'posts', limit: 1000, pagination: false, overrideAccess: true, depth: 0 })
  for (const doc of all.docs) {
    const data: Record<string, unknown> = {}
    const newTitle = cleanText(doc.title ?? '')
    if (newTitle && newTitle !== doc.title) data.title = newTitle

    const metaTitle = cleanText(doc.meta?.title ?? '')
    const metaDesc = cleanText(doc.meta?.description ?? '')
    if ((doc.meta?.title && metaTitle !== doc.meta.title) || (doc.meta?.description && metaDesc !== doc.meta.description)) {
      data.meta = { ...(doc.meta ?? {}), title: metaTitle || doc.meta?.title, description: metaDesc || doc.meta?.description }
    }

    if (doc.content && cleanLexical(doc.content)) data.content = doc.content

    if (Object.keys(data).length) {
      if (!dry) await update({ collection: 'posts', id: doc.id, data, overrideAccess: true })
      cleaned.push(doc.slug)
    }
  }

  return Response.json({
    ok: true,
    dry,
    patchedCount: patched.length,
    renamedCount: renamed.length,
    cleanedCount: cleaned.length,
    notFoundCount: notFound.length,
    patched,
    renamed,
    cleaned,
    notFound,
  })
}
