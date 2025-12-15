"use client"

import { useEffect, useRef, useState } from "react"

export function AnimatedCube() {
  const cubeRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [cubeSize, setCubeSize] = useState(100)

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      if (width < 480) {
        setCubeSize(70)
      } else if (width < 768) {
        setCubeSize(90)
      } else if (width < 1024) {
        setCubeSize(120)
      } else {
        setCubeSize(100)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const rotation = { x: 0, y: 0 }
    const targetRotation = { x: 0, y: 0 }
    let scrollRotation = 0

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isMobile) return
      const rect = containerRef.current.getBoundingClientRect()

      const normalizedX = (e.clientX - rect.left) / rect.width - 0.5
      const normalizedY = (e.clientY - rect.top) / rect.height - 0.5

      targetRotation.x = normalizedY * 45
      targetRotation.y = normalizedX * 45
    }

    const handleScroll = () => {
      scrollRotation = window.scrollY * 0.0315
    }

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    const animate = () => {
      rotation.x += (targetRotation.x - rotation.x) * 0.12
      rotation.y += (targetRotation.y - rotation.y) * 0.12

      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateX(${rotation.x - scrollRotation}deg) rotateY(${rotation.y + scrollRotation * 0.5}deg)`
      }
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationId)
    }
  }, [isMobile])

  const halfSize = cubeSize / 2

  const faceStyle = (rotateX: string, rotateY: string, rotateZ: string, translateZ: number) => ({
    position: "absolute" as const,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    border: "2px solid #00ffff",
    transform: `${rotateX} ${rotateY} ${rotateZ} translateZ(${translateZ}px)`,
    backfaceVisibility: "hidden" as const,
  })

  return (
    <div className="w-full h-full flex items-center justify-center py-4 sm:py-8 md:py-12">
      <div
        ref={containerRef}
        style={{
          perspective: "1200px",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          ref={cubeRef}
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.05s ease-out",
          }}
        >
          {/* Front Face - Cyan */}
          <div
            style={{
              ...faceStyle("rotateX(0deg)", "rotateY(0deg)", "rotateZ(0deg)", halfSize),
              background: "linear-gradient(135deg, #00ffff 0%, #0088ff 50%, #004499 100%)",
              boxShadow: "inset 0 0 30px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.6)",
            }}
          />

          {/* Back Face - Magenta */}
          <div
            style={{
              ...faceStyle("rotateX(0deg)", "rotateY(180deg)", "rotateZ(0deg)", halfSize),
              background: "linear-gradient(135deg, #ff00ff 0%, #ff0088 50%, #990044 100%)",
              boxShadow: "inset 0 0 30px rgba(255, 0, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.6)",
            }}
          />

          {/* Right Face - Cyan */}
          <div
            style={{
              ...faceStyle("rotateX(0deg)", "rotateY(90deg)", "rotateZ(0deg)", halfSize),
              background: "linear-gradient(135deg, #00ffff 0%, #0099ff 50%, #004488 100%)",
              boxShadow: "inset 0 0 30px rgba(0, 255, 255, 0.4), 0 0 30px rgba(0, 255, 255, 0.5)",
            }}
          />

          {/* Left Face - Magenta */}
          <div
            style={{
              ...faceStyle("rotateX(0deg)", "rotateY(-90deg)", "rotateZ(0deg)", halfSize),
              background: "linear-gradient(135deg, #ff00ff 0%, #ff0099 50%, #990055 100%)",
              boxShadow: "inset 0 0 30px rgba(255, 0, 255, 0.4), 0 0 30px rgba(255, 0, 255, 0.5)",
            }}
          />

          {/* Top Face - Cyan */}
          <div
            style={{
              ...faceStyle("rotateX(90deg)", "rotateY(0deg)", "rotateZ(0deg)", halfSize),
              background: "linear-gradient(135deg, #00ffff 0%, #0077dd 50%, #003388 100%)",
              boxShadow: "inset 0 0 30px rgba(0, 255, 255, 0.3), 0 0 25px rgba(0, 255, 255, 0.4)",
            }}
          />

          {/* Bottom Face - Magenta */}
          <div
            style={{
              ...faceStyle("rotateX(-90deg)", "rotateY(0deg)", "rotateZ(0deg)", halfSize),
              background: "linear-gradient(135deg, #ff00ff 0%, #dd0077 50%, #880033 100%)",
              boxShadow: "inset 0 0 30px rgba(255, 0, 255, 0.3), 0 0 25px rgba(255, 0, 255, 0.4)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
