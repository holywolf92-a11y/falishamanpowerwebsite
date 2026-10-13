// Migrated blog posts hotlink their hero image from the old WordPress site
// (falishamanpower.com/wp-content/uploads/...), which 404s once the domain
// cuts over to this app. We self-host local WebP copies in public/post-images
// and rewrite the URL to point at them (the flattened upload path + .webp).
// Non-WordPress URLs (and empties) pass through unchanged.
export function postImageSrc(url?: string | null): string | undefined {
  if (!url) return undefined
  const m = url.match(/\/wp-content\/uploads\/(.+?)\.(?:jpe?g|png|webp|gif)(?:[?#].*)?$/i)
  if (!m) return url
  return `/post-images/${m[1].replace(/\//g, '-')}.webp`
}
