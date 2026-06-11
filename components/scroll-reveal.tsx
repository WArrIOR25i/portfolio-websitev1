"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import type { ReactNode } from "react"

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "blur"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Stagger delay in milliseconds. */
  delay?: number
  /** Reveal direction / style. Defaults to a subtle upward rise. */
  direction?: RevealDirection
  /** Render as a different element wrapper if needed. */
  as?: "div" | "li" | "section" | "article" | "span"
  /** Re-trigger every time it enters the viewport (default reveals once). */
  repeat?: boolean
}

const DIRECTION_CLASS: Record<RevealDirection, string> = {
  up: "reveal-up",
  down: "reveal-down",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  blur: "reveal-blur",
}

/**
 * Scroll-triggered reveal with directional + blur variants (paralleluniverse
 * style). Honors `prefers-reduced-motion` by rendering content immediately.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as = "div",
  repeat = false,
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion()
  const { ref, isVisible } = useScrollReveal({ disabled: reducedMotion, repeat })
  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={`${DIRECTION_CLASS[direction]} ${isVisible ? "is-revealed" : ""} ${className}`}
      style={reducedMotion ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
