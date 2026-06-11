import Link from "next/link"
import { Gamepad2, Mail, MapPin } from "lucide-react"
import { siteConfig, mailtoHref } from "@/lib/site-config"
import { SocialLinks } from "./social-links"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-5 h-5 text-gold" aria-hidden="true" />
              <h2 className="font-semibold text-gradient">{siteConfig.name}</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Multi-discipline creative technologist — games, 3D art, animation, and software crafted with
              precision.
            </p>
            <SocialLinks />
          </div>
          <nav aria-label="Footer">
            <h3 className="font-semibold mb-4 text-gold">Navigation</h3>
            <div className="space-y-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-gold transition-colors block w-fit">
                Home
              </Link>
              <Link href="/work" className="text-muted-foreground hover:text-gold transition-colors block w-fit">
                Work
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-gold transition-colors block w-fit">
                About
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-gold transition-colors block w-fit">
                Contact
              </Link>
            </div>
          </nav>
          <div>
            <h3 className="font-semibold mb-4 text-gold">Get in Touch</h3>
            <div className="space-y-2 text-sm">
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors break-all"
              >
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                {siteConfig.email}
              </a>
              <p className="inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                {siteConfig.location}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          <p>© {year} {siteConfig.name} · {siteConfig.location}. All rights reserved.</p>
          <p className="mt-2 text-xs text-muted-foreground/80">
            Designed, built &amp; (over)thought by hand — with a lot of coffee and the occasional 2&nbsp;a.m. idea in {siteConfig.location}.
          </p>
        </div>
      </div>
    </footer>
  )
}
