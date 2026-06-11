"use client"

import { ScrollReveal } from "./scroll-reveal"
import { Parallax } from "./parallax"
import { WavyText } from "./wavy-text"

const STATS = [
  { value: "4+", label: "Years creating" },
  { value: "20+", label: "Projects shipped" },
  { value: "3", label: "Disciplines" },
]

const PARAGRAPHS = [
  "I'm Rajath — a multi-discipline creative technologist based in Bangalore, India. I live at the intersection of engineering and art, where systems thinking meets visual craft.",
  "My work spans gameplay programming, real-time 3D, animation, and the tooling that ties a production together. I love the moment a mechanic finally feels right, a render finally reads as believable, or a tool quietly removes hours of friction for a team.",
  "I care about details that most people only feel: the weight of a jump, the falloff of a light, the easing on a transition. Good work should feel inevitable.",
]

interface AboutIntroProps {
  /** Show the eyebrow + heading (used on the home page; the /about page already has a PageHeader). */
  withHeading?: boolean
}

export function AboutIntro({ withHeading = false }: AboutIntroProps) {
  return (
    <section id="about" aria-labelledby={withHeading ? "about-heading" : undefined} className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto">
        {withHeading && (
          <div className="mb-12">
            <ScrollReveal direction="left">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold mb-3">About</p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={80}>
              <h2 id="about-heading" className="text-4xl sm:text-6xl font-bold tracking-tight">
                <WavyText as="span" className="inline-block text-gradient" intensity={16}>
                  Who I Am
                </WavyText>
              </h2>
            </ScrollReveal>
          </div>
        )}

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
          <div className="space-y-6">
            {PARAGRAPHS.map((p, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 90}>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{p}</p>
              </ScrollReveal>
            ))}
          </div>

          <Parallax speed={0.12}>
            <ScrollReveal direction="scale">
              <div className="glass rounded-2xl border border-white/10 p-8">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {STATS.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-3xl sm:text-4xl font-bold text-gradient">{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-muted-foreground">Based in</span>
                    <span className="font-medium">Bangalore, India</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-muted-foreground">Focus</span>
                    <span className="font-medium">Games · 3D · Tools</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium text-emerald-300">Available</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Parallax>
        </div>
      </div>
    </section>
  )
}
