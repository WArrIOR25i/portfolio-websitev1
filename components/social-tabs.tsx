import { Linkedin, Mail, ArrowUpRight } from "lucide-react"
import type { ComponentType, SVGProps } from "react"
import { socialLinks, type SocialLink } from "@/lib/site-config"
import { ArtStationIcon } from "./icons/artstation"
import { ScrollReveal } from "./scroll-reveal"

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

/** Per-channel presentation: icon + a short, human sub-line. */
const TAB_META: Record<
  SocialLink["key"],
  { Icon: IconType; sub: string; cta: string }
> = {
  artstation: { Icon: ArtStationIcon, sub: "Renders, 3D art & WIPs", cta: "View portfolio" },
  email: { Icon: Mail, sub: "The fastest way to reach me", cta: "Say hello" },
  linkedin: { Icon: Linkedin, sub: "The professional side of things", cta: "Let's connect" },
}

/** Display order requested for the home page: ArtStation · Email · LinkedIn. */
const TAB_ORDER: SocialLink["key"][] = ["artstation", "email", "linkedin"]

/**
 * Three large, equal-width "tabs" linking out to ArtStation, Email, and
 * LinkedIn. Used on the home page as a friendly, direct way to reach out —
 * complementing the contact page CTA.
 */
export function SocialTabs() {
  const tabs = TAB_ORDER.map((key) => socialLinks.find((l) => l.key === key)).filter(
    (l): l is SocialLink => Boolean(l),
  )

  return (
    <section
      aria-labelledby="connect-heading"
      className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-20"
    >
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold mb-3">Let&apos;s talk</p>
            <h2 id="connect-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Find me around the web
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Pick whichever feels right — I read every message myself, and I always write back.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {tabs.map((link, i) => {
            const { Icon, sub, cta } = TAB_META[link.key]
            return (
              <ScrollReveal key={link.key} direction="up" delay={i * 90}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group sheen hover-lift relative flex h-full flex-col items-center gap-4 glass rounded-2xl border border-white/10 px-6 py-10 text-center transition-all duration-300 hover:border-gold/50 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8),0_0_36px_-12px_rgba(110,162,255,0.45)]"
                >
                  <ArrowUpRight
                    className="absolute top-4 right-4 w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                  <span className="p-5 rounded-2xl bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold/20">
                    <Icon size={32} className="transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  </span>
                  <span className="text-xl font-semibold text-foreground group-hover:text-gold transition-colors">
                    {link.label}
                  </span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{sub}</span>
                  <span className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-gold/80">
                    {cta}
                  </span>
                </a>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
