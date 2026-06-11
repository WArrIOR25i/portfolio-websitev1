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

export const CATEGORY_FILTERS = ["All", "Games", "3D Art", "Animation", "Software"] as const
export type CategoryFilter = (typeof CATEGORY_FILTERS)[number]

export const projects: Project[] = [
  {
    id: "neon-rush",
    title: "Neon Rush",
    category: "Games",
    featured: true,
    description: "High-octane arcade racer with procedural tracks and dynamic physics.",
    fullDescription:
      "Neon Rush is a synthwave arcade racer where every track is procedurally generated, so no two runs feel the same. The game blends a custom physics-driven drift system with reactive neon environments that pulse to the soundtrack. I focused on making the moment-to-moment driving feel weighty yet responsive, tuning the handling model until it hit that arcade sweet spot.",
    role: "Sole developer — gameplay programming, procedural track generation, vehicle physics, and shader work for the neon aesthetic.",
    timeline: "2024 · 4 months",
    image: "/neon-racing-game-with-vibrant-colors.jpg",
    tags: ["Unreal Engine", "C++", "Procedural Gen", "Physics"],
    links: [
      { label: "Play Demo", url: "#" },
      { label: "Source", url: "#" },
    ],
    media: [
      { type: "image", url: "/neon-racing-game-with-vibrant-colors.jpg", caption: "Main race environment" },
      { type: "image", url: "/neon-racing-game-screenshot-1.jpg", caption: "Procedural track section" },
      { type: "image", url: "/neon-racing-game-screenshot-2.jpg", caption: "Drift mechanics in action" },
    ],
  },
  {
    id: "cyberpunk-adventure",
    title: "Cyberpunk Adventure",
    category: "Games",
    featured: true,
    description: "Immersive 3D action game with advanced AI and real-time lighting.",
    fullDescription:
      "A third-person action adventure set in a dense cyberpunk metropolis. The project pushed real-time lighting and a behaviour-tree driven enemy AI that flanks, takes cover, and coordinates. I built the combat loop, the AI perception system, and the dynamic day/night lighting pipeline.",
    role: "Gameplay & AI programmer — combat systems, enemy behaviour trees, and the real-time lighting setup.",
    timeline: "2023 · 6 months",
    image: "/cyberpunk-futuristic-game-environment.jpg",
    tags: ["Unity", "C#", "AI Systems", "HDRP"],
    links: [{ label: "Devlog", url: "#" }],
    media: [
      { type: "image", url: "/cyberpunk-futuristic-game-environment.jpg", caption: "City environment" },
      { type: "image", url: "/cyberpunk-game-screenshot-1.jpg", caption: "Combat encounter" },
      { type: "image", url: "/cyberpunk-game-screenshot-2.jpg", caption: "Night lighting pass" },
    ],
  },
  {
    id: "eternal-monoliths",
    title: "Eternal Monoliths",
    category: "3D Art",
    featured: true,
    description: "Photorealistic 3D render with complex materials and global illumination.",
    fullDescription:
      "A series of architectural sci-fi renders exploring scale and light. Each monolith uses layered procedural materials with subtle surface imperfections, lit entirely with global illumination and a single HDRI to keep the lighting believable. The goal was cinematic stillness — monumental forms that feel ancient and engineered at once.",
    role: "3D artist — modelling, procedural material authoring, lighting, and compositing.",
    timeline: "2024 · 5 weeks",
    image: "/crystalline-geometric-landscape-render.jpg",
    tags: ["Blender", "Cycles", "Compositing"],
    links: [{ label: "ArtStation", url: "#" }],
    media: [
      { type: "image", url: "/crystalline-geometric-landscape-render.jpg", caption: "Hero shot" },
      { type: "image", url: "/eternal-monoliths-render-angle-1.jpg", caption: "Alternate angle" },
      { type: "image", url: "/eternal-monoliths-render-angle-2.jpg", caption: "Detail study" },
    ],
  },
  {
    id: "secret-sentinel",
    title: "Secret Sentinel",
    category: "3D Art",
    featured: false,
    description: "Breathtaking landscape render with advanced environmental techniques.",
    fullDescription:
      "An environment render focused on atmosphere — volumetric fog, scattered light, and a hand-tuned sky to sell golden hour. I used HDRI lighting combined with custom atmospheric volumes and a layered terrain shader to achieve depth across the scene.",
    role: "3D artist — environment design, lighting, and atmospheric VFX.",
    timeline: "2023 · 3 weeks",
    image: "/mountain-landscape-nature-render-sunset.jpg",
    tags: ["Blender", "HDRI", "Lighting"],
    links: [{ label: "ArtStation", url: "#" }],
    media: [
      { type: "image", url: "/mountain-landscape-nature-render-sunset.jpg", caption: "Golden hour" },
      { type: "image", url: "/secret-sentinel-render-angle-1.jpg", caption: "Wide establishing shot" },
      { type: "image", url: "/secret-sentinel-render-angle-2.jpg", caption: "Close detail" },
    ],
  },
  {
    id: "fluid-motion",
    title: "Fluid Motion",
    category: "Animation",
    featured: true,
    description: "Experimental animation exploring fluid dynamics and particle systems.",
    fullDescription:
      "An abstract motion piece built around fluid and particle simulations. The animation choreographs millions of particles into flowing, organic forms that dissolve and reform. The technical challenge was art-directing simulations that are inherently chaotic — guiding them toward intentional, rhythmic motion.",
    role: "Motion artist — simulation setup, art direction, and final render/compositing.",
    timeline: "2024 · 4 weeks",
    image: "/fluid-motion-animation-particles.jpg",
    tags: ["Blender", "Dynamics", "VFX"],
    links: [{ label: "Watch", url: "#" }],
    media: [
      { type: "image", url: "/fluid-motion-animation-particles.jpg", caption: "Particle bloom" },
      { type: "image", url: "/fluid-motion-frame-1.jpg", caption: "Key frame" },
    ],
  },
  {
    id: "kinetic-type",
    title: "Kinetic Typography",
    category: "Animation",
    featured: false,
    description: "Rhythm-driven kinetic typography piece synced to an original track.",
    fullDescription:
      "A kinetic typography sequence where every letterform is animated to the beat of an original audio track. The piece explores timing, easing, and negative space, using motion to give text its own voice and energy.",
    role: "Motion designer — typography animation, timing, and sound sync.",
    timeline: "2023 · 2 weeks",
    image: "/kinetic-typography-animation-design.jpg",
    tags: ["After Effects", "Motion Design", "Sound Sync"],
    links: [{ label: "Watch", url: "#" }],
    media: [
      { type: "image", url: "/kinetic-typography-animation-design.jpg", caption: "Composition" },
      { type: "image", url: "/kinetic-typography-frame-1.jpg", caption: "Frame study" },
    ],
  },
  {
    id: "procedural-dungeon",
    title: "Procedural Dungeon Toolkit",
    category: "Software",
    featured: true,
    description: "A reusable Unity tool for runtime procedural dungeon generation.",
    fullDescription:
      "An editor-integrated Unity toolkit that generates dungeons at runtime using a recursive room-and-corridor algorithm. It exposes designer-friendly parameters for room density, branching, and theming, plus hooks for enemy and loot placement. Built as a reusable package with documentation so it can drop into any project.",
    role: "Tools developer — algorithm design, Unity editor integration, and API/documentation.",
    timeline: "2024 · 6 weeks",
    image: "/cyberpunk-game-screenshot-1.jpg",
    tags: ["Unity", "C#", "Editor Tools", "Algorithms"],
    links: [
      { label: "Source", url: "#" },
      { label: "Docs", url: "#" },
    ],
    media: [
      { type: "image", url: "/cyberpunk-game-screenshot-1.jpg", caption: "Generated layout" },
      { type: "image", url: "/cyberpunk-game-screenshot-2.jpg", caption: "Editor inspector" },
    ],
  },
]
