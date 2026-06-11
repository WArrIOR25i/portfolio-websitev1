"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface ProgressBarProps {
  label: string
  /** Proficiency 0–100. */
  value: number
  /** Stagger delay in ms for the fill animation. */
  delay?: number
}

/**
 * Animated skill bar with a cyan→purple gradient fill. Fills from 0 to `value`
 * over 800ms when scrolled into view. Respects reduced motion (shows final
 * width immediately) and exposes proper ARIA progressbar semantics.
 */
export function ProgressBar({ label, value, delay = 0 }: ProgressBarProps) {
  const reducedMotion = useReducedMotion()
  const { ref, isVisible } = useScrollReveal({ threshold: 0.4, disabled: reducedMotion })
  const filled = reducedMotion || isVisible

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground/90">{label}</span>
        <span className="text-xs text-muted-foreground tabular-nums">{value}%</span>
      </div>
      <div
        className="h-2 w-full rounded-full bg-white/8 overflow-hidden"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} proficiency`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-bright"
          style={{
            width: filled ? `${value}%` : "0%",
            transition: reducedMotion ? "none" : `width 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}
