"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Menu, X, Gamepad2 } from "lucide-react"
import { useActiveSection } from "@/hooks/use-active-section"
import { CATEGORY_FILTERS, type CategoryFilter } from "@/lib/projects-data"

const SECTION_IDS = ["hero", "showcase", "resume", "contact"]

const NAV_ITEMS = [
  { label: "Work", href: "#showcase", id: "showcase" },
  { label: "Resume", href: "#resume", id: "resume" },
  { label: "Contact", href: "#contact", id: "contact" },
]

// Discipline quick-filters (exclude "All" which is the default Work link).
const DISCIPLINE_LINKS = CATEGORY_FILTERS.filter((c) => c !== "All") as Exclude<CategoryFilter, "All">[]

/** Broadcast a filter choice to the Showcase component. */
function applyShowcaseFilter(category: CategoryFilter) {
  window.dispatchEvent(new CustomEvent("set-showcase-filter", { detail: category }))
  const target = document.getElementById("showcase")
  target?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu on Escape and trap focus while it's open.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", onKeyDown)
    // Move focus into the menu.
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus()
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const handleDisciplineClick = useCallback((category: Exclude<CategoryFilter, "All">) => {
    setIsOpen(false)
    applyShowcaseFilter(category)
  }, [])

  return (
    <nav
      aria-label="Primary"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong border-b border-white/10 shadow-lg shadow-black/20" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="flex items-center gap-2 text-xl font-bold tracking-tight"
          >
            <Gamepad2 className="w-6 h-6 text-gold" aria-hidden="true" />
            <span className="text-gradient">Rajath K</span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-gold" : "text-muted-foreground hover:text-gold"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-gold to-gold-bright transition-all duration-300 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              )
            })}

            {/* Discipline quick-filters */}
            <span className="mx-2 h-5 w-px bg-white/10" aria-hidden="true" />
            {DISCIPLINE_LINKS.map((category) => (
              <button
                key={category}
                onClick={() => handleDisciplineClick(category)}
                className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div
          ref={menuRef}
          id="mobile-menu"
          className={`absolute right-0 top-0 h-[calc(100vh-4rem)] w-72 max-w-[80vw] glass-strong border-l border-white/10 p-6 flex flex-col gap-1 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id)}
              aria-current={activeSection === item.id ? "page" : undefined}
              style={{ transitionDelay: isOpen ? `${i * 60}ms` : "0ms" }}
              className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 min-h-[44px] flex items-center ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              } ${
                activeSection === item.id
                  ? "text-gold bg-gold/10"
                  : "text-foreground hover:text-gold hover:bg-white/5"
              }`}
            >
              {item.label}
            </a>
          ))}

          <span className="my-3 h-px w-full bg-white/10" aria-hidden="true" />
          <p className="px-4 text-xs uppercase tracking-wider text-muted-foreground mb-1">Browse by discipline</p>
          {DISCIPLINE_LINKS.map((category, i) => (
            <button
              key={category}
              onClick={() => handleDisciplineClick(category)}
              style={{ transitionDelay: isOpen ? `${(i + NAV_ITEMS.length) * 60}ms` : "0ms" }}
              className={`px-4 py-3 rounded-lg text-left text-sm font-medium text-muted-foreground hover:text-gold hover:bg-white/5 transition-all duration-300 min-h-[44px] flex items-center ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
