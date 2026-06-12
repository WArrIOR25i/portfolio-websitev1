"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

/**
 * A premium obsidian-glass cube. Faces are dark translucent panels framed by
 * hairline champagne-gold edges. It idles with a slow auto-rotation and responds
 * smoothly to cursor parallax (desktop), drag (touch), and page scroll — all
 * lerped for a weighty, high-end feel. Disabled under reduced-motion upstream.
 */
export function AnimatedCube() {
  const cubeRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [cubeSize, setCubeSize] = useState(160)

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      if (width < 480) setCubeSize(96)
      else if (width < 768) setCubeSize(118)
      else if (width < 1024) setCubeSize(150)
      else if (width < 1280) setCubeSize(172)
      else setCubeSize(190)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    // Lerped tilt from pointer/touch, continuous idle spin, and scroll offset.
    const tilt = { x: -18, y: -24 }
    const target = { x: -18, y: -24 }
    let autoY = 0
    let scrollRotation = 0
    let pointerActive = false
    let isDragging = false
    let touchStartX = 0
    let touchStartY = 0
    let last = performance.now()

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isMobile) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      // Track cursor across the viewport for a gentle, ever-present parallax.
      const nx = (e.clientX - cx) / window.innerWidth
      const ny = (e.clientY - cy) / window.innerHeight
      target.y = nx * 36
      target.x = -ny * 30
      pointerActive = true
    }

    const handleMouseLeaveWindow = () => {
      pointerActive = false
      target.x = -18
      target.y = -24
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!isMobile || e.touches.length !== 1) return
      isDragging = true
      pointerActive = true
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isMobile || !isDragging || e.touches.length !== 1) return
      const deltaX = e.touches[0].clientX - touchStartX
      const deltaY = e.touches[0].clientY - touchStartY
      target.y = deltaX * 0.4
      target.x = -deltaY * 0.4
    }

    const handleTouchEnd = () => {
      isDragging = false
      pointerActive = false
    }

    const handleScroll = () => {
      scrollRotation = window.scrollY * 0.025
    }

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseleave", handleMouseLeaveWindow)
    } else {
      containerRef.current.addEventListener("touchstart", handleTouchStart, { passive: true })
      containerRef.current.addEventListener("touchmove", handleTouchMove, { passive: true })
      containerRef.current.addEventListener("touchend", handleTouchEnd)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    const animate = (now: number) => {
      const dt = Math.min(now - last, 64)
      last = now

      // Continuous idle spin; slows while the user is actively interacting.
      autoY += dt * (pointerActive ? 0.004 : 0.011)

      // Ease toward the pointer/touch target.
      tilt.x += (target.x - tilt.x) * 0.07
      tilt.y += (target.y - tilt.y) * 0.07

      const rx = tilt.x + Math.sin(now * 0.00035) * 5 - scrollRotation * 0.3
      const ry = autoY + tilt.y + scrollRotation * 0.5

      if (cubeRef.current) {
        cubeRef.current.style.transform = `translateZ(-40px) rotateX(${rx}deg) rotateY(${ry}deg)`
      }
      animationId = requestAnimationFrame(animate)
    }

    let animationId = requestAnimationFrame(animate)

    const container = containerRef.current
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeaveWindow)
      window.removeEventListener("scroll", handleScroll)
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
      cancelAnimationFrame(animationId)
    }
  }, [isMobile])

  const halfSize = cubeSize / 2

  // Shared obsidian-glass face. Each face is a dark translucent panel with a
  // hairline gold frame, an inner vignette, and a faint central gold sheen.
  const faceStyle = (transform: string): CSSProperties => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    transform,
    backfaceVisibility: "hidden",
    background:
      "radial-gradient(120% 120% at 30% 25%, rgba(110,162,255,0.10) 0%, transparent 45%)," +
      "linear-gradient(135deg, rgba(34,34,36,0.62) 0%, rgba(16,16,18,0.78) 55%, rgba(10,10,11,0.82) 100%)",
    border: "1px solid rgba(110,162,255,0.45)",
    boxShadow:
      "inset 0 0 34px rgba(0,0,0,0.65), inset 0 0 1px rgba(156,194,255,0.6), 0 0 22px rgba(0,0,0,0.4)",
    borderRadius: "2px",
  })

  const faces: string[] = [
    `rotateY(0deg) translateZ(${halfSize}px)`,
    `rotateY(180deg) translateZ(${halfSize}px)`,
    `rotateY(90deg) translateZ(${halfSize}px)`,
    `rotateY(-90deg) translateZ(${halfSize}px)`,
    `rotateX(90deg) translateZ(${halfSize}px)`,
    `rotateX(-90deg) translateZ(${halfSize}px)`,
  ]

  return (
    <div className="relative w-full h-full flex items-center justify-center py-4 sm:py-8 md:py-12">
      {/* Ambient gold glow behind the cube. */}
      <div
        aria-hidden="true"
        className="absolute w-2/3 h-2/3 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(110,162,255,0.16) 0%, transparent 70%)" }}
      />
      <div
        ref={containerRef}
        style={{
          perspective: "1000px",
          WebkitPerspective: "1000px",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Keep the 3D scene from being flattened by ancestor transforms
          // (the ScrollReveal wrapper always carries a transform), which is the
          // root cause of the cube appearing flat / invisible on mobile Safari.
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
      >
        <div
          ref={cubeRef}
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            position: "relative",
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            // Initial pose so the element reads as a 3D cube on first paint,
            // even before the rAF loop starts (important on mobile where the
            // loop may start a frame later).
            transform: "translateZ(-40px) rotateX(-18deg) rotateY(-24deg)",
          }}
        >
          {faces.map((transform, i) => (
            <div key={i} style={faceStyle(transform)}>
              {/* Corner ticks for a refined, engineered detail. */}
              <span
                className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l"
                style={{ borderColor: "rgba(156,194,255,0.7)" }}
              />
              <span
                className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r"
                style={{ borderColor: "rgba(156,194,255,0.7)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
