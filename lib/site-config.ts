/**
 * Centralized site configuration.
 *
 * Contact details and social URLs are sourced from public environment
 * variables so nothing sensitive is hardcoded in the repository. Every value
 * falls back to a clearly-fake placeholder, so the site still builds and runs
 * without any `.env` file — see `.env.example` for the full list.
 *
 * NOTE: `NEXT_PUBLIC_*` variables are inlined into the client bundle at build
 * time, so only put values here that are safe to expose publicly (a contact
 * email and public profile URLs are fine — never put secrets/tokens here).
 */

const PLACEHOLDER = {
  email: "your.name@example.com",
  linkedin: "https://www.linkedin.com/in/your-handle",
  artstation: "https://www.artstation.com/your-handle",
} as const

export const siteConfig = {
  /** Display name used in nav, footer, and metadata. */
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Rajath K",
  location: process.env.NEXT_PUBLIC_SITE_LOCATION ?? "Bangalore, India",

  /** Primary contact email (placeholder unless overridden via env). */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? PLACEHOLDER.email,

  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? PLACEHOLDER.linkedin,
    artstation: process.env.NEXT_PUBLIC_ARTSTATION_URL ?? PLACEHOLDER.artstation,
  },
} as const

/** Pre-built mailto link with a friendly default subject line. */
export const mailtoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  `Portfolio Inquiry — ${siteConfig.name}`,
)}`

/**
 * Social links rendered in the footer and contact section. `external` links
 * open in a new tab; the mail link uses the mailto: scheme.
 */
export type SocialLink = {
  key: "artstation" | "linkedin" | "email"
  label: string
  href: string
  external: boolean
}

export const socialLinks: SocialLink[] = [
  { key: "artstation", label: "ArtStation", href: siteConfig.social.artstation, external: true },
  { key: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin, external: true },
  { key: "email", label: "Email", href: mailtoHref, external: false },
]
