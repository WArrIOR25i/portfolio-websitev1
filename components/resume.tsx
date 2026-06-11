"use client"

import { Download, Mail, GraduationCap, Award } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { ProgressBar } from "./ui/progress-bar"

const SKILL_GROUPS = [
  {
    heading: "Game Development",
    skills: [
      { label: "Unity / C#", value: 90 },
      { label: "Unreal Engine / C++", value: 80 },
      { label: "Gameplay & AI Systems", value: 85 },
      { label: "Godot", value: 65 },
    ],
  },
  {
    heading: "3D Art & Animation",
    skills: [
      { label: "Blender (Modelling & Sculpt)", value: 90 },
      { label: "Lighting & Rendering (Cycles/Eevee)", value: 85 },
      { label: "Rigging & Animation", value: 75 },
      { label: "Motion Design (After Effects)", value: 70 },
    ],
  },
  {
    heading: "Programming",
    skills: [
      { label: "C# / C++", value: 85 },
      { label: "Python", value: 75 },
      { label: "JavaScript / TypeScript", value: 70 },
      { label: "Algorithms & Tooling", value: 80 },
    ],
  },
  {
    heading: "Tools & Pipelines",
    skills: [
      { label: "Git / GitHub", value: 85 },
      { label: "Substance Painter", value: 70 },
      { label: "Shader Authoring", value: 72 },
    ],
  },
]

const EXPERIENCE = [
  {
    title: "Procedural Dungeon Generator",
    org: "Personal Project",
    date: "2024",
    description:
      "Built a runtime procedural dungeon system in Unity using recursive room placement. Designed enemy spawning and puzzle mechanics around designer-tunable parameters.",
  },
  {
    title: "Character Animation Suite",
    org: "Personal Project",
    date: "2024",
    description:
      "Authored a library of 50+ motion sequences in Blender with IK rigging and blend shapes. Wired up state-machine controllers for seamless transitions.",
  },
  {
    title: "3D Environment Pack",
    org: "Personal Project",
    date: "2023",
    description:
      "Designed a modular sci-fi environment kit with PBR materials optimized for real-time use. Created custom shaders and LOD systems for performance.",
  },
]

const CERTIFICATIONS = [
  "Unity Certified Associate: Game Developer (in progress)",
  "Blender Foundation — Creator Fundamentals",
]

export default function Resume() {
  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-20"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sticky sidebar */}
          <ScrollReveal>
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold mb-3">Background</p>
                  <h2 id="resume-heading" className="text-4xl font-bold tracking-tight mb-3 text-gradient">
                    Resume & Skills
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A snapshot of capabilities across disciplines. Download the full CV or explore the
                    breakdown below.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href="/api/generate-cv"
                    download
                    className="sheen flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-bright text-black rounded-lg font-medium hover:shadow-[0_0_26px_rgba(110,162,255,0.4)] transition-shadow w-full justify-center min-h-[48px]"
                  >
                    <Download size={18} aria-hidden="true" />
                    Download CV
                  </a>
                  <a
                    href="mailto:hello@rajath.dev?subject=Portfolio%20Inquiry%20%E2%80%94%20Rajath%20K"
                    className="flex items-center gap-2 px-6 py-3 border border-gold/40 glass text-gold rounded-lg font-medium hover:bg-gold/10 hover:border-gold/70 transition-colors w-full justify-center min-h-[48px]"
                  >
                    <Mail size={18} aria-hidden="true" />
                    Email Me
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <div className="lg:col-span-2 space-y-14">
            {/* Skills */}
            <ScrollReveal delay={100}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Skills by Discipline</h3>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
                  {SKILL_GROUPS.map((group) => (
                    <div key={group.heading}>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-gold mb-4">
                        {group.heading}
                      </h4>
                      <div className="space-y-4">
                        {group.skills.map((skill, i) => (
                          <ProgressBar key={skill.label} label={skill.label} value={skill.value} delay={i * 100} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Experience timeline */}
            <ScrollReveal delay={150}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Featured Projects</h3>
                <ol className="relative border-l border-white/15 ml-2 space-y-8">
                  {EXPERIENCE.map((item) => (
                    <li key={item.title} className="pl-6">
                      <span
                        className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full bg-gradient-to-r from-gold to-gold-bright ring-4 ring-[#0a0a0b]"
                        aria-hidden="true"
                      />
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <p className="text-sm text-gold/80">{item.org}</p>
                        </div>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">{item.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>

            {/* Education */}
            <ScrollReveal delay={200}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Education</h3>
                <div className="group glass rounded-xl border border-white/10 p-5 hover:border-gold/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 mt-1 p-2 rounded-lg bg-gold/10 text-gold">
                      <GraduationCap className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-semibold text-foreground">Bachelor of Computer Applications</h4>
                          <p className="text-sm text-gold/80">Game Design &amp; Graphics</p>
                          <p className="text-sm text-muted-foreground">Shoolini University, Himachal Pradesh</p>
                        </div>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">2025</span>
                      </div>
                      {/* Coursework revealed on hover/focus */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                        <div className="overflow-hidden">
                          <p className="text-sm text-muted-foreground pt-3 leading-relaxed">
                            Relevant coursework: Game Engine Architecture, 3D Modelling & Animation, Real-Time
                            Rendering, Data Structures & Algorithms, and Human-Computer Interaction.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Certifications */}
            <ScrollReveal delay={250}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Certifications</h3>
                <ul className="space-y-3">
                  {CERTIFICATIONS.map((cert) => (
                    <li key={cert} className="flex items-center gap-3 glass rounded-lg border border-white/10 px-4 py-3">
                      <Award className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                      <span className="text-sm text-muted-foreground">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
