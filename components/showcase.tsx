"use client"

import Image from "next/image"
import { useState } from "react"
import { ScrollReveal } from "./scroll-reveal"
import { AnimatedCube } from "./animated-cube"

interface Project {
  id: string
  title: string
  category: "Games" | "Renders" | "Animations"
  description: string
  image: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: "1",
    title: "Neon Rush",
    category: "Games",
    description: "A high-octane arcade racing game with procedurally generated tracks and dynamic physics.",
    image: "/neon-racing-game-with-vibrant-colors.jpg",
    tags: ["Unreal Engine", "C++", "Physics"],
  },
  {
    id: "2",
    title: "Eternal Monoliths",
    category: "Renders",
    description: "Photorealistic 3D render exploration with complex material interactions and global illumination.",
    image: "/crystalline-geometric-landscape-render.jpg",
    tags: ["Blender", "Lighting", "Modeling"],
  },
  {
    id: "3",
    title: "Fluid Motion",
    category: "Animations",
    description: "Experimental animation exploring fluid dynamics and particle systems in motion.",
    image: "/fluid-motion-animation-particles.jpg",
    tags: ["Cinema 4D", "Dynamics", "Effects"],
  },
  {
    id: "4",
    title: "Cyberpunk Adventure",
    category: "Games",
    description: "Immersive 3D action game featuring advanced AI, real-time lighting, and story-driven gameplay.",
    image: "/cyberpunk-futuristic-game-environment.jpg",
    tags: ["Unity", "C#", "AI"],
  },
  {
    id: "5",
    title: "Secret Sentinel",
    category: "Renders",
    description: "Breathtaking landscape render showcasing advanced environmental techniques and natural lighting.",
    image: "/mountain-landscape-nature-render-sunset.jpg",
    tags: ["Blender", "Compositing", "Lighting"],
  },
  {
    id: "6",
    title: "Kinetic Typography",
    category: "Animations",
    description: "Elegant motion graphics combining typography with abstract geometric animations.",
    image: "/kinetic-typography-animation-design.jpg",
    tags: ["After Effects", "Motion", "Design"],
  },
]

export default function Showcase() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Games" | "Renders" | "Animations">("All")

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="showcase" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Featured Work</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A selection of projects showcasing my expertise in game development, 3D rendering, and animation.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="hidden lg:block h-96">
            <AnimatedCube />
          </ScrollReveal>
        </div>

        {/* Category Filter */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-3 mb-12">
            {(["All", "Games", "Renders", "Animations"] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground scale-105 shadow-lg shadow-primary/50"
                    : "bg-secondary text-secondary-foreground hover:bg-muted hover:scale-110 hover:shadow-md hover:shadow-accent/40"
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
              <a
                href={`/projects/${project.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer block h-full"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 bg-card h-64 sm:h-80">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                <div className="space-y-2">
                  <span className="inline-block text-xs font-medium text-accent px-2 py-1 rounded bg-accent/10">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded border border-cyan-500/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
