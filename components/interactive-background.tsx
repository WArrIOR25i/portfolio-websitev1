"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

/**
 * InteractiveBackground
 *
 * A fixed, full-viewport Three.js particle field rendered behind all content.
 * It creates a sense of depth and reacts to the visitor:
 *   • Mouse parallax — the camera eases toward the cursor, so the field
 *     shifts with real parallax depth (foreground particles move more).
 *   • Cursor glow — a soft accent glow (GSAP-eased) follows the pointer.
 *   • Scroll parallax — the field drifts vertically as the page scrolls.
 *   • Idle drift — a slow rotation keeps it alive when the pointer is still.
 *
 * Performance & accessibility:
 *   • Disabled entirely under `prefers-reduced-motion` (renders a static
 *     gradient only).
 *   • Particle count + device-pixel-ratio are reduced on small screens.
 *   • The mouse glow only activates for fine pointers (mouse/trackpad).
 *   • The render loop pauses while the tab is hidden.
 *
 * It is purely decorative: `aria-hidden` and `pointer-events: none`.
 */
export function InteractiveBackground() {
  const reducedMotion = useReducedMotion()
  const mountRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    const mount = mountRef.current
    if (!mount) return

    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches

    // ---- Renderer ----
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallScreen ? 1.5 : 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.display = "block"
    mount.appendChild(renderer.domElement)

    // ---- Scene + camera ----
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    camera.position.z = 6

    // ---- Soft circular sprite for round, glowing particles ----
    const makeSprite = () => {
      const size = 64
      const c = document.createElement("canvas")
      c.width = c.height = size
      const ctx = c.getContext("2d")!
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      g.addColorStop(0, "rgba(255,255,255,1)")
      g.addColorStop(0.25, "rgba(255,255,255,0.85)")
      g.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, size, size)
      const tex = new THREE.CanvasTexture(c)
      tex.colorSpace = THREE.SRGBColorSpace
      return tex
    }
    const sprite = makeSprite()

    // ---- Particle field ----
    const COUNT = isSmallScreen ? 480 : 1300
    const SPREAD_X = 16
    const SPREAD_Y = 11
    const SPREAD_Z = 9

    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)

    // Accent palette (cool blues + soft white sparks).
    const palette = [
      new THREE.Color("#6ea2ff"),
      new THREE.Color("#9cc2ff"),
      new THREE.Color("#3f6fd0"),
      new THREE.Color("#dce8ff"),
    ]

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD_X
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z
      // Weight toward blues; occasional white spark.
      const c = palette[Math.random() < 0.18 ? 3 : Math.floor(Math.random() * 3)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: isSmallScreen ? 0.06 : 0.05,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // A second, sparser far layer for extra parallax depth.
    const farCount = isSmallScreen ? 200 : 500
    const farPositions = new Float32Array(farCount * 3)
    for (let i = 0; i < farCount; i++) {
      farPositions[i * 3] = (Math.random() - 0.5) * SPREAD_X * 1.6
      farPositions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y * 1.6
      farPositions[i * 3 + 2] = -SPREAD_Z - Math.random() * 8
    }
    const farGeometry = new THREE.BufferGeometry()
    farGeometry.setAttribute("position", new THREE.BufferAttribute(farPositions, 3))
    const farMaterial = new THREE.PointsMaterial({
      size: 0.03,
      map: sprite,
      color: new THREE.Color("#6ea2ff"),
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const farPoints = new THREE.Points(farGeometry, farMaterial)
    scene.add(farPoints)

    // ---- Pointer + scroll state ----
    const pointer = { x: 0, y: 0 } // normalized -1..1
    const eased = { x: 0, y: 0 }
    let scrollY = window.scrollY

    // GSAP-eased cursor glow (fine pointers only).
    const glow = glowRef.current
    let glowX: ((v: number) => void) | null = null
    let glowY: ((v: number) => void) | null = null
    if (glow && hasFinePointer) {
      gsap.set(glow, { xPercent: -50, yPercent: -50 })
      glowX = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" })
      glowY = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" })
    }

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
      if (glowX && glowY) {
        glowX(e.clientX)
        glowY(e.clientY)
        if (glow) glow.style.opacity = "1"
      }
    }
    const onPointerLeave = () => {
      if (glow) glow.style.opacity = "0"
    }
    const onScroll = () => {
      scrollY = window.scrollY
    }
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    if (hasFinePointer) window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    // ---- Render loop ----
    const clock = new THREE.Clock()
    let frameId = 0
    let running = true

    const tick = () => {
      if (!running) return
      const t = clock.getElapsedTime()

      // Ease camera toward the cursor for parallax depth.
      eased.x += (pointer.x - eased.x) * 0.045
      eased.y += (pointer.y - eased.y) * 0.045
      camera.position.x = eased.x * 1.1
      camera.position.y = eased.y * 0.7 - scrollY * 0.0012
      camera.lookAt(scene.position)

      // Slow idle rotation; cursor adds a gentle tilt.
      points.rotation.y = t * 0.02 + eased.x * 0.12
      points.rotation.x = eased.y * 0.08
      farPoints.rotation.y = t * 0.008 - eased.x * 0.05

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(tick)
    }
    tick()

    // Pause when the tab is hidden to save resources.
    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(frameId)
      } else if (!running) {
        running = true
        clock.getDelta() // discard the long gap
        tick()
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    // ---- Cleanup ----
    return () => {
      running = false
      cancelAnimationFrame(frameId)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibility)
      geometry.dispose()
      material.dispose()
      farGeometry.dispose()
      farMaterial.dispose()
      sprite.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [reducedMotion])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Three.js canvas mounts here. */}
      <div ref={mountRef} className="absolute inset-0" />
      {/* GSAP-eased cursor glow (centered on the pointer via xPercent/yPercent). */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 h-[420px] w-[420px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(110,162,255,0.16) 0%, rgba(110,162,255,0.06) 35%, transparent 70%)",
        }}
      />
    </div>
  )
}
