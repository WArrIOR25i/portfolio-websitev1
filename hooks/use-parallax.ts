"use client"

import { useEffect, useState } from "react"

/**
 * Returns a parallax translateY offset (in px) based on the window scroll
 * position multiplied by `rate`. A rate of 0.3 moves an element at 30% of the
 * scroll speed. Honors reduced-motion by returning 0.
 */
export function useParallax(rate = 0.3, enabled = true) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setOffset(0)
      return
    }

    let frame = 0
    const handleScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setOffset(window.scrollY * rate))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(frame)
    }
  }, [rate, enabled])

  return offset
}
