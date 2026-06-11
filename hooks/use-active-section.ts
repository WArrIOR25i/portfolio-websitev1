"use client"

import { useEffect, useState } from "react"

/**
 * Tracks which section is currently in view. Pass an ordered list of section
 * ids; returns the id of the most prominent one. Used to highlight the active
 * navigation link.
 */
export function useActiveSection(sectionIds: string[], threshold = 0.3) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "")

  useEffect(() => {
    if (typeof window === "undefined") return

    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio)
          } else {
            visible.delete(entry.target.id)
          }
        }

        // Pick the section with the largest visible ratio, preserving the
        // declared order on ties.
        let best = ""
        let bestRatio = 0
        for (const id of sectionIds) {
          const ratio = visible.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (best) setActiveId(best)
      },
      { threshold: [threshold, 0.5, 0.75], rootMargin: "-80px 0px -40% 0px" },
    )

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds, threshold])

  return activeId
}
