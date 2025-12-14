"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] eclipse-gradient eclipse-glow" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto text-center fade-in">
        <h1
          className={`text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 transition-all duration-1000 bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          RAJATH K
        </h1>

        <p
          className={`text-xl sm:text-2xl font-medium text-cyan-400 mb-4 transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Game Developer & 3D Artist
        </p>

        <div
          className={`inline-block bg-card/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-2 mb-8 transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-sm text-muted-foreground">21 | Bangalore, India</p>
        </div>

        <p
          className={`text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Recent graduate specializing in game development, 3D modeling, and animation. Creating immersive interactive
          experiences.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <a
            href="#showcase"
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            Explore Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-cyan-500/50 bg-card/50 text-cyan-400 rounded-lg font-medium hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </a>
        </div>

        <div
          className={`flex justify-center transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <ChevronDown className="w-6 h-6 text-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
