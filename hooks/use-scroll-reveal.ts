"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  /** Reveal immediately (used when the user prefers reduced motion). */
  disabled?: boolean
}

/**
 * Lightweight Intersection Observer reveal. Replaces the old `scrollreveal`
 * dependency. When `disabled` is true (reduced motion) the element is marked
 * visible immediately so content never stays hidden.
 */
export function useScrollReveal({
  threshold = 0.12,
  rootMargin = "0px 0px -50px 0px",
  disabled = false,
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
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, disabled])

  return { ref, isVisible }
}
