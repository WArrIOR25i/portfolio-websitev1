import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { AboutIntro } from "@/components/about-intro"
import Resume from "@/components/resume"
import { CtaBand } from "@/components/cta-band"

export const metadata: Metadata = {
  title: "About — Rajath K",
  description:
    "Rajath K is a multi-discipline creative technologist from Bangalore — game developer, 3D artist, and software engineer.",
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About"
        intro="Engineer and artist — building immersive games, photorealistic worlds, and the tools that bring them to life."
      />
      <AboutIntro />
      <Resume />
      <CtaBand title="Want the full story?" body="Download my CV or reach out — I'm happy to walk through any project in detail." />
    </>
  )
}
