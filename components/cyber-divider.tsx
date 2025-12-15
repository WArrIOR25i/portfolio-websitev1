"use client"

interface CyberDividerProps {
  variant?: 1 | 2 | 3 | 4 | 5
  className?: string
}

export function CyberDivider({ variant = 1, className = "" }: CyberDividerProps) {
  const dividers = {
    // Diamond center with angular wings
    1: (
      <svg viewBox="0 0 800 60" className={`w-full h-12 md:h-16 ${className}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="cyberGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Left side */}
        <circle cx="100" cy="30" r="3" fill="#06b6d4" />
        <line x1="103" y1="30" x2="200" y2="30" stroke="url(#cyberGrad1)" strokeWidth="1.5" />
        <path d="M200 30 L230 15 L280 15" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
        <path d="M200 30 L230 45 L280 45" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
        <line x1="280" y1="15" x2="340" y2="15" stroke="#06b6d4" strokeWidth="1.5" />
        <line x1="280" y1="45" x2="340" y2="45" stroke="#06b6d4" strokeWidth="1.5" />
        <path d="M340 15 L360 30 L340 45" stroke="#a855f7" strokeWidth="1.5" fill="none" />

        {/* Center diamond */}
        <path d="M360 30 L400 10 L440 30 L400 50 Z" stroke="#a855f7" strokeWidth="2" fill="none" />
        <path d="M380 30 L400 18 L420 30 L400 42 Z" stroke="#06b6d4" strokeWidth="1.5" fill="rgba(6,182,212,0.1)" />

        {/* Right side (mirrored) */}
        <path d="M460 15 L440 30 L460 45" stroke="#a855f7" strokeWidth="1.5" fill="none" />
        <line x1="460" y1="15" x2="520" y2="15" stroke="#06b6d4" strokeWidth="1.5" />
        <line x1="460" y1="45" x2="520" y2="45" stroke="#06b6d4" strokeWidth="1.5" />
        <path d="M600 30 L570 15 L520 15" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
        <path d="M600 30 L570 45 L520 45" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
        <line x1="600" y1="30" x2="697" y2="30" stroke="url(#cyberGrad1)" strokeWidth="1.5" />
        <circle cx="700" cy="30" r="3" fill="#06b6d4" />
      </svg>
    ),

    // Hexagon center with circuit lines
    2: (
      <svg viewBox="0 0 800 60" className={`w-full h-12 md:h-16 ${className}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="cyberGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Left decorative elements */}
        <circle cx="80" cy="30" r="4" fill="#a855f7" />
        <circle cx="80" cy="30" r="6" stroke="#a855f7" strokeWidth="1" fill="none" opacity="0.5" />
        <line x1="86" y1="30" x2="150" y2="30" stroke="#a855f7" strokeWidth="1.5" />
        <rect
          x="150"
          y="25"
          width="40"
          height="10"
          rx="2"
          stroke="#06b6d4"
          strokeWidth="1.5"
          fill="rgba(6,182,212,0.1)"
        />
        <line x1="190" y1="30" x2="250" y2="30" stroke="#06b6d4" strokeWidth="1.5" />
        <path d="M250 25 L260 30 L250 35" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
        <line x1="260" y1="30" x2="350" y2="30" stroke="url(#cyberGrad2)" strokeWidth="1.5" />

        {/* Center hexagon */}
        <path d="M350 30 L370 15 L430 15 L450 30 L430 45 L370 45 Z" stroke="#06b6d4" strokeWidth="2" fill="none" />
        <path
          d="M370 30 L385 20 L415 20 L430 30 L415 40 L385 40 Z"
          stroke="#a855f7"
          strokeWidth="1.5"
          fill="rgba(168,85,247,0.1)"
        />
        <circle cx="400" cy="30" r="4" fill="#06b6d4" />

        {/* Right side (mirrored) */}
        <line x1="450" y1="30" x2="540" y2="30" stroke="url(#cyberGrad2)" strokeWidth="1.5" />
        <path d="M550 25 L540 30 L550 35" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
        <line x1="550" y1="30" x2="610" y2="30" stroke="#06b6d4" strokeWidth="1.5" />
        <rect
          x="610"
          y="25"
          width="40"
          height="10"
          rx="2"
          stroke="#06b6d4"
          strokeWidth="1.5"
          fill="rgba(6,182,212,0.1)"
        />
        <line x1="650" y1="30" x2="714" y2="30" stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="720" cy="30" r="4" fill="#a855f7" />
        <circle cx="720" cy="30" r="6" stroke="#a855f7" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
    ),

    // Angular zigzag with arrows
    3: (
      <svg viewBox="0 0 800 60" className={`w-full h-12 md:h-16 ${className}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="cyberGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Left side */}
        <circle cx="60" cy="30" r="3" fill="#06b6d4" />
        <line x1="63" y1="30" x2="120" y2="30" stroke="#06b6d4" strokeWidth="1.5" />
        <path d="M120 30 L140 20 L180 20 L200 30 L180 40 L140 40 Z" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
        <line x1="200" y1="30" x2="280" y2="30" stroke="#06b6d4" strokeWidth="1.5" />
        <path d="M280 30 L320 10 L360 30 L320 50 Z" stroke="#a855f7" strokeWidth="1.5" fill="none" />
        <line x1="360" y1="30" x2="380" y2="30" stroke="#a855f7" strokeWidth="2" />

        {/* Center element */}
        <rect x="380" y="20" width="40" height="20" stroke="#a855f7" strokeWidth="2" fill="rgba(168,85,247,0.15)" />
        <line x1="390" y1="25" x2="410" y2="25" stroke="#06b6d4" strokeWidth="1" />
        <line x1="390" y1="30" x2="410" y2="30" stroke="#06b6d4" strokeWidth="1" />
        <line x1="390" y1="35" x2="410" y2="35" stroke="#06b6d4" strokeWidth="1" />

        {/* Right side (mirrored) */}
        <line x1="420" y1="30" x2="440" y2="30" stroke="#a855f7" strokeWidth="2" />
        <path d="M520 30 L480 10 L440 30 L480 50 Z" stroke="#a855f7" strokeWidth="1.5" fill="none" />
        <line x1="520" y1="30" x2="600" y2="30" stroke="#06b6d4" strokeWidth="1.5" />
        <path d="M680 30 L660 20 L620 20 L600 30 L620 40 L660 40 Z" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
        <line x1="680" y1="30" x2="737" y2="30" stroke="#06b6d4" strokeWidth="1.5" />
        <circle cx="740" cy="30" r="3" fill="#06b6d4" />
      </svg>
    ),

    // Double line with nodes
    4: (
      <svg viewBox="0 0 800 60" className={`w-full h-12 md:h-16 ${className}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="cyberGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Top line */}
        <line x1="100" y1="20" x2="350" y2="20" stroke="url(#cyberGrad4)" strokeWidth="1.5" />
        <circle cx="350" cy="20" r="4" fill="#06b6d4" />
        <line x1="354" y1="20" x2="380" y2="20" stroke="#06b6d4" strokeWidth="1.5" />
        <line x1="380" y1="20" x2="400" y2="30" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="400" y1="30" x2="420" y2="20" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="420" y1="20" x2="446" y2="20" stroke="#06b6d4" strokeWidth="1.5" />
        <circle cx="450" cy="20" r="4" fill="#06b6d4" />
        <line x1="454" y1="20" x2="700" y2="20" stroke="url(#cyberGrad4)" strokeWidth="1.5" />

        {/* Center diamond */}
        <circle cx="400" cy="30" r="6" stroke="#a855f7" strokeWidth="2" fill="rgba(168,85,247,0.2)" />

        {/* Bottom line */}
        <line x1="100" y1="40" x2="350" y2="40" stroke="url(#cyberGrad4)" strokeWidth="1.5" />
        <circle cx="350" cy="40" r="4" fill="#a855f7" />
        <line x1="354" y1="40" x2="380" y2="40" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="380" y1="40" x2="400" y2="30" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="400" y1="30" x2="420" y2="40" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="420" y1="40" x2="446" y2="40" stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="450" cy="40" r="4" fill="#a855f7" />
        <line x1="454" y1="40" x2="700" y2="40" stroke="url(#cyberGrad4)" strokeWidth="1.5" />
      </svg>
    ),

    // Triangle corners with center piece
    5: (
      <svg viewBox="0 0 800 60" className={`w-full h-12 md:h-16 ${className}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="cyberGrad5" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Left bracket */}
        <path
          d="M80 15 L100 15 L100 20 L90 20 L90 40 L100 40 L100 45 L80 45"
          stroke="#a855f7"
          strokeWidth="1.5"
          fill="none"
        />
        <line x1="100" y1="30" x2="200" y2="30" stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="200" cy="30" r="3" fill="#a855f7" />
        <line x1="203" y1="30" x2="300" y2="30" stroke="url(#cyberGrad5)" strokeWidth="1.5" />

        {/* Left triangle */}
        <path d="M300 30 L340 15 L340 45 Z" stroke="#06b6d4" strokeWidth="1.5" fill="rgba(6,182,212,0.1)" />
        <line x1="340" y1="15" x2="360" y2="15" stroke="#06b6d4" strokeWidth="1.5" />
        <line x1="340" y1="45" x2="360" y2="45" stroke="#06b6d4" strokeWidth="1.5" />

        {/* Center */}
        <rect x="360" y="15" width="80" height="30" stroke="#06b6d4" strokeWidth="2" fill="none" />
        <line x1="370" y1="22" x2="430" y2="22" stroke="#a855f7" strokeWidth="1" opacity="0.6" />
        <line x1="370" y1="30" x2="430" y2="30" stroke="#a855f7" strokeWidth="1" opacity="0.6" />
        <line x1="370" y1="38" x2="430" y2="38" stroke="#a855f7" strokeWidth="1" opacity="0.6" />

        {/* Right triangle */}
        <line x1="440" y1="15" x2="460" y2="15" stroke="#06b6d4" strokeWidth="1.5" />
        <line x1="440" y1="45" x2="460" y2="45" stroke="#06b6d4" strokeWidth="1.5" />
        <path d="M500 30 L460 15 L460 45 Z" stroke="#06b6d4" strokeWidth="1.5" fill="rgba(6,182,212,0.1)" />

        {/* Right side */}
        <line x1="500" y1="30" x2="597" y2="30" stroke="url(#cyberGrad5)" strokeWidth="1.5" />
        <circle cx="600" cy="30" r="3" fill="#a855f7" />
        <line x1="603" y1="30" x2="700" y2="30" stroke="#a855f7" strokeWidth="1.5" />
        {/* Right bracket */}
        <path
          d="M720 15 L700 15 L700 20 L710 20 L710 40 L700 40 L700 45 L720 45"
          stroke="#a855f7"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
  }

  return dividers[variant]
}
