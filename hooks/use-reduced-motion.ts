"use client"

import { useEffect, useState } from "react"

/**
 * Returns true when the user has requested reduced motion via the OS/browser.
 * Components use this to disable parallax, simplify reveals, and drop
 * decorative animation.
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReduced(query.matches)

    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return prefersReduced
}
