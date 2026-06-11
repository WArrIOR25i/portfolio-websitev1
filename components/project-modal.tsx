"use client"

import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ExternalLink, Clock, UserCircle } from "lucide-react"
import { useEffect, useRef, useState, useCallback } from "react"
import { DISCIPLINES, type Project } from "@/lib/projects-data"

interface ProjectModalProps {
  projects: Project[]
  /** Index into `projects`, or null when closed. */
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ProjectModal({ projects, index, onClose, onNavigate }: ProjectModalProps) {
  const isOpen = index !== null
  const project = isOpen ? projects[index] : null

  const [mediaIndex, setMediaIndex] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const touchStartX = useRef<number | null>(null)

  // Reset carousel when the project changes.
  useEffect(() => {
    setMediaIndex(0)
  }, [index])

  const nextMedia = useCallback(() => {
    if (!project) return
    setMediaIndex((i) => (i + 1) % project.media.length)
  }, [project])

  const prevMedia = useCallback(() => {
    if (!project) return
    setMediaIndex((i) => (i - 1 + project.media.length) % project.media.length)
  }, [project])

  const goToProject = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return
      const next = (index + dir + projects.length) % projects.length
      onNavigate(next)
    },
    [index, projects.length, onNavigate],
  )

  // Capture the triggering element so focus can return on close.
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement
      document.body.style.overflow = "hidden"
      // Move focus into the modal.
      requestAnimationFrame(() => closeButtonRef.current?.focus())
    } else {
      document.body.style.overflow = ""
      triggerRef.current?.focus?.()
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Keyboard handling: Escape, arrows, focus trap.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowRight") {
        nextMedia()
      } else if (e.key === "ArrowLeft") {
        prevMedia()
      } else if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose, nextMedia, prevMedia])

  if (!isOpen || !project) return null

  const discipline = DISCIPLINES[project.category]
  const currentMedia = project.media[mediaIndex]

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 50) {
      delta < 0 ? nextMedia() : prevMedia()
    }
    touchStartX.current = null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — project details`}
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md animate-crossfade"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative w-full h-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full glass-strong text-foreground hover:text-gold transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Prev / next project (desktop edges) */}
        <button
          onClick={() => goToProject(-1)}
          aria-label="Previous project"
          className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass-strong text-foreground hover:text-gold transition-colors"
        >
          <ChevronLeft className="w-6 h-6" aria-hidden="true" />
        </button>
        <button
          onClick={() => goToProject(1)}
          aria-label="Next project"
          className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass-strong text-foreground hover:text-gold transition-colors"
        >
          <ChevronRight className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* Media side */}
        <div className="relative lg:w-[60%] flex flex-col bg-black/40 lg:h-full">
          <div
            className="relative flex-1 min-h-[40vh] lg:min-h-0"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {currentMedia.type === "image" ? (
              <Image
                key={mediaIndex}
                src={currentMedia.url || "/placeholder.svg"}
                alt={currentMedia.caption || `${project.title} — view ${mediaIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain animate-crossfade"
                priority
              />
            ) : (
              <video
                key={mediaIndex}
                src={currentMedia.url}
                controls
                className="w-full h-full object-contain"
              />
            )}

            {/* Carousel arrows */}
            {project.media.length > 1 && (
              <>
                <button
                  onClick={prevMedia}
                  aria-label="Previous media"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={nextMedia}
                  aria-label="Next media"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </>
            )}

            {currentMedia.caption && (
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/80 bg-black/60 px-3 py-1 rounded-full">
                {currentMedia.caption}
              </p>
            )}
          </div>

          {/* Thumbnail strip */}
          {project.media.length > 1 && (
            <div className="flex gap-2 p-3 overflow-x-auto shrink-0 bg-black/50">
              {project.media.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setMediaIndex(i)}
                  aria-label={`Show media ${i + 1}`}
                  aria-current={i === mediaIndex}
                  className={`relative h-14 w-24 shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                    i === mediaIndex ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={m.url || "/placeholder.svg"} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details side */}
        <div className="lg:w-[40%] lg:h-full lg:overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-6">
          <div className="space-y-3">
            <span
              className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${discipline.badgeClass}`}
            >
              {project.category}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">{project.title}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {project.timeline}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold mb-2">
              <UserCircle className="w-4 h-4" aria-hidden="true" />
              My Role
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.role}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-foreground/80 bg-white/5 px-2.5 py-1 rounded border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gold/40 text-gold text-sm font-medium hover:bg-gold/10 hover:border-gold/70 transition-colors min-h-[44px]"
                >
                  {link.label}
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}

          {/* Mobile prev/next project */}
          <div className="flex lg:hidden items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => goToProject(-1)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold transition-colors min-h-[44px]"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              Previous
            </button>
            <button
              onClick={() => goToProject(1)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold transition-colors min-h-[44px]"
            >
              Next
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
