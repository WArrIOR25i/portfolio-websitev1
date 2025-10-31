"use client"

import { Download, ExternalLink, Github } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

export default function Resume() {
  return (
    <section id="resume" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Header & Download */}
          <ScrollReveal>
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight mb-2">CV & Resume</h2>
                  <p className="text-muted-foreground">
                    Download my resume or explore my projects, skills, and education below.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center lg:justify-start"
                  >
                    <Download size={18} />
                    Download PDF
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-6 py-3 border border-border bg-card text-foreground rounded-lg font-medium hover:bg-secondary transition-colors w-full sm:w-auto justify-center lg:justify-start"
                  >
                    <ExternalLink size={18} />
                    LinkedIn Profile
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-6 py-3 border border-border bg-card text-foreground rounded-lg font-medium hover:bg-secondary transition-colors w-full sm:w-auto justify-center lg:justify-start"
                  >
                    <Github size={18} />
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Projects & Skills */}
          <div className="lg:col-span-2 space-y-12">
            {/* Projects */}
            <ScrollReveal delay={100}>
              <div>
                <h3 className="text-2xl font-bold mb-6">Featured Projects</h3>
                <div className="space-y-8">
                  <div className="pb-8 border-b border-border last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <a
                          href="/projects/procedural-dungeon"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer"
                        >
                          Procedural Dungeon Generator
                        </a>
                        <p className="text-muted-foreground">Personal Project</p>
                      </div>
                      <span className="text-sm text-muted-foreground">2024</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Built an advanced dungeon generation system using procedural algorithms in Unity. Features dynamic
                      level layout, enemy placement, and interactive puzzle mechanics.
                    </p>
                  </div>

                  <div className="pb-8 border-b border-border last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <a
                          href="/projects/character-animation"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer"
                        >
                          Character Animation Suite
                        </a>
                        <p className="text-muted-foreground">Personal Project</p>
                      </div>
                      <span className="text-sm text-muted-foreground">2024</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Created a comprehensive character animation set in Blender with 50+ animations. Includes rigging,
                      motion capture integration, and seamless blend states.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <a
                          href="/projects/3d-environment"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer"
                        >
                          3D Environment Pack
                        </a>
                        <p className="text-muted-foreground">Personal Project</p>
                      </div>
                      <span className="text-sm text-muted-foreground">2023</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Designed a modular sci-fi environment with high-quality renders. Optimized for real-time rendering
                      with custom shaders and materials.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Skills */}
            <ScrollReveal delay={200}>
              <div>
                <h3 className="text-2xl font-bold mb-6">Skills & Expertise</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Game Engines", items: "Unity, Unreal Engine, Godot" },
                    { title: "3D Software", items: "Blender, 3ds Max, Substance Painter" },
                    { title: "Programming", items: "C#, C++, Python, JavaScript" },
                    { title: "Animation", items: "Motion Design, Character Rigging, VFX" },
                    { title: "Design", items: "UI/UX, Level Design, Concept Art" },
                    { title: "Tools & Version Control", items: "Git, GitHub, Visual Studio Code" },
                  ].map((skillGroup) => (
                    <div key={skillGroup.title} className="p-4 bg-card rounded-lg border border-border">
                      <h4 className="font-semibold mb-2">{skillGroup.title}</h4>
                      <p className="text-sm text-muted-foreground">{skillGroup.items}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Education */}
            <ScrollReveal delay={300}>
              <div>
                <h3 className="text-2xl font-bold mb-6">Education</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">Bachelor of Computer Applications</h4>
                        <p className="text-sm text-muted-foreground">Game Design & Graphics</p>
                        <p className="text-sm text-muted-foreground">Shoolini University, Himachal Pradesh</p>
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap ml-2">2025</span>
                    </div>
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
