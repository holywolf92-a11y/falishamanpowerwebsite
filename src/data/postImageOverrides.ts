// Per-slug hero-image overrides for migrated blog posts whose auto-mapped image
// is topically mismatched or carries outdated "Falisha Enterprises" branding.
// (SEO audit, 27 Oct 2026 — Issue 5.) Keyed by post slug → local image path
// under /public. postImageSrc() applies these before the WordPress-URL mapping.
export const POST_IMAGE_OVERRIDES: Record<string, string> = {
  // Was a Kosovo cityscape (2024-01-Kosovo…) on a generic overseas-employment guide.
  'guide-to-overseas-employment-opportunities-and-challenges': '/profile/professionals.webp',
  // Source image has old "Falisha Enterprises" branding burned in.
  'top-skills-in-demand-for-2023-insights-for-job-seekers': '/profile/trades.webp',
}
