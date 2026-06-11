"use client"

import type { ReactNode } from "react"

/**
 * App Router `template.tsx` re-mounts on every navigation, so this wrapper
 * gives each route a smooth enter transition. The `page-enter` animation is a
 * no-op under `prefers-reduced-motion` (see globals.css).
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>
}
