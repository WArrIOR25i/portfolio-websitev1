"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { WavyText } from "./wavy-text"

interface CtaBandProps {
  eyebrow?: string
  title?: string
  body?: string
}

export function CtaBand({
  eyebrow = "Let's collaborate",
  title = "Have a project in mind?",
  body = "Whether it's a game, a 3D scene, or the tooling behind it — I'd love to hear what you're building.",
}: CtaBandProps) {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <ScrollReveal direction="scale">
        <div className="relative max-w-4xl mx-auto text-center glass rounded-3xl border border-white/10 px-6 py-16 sm:px-12 sm:py-20 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[700px] max-w-[140%] h-[500px] eclipse-gradient animate-glow-pulse"
          />
          <p className="relative text-sm font-medium uppercase tracking-[0.2em] text-gold mb-4">{eyebrow}</p>
          <h2 className="relative text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            <WavyText as="span" className="inline-block text-gradient" intensity={18}>
              {title}
            </WavyText>
          </h2>
          <p className="relative text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">{body}</p>
          <Link
            href="/contact"
            className="relative sheen inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-gold to-gold-bright text-black hover:shadow-[0_0_40px_rgba(110,162,255,0.4)] transition-shadow min-h-[52px]"
          >
            Connect
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
