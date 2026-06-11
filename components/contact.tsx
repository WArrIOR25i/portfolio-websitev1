"use client"

import { Mail, MapPin, Clock, ArrowUpRight, Linkedin } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { ArtStationIcon } from "./icons/artstation"
import { siteConfig, mailtoHref } from "@/lib/site-config"

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20"
    >
      {/* Section-specific triangular grid pattern. */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(60deg, transparent 49%, #6ea2ff 49.5%, #6ea2ff 50.5%, transparent 51%), linear-gradient(-60deg, transparent 49%, rgba(255,255,255,0.6) 49.5%, rgba(255,255,255,0.6) 50.5%, transparent 51%)",
          backgroundSize: "44px 76px",
        }}
      />

      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-emerald-300">
              Available for freelance &amp; full-time roles
            </span>
          </div>

          <h2 id="contact-heading" className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gradient">
            Let&apos;s Build Something
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Open to opportunities in game development, 3D art, and software. Whether you have a project in mind
            or just want to talk shop, my inbox is open.
          </p>

          {/* Location + timezone */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-12">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" aria-hidden="true" />
              Bangalore, India
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" aria-hidden="true" />
              IST · UTC+5:30
            </span>
          </div>
        </ScrollReveal>

        {/* Primary email CTA */}
        <ScrollReveal delay={100}>
          <a
            href={mailtoHref}
            className="group sheen hover-lift relative mx-auto flex max-w-md flex-col items-center gap-4 glass rounded-2xl border border-white/10 p-8 sm:p-10 hover:border-gold/50 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8),0_0_36px_-10px_rgba(110,162,255,0.4)]"
          >
            <span className="p-4 rounded-xl bg-gold/10 text-gold group-hover:bg-gold/20 transition-colors">
              <Mail className="w-7 h-7" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Drop me a line
            </span>
            <span className="inline-flex items-center gap-2 text-xl sm:text-2xl font-semibold text-foreground group-hover:text-gold transition-colors break-all">
              {siteConfig.email}
              <ArrowUpRight
                className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </a>
        </ScrollReveal>

        {/* Social links — big tabs to match the email card */}
        <ScrollReveal delay={200}>
          <div className="mt-6 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px w-8 bg-white/15" aria-hidden="true" />
            Or find me on
            <span className="h-px w-8 bg-white/15" aria-hidden="true" />
          </div>
          <div className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href={siteConfig.social.artstation}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ArtStation"
              className="group sheen hover-lift relative flex flex-col items-center gap-3 glass rounded-2xl border border-white/10 p-7 hover:border-gold/50 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8),0_0_36px_-12px_rgba(110,162,255,0.4)]"
            >
              <ArrowUpRight
                className="absolute top-4 right-4 w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="p-4 rounded-xl bg-gold/10 text-gold group-hover:bg-gold/20 transition-colors">
                <ArtStationIcon size={28} aria-hidden="true" />
              </span>
              <span className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">
                ArtStation
              </span>
              <span className="text-sm text-muted-foreground">Renders &amp; 3D art</span>
            </a>

            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group sheen hover-lift relative flex flex-col items-center gap-3 glass rounded-2xl border border-white/10 p-7 hover:border-gold/50 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8),0_0_36px_-12px_rgba(110,162,255,0.4)]"
            >
              <ArrowUpRight
                className="absolute top-4 right-4 w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="p-4 rounded-xl bg-gold/10 text-gold group-hover:bg-gold/20 transition-colors">
                <Linkedin className="w-7 h-7" aria-hidden="true" />
              </span>
              <span className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">
                LinkedIn
              </span>
              <span className="text-sm text-muted-foreground">Let&apos;s connect</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
