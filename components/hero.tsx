"use client"

import { useRef, useCallback, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Mail, ChevronDown } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { WavyText } from "./wavy-text"

const DISCIPLINE_TAGS = ["Game Developer", "3D Artist", "Animator", "Software Engineer"]

/** A CTA button that subtly drifts toward the cursor (magnetic effect). */
function MagneticLink({
  href,
  variant,
  children,
  enabled,
}: {
  href: string
  variant: "primary" | "secondary"
  children: React.ReactNode
  enabled: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!enabled || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`
    },
    [enabled],
  )

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)"
  }, [])

  const base =
    "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium transition-[transform,box-shadow,background-color,opacity,border-color] duration-300 min-h-[48px] will-change-transform sheen"
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-gold to-gold-bright text-black hover:shadow-[0_0_34px_rgba(110,162,255,0.35)]"
      : "border border-gold/40 glass text-gold hover:bg-gold/10 hover:border-gold/70 hover:shadow-[0_0_24px_rgba(110,162,255,0.18)]"

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${base} ${styles}`}
    >
      {children}
    </Link>
  )
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const eclipseRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<HTMLDivElement>(null)

  // GSAP ScrollTrigger parallax for the hero decorative layers.
  useEffect(() => {
    if (reducedMotion) return
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const scrollTrigger = { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
        if (eclipseRef.current) gsap.to(eclipseRef.current, { yPercent: 28, ease: "none", scrollTrigger })
        if (shapesRef.current) gsap.to(shapesRef.current, { yPercent: 60, ease: "none", scrollTrigger })
      })
    })()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [reducedMotion])

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decorative layers (GSAP scroll parallax). */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div ref={eclipseRef} className="absolute inset-0 will-change-transform">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] max-w-[120vw] h-[520px] eclipse-gradient eclipse-glow" />
        </div>
        <div ref={shapesRef} className="absolute inset-0 will-change-transform">
          <div className="absolute top-[18%] left-[12%] w-24 h-24 border border-gold/20 rotate-45 animate-float" />
          <div className="absolute top-[60%] left-[20%] w-16 h-16 border border-white/10 rounded-full animate-float-slow" />
          <div className="absolute top-[28%] right-[14%] w-20 h-20 border border-gold/15 animate-float-slow" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
          <div className="absolute top-[68%] right-[18%] w-28 h-28 border border-white/10 animate-float" style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }} />
          <div className="absolute top-[44%] left-[6%] w-2 h-2 rounded-full bg-gold/50 animate-float-slow" />
          <div className="absolute top-[24%] right-[40%] w-1.5 h-1.5 rounded-full bg-gold/40 animate-float" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-sm animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="text-emerald-300">Available for work</span>
        </div>

        <h1
          id="hero-heading"
          className={`text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-5 ${reducedMotion ? "" : "animate-rise"}`}
        >
          <WavyText as="span" className="inline-block text-gradient-flow" intensity={22} frequency={0.01} idle>
            RAJATH K
          </WavyText>
        </h1>

        <p className="text-xl sm:text-2xl font-medium text-gold mb-6 animate-fade-up" style={{ animationDelay: "120ms" }}>
          Game Developer · 3D Artist · Software Engineer
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {DISCIPLINE_TAGS.map((tag, i) => (
            <span
              key={tag}
              className="glass rounded-full px-4 py-1.5 text-sm text-foreground/90 animate-fade-up"
              style={{ animationDelay: `${200 + i * 90}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p
          className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          A multi-discipline creative technologist from Bangalore, India — building immersive games,
          photorealistic 3D worlds, and the tools that bring them to life.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up"
          style={{ animationDelay: "720ms" }}
        >
          <MagneticLink href="/work" variant="primary" enabled={!reducedMotion}>
            Explore Work
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </MagneticLink>
          <MagneticLink href="/contact" variant="secondary" enabled={!reducedMotion}>
            <Mail className="w-4 h-4" aria-hidden="true" />
            Get in Touch
          </MagneticLink>
        </div>
      </div>

      {/* Scroll cue */}
      <span
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/50"
      >
        <ChevronDown className={`w-7 h-7 ${reducedMotion ? "" : "animate-bounce"}`} />
      </span>
    </section>
  )
}
