"use client"

import Image from "next/image"
import { useState } from "react"
import { ScrollReveal } from "./scroll-reveal"
import { AnimatedCube } from "./animated-cube"
import { ProjectModal } from "./project-modal"

interface Project {
  id: string
  title: string
  category: "Games" | "Renders" | "Animations"
  description: string
  image: string
  tags: string[]
  media: { type: "image" | "video"; url: string }[]
}

const projects: Project[] = [
  {
    id: "1",
    title: "Neon Rush",
    category: "Games",
    description: "High-octane arcade racer with procedural tracks and dynamic physics.",
    image: "/neon-racing-game-with-vibrant-colors.jpg",
    tags: ["Unreal Engine", "C++", "Physics"],
    media: [
      { type: "image", url: "/neon-racing-game-with-vibrant-colors.jpg" },
      { type: "image", url: "/neon-racing-game-screenshot-1.jpg" },
      { type: "image", url: "/neon-racing-game-screenshot-2.jpg" },
    ],
  },
  {
    id: "2",
    title: "Eternal Monoliths",
    category: "Renders",
    description: "Photorealistic 3D render with complex materials and global illumination.",
    image: "/crystalline-geometric-landscape-render.jpg",
    tags: ["Blender", "Cycles", "Compositing"],
    media: [
      { type: "image", url: "/crystalline-geometric-landscape-render.jpg" },
      { type: "image", url: "/eternal-monoliths-render-angle-1.jpg" },
      { type: "image", url: "/eternal-monoliths-render-angle-2.jpg" },
    ],
  },
  {
    id: "3",
    title: "Fluid Motion",
    category: "Animations",
    description: "Experimental animation exploring fluid dynamics and particle systems.",
    image: "/fluid-motion-animation-particles.jpg",
    tags: ["Blender", "Dynamics", "VFX"],
    media: [
      { type: "image", url: "/fluid-motion-animation-particles.jpg" },
      { type: "image", url: "/fluid-motion-frame-1.jpg" },
    ],
  },
  {
    id: "4",
    title: "Cyberpunk Adventure",
    category: "Games",
    description: "Immersive 3D action game with advanced AI and real-time lighting.",
    image: "/cyberpunk-futuristic-game-environment.jpg",
    tags: ["Unity", "C#", "AI Systems"],
    media: [
      { type: "image", url: "/cyberpunk-futuristic-game-environment.jpg" },
      { type: "image", url: "/cyberpunk-game-screenshot-1.jpg" },
      { type: "image", url: "/cyberpunk-game-screenshot-2.jpg" },
    ],
  },
  {
    id: "5",
    title: "Secret Sentinel",
    category: "Renders",
    description: "Breathtaking landscape render with advanced environmental techniques.",
    image: "/mountain-landscape-nature-render-sunset.jpg",
    tags: ["Blender", "HDRI", "Lighting"],
    media: [
      { type: "image", url: "/mountain-landscape-nature-render-sunset.jpg" },
      { type: "image", url: "/secret-sentinel-render-angle-1.jpg" },
      { type: "image", url: "/secret-sentinel-render-angle-2.jpg" },
    ],
  },
]

export default function Showcase() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Games" | "Renders" | "Animations">("All")
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <section id="showcase" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Work
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Projects showcasing game development, 3D rendering, and animation.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="hidden lg:block h-96">
            <AnimatedCube />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-3 mb-12">
            {(["All", "Games", "Renders", "Animations"] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-lg font-medium uppercase tracking-wider text-sm transition-all duration-300 border ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-transparent scale-105 shadow-lg shadow-cyan-500/30"
                    : "bg-card/50 text-muted-foreground border-border hover:border-cyan-500/50 hover:text-cyan-400 hover:scale-105"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 50}>
              <div onClick={() => openModal(project)} className="group cursor-pointer block h-full">
                <div className="relative overflow-hidden rounded-xl mb-4 bg-card h-64 sm:h-80 border border-border group-hover:border-cyan-500/50 transition-all duration-500">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[12px] border-l-cyan-400 border-y-[8px] border-y-transparent ml-1" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded border border-purple-500/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} project={selectedProject} />
    </section>
  )
}
