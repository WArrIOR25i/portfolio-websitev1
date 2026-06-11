"use client"

import type { ReactNode } from "react"
import { ScrollReveal } from "./scroll-reveal"
import { WavyText } from "./wavy-text"

interface PageHeaderProps {
  eyebrow: string
  title: string
  intro?: string
  children?: ReactNode
}

/** Consistent hero header for interior pages (Work / About / Contact). */
export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <header className="relative px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-10">
      {/* Soft accent glow behind the header. */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] max-w-[120vw] h-[320px] eclipse-gradient eclipse-glow -z-10"
      />
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal direction="up">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold mb-4">{eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={80}>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
            <WavyText as="span" className="inline-block text-gradient-flow" intensity={20} idle>
              {title}
            </WavyText>
          </h1>
        </ScrollReveal>
        {intro && (
          <ScrollReveal direction="up" delay={160}>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">{intro}</p>
          </ScrollReveal>
        )}
        {children}
      </div>
    </header>
  )
}
