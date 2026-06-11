"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  /** Reveal immediately (used when the user prefers reduced motion). */
  disabled?: boolean
  /** Re-hide and re-reveal each time the element enters/leaves the viewport. */
  repeat?: boolean
}

/**
 * Lightweight Intersection Observer reveal. When `disabled` is true (reduced
 * motion) the element is marked visible immediately so content never stays
 * hidden. When `repeat` is true the reveal re-triggers on every entry.
 */
export function useScrollReveal({
  threshold = 0.12,
  rootMargin = "0px 0px -60px 0px",
  disabled = false,
  repeat = false,
}: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (disabled) {
      setIsVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (!repeat) observer.unobserve(entry.target)
        } else if (repeat) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, disabled, repeat])

  return { ref, isVisible }
}
