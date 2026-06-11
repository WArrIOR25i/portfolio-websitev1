import { Linkedin, Mail } from "lucide-react"
import type { ComponentType, SVGProps } from "react"
import { socialLinks, type SocialLink } from "@/lib/site-config"
import { ArtStationIcon } from "./icons/artstation"

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

const ICONS: Record<SocialLink["key"], IconType> = {
  artstation: ArtStationIcon,
  linkedin: Linkedin,
  email: Mail,
}

interface SocialLinksProps {
  className?: string
  /** Size of each icon button in pixels. */
  iconSize?: number
}

/**
 * Renders the ArtStation / LinkedIn / Email links from `lib/site-config`.
 * URLs come from public env vars with placeholder fallbacks, so nothing is
 * hardcoded. External links open in a new tab with safe `rel`.
 */
export function SocialLinks({ className = "", iconSize = 18 }: SocialLinksProps) {
  return (
    <ul className={`flex items-center gap-3 ${className}`} aria-label="Social links">
      {socialLinks.map((link) => {
        const Icon = ICONS[link.key]
        return (
          <li key={link.key}>
            <a
              href={link.href}
              aria-label={link.label}
              title={link.label}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group inline-flex items-center justify-center w-11 h-11 rounded-lg glass border border-white/10 text-muted-foreground transition-all duration-300 hover:text-gold hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-[0_0_22px_-6px_rgba(var(--gold-rgb),0.55)] focus-visible:text-gold"
            >
              <Icon
                size={iconSize}
                className="transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
