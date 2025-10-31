"use client"

import { useEffect, useRef, useState } from "react"

export function useParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const element = ref.current
      const { top, bottom } = element.getBoundingClientRect()
      const elementHeight = bottom - top

      // Calculate parallax offset based on element position in viewport
      const parallaxAmount = (window.innerHeight - top) * 0.15 // Adjust multiplier for intensity

      setOffset(parallaxAmount)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return { ref, offset }
}
