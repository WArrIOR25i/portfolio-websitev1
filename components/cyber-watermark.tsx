"use client"

import { useEffect, useState } from "react"

export function CyberWatermark() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Circuit grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <defs>
          <pattern id="circuit-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 100 100 M 0 100 L 100 100" stroke="#00ffff" strokeWidth="0.5" fill="none" />
            <circle cx="100" cy="100" r="3" fill="#00ffff" />
            <circle cx="50" cy="50" r="2" fill="#ff00ff" />
            <path d="M 50 0 L 50 50 L 100 50" stroke="#ff00ff" strokeWidth="0.3" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="200%" fill="url(#circuit-grid)" />
      </svg>

      {/* Floating hex codes */}
      <div
        className="absolute top-[10%] left-[5%] text-cyan-500/[0.04] text-xs font-mono"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      >
        0x7F3A9C
      </div>
      <div
        className="absolute top-[25%] right-[8%] text-fuchsia-500/[0.04] text-sm font-mono"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      >
        &lt;RENDER/&gt;
      </div>
      <div
        className="absolute top-[45%] left-[3%] text-cyan-500/[0.03] text-lg font-mono rotate-90"
        style={{ transform: `translateY(${scrollY * -0.12}px) rotate(90deg)` }}
      >
        GAME_DEV
      </div>
      <div
        className="absolute top-[60%] right-[5%] text-fuchsia-500/[0.04] text-xs font-mono"
        style={{ transform: `translateY(${scrollY * -0.18}px)` }}
      >
        ANIMATE.exe
      </div>
      <div
        className="absolute top-[80%] left-[10%] text-cyan-500/[0.03] text-sm font-mono"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        //INIT_SEQUENCE
      </div>

      {/* Tech lines */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-[0.02]"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <line x1="0" y1="20%" x2="30%" y2="20%" stroke="#00ffff" strokeWidth="1" strokeDasharray="10 20" />
        <line x1="70%" y1="40%" x2="100%" y2="40%" stroke="#ff00ff" strokeWidth="1" strokeDasharray="15 25" />
        <line x1="0" y1="70%" x2="25%" y2="70%" stroke="#00ffff" strokeWidth="1" strokeDasharray="8 15" />
        <line x1="80%" y1="85%" x2="100%" y2="85%" stroke="#ff00ff" strokeWidth="1" strokeDasharray="12 18" />
      </svg>

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-500/[0.05]" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-fuchsia-500/[0.05]" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-fuchsia-500/[0.05]" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-500/[0.05]" />

      {/* Binary stream */}
      <div
        className="absolute top-[15%] right-[15%] text-cyan-500/[0.02] text-[10px] font-mono leading-tight"
        style={{ transform: `translateY(${scrollY * -0.08}px)` }}
      >
        01001
        <br />
        10110
        <br />
        01101
      </div>
    </div>
  )
}
