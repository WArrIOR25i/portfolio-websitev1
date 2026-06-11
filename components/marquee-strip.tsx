"use client"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

const ITEMS = [
  "Game Development",
  "Real-Time 3D",
  "Procedural Systems",
  "Shader Authoring",
  "Animation",
  "Tools & Pipelines",
  "Gameplay AI",
  "Lighting & Rendering",
]

/** An infinite horizontal marquee accent band. Pauses under reduced motion. */
export function MarqueeStrip() {
  const reducedMotion = useReducedMotion()
  const row = [...ITEMS, ...ITEMS]

  return (
    <section
      aria-hidden="true"
      className="relative border-y border-white/10 bg-white/[0.015] py-6 overflow-hidden select-none"
    >
      <div className={`flex w-max items-center gap-8 whitespace-nowrap ${reducedMotion ? "" : "animate-marquee"}`}>
        {row.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8 text-2xl sm:text-3xl font-semibold text-foreground/30">
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
          </span>
        ))}
      </div>
    </section>
  )
}
