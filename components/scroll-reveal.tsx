"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import type { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Stagger delay in milliseconds. */
  delay?: number
  /** Render as a different element wrapper if needed. */
  as?: "div" | "li" | "section"
}

export function ScrollReveal({ children, className = "", delay = 0, as = "div" }: ScrollRevealProps) {
  const reducedMotion = useReducedMotion()
  const { ref, isVisible } = useScrollReveal({ disabled: reducedMotion })
  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={`reveal-base ${isVisible ? "reveal-in" : ""} ${className}`}
      style={reducedMotion ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
