"use client"

import { Download, ExternalLink } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

export default function Resume() {
  return (
    <section id="resume" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <ScrollReveal>
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    CV & Resume
                  </h2>
                  <p className="text-muted-foreground">Download my resume or explore my projects and skills below.</p>
                </div>

                <div className="space-y-3">
                  <a
                    href="/Rajath-Resume.pdf"
                    download
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-all w-full sm:w-auto justify-center lg:justify-start"
                  >
                    <Download size={18} />
                    Download Resume
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-6 py-3 border border-cyan-500/50 bg-card text-cyan-400 rounded-lg font-medium hover:bg-cyan-500/10 transition-colors w-full sm:w-auto justify-center lg:justify-start"
                  >
                    <ExternalLink size={18} />
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Projects */}
            <ScrollReveal delay={100}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Featured Projects</h3>
                <div className="space-y-8">
                  {/* Project 1 */}
                  <div className="pb-8 border-b border-border/50 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-lg font-semibold text-foreground">Procedural Dungeon Generator</span>
                        <p className="text-purple-400 text-sm">Personal Project</p>
                      </div>
                      <span className="text-sm text-muted-foreground">2024</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Developed a procedural dungeon generation system using recursive algorithms in Unity. Implemented
                      dynamic room placement, enemy spawning, and puzzle mechanics.
                    </p>
                  </div>

                  {/* Project 2 */}
                  <div className="pb-8 border-b border-border/50 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-lg font-semibold text-foreground">Character Animation Suite</span>
                        <p className="text-purple-400 text-sm">Personal Project</p>
                      </div>
                      <span className="text-sm text-muted-foreground">2024</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Created a character animation library with 50+ motion sequences in Blender. Applied IK rigging,
                      blend shapes, and state machine controllers.
                    </p>
                  </div>

                  {/* Project 3 */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-lg font-semibold text-foreground">3D Environment Pack</span>
                        <p className="text-purple-400 text-sm">Personal Project</p>
                      </div>
                      <span className="text-sm text-muted-foreground">2023</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Designed a modular sci-fi environment kit with PBR materials optimized for real-time rendering.
                      Created custom shaders and LOD systems.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Skills - Cleaned up */}
            <ScrollReveal delay={200}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Skills & Expertise</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Game Engines", items: "Unity, Unreal Engine, Godot" },
                    { title: "3D Software", items: "Blender, Maya, ZBrush" },
                    { title: "Programming", items: "C#, C++, Blueprints" },
                    { title: "Animation", items: "Rigging, Motion Capture, VFX" },
                    { title: "Design", items: "Level Design, UI/UX, Concept Art" },
                    { title: "Rendering", items: "Cycles, Eevee, Arnold" },
                  ].map((skillGroup) => (
                    <div
                      key={skillGroup.title}
                      className="p-4 bg-card/50 rounded-lg border border-border/50 hover:border-cyan-500/30 transition-colors"
                    >
                      <h4 className="font-semibold mb-2 text-purple-300">{skillGroup.title}</h4>
                      <p className="text-sm text-muted-foreground">{skillGroup.items}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Education */}
            <ScrollReveal delay={300}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Education</h3>
                <div className="p-4 bg-card/50 rounded-lg border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">Bachelor of Computer Applications</h4>
                      <p className="text-sm text-purple-400">Game Design & Graphics</p>
                      <p className="text-sm text-muted-foreground">Shoolini University, Himachal Pradesh</p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap ml-2">2025</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
