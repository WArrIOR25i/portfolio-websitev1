import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creative Portfolio | Games • Renders • Animations",
  description: "Showcase of games, 3D renders, and animations crafted with passion and precision.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#0a0e27" }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.getItem('theme') || 'dark';
              if (theme === 'light') {
                document.documentElement.classList.add('light');
              }
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased min-h-screen`} style={{ backgroundColor: "#0a0e27" }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
