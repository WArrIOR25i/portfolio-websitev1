"use client"

import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface MediaItem {
  type: "image" | "video"
  url: string
}

interface Project {
  id: string
  title: string
  category: "Games" | "Renders" | "Animations"
  description: string
  image: string
  tags: string[]
  media: MediaItem[]
}

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0)
    }
  }, [isOpen, project?.id])

  if (!isOpen || !project) return null

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % project.media.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + project.media.length) % project.media.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-card rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-card/95 backdrop-blur-sm border-b border-border">
          <div>
            <h2 className="text-3xl font-bold">{project.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{project.category}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-88px)] p-6">
          <div className="relative mb-6">
            <div className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden bg-background">
              {project.media[currentIndex].type === "image" ? (
                <Image
                  src={project.media[currentIndex].url || "/placeholder.svg"}
                  alt={`${project.title} - ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                />
              ) : (
                <video
                  src={project.media[currentIndex].url}
                  controls
                  className="w-full h-full object-contain"
                  key={currentIndex}
                />
              )}
            </div>

            {project.media.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {project.media.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {project.media.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed text-lg">{project.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-cyan-400 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
