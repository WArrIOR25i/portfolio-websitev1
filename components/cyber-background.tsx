"use client"

import { useEffect, useState } from "react"

export function CyberBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top cyberpunk decorative line */}
      <svg
        className="absolute w-full h-16 opacity-20"
        style={{ top: `${5 + scrollY * 0.02}%` }}
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0,30 L100,30 L120,15 L180,15 L200,30 L300,30 L320,45 L380,45 L400,30 L500,30 L520,15 L550,15 L570,30 L600,30 L620,15 L680,15 L700,30 L800,30 L820,45 L880,45 L900,30 L1000,30 L1020,15 L1080,15 L1100,30 L1200,30"
          stroke="url(#gradient1)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="120" cy="15" r="4" fill="rgba(0,255,255,0.6)" />
        <circle cx="320" cy="45" r="4" fill="rgba(255,0,255,0.6)" />
        <circle cx="520" cy="15" r="4" fill="rgba(0,255,255,0.6)" />
        <circle cx="700" cy="30" r="3" fill="rgba(139,92,246,0.6)" />
        <circle cx="820" cy="45" r="4" fill="rgba(255,0,255,0.6)" />
        <circle cx="1020" cy="15" r="4" fill="rgba(0,255,255,0.6)" />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,255,255,0.3)" />
            <stop offset="50%" stopColor="rgba(255,0,255,0.3)" />
            <stop offset="100%" stopColor="rgba(0,255,255,0.3)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Diamond pattern line */}
      <svg
        className="absolute w-full h-20 opacity-15"
        style={{ top: `${25 + scrollY * 0.015}%` }}
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 L200,40 L220,20 L280,20 L300,40 L500,40"
          stroke="rgba(0,255,255,0.5)"
          strokeWidth="1"
          fill="none"
        />
        <rect
          x="500"
          y="20"
          width="40"
          height="40"
          stroke="rgba(255,0,255,0.5)"
          strokeWidth="1.5"
          fill="none"
          transform="rotate(45 520 40)"
        />
        <path
          d="M540,40 L700,40 L720,60 L780,60 L800,40 L1200,40"
          stroke="rgba(255,0,255,0.5)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="220" cy="20" r="3" fill="rgba(0,255,255,0.6)" />
        <circle cx="720" cy="60" r="3" fill="rgba(255,0,255,0.6)" />
      </svg>

      {/* Hexagon center line */}
      <svg
        className="absolute w-full h-20 opacity-15"
        style={{ top: `${50 + scrollY * 0.01}%` }}
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 L350,40 L370,25 L400,25 L420,40 L480,40"
          stroke="rgba(139,92,246,0.5)"
          strokeWidth="1"
          fill="none"
        />
        <polygon
          points="600,15 640,30 640,50 600,65 560,50 560,30"
          stroke="rgba(0,255,255,0.5)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M720,40 L780,40 L800,55 L830,55 L850,40 L1200,40"
          stroke="rgba(139,92,246,0.5)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="370" cy="25" r="3" fill="rgba(139,92,246,0.6)" />
        <circle cx="800" cy="55" r="3" fill="rgba(139,92,246,0.6)" />
      </svg>

      {/* Angular bottom line */}
      <svg
        className="absolute w-full h-16 opacity-20"
        style={{ top: `${75 + scrollY * 0.005}%` }}
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0,30 L150,30 L180,10 L250,10 L280,30 L400,30 L430,50 L500,50 L530,30 L700,30 L730,10 L800,10 L830,30 L950,30 L980,50 L1050,50 L1080,30 L1200,30"
          stroke="url(#gradient2)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="180" cy="10" r="4" fill="rgba(0,255,255,0.6)" />
        <circle cx="430" cy="50" r="4" fill="rgba(255,0,255,0.6)" />
        <circle cx="730" cy="10" r="4" fill="rgba(0,255,255,0.6)" />
        <circle cx="980" cy="50" r="4" fill="rgba(255,0,255,0.6)" />
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,0,255,0.3)" />
            <stop offset="50%" stopColor="rgba(0,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,0,255,0.3)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Corner brackets - top left */}
      <div
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-500/20"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      />

      {/* Corner brackets - top right */}
      <div
        className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-fuchsia-500/20"
        style={{ transform: `translateY(${scrollY * 0.025}px)` }}
      />

      {/* Corner brackets - bottom left */}
      <div
        className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-fuchsia-500/20"
        style={{ transform: `translateY(${-scrollY * 0.02}px)` }}
      />

      {/* Corner brackets - bottom right */}
      <div
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-500/20"
        style={{ transform: `translateY(${-scrollY * 0.015}px)` }}
      />
    </div>
  )
}
