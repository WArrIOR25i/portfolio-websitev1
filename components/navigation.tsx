"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Gamepad2 } from "lucide-react"
import { useActiveSection } from "@/hooks/use-active-section"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type NavItem = {
  label: string
  href: string
  /** Homepage section id this link scrolls to, or null for a real route. */
  section: string | null
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", section: "hero" },
  { label: "Work", href: "/#work", section: "work" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Contact", href: "/contact", section: null },
]

// Stable reference so the IntersectionObserver in useActiveSection isn't
// rebuilt on every render.
const SECTION_IDS = ["hero", "work", "about"]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()
  const activeSection = useActiveSection(SECTION_IDS)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const isActive = useCallback(
    (item: NavItem) => {
      if (item.section === null) return pathname.startsWith("/contact")
      if (pathname !== "/") return false
      return activeSection === item.section
    },
    [pathname, activeSection],
  )

  // Smooth-scroll to a homepage section when already on the homepage; otherwise
  // let the link navigate to "/#section" (the browser scrolls on arrival).
  const handleNavClick = useCallback(
    (e: React.MouseEvent, item: NavItem) => {
      setIsOpen(false)
      if (item.section && pathname === "/") {
        const el = document.getElementById(item.section)
        if (el) {
          e.preventDefault()
          el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" })
          window.history.replaceState(null, "", item.section === "hero" ? "/" : item.href)
        }
      }
    },
    [pathname, prefersReduced],
  )

  const handleBrandClick = useCallback(
    (e: React.MouseEvent) => {
      if (pathname === "/") {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })
        window.history.replaceState(null, "", "/")
      }
    },
    [pathname, prefersReduced],
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu when the route changes.
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close on Escape and trap focus while the mobile menu is open.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
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
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus()
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  return (
    <nav
      aria-label="Primary"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-strong border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            onClick={handleBrandClick}
            className="flex items-center gap-2 text-xl font-bold tracking-tight"
          >
            <Gamepad2 className="w-6 h-6 text-gold" aria-hidden="true" />
            <span className="text-gradient">Portfolio</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "text-gold" : "text-muted-foreground hover:text-gold"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-gold to-gold-bright transition-all duration-300 ${
                      active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
            <Link
              href="/contact"
              className="ml-3 sheen inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-gold to-gold-bright text-black hover:shadow-[0_0_24px_rgba(110,162,255,0.35)] transition-shadow"
            >
              Let&apos;s talk
            </Link>
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
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div
          ref={menuRef}
          id="mobile-menu"
          className={`absolute right-0 top-0 h-[calc(100vh-4rem)] w-72 max-w-[80vw] glass-strong border-l border-white/10 p-6 flex flex-col gap-1 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              aria-current={isActive(item) ? "page" : undefined}
              style={{ transitionDelay: isOpen ? `${i * 60}ms` : "0ms" }}
              className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 min-h-[44px] flex items-center ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              } ${
                isActive(item) ? "text-gold bg-gold/10" : "text-foreground hover:text-gold hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            style={{ transitionDelay: isOpen ? `${NAV_ITEMS.length * 60}ms` : "0ms" }}
            className={`mt-3 sheen inline-flex items-center justify-center px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-gold to-gold-bright text-black transition-all duration-300 min-h-[44px] ${
              isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            }`}
          >
            Let&apos;s talk
          </Link>
        </div>
      </div>
    </nav>
  )
}
