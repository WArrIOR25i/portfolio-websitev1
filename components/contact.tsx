"use client"

import { Mail, Github, Linkedin, Twitter } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Let's Connect</h2>

        <p className="text-muted-foreground mb-2">21 • Bangalore, India</p>

        <p className="text-lg text-muted-foreground mb-12">
          Interested in collaborating or want to discuss exciting projects? I'd love to hear from you.
        </p>

        {/* Email CTA */}
        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg mb-12"
        >
          <Mail size={20} />
          Get in Touch
        </a>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          {[
            { icon: Github, label: "GitHub", href: "#" },
            { icon: Linkedin, label: "LinkedIn", href: "#" },
            { icon: Twitter, label: "Twitter", href: "#" },
            { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
          ].map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.label}
                href={social.href}
                className="p-3 bg-secondary text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label={social.label}
              >
                <Icon size={20} />
              </a>
            )
          })}
        </div>

        {/* Availability Badge */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Available for freelance & full-time opportunities</span>
          </div>
        </div>
      </div>
    </section>
  )
}
