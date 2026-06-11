"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { Parallax } from "./parallax"
import { WavyText } from "./wavy-text"
import { projects } from "@/lib/projects-data"

const featured = projects.filter((p) => p.featured).slice(0, 4)

export function FeaturedWork() {
  return (
    <section aria-labelledby="featured-heading" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <ScrollReveal direction="left">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold mb-3">Selected Work</p>
              <h2 id="featured-heading" className="text-4xl sm:text-6xl font-bold tracking-tight">
                <WavyText as="span" className="inline-block text-gradient" intensity={16}>
                  Featured Projects
                </WavyText>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={100}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gold link-underline whitespace-nowrap"
            >
              View all work
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featured.map((project, index) => (
            <ScrollReveal
              key={project.id}
              direction={index % 2 === 0 ? "up" : "scale"}
              delay={(index % 2) * 120}
              as="article"
            >
              <Parallax speed={index % 2 === 0 ? 0.08 : 0.16}>
                <Link
                  href="/work"
                  aria-label={`View ${project.title} in work`}
                  className="group block sheen glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_18px_50px_-12px_rgba(0,0,0,0.7),0_0_28px_-8px_rgba(110,162,255,0.35)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 border border-gold/25 px-2.5 py-1 rounded">
                          {project.category}
                        </span>
                        <span className="text-xs text-white/60">{project.timeline}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white flex items-center gap-2 group-hover:text-gold transition-colors">
                        {project.title}
                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" aria-hidden="true" />
                      </h3>
                      <p className="text-sm text-white/70 mt-1 max-w-md line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </Link>
              </Parallax>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
