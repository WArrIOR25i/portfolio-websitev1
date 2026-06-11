"use client"

import { useEffect, useId, useRef, useState, type ElementType, type ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface WavyTextProps {
  children: ReactNode
  className?: string
  as?: ElementType
  /** Max displacement strength on hover (px). Higher = more liquid wobble. */
  intensity?: number
  /** Base turbulence frequency. Lower = larger, slower waves. */
  frequency?: number
  /** Keep a gentle idle wave even without hover. */
  idle?: boolean
}

/**
 * WavyText — a fluid/liquid distortion on hover (noomoagency-inspired).
 *
 * Uses an inline SVG `feTurbulence` + `feDisplacementMap` filter applied to the
 * element. On pointer enter the displacement scale eases up and the turbulence
 * frequency oscillates, producing a flowing liquid ripple that follows the
 * cursor's energy; on leave it eases back to crisp. Pointer velocity adds extra
 * wobble. Fully disabled under reduced motion (renders plain text).
 */
export function WavyText({
  children,
  className = "",
  as,
  intensity = 18,
  frequency = 0.012,
  idle = false,
}: WavyTextProps) {
  const reducedMotion = useReducedMotion()
  const Tag: ElementType = as ?? "span"
  const rawId = useId().replace(/[:]/g, "")
  const filterId = `wavy-${rawId}`
  const targetRef = useRef<HTMLElement>(null)
  const turbRef = useRef<SVGFETurbulenceElement>(null)
  const dispRef = useRef<SVGFEDisplacementMapElement>(null)
  const [enabled, setEnabled] = useState(false)

  // Only enable the (relatively heavy) filter on fine-pointer devices.
  useEffect(() => {
    if (reducedMotion) return
    setEnabled(window.matchMedia("(pointer: fine)").matches)
  }, [reducedMotion])

  useEffect(() => {
    if (!enabled) return
    const el = targetRef.current
    const disp = dispRef.current
    const turb = turbRef.current
    if (!el || !disp || !turb) return

    let frame = 0
    let scale = idle ? intensity * 0.18 : 0
    let targetScale = idle ? intensity * 0.18 : 0
    let phase = 0
    let lastX = 0
    let lastY = 0
    let velocity = 0
    let hovering = false

    const onEnter = () => {
      hovering = true
      el.style.filter = `url(#${filterId})`
    }
    const onLeave = () => {
      hovering = false
      targetScale = idle ? intensity * 0.18 : 0
    }
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      velocity = Math.min(Math.hypot(dx, dy), 40)
      targetScale = intensity * (0.5 + Math.min(velocity / 40, 1) * 0.5)
    }

    el.addEventListener("pointerenter", onEnter)
    el.addEventListener("pointerleave", onLeave)
    el.addEventListener("pointermove", onMove)

    const tick = () => {
      phase += 0.008
      velocity *= 0.92
      if (hovering) targetScale = intensity * (0.45 + Math.min(velocity / 40, 1) * 0.55)
      scale += (targetScale - scale) * 0.12
      // Oscillate the turbulence frequency for a flowing, liquid feel.
      const fx = frequency + Math.sin(phase) * frequency * 0.5
      const fy = frequency * 1.4 + Math.cos(phase * 0.8) * frequency * 0.5
      turb.setAttribute("baseFrequency", `${fx.toFixed(5)} ${fy.toFixed(5)}`)
      disp.setAttribute("scale", scale.toFixed(2))
      // Detach the filter entirely once it settles to crisp (perf).
      if (!hovering && !idle && scale < 0.05) {
        el.style.filter = ""
      }
      frame = requestAnimationFrame(tick)
    }
    if (idle) el.style.filter = `url(#${filterId})`
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener("pointerenter", onEnter)
      el.removeEventListener("pointerleave", onLeave)
      el.removeEventListener("pointermove", onMove)
      el.style.filter = ""
    }
  }, [enabled, filterId, intensity, frequency, idle])

  return (
    <>
      {enabled && (
        <svg
          aria-hidden="true"
          width="0"
          height="0"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        >
          <defs>
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                ref={turbRef}
                type="fractalNoise"
                baseFrequency={`${frequency} ${frequency * 1.4}`}
                numOctaves={2}
                seed={7}
                result="noise"
              />
              <feDisplacementMap
                ref={dispRef}
                in="SourceGraphic"
                in2="noise"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
      <Tag ref={targetRef as never} className={`wavy-target ${className}`}>
        {children}
      </Tag>
    </>
  )
}
