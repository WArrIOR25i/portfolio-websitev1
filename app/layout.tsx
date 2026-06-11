import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { InteractiveBackground } from "@/components/interactive-background"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Rajath K — Game Developer, 3D Artist & Software Engineer",
  description:
    "Portfolio of Rajath K, a multi-discipline creative technologist based in Bangalore, India. Games, 3D art, animation, and software — crafted with precision.",
  keywords: [
    "game developer",
    "3D artist",
    "software engineer",
    "Unity",
    "Unreal Engine",
    "Blender",
    "portfolio",
    "Bangalore",
  ],
  authors: [{ name: "Rajath K" }],
  openGraph: {
    title: "Rajath K — Game Developer, 3D Artist & Software Engineer",
    description:
      "Games, 3D art, animation, and software — crafted with precision. Explore the portfolio of Rajath K.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajath K — Creative Technologist",
    description: "Games, 3D art, animation, and software — crafted with precision.",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geist.variable} ${geistMono.variable}`}
      style={{ backgroundColor: "#0a0a0b" }}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <InteractiveBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navigation />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
