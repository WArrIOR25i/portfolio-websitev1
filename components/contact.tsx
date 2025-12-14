"use client"

import { Mail, Linkedin, Twitter } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Let's Connect
        </h2>

        <p className="text-muted-foreground mb-2">21 • Bangalore, India</p>

        <p className="text-lg text-muted-foreground mb-12">
          Open to opportunities in game development, 3D art, and animation. Let's create something amazing together.
        </p>

        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all text-lg mb-12"
        >
          <Mail size={20} />
          Get in Touch
        </a>

        <div className="flex items-center justify-center gap-6">
          {[
            { icon: Linkedin, label: "LinkedIn", href: "#" },
            { icon: Twitter, label: "Twitter", href: "#" },
            { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
          ].map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.label}
                href={social.href}
                className="p-3 bg-card/50 text-muted-foreground rounded-lg border border-border/50 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                aria-label={social.label}
              >
                <Icon size={20} />
              </a>
            )
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Open to freelance and full-time opportunities</span>
          </div>
        </div>
      </div>
    </section>
  )
}
