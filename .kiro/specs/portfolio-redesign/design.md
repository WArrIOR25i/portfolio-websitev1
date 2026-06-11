# Design Document

## Overview

This design document describes the implementation plan for upgrading the portfolio website from a basic cyberpunk-themed site to an industry-level portfolio. The existing Next.js 16 + Tailwind CSS 4 + Radix UI stack is preserved. The redesign enhances visual hierarchy, micro-interactions, project presentation depth, and performance while maintaining the established cyberpunk/neon aesthetic.

## Architecture

### Technology Stack (No Changes)

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 with CSS custom properties
- **UI Primitives**: Radix UI (Dialog, Tabs, Tooltip)
- **Icons**: Lucide React
- **Animation**: CSS animations + Intersection Observer (no heavy animation libraries to maintain performance budget)
- **Images**: Next.js Image component with responsive srcSet
- **Deployment**: Vercel

### File Structure Changes

```
components/
├── navigation.tsx          (enhanced: scroll-aware, active section, keyboard nav)
├── hero.tsx                (rewritten: particle effect, discipline tags, parallax)
├── showcase.tsx            (enhanced: new categories, hover overlays, staggered anim)
├── project-modal.tsx       (enhanced: full-screen, swipe, prev/next, role info)
├── resume.tsx              (enhanced: skill bars, sticky sidebar, proficiency)
├── contact.tsx             (enhanced: availability indicator, interactive cards)
├── footer.tsx              (minor polish)
├── cyber-background.tsx    (optimized: GPU-accelerated, reduced-motion aware)
├── scroll-reveal.tsx       (enhanced: intersection observer, stagger support)
├── animated-cube.tsx       (kept or replaced with particle field)
├── cyber-divider.tsx       (kept, minor polish)
├── theme-provider.tsx      (kept)
├── ui/
│   └── progress-bar.tsx    (new: reusable skill proficiency bar)
hooks/
├── use-scroll-reveal.ts    (enhanced)
├── use-parallax.ts         (enhanced)
├── use-active-section.ts   (new: tracks which section is in viewport)
├── use-reduced-motion.ts   (new: respects prefers-reduced-motion)
lib/
├── utils.ts                (kept)
├── projects-data.ts        (new: extracted project data for easy replacement)
app/
├── globals.css             (enhanced: new animation keyframes, focus styles)
├── layout.tsx              (metadata, font preloading, skip-link)
├── page.tsx                (composition, same structure)
```

## Component Design

### 1. Navigation System Enhancement

**Current state**: Basic sticky nav with 3 links and mobile hamburger.

**Changes**:
- Add `useActiveSection` hook using Intersection Observer to detect which section is in viewport
- Navigation transitions from `bg-transparent` to `bg-background/80 backdrop-blur-md` when scrolled past hero (already partially implemented, enhance threshold detection)
- Active link gets a cyan underline indicator with slide animation
- Add discipline quick-filter links (Games, 3D Art, Animation, Software) that scroll to showcase with pre-set filter
- Mobile menu adds slide-in animation from right with staggered link reveals
- All links accessible via Tab navigation, active state announced via `aria-current`

### 2. Hero Section Rewrite

**Current state**: Name, subtitle, 2 CTAs, bouncing chevron. Functional but generic.

**Changes**:
- Replace static text fade-in with a typewriter or glitch-reveal effect for the name
- Add discipline tag row: 4 pill badges (Game Dev, 3D Artist, Animator, Software Dev) with staggered entrance
- Replace gradient blobs with a GPU-accelerated canvas particle field or CSS-only floating geometric shapes that respond subtly to scroll
- Stronger visual hierarchy: Name at 6xl-8xl, subtitle at 2xl with gradient, tagline at lg
- Parallax: Background decorative elements move at 0.3x scroll rate, foreground content at 1x
- CTA buttons with magnetic hover effect (slight movement toward cursor)
- "Available for work" micro-badge with pulsing dot

### 3. Project Showcase Enhancement

**Current state**: 3-column grid, 4 categories (All/Games/Renders/Animations), basic hover scale.

**Changes**:
- Expand categories to: All, Games, 3D Art, Animation, Software (rename "Renders" to "3D Art")
- Project cards get a glass-morphism treatment: `bg-white/5 backdrop-blur-sm border border-white/10`
- Hover state: card lifts (translateY -8px), border glows cyan, overlay fades in with title + "View Project" CTA
- Filter transition: outgoing cards fade and scale down, incoming cards stagger in with 80ms delay each
- Each card shows: thumbnail (16:9 aspect ratio enforced), category badge (color-coded by discipline), title, 1-line description, tech tags (max 3)
- Add a "Featured" badge for highlighted projects
- Data extracted to `lib/projects-data.ts` for easy editing

### 4. Project Detail View Enhancement

**Current state**: Modal with image carousel, title, description, tags.

**Changes**:
- Full-screen takeover instead of centered modal (more immersive, standard in AAA game portfolios)
- Media carousel with:
  - Swipe gesture support (touch events)
  - Arrow key navigation
  - Thumbnail strip at bottom for quick jumping
  - Smooth crossfade transition between media items
- Expanded content panel: Title, full description, "My Role" section, tech stack with icons, project timeline, links (live demo, source code, ArtStation)
- Next/Previous project navigation arrows at edges
- Proper focus trap and Escape to close
- Body scroll lock while open

### 5. Resume Section Enhancement

**Current state**: Two-column layout with download button, projects list, skills grid, education.

**Changes**:
- Skills get animated progress bars (percentage fill with gradient from cyan to purple)
- Skills organized under discipline headers: Game Development, 3D Art & Animation, Programming, Tools & Pipelines
- Each skill bar animates on scroll-into-view (fills from 0 to target width over 800ms)
- Featured projects get a timeline dot connector (vertical line with dots)
- Sticky left column (download button + quick links) on desktop
- Education card with subtle hover expansion showing coursework highlights
- Add "Certifications" subsection placeholder

### 6. Contact Section Enhancement

**Current state**: Centered text, email button, 3 social icons, availability dot.

**Changes**:
- Availability status as a prominent card-style badge: green dot + text + subtle pulse
- Contact methods as 3 interactive cards in a row: Email, LinkedIn, GitHub/ArtStation
- Each card has icon, label, hover glow effect, and click action
- Add timezone display (IST / UTC+5:30) for scheduling context
- Pre-filled `mailto:` with subject line "Portfolio Inquiry - [Your Name]"
- Subtle background pattern unique to this section (triangular grid)

### 7. Performance Implementation

- All images use `<Image>` with explicit width/height to prevent CLS
- Add `loading="lazy"` to all below-fold images (Next.js Image handles this)
- Preload the primary font in `layout.tsx` `<head>`
- CSS animations use only `transform` and `opacity` (GPU-composited properties)
- Intersection Observer for scroll reveals (replace ScrollReveal library with custom hook)
- Remove `scrollreveal` npm package (currently 4.0.9) — replace with lightweight custom intersection observer hook
- Dynamic import for heavy components (particle effects) with loading fallback
- Image formats: prefer WebP/AVIF via Next.js automatic optimization

### 8. Accessibility Implementation

- Add skip-to-content link at top of page (visually hidden, shown on focus)
- All icon buttons get `aria-label`
- Modal focus trap using `useEffect` + `tabindex` management
- `prefers-reduced-motion` media query:
  - Disable parallax
  - Replace staggered reveals with simple fade (no transform)
  - Disable particle/cube animation
  - Reduce transition durations to 0ms
- Semantic structure: `<nav>`, `<main>`, `<section aria-labelledby>`, proper heading hierarchy (single h1, section h2s, sub h3s)
- Color contrast verified for cyan (#22d3ee) on dark backgrounds — passes AA at 4.5:1+
- Focus visible styles: `outline-2 outline-offset-2 outline-cyan-400`

### 9. Responsive Breakpoint Strategy

| Breakpoint | Layout Changes |
|-----------|----------------|
| < 640px | Single column, larger touch targets (48px), stacked CTAs, hidden animated cube |
| 640-767px | Single column with more spacing, side-by-side CTAs |
| 768-1023px | 2-column project grid, 2-column resume |
| 1024-1279px | 3-column project grid, full navigation |
| ≥ 1280px | Max-width 1400px container, centered |

### 10. Animation & Interaction Specifications

| Interaction | Duration | Easing | Properties |
|------------|----------|--------|-----------|
| Hover feedback | 150ms | ease-out | transform, box-shadow, border-color |
| Scroll reveal | 600ms | cubic-bezier(0.16, 1, 0.3, 1) | opacity, transform |
| Stagger delay | 80ms per item | — | animation-delay |
| Modal open | 300ms | ease-out | opacity, transform(scale) |
| Modal close | 200ms | ease-in | opacity, transform(scale) |
| Filter transition | 400ms | ease-in-out | opacity, transform |
| Skill bar fill | 800ms | ease-out | width |
| Parallax | per-frame | linear | transform(translateY) |

## Data Schema

### Project Data Structure (`lib/projects-data.ts`)

```typescript
export interface Project {
  id: string
  title: string
  category: "Games" | "3D Art" | "Animation" | "Software"
  featured: boolean
  description: string
  fullDescription: string
  role: string
  timeline: string
  image: string
  tags: string[]
  links: { label: string; url: string }[]
  media: { type: "image" | "video"; url: string; caption?: string }[]
}
```

## Dependencies

### To Add
- None (avoiding new dependencies to stay lean; all features achievable with existing stack + custom hooks)

### To Remove
- `scrollreveal` (4.0.9) — replaced by custom Intersection Observer hook

### Existing (Kept)
- `next` 16.0.10
- `tailwindcss` ^4.1.9
- `@radix-ui/react-dialog` (for modal)
- `lucide-react` (icons)
- `next-themes` (theme support)
- `framer-motion` — NOT added; CSS animations sufficient for the specified interactions

## Testing Considerations

- Visual regression: Compare screenshots at each breakpoint before/after
- Performance: Run Lighthouse CI in GitHub Actions, fail build if score < 90
- Accessibility: Run axe-core audit, verify 0 critical/serious violations
- Interaction: Manual testing of keyboard navigation flow through all interactive elements
- Cross-browser: Verify in Chrome, Firefox, Safari (latest)
- Reduced motion: Test with `prefers-reduced-motion: reduce` enabled

## Migration Notes

- All project placeholder data preserved — owner replaces images/text in `lib/projects-data.ts`
- No breaking URL changes (same single-page structure)
- Existing deployment pipeline unchanged (Vercel auto-deploys from main branch)
- cyberpunk aesthetic maintained and elevated, not replaced

