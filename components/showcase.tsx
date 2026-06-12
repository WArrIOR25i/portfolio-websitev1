"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { ArrowUpRight, Star } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { AnimatedCube } from "./animated-cube"
import { ProjectModal } from "./project-modal"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import {
  projects,
  CATEGORY_FILTERS,
  DISCIPLINES,
  type CategoryFilter,
  type Project,
} from "@/lib/projects-data"

export default function Showcase({ hideIntro = false }: { hideIntro?: boolean }) {
  const reducedMotion = useReducedMotion()
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All")
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Listen for discipline quick-filters fired from the navigation.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<CategoryFilter>).detail
      if (detail && CATEGORY_FILTERS.includes(detail)) {
        setSelectedCategory(detail)
      }
    }
    window.addEventListener("set-showcase-filter", handler)
    return () => window.removeEventListener("set-showcase-filter", handler)
  }, [])

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory)

  const openModal = useCallback((project: Project) => {
    const index = projects.findIndex((p) => p.id === project.id)
    setSelectedIndex(index)
  }, [])

  return (
    <section
      id="work"
      aria-labelledby="showcase-heading"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-20"
    >
      <div className="max-w-[1400px] mx-auto">
        {!hideIntro && (
          <div className="mb-12 grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold mb-3">Selected Work</p>
                <h2
                  id="showcase-heading"
                  className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gradient"
                >
                  Featured Projects
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  A cross-section of work spanning game development, 3D art, animation, and software tooling.
                  Filter by discipline or explore it all.
                </p>
              </div>
            </ScrollReveal>

            {!reducedMotion && (
              <ScrollReveal delay={150} className="h-64 sm:h-72 md:h-80 lg:h-96">
                <AnimatedCube />
              </ScrollReveal>
            )}
          </div>
        )}

        {/* Filters */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-2.5 mb-12" role="group" aria-label="Filter projects by discipline">
            {CATEGORY_FILTERS.map((category) => {
              const isActive = selectedCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                  className={`px-5 py-2.5 rounded-lg font-medium uppercase tracking-wider text-sm transition-all duration-300 border min-h-[44px] ${
                    isActive
                      ? "bg-gradient-to-r from-gold to-gold-bright text-black border-transparent shadow-lg shadow-gold/25"
                      : "glass text-muted-foreground border-white/10 hover:border-gold/50 hover:text-gold"
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Grid — keyed by category so cards re-mount and stagger in on filter change. */}
        <div
          key={selectedCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project, index) => {
            const discipline = DISCIPLINES[project.category]
            return (
              <article
                key={project.id}
                onClick={() => openModal(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    openModal(project)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
                style={reducedMotion ? undefined : { animationDelay: `${index * 80}ms` }}
                className={`group cursor-pointer sheen glass rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_18px_50px_-12px_rgba(0,0,0,0.7),0_0_28px_-8px_rgba(110,162,255,0.35)] ${
                  reducedMotion ? "" : "opacity-0 animate-fade-up"
                }`}
              >
                {/* Thumbnail (16:9) */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Featured badge */}
                  {project.featured && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm border border-amber-300/40 px-2.5 py-1 text-xs font-semibold text-amber-300">
                      <Star className="w-3 h-3 fill-amber-300" aria-hidden="true" />
                      Featured
                    </span>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Project
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${discipline.badgeClass}`}
                    >
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{project.timeline}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-gold transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-foreground/70 bg-white/5 px-2 py-0.5 rounded border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No projects in this category yet.</p>
        )}
      </div>

      <ProjectModal
        projects={projects}
        index={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={(i) => setSelectedIndex(i)}
      />
    </section>
  )
}
