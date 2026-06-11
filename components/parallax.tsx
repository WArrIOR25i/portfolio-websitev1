"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface ParallaxProps {
  children: ReactNode
  className?: string
  /**
   * Parallax strength. Positive moves the layer slower than scroll (drifts
   * down as you scroll up past it); try 0.05–0.35. Negative reverses it.
   */
  speed?: number
  /** Parallax axis. */
  axis?: "y" | "x"
}

/**
 * Viewport-relative parallax (paralleluniverse-inspired): the layer eases
 * based on its distance from the viewport center, so it drifts as it scrolls
 * through view. GPU-composited (transform only) and disabled under reduced
 * motion.
 */
export function Parallax({ children, className = "", speed = 0.15, axis = "y" }: ParallaxProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return

    let frame = 0
    let current = 0
    let target = 0

    const compute = () => {
      const rect = el.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elementCenter = rect.top + rect.height / 2
      // Distance from viewport center, in px, scaled by speed.
      target = (elementCenter - viewportCenter) * -speed
    }

    const render = () => {
      current += (target - current) * 0.1
      const t = axis === "y" ? `translate3d(0, ${current.toFixed(2)}px, 0)` : `translate3d(${current.toFixed(2)}px, 0, 0)`
      el.style.transform = t
      frame = requestAnimationFrame(render)
    }

    const onScroll = () => compute()
    compute()
    frame = requestAnimationFrame(render)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [reducedMotion, speed, axis])

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}
