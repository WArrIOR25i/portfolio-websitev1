# Implementation Tasks

## Task 1: Foundation — Data Layer, Hooks, and Global Styles

- [ ] 1.1 Create `lib/projects-data.ts` with the Project interface and placeholder project array (expand categories to include "3D Art" and "Software", add `featured`, `fullDescription`, `role`, `timeline`, `links` fields)
- [ ] 1.2 Create `hooks/use-active-section.ts` — Intersection Observer hook that returns the ID of the currently visible section (threshold 0.3)
- [ ] 1.3 Create `hooks/use-reduced-motion.ts` — hook that reads `prefers-reduced-motion` media query and returns a boolean
- [ ] 1.4 Enhance `hooks/use-scroll-reveal.ts` — replace ScrollReveal library dependency with a custom Intersection Observer implementation supporting stagger delays and reduced-motion bypass
- [ ] 1.5 Update `app/globals.css` — add new keyframes (glitch-reveal, skill-bar-fill, stagger utilities), focus-visible styles (`outline-2 outline-offset-2 outline-cyan-400`), reduced-motion overrides (`@media (prefers-reduced-motion: reduce)`), and glass-morphism utility classes
- [ ] 1.6 Update `app/layout.tsx` — add font preloading in head, skip-to-content link, enhanced metadata (Open Graph, description), and `id="main-content"` on main wrapper
- [ ] 1.7 Remove `scrollreveal` package from `package.json` and update `components/scroll-reveal.tsx` to use the new custom hook

## Task 2: Navigation System Enhancement

- [ ] 2.1 Enhance `components/navigation.tsx` — integrate `useActiveSection` hook to highlight active nav link with animated cyan underline
- [ ] 2.2 Add scroll-aware background transition — transparent when at top, solid with backdrop-blur when scrolled past hero (use scroll event with threshold)
- [ ] 2.3 Add discipline quick-filter links to navigation (Games, 3D Art, Animation, Software) that scroll to showcase and pre-set the active filter
- [ ] 2.4 Implement animated mobile menu — slide-in from right with staggered link entrance animations and proper focus trap
- [ ] 2.5 Add keyboard accessibility — all links accessible via Tab, active state uses `aria-current="page"`, mobile menu toggle has proper ARIA attributes

## Task 3: Hero Section Rewrite

- [ ] 3.1 Rewrite `components/hero.tsx` — new layout with larger name (7xl-8xl), gradient subtitle, discipline tag row (4 pill badges with staggered entrance)
- [ ] 3.2 Implement glitch-reveal or typewriter animation for the name text on initial load
- [ ] 3.3 Create animated background element — CSS-only floating geometric shapes (hexagons, diamonds) with subtle scroll-responsive movement using `use-parallax` hook
- [ ] 3.4 Add "Available for Work" micro-badge with animated pulsing dot below the subtitle
- [ ] 3.5 Enhance CTA buttons — add magnetic hover effect (slight translateX/Y toward cursor position on mousemove) and glow shadow on hover
- [ ] 3.6 Add parallax depth — background decorative elements at 0.3x scroll rate, mid-layer at 0.6x, content at 1x

## Task 4: Project Showcase Enhancement

- [ ] 4.1 Refactor `components/showcase.tsx` to import project data from `lib/projects-data.ts` instead of inline array
- [ ] 4.2 Update filter buttons — add "3D Art" and "Software" categories, apply active/inactive styling with animated underline indicator
- [ ] 4.3 Implement animated filter transition — outgoing cards fade-out + scale-down, incoming cards stagger-in with 80ms delay per card
- [ ] 4.4 Redesign project cards — glass-morphism styling (`bg-white/5 backdrop-blur-sm border-white/10`), enforced 16:9 aspect ratio thumbnail, color-coded category badge by discipline
- [ ] 4.5 Implement hover overlay — card lifts (translateY -8px), border glows, overlay fades in with project title and "View Project" prompt
- [ ] 4.6 Add "Featured" badge for highlighted projects (positioned top-right of card thumbnail)
- [ ] 4.7 Implement staggered scroll-reveal for project cards using the enhanced scroll-reveal hook (80ms delay between cards)

## Task 5: Project Detail View Enhancement

- [ ] 5.1 Rewrite `components/project-modal.tsx` — full-screen takeover layout with split view (media left, details right on desktop; stacked on mobile)
- [ ] 5.2 Enhance media carousel — add thumbnail strip at bottom, crossfade transitions between items, swipe gesture support via touch events
- [ ] 5.3 Add keyboard navigation to carousel — left/right arrow keys cycle media, displayed in a visible control hint
- [ ] 5.4 Add expanded project details panel — role/contribution summary, technology stack with tags, project timeline, external links (demo, source, ArtStation)
- [ ] 5.5 Implement next/previous project navigation — arrows at left/right edges of modal to cycle through projects without closing
- [ ] 5.6 Implement accessibility — focus trap inside modal, Escape to close, body scroll lock, `aria-modal="true"`, return focus to trigger on close

## Task 6: Resume Section Enhancement

- [ ] 6.1 Enhance `components/resume.tsx` — reorganize skills under discipline headers (Game Development, 3D Art & Animation, Programming, Tools & Pipelines)
- [ ] 6.2 Create `components/ui/progress-bar.tsx` — animated skill proficiency bar with cyan-to-purple gradient fill, percentage label, and scroll-triggered animation (fills over 800ms)
- [ ] 6.3 Implement progress bars for each skill in the resume section, triggered by Intersection Observer when section scrolls into view
- [ ] 6.4 Add timeline connector for featured projects — vertical line with dots connecting project entries
- [ ] 6.5 Enhance education card — add subtle hover expansion revealing coursework highlights, add certifications placeholder subsection
- [ ] 6.6 Ensure sticky left sidebar (download CTA + LinkedIn link) on desktop with smooth scroll behavior, single-column stack on mobile

## Task 7: Contact Section Enhancement

- [ ] 7.1 Enhance `components/contact.tsx` — replace simple layout with 3 interactive contact cards (Email, LinkedIn, GitHub/ArtStation) in a row with hover glow effects
- [ ] 7.2 Add prominent availability status badge — card-style with green pulsing dot, status text, and subtle background glow
- [ ] 7.3 Add timezone display (IST / UTC+5:30) and location context below the availability badge
- [ ] 7.4 Update email link with pre-filled subject line: `mailto:hello@example.com?subject=Portfolio%20Inquiry`
- [ ] 7.5 Add subtle section-specific background pattern (triangular/geometric grid, low opacity)

## Task 8: Performance and Accessibility Polish

- [ ] 8.1 Audit all images — ensure every `<Image>` has explicit width/height, uses Next.js automatic optimization, appropriate `sizes` prop for responsive delivery
- [ ] 8.2 Remove `scrollreveal` package dependency from the project (verify no imports remain)
- [ ] 8.3 Implement `prefers-reduced-motion` support across all components — disable parallax, simplify animations to opacity-only, reduce durations to 0ms
- [ ] 8.4 Add semantic HTML structure — verify single `<h1>`, section `<h2>`s, proper heading hierarchy, `<nav>`, `<main>`, `<section aria-labelledby>`
- [ ] 8.5 Add skip-to-content link (visually hidden, visible on focus) at top of page targeting `#main-content`
- [ ] 8.6 Verify color contrast compliance — test cyan (#22d3ee) on dark backgrounds meets 4.5:1 ratio, adjust any failing combinations
- [ ] 8.7 Add visible focus styles (`focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2`) to all interactive elements globally
- [ ] 8.8 Run build and verify no TypeScript errors, no console warnings, and images render at correct sizes

