import { POST_IMAGE_OVERRIDES } from '@/data/postImageOverrides'

// Migrated blog posts hotlink their hero image from the old WordPress site
// (falishamanpower.com/wp-content/uploads/...), which 404s once the domain
// cuts over to this app. We self-host local WebP copies in public/post-images
// and rewrite the URL to point at them (the flattened upload path + .webp).
// Non-WordPress URLs (and empties) pass through unchanged.
//
// A post `slug` can be passed to apply a per-slug override (POST_IMAGE_OVERRIDES)
// for images that are topically mismatched or carry outdated branding; the
// override wins over both the URL mapping and an empty URL.
export function postImageSrc(url?: string | null, slug?: string | null): string | undefined {
  if (slug && POST_IMAGE_OVERRIDES[slug]) return POST_IMAGE_OVERRIDES[slug]
  if (!url) return undefined
  const m = url.match(/\/wp-content\/uploads\/(.+?)\.(?:jpe?g|png|webp|gif)(?:[?#].*)?$/i)
  if (!m) return url
  return `/post-images/${m[1].replace(/\//g, '-')}.webp`
}
