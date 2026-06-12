// Centralized project data. Replace placeholder content with real projects
// by editing the array below — no component changes required.

export type Discipline = "Games" | "3D Art" | "Animation" | "Software"

export interface ProjectLink {
  label: string
  url: string
}

export interface ProjectMedia {
  type: "image" | "video"
  url: string
  caption?: string
}

export interface Project {
  id: string
  title: string
  category: Discipline
  featured: boolean
  /** One-line summary shown on the card. */
  description: string
  /** Full narrative shown in the detail view. */
  fullDescription: string
  /** The owner's specific contribution to the project. */
  role: string
  /** Human-readable timeline, e.g. "2024 · 3 months". */
  timeline: string
  /** Card thumbnail (16:9 recommended). */
  image: string
  /** Up to ~6 technologies; cards show the first 3. */
  tags: string[]
  links: ProjectLink[]
  media: ProjectMedia[]
}

/**
 * Discipline metadata drives the color-coded badges and filters across the
 * site. Keep the keys in sync with the `Discipline` union above.
 */
export const DISCIPLINES: Record<
  Discipline,
  { label: string; accent: string; badgeClass: string; dotClass: string }
> = {
  Games: {
    label: "Games",
    accent: "#6ea2ff",
    badgeClass: "text-gold bg-gold/10 border-gold/25",
    dotClass: "bg-gold",
  },
  "3D Art": {
    label: "3D Art",
    accent: "#6ea2ff",
    badgeClass: "text-gold bg-gold/10 border-gold/25",
    dotClass: "bg-gold",
  },
  Animation: {
    label: "Animation",
    accent: "#6ea2ff",
    badgeClass: "text-gold bg-gold/10 border-gold/25",
    dotClass: "bg-gold",
  },
  Software: {
    label: "Software",
    accent: "#6ea2ff",
    badgeClass: "text-gold bg-gold/10 border-gold/25",
    dotClass: "bg-gold",
  },
}

// Only disciplines with real projects are surfaced as filters. The DISCIPLINES
// map above still defines all four for badge styling, but the resume currently
// covers Games and Software work.
export const CATEGORY_FILTERS = ["All", "Games", "Software"] as const
export type CategoryFilter = (typeof CATEGORY_FILTERS)[number]

// Real projects sourced from Rajath K's resume.
// NOTE: Thumbnails/media currently reuse the template's stock images as
// stand-ins — replace the `image`/`media` paths with real screenshots, and
// add `links` (GitHub / demo URLs) as they become available.
export const projects: Project[] = [
  {
    id: "echo-ai-assistant",
    title: "Echo — AI Voice Assistant",
    category: "Software",
    featured: true,
    description: "A privacy-first local AI voice assistant powered by Ollama.",
    fullDescription:
      "Echo is a local-first AI voice assistant built on Ollama for natural-language tasks, with everything running on-device to keep interactions private. It features wake-word detection and passive listening, plus a set of core voice commands — browsing the web, playing songs, and shutting Echo down on command — all designed around low-latency, real-time voice interaction.",
    role: "Solo developer — wake-word/passive-listening pipeline, command system, and local Ollama integration with a focus on privacy and real-time response.",
    timeline: "2025 · In progress",
    image: "/fluid-motion-animation-particles.jpg",
    tags: ["Ollama", "Python", "Voice Recognition", "LLM", "Local AI"],
    links: [],
    media: [
      { type: "image", url: "/fluid-motion-animation-particles.jpg", caption: "Voice interaction visualization" },
      { type: "image", url: "/fluid-motion-frame-1.jpg", caption: "Wake-word & command flow" },
    ],
  },
  {
    id: "vr-horror-game",
    title: "VR Horror Game",
    category: "Games",
    featured: true,
    description: "An immersive horror VR experience built for the Meta Quest 2.",
    fullDescription:
      "An immersive horror VR experience developed in Unreal Engine for the Meta Quest 2. Gameplay logic was driven primarily through Blueprints, with performance-critical systems implemented in C++ to keep the experience smooth on standalone hardware. The project went through extensive playtesting to tune pacing, scares, and comfort.",
    role: "Developer — Blueprint gameplay logic, C++ performance optimization, and iterative playtesting on Meta Quest 2.",
    timeline: "2024",
    image: "/cyberpunk-futuristic-game-environment.jpg",
    tags: ["Unreal Engine", "C++", "Blueprints", "VR", "Meta Quest 2"],
    links: [],
    media: [
      { type: "image", url: "/cyberpunk-futuristic-game-environment.jpg", caption: "Atmospheric environment" },
      { type: "image", url: "/cyberpunk-game-screenshot-1.jpg", caption: "In-headset moment" },
      { type: "image", url: "/cyberpunk-game-screenshot-2.jpg", caption: "Lighting & mood" },
    ],
  },
  {
    id: "boss-rush-game",
    title: "Boss Rush",
    category: "Games",
    featured: true,
    description: "A fast-paced action game built with a small team for a game jam.",
    fullDescription:
      "A fast-paced action game built in Unity with two teammates under a tight game-jam deadline. I took charge of the combat mechanics, designed the levels, and helped drive rapid prototyping to land a playable, polished loop in limited time. The project was a hands-on lesson in teamwork and agile development.",
    role: "Gameplay & level designer — combat mechanics, level design, and rapid prototyping in a 3-person team.",
    timeline: "2024 · Game jam",
    image: "/neon-racing-game-with-vibrant-colors.jpg",
    tags: ["Unity", "C#", "Game Design", "Level Design"],
    links: [],
    media: [
      { type: "image", url: "/neon-racing-game-with-vibrant-colors.jpg", caption: "Action gameplay" },
      { type: "image", url: "/neon-racing-game-screenshot-1.jpg", caption: "Boss encounter" },
      { type: "image", url: "/neon-racing-game-screenshot-2.jpg", caption: "Level layout" },
    ],
  },
  {
    id: "tournament-registration-platform",
    title: "Tournament Registration Platform",
    category: "Software",
    featured: false,
    description: "A full-stack web app for tournament signups with a responsive UI.",
    fullDescription:
      "A full-stack web application for tournament signups, built with Next.js, React, and Node.js and focused on a responsive, mobile-first experience. On the backend I implemented form handling, validation, and data storage, and tested thoroughly across devices to ensure a seamless user experience.",
    role: "Full-stack developer — responsive frontend, backend form handling/validation/storage, and cross-device testing.",
    timeline: "2023",
    image: "/kinetic-typography-animation-design.jpg",
    tags: ["Next.js", "React", "Node.js", "Full-Stack"],
    links: [],
    media: [
      { type: "image", url: "/kinetic-typography-animation-design.jpg", caption: "Responsive UI" },
      { type: "image", url: "/kinetic-typography-frame-1.jpg", caption: "Registration flow" },
    ],
  },
  {
    id: "hand-tracking-ping-pong",
    title: "Hand-Tracking Ping Pong",
    category: "Games",
    featured: false,
    description: "A real-time ping pong game controlled by computer-vision hand tracking.",
    fullDescription:
      "A real-time ping pong game played with your hands, using OpenCV and live camera input for hand tracking. The core challenge was designing low-latency input so paddle movements feel immediate and responsive — an exercise in computer vision and human-computer interaction.",
    role: "Solo developer — computer-vision hand tracking with OpenCV and low-latency input design.",
    timeline: "2023",
    image: "/crystalline-geometric-landscape-render.jpg",
    tags: ["OpenCV", "Python", "Computer Vision", "HCI"],
    links: [],
    media: [
      { type: "image", url: "/crystalline-geometric-landscape-render.jpg", caption: "Hand-tracking overlay" },
      { type: "image", url: "/mountain-landscape-nature-render-sunset.jpg", caption: "Gameplay" },
    ],
  },
]
