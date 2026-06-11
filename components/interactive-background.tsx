"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

/* ---- Wavy background shader (noomoagency-inspired liquid ripple) ----
 * A full-screen plane drawn behind the particle field. A flowing fbm noise
 * field is rippled by a wave that radiates from (and follows) the cursor,
 * producing a soft liquid distortion across the whole background. */
const WAVE_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const WAVE_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;     // 0..1 (eased, responsive)
  uniform vec2 uRes;
  uniform float uIntensity;
  uniform float uVel;      // eased pointer speed -> drives fluid energy

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.0 + 13.7; a *= 0.5; }
    return v;
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 uv = vUv;
    vec2 ap = vec2(uv.x * aspect, uv.y);
    vec2 am = vec2(uMouse.x * aspect, uMouse.y);
    vec2 toM = ap - am;
    float dist = length(toM);
    vec2 dir = toM / (dist + 1e-4);

    // Constant ripple energy: distortion strength never changes with pointer
    // speed, so there is no brightness pulsing whether idle, slow, or fast.
    float energy = uIntensity * 0.5;

    // Concentric ripple radiating from (and trailing) the cursor.
    float ripple = sin(dist * 24.0 - uTime * 3.2) * exp(-dist * 2.9) * energy;

    // Domain-warped flow field, displaced toward the cursor by the ripple
    // -> the noise "bends" around the pointer, reading as a liquid push.
    vec2 flow = uv * 3.0 + vec2(uTime * 0.05, uTime * 0.035);
    vec2 warp = dir * ripple * 0.6;
    float n1 = fbm(flow + warp);
    float n2 = fbm(flow * 1.9 - warp * 1.3 - uTime * 0.03);
    float n = mix(n1, n2, 0.5);

    // Brighter, more legible palette: deep navy -> mid blue -> azure crests.
    vec3 deep  = vec3(0.018, 0.026, 0.045);
    vec3 mid   = vec3(0.040, 0.090, 0.210);
    vec3 azure = vec3(0.090, 0.190, 0.460);
    vec3 col = mix(deep, mid, smoothstep(0.20, 0.78, n));
    col = mix(col, azure, smoothstep(0.66, 1.0, n) * 0.45);

    // The cursor only distorts the liquid (via the ripple warp above) — it adds
    // no glow or brightness at all, so the field stays a constant, readable
    // brightness whether the pointer is idle, slow, or fast.

    gl_FragColor = vec4(col, 1.0);
  }
`


/**
 * InteractiveBackground
 *
 * A fixed, full-viewport Three.js particle field rendered behind all content.
 * It reacts strongly to the visitor (yutaabe-inspired):
 *   • Cursor force field — particles near the pointer are pushed outward and
 *     swirled, then ease back to their home positions (live buffer updates).
 *   • Mouse parallax — the camera eases toward the cursor for depth.
 *   • Cursor glow — a soft accent glow (GSAP-eased) follows the pointer.
 *   • Scroll parallax — the field drifts vertically as the page scrolls.
 *   • Idle drift — a slow rotation keeps it alive when the pointer is still.
 *
 * Performance & accessibility:
 *   • Disabled entirely under `prefers-reduced-motion` (static gradient only).
 *   • Particle count + device-pixel-ratio reduced on small screens.
 *   • The force field + glow only activate for fine pointers (mouse/trackpad).
 *   • The render loop pauses while the tab is hidden.
 *
 * Purely decorative: `aria-hidden` and `pointer-events: none`.
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
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      })
    } catch (err) {
      // WebGL unavailable (hardware acceleration off, blocklisted GPU, etc.).
      // Leave the CSS gradient fallback in place instead of crashing.
      console.warn(
        "[InteractiveBackground] WebGL could not be initialised; falling back to a static gradient. " +
          "Enable hardware acceleration in your browser to see the liquid background.",
        err,
      )
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallScreen ? 1.5 : 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.display = "block"
    renderer.autoClear = false
    mount.appendChild(renderer.domElement)

    // ---- Scene + camera ----
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 6

    // ---- Wavy background layer (full-screen shader quad) ----
    const bgScene = new THREE.Scene()
    const bgCamera = new THREE.Camera()
    const waveUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uIntensity: { value: hasFinePointer ? 1 : 0.45 },
      uVel: { value: 0 },
    }
    const waveMaterial = new THREE.ShaderMaterial({
      vertexShader: WAVE_VERT,
      fragmentShader: WAVE_FRAG,
      uniforms: waveUniforms,
      depthWrite: false,
      depthTest: false,
    })
    const waveGeometry = new THREE.PlaneGeometry(2, 2)
    const waveQuad = new THREE.Mesh(waveGeometry, waveMaterial)
    waveQuad.frustumCulled = false
    bgScene.add(waveQuad)

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

    // ---- Interactive particle field ----
    const COUNT = isSmallScreen ? 420 : 1100
    const SPREAD_X = 16
    const SPREAD_Y = 11
    const SPREAD_Z = 9

    // home = rest positions; positions = live (displaced) positions.
    const home = new Float32Array(COUNT * 3)
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)

    const palette = [
      new THREE.Color("#6ea2ff"),
      new THREE.Color("#9cc2ff"),
      new THREE.Color("#3f6fd0"),
      new THREE.Color("#dce8ff"),
    ]

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD_X
      const y = (Math.random() - 0.5) * SPREAD_Y
      const z = (Math.random() - 0.5) * SPREAD_Z
      home[i * 3] = x
      home[i * 3 + 1] = y
      home[i * 3 + 2] = z
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      const c = palette[Math.random() < 0.18 ? 3 : Math.floor(Math.random() * 3)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geometry = new THREE.BufferGeometry()
    const positionAttr = new THREE.BufferAttribute(positions, 3)
    positionAttr.setUsage(THREE.DynamicDrawUsage)
    geometry.setAttribute("position", positionAttr)
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

    // Sparser far layer for extra parallax depth.
    const farCount = isSmallScreen ? 180 : 420
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
    let pointerInside = false
    let scrollY = window.scrollY

    // Responsive wave cursor in UV space (0..1) + an eased pointer speed.
    // This drives the liquid ripple directly so it tracks the cursor crisply
    // (the camera `eased` value above is intentionally sluggish for parallax).
    const waveMouse = { x: 0.5, y: 0.5 }
    const waveTarget = { x: 0.5, y: 0.5 }
    let waveVel = 0

    // World-space pointer projected onto the z=0 plane (for the force field).
    const mouseWorld = new THREE.Vector3()
    const rayDir = new THREE.Vector3()
    const updateMouseWorld = () => {
      rayDir.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize()
      const distance = -camera.position.z / rayDir.z
      mouseWorld.copy(camera.position).add(rayDir.multiplyScalar(distance))
    }

    // GSAP-eased cursor glow (fine pointers only).
    const glow = glowRef.current
    let glowX: ((v: number) => void) | null = null
    let glowY: ((v: number) => void) | null = null
    if (glow && hasFinePointer) {
      gsap.set(glow, { xPercent: -50, yPercent: -50 })
      glowX = gsap.quickTo(glow, "x", { duration: 0.5, ease: "power3.out" })
      glowY = gsap.quickTo(glow, "y", { duration: 0.5, ease: "power3.out" })
    }

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
      pointerInside = true
      // UV-space target for the liquid ripple (v increases upward).
      waveTarget.x = e.clientX / window.innerWidth
      waveTarget.y = 1 - e.clientY / window.innerHeight
      if (glowX && glowY) {
        glowX(e.clientX)
        glowY(e.clientY)
        // Opacity is driven by pointer speed in the render loop, so the glow
        // is absent when idle and only appears while the cursor is moving.
      }
    }
    const onPointerLeave = () => {
      pointerInside = false
      if (glow) glow.style.opacity = "0"
    }
    const onScroll = () => {
      scrollY = window.scrollY
    }
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      waveUniforms.uRes.value.set(window.innerWidth, window.innerHeight)
    }

    // Track the pointer for all device types so the liquid ripple follows it
    // (the heavier particle force-field stays gated to fine pointers below).
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    // ---- Render loop ----
    const clock = new THREE.Clock()
    let frameId = 0
    let running = true

    // Force-field tuning.
    const RADIUS = 2.6 // world units of influence
    const RADIUS_SQ = RADIUS * RADIUS
    const FORCE = 0.85 // push strength
    const RETURN = 0.06 // spring back to home
    const SWIRL = 0.35 // tangential swirl

    const tick = () => {
      if (!running) return
      const t = clock.getElapsedTime()

      // Ease camera toward the cursor for parallax depth.
      eased.x += (pointer.x - eased.x) * 0.05
      eased.y += (pointer.y - eased.y) * 0.05
      camera.position.x = eased.x * 1.4
      camera.position.y = eased.y * 0.9 - scrollY * 0.0012
      camera.lookAt(scene.position)

      // Cursor force field — only when the pointer is active (fine pointers).
      if (hasFinePointer && pointerInside) {
        updateMouseWorld()
        const mx = mouseWorld.x
        const my = mouseWorld.y
        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3
          const px = positions[ix]
          const py = positions[ix + 1]
          const dx = px - mx
          const dy = py - my
          const d2 = dx * dx + dy * dy
          if (d2 < RADIUS_SQ && d2 > 0.0001) {
            const d = Math.sqrt(d2)
            const f = (1 - d / RADIUS) * FORCE
            const nx = dx / d
            const ny = dy / d
            // Radial push + tangential swirl.
            positions[ix] += nx * f * 0.5 + -ny * f * SWIRL
            positions[ix + 1] += ny * f * 0.5 + nx * f * SWIRL
          }
          // Spring back home.
          positions[ix] += (home[ix] - positions[ix]) * RETURN
          positions[ix + 1] += (home[ix + 1] - positions[ix + 1]) * RETURN
        }
        positionAttr.needsUpdate = true
      } else {
        // Ease everything home when idle (cheaper: only when displaced).
        let dirty = false
        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3
          const dxh = home[ix] - positions[ix]
          const dyh = home[ix + 1] - positions[ix + 1]
          if (Math.abs(dxh) > 0.001 || Math.abs(dyh) > 0.001) {
            positions[ix] += dxh * RETURN
            positions[ix + 1] += dyh * RETURN
            dirty = true
          }
        }
        if (dirty) positionAttr.needsUpdate = true
      }

      // Slow idle rotation; cursor adds a gentle tilt.
      points.rotation.y = t * 0.02 + eased.x * 0.14
      points.rotation.x = eased.y * 0.1
      farPoints.rotation.y = t * 0.008 - eased.x * 0.05

      // ---- Wavy background: responsive cursor (UV) + movement-driven energy ----
      const pvx = waveMouse.x
      const pvy = waveMouse.y
      waveMouse.x += (waveTarget.x - waveMouse.x) * 0.14
      waveMouse.y += (waveTarget.y - waveMouse.y) * 0.14
      const inst = Math.hypot(waveMouse.x - pvx, waveMouse.y - pvy)
      // Ease the speed so the "wake" surges on movement and decays smoothly.
      waveVel += (inst - waveVel) * 0.12
      waveUniforms.uTime.value = t
      waveUniforms.uMouse.value.set(waveMouse.x, waveMouse.y)
      waveUniforms.uVel.value = waveVel

      renderer.clear()
      renderer.render(bgScene, bgCamera)
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(tick)
    }
    tick()

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(frameId)
      } else if (!running) {
        running = true
        clock.getDelta()
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
      waveGeometry.dispose()
      waveMaterial.dispose()
      sprite.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [reducedMotion])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base gradient — always present. Shows through if WebGL is unavailable
          or while the canvas initialises, so the page is never a flat color. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 50% -10%, rgba(110,162,255,0.10) 0%, transparent 60%), radial-gradient(900px 600px at 80% 110%, rgba(63,111,208,0.08) 0%, transparent 60%), #0a0a0b",
        }}
      />
      <div ref={mountRef} className="absolute inset-0" />
      <div
        ref={glowRef}
        className="absolute top-0 left-0 h-[300px] w-[300px] opacity-0 will-change-transform"
      >
        {/* Inner element carries the breathing scale pulse (--glow-scale),
            kept separate so it never fights GSAP's positioning transform. */}
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(110,162,255,0.16) 0%, rgba(110,162,255,0.05) 38%, transparent 70%)",
            transform: "scale(var(--glow-scale, 1))",
            transformOrigin: "center",
          }}
        />
      </div>
    </div>
  )
}
