"use client"

import { Download, Mail, GraduationCap, Award } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { ProgressBar } from "./ui/progress-bar"
import { mailtoHref } from "@/lib/site-config"

const SKILL_GROUPS = [
  {
    heading: "Programming Languages",
    skills: [
      { label: "C# / .NET", value: 88 },
      { label: "C++", value: 82 },
      { label: "Python", value: 85 },
      { label: "JavaScript / TypeScript", value: 78 },
      { label: "GDScript", value: 70 },
    ],
  },
  {
    heading: "Game Engines",
    skills: [
      { label: "Unity", value: 85 },
      { label: "Unreal Engine (Blueprints + C++)", value: 82 },
      { label: "Godot", value: 68 },
    ],
  },
  {
    heading: "Web Development",
    skills: [
      { label: "Next.js", value: 80 },
      { label: "React", value: 80 },
      { label: "Node.js", value: 75 },
    ],
  },
  {
    heading: "Tools, AI & Practices",
    skills: [
      { label: "Ollama / Local LLMs", value: 75 },
      { label: "OpenCV / Computer Vision", value: 78 },
      { label: "Git & Agile", value: 85 },
    ],
  },
]

const EXPERIENCE = [
  {
    title: "Echo — AI Voice Assistant",
    org: "Personal Project · Ollama + Voice Interface",
    date: "2025",
    description:
      "Building a privacy-first local AI voice assistant on Ollama with wake-word detection and passive listening. Wrote core commands for browsing, playing music, and shutting down on voice, all running on-device for real-time, private interaction.",
  },
  {
    title: "VR Horror Game",
    org: "Unreal Engine · Meta Quest 2",
    date: "2024",
    description:
      "Developed an immersive horror VR experience for Meta Quest 2. Handled gameplay logic with Blueprints and optimized performance with C++, refining the experience through extensive playtesting.",
  },
  {
    title: "Boss Rush",
    org: "Unity · Game Jam (3-person team)",
    date: "2024",
    description:
      "Delivered a fast-paced action game under a tight game-jam deadline. Owned the combat mechanics and level design while driving rapid prototyping — a hands-on lesson in teamwork and agile development.",
  },
  {
    title: "Tournament Registration Platform",
    org: "Next.js · React · Node.js",
    date: "2023",
    description:
      "Built a full-stack web app for tournament signups with a responsive, mobile-first UI. Implemented form handling, validation, and data storage on the backend, tested across devices.",
  },
  {
    title: "Hand-Tracking Ping Pong",
    org: "OpenCV · Computer Vision",
    date: "2023",
    description:
      "Made a real-time ping pong game controlled by hand tracking using OpenCV and live camera input, with low-latency input design for responsive paddle movement.",
  },
]

const CORE_STRENGTHS = [
  "Debugging & Problem Solving",
  "Teamwork & Quick Learning",
  "Computer Vision & HCI",
  "Full-Stack & Game Engine Development",
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
                    href="/Rajath_K_Resume.pdf"
                    download="Rajath_K_Resume.pdf"
                    className="sheen flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-bright text-black rounded-lg font-medium hover:shadow-[0_0_26px_rgba(110,162,255,0.4)] transition-shadow w-full justify-center min-h-[48px]"
                  >
                    <Download size={18} aria-hidden="true" />
                    Download CV
                  </a>
                  <a
                    href={mailtoHref}
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
                          <h4 className="font-semibold text-foreground">Bachelor of Computer Applications (BCA)</h4>
                          <p className="text-sm text-gold/80">Specialization: Game Design &amp; Graphics · CGPA 8.2</p>
                          <p className="text-sm text-muted-foreground">Shoolini University, Solan, Himachal Pradesh</p>
                        </div>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">2022 – 2025</span>
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

            {/* Core strengths */}
            <ScrollReveal delay={250}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Core Strengths</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {CORE_STRENGTHS.map((item) => (
                    <li key={item} className="flex items-center gap-3 glass rounded-lg border border-white/10 px-4 py-3">
                      <Award className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                      <span className="text-sm text-muted-foreground">{item}</span>
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
