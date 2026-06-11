import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { MarqueeStrip } from "@/components/marquee-strip"
import Showcase from "@/components/showcase"
import { CtaBand } from "@/components/cta-band"

export const metadata: Metadata = {
  title: "Work — Rajath K",
  description:
    "Selected projects across game development, 3D art, animation, and software tooling by Rajath K.",
}

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected Work"
        title="Work"
        intro="A cross-section of projects spanning game development, real-time 3D, animation, and the tools that power them. Filter by discipline or explore it all."
      />
      <MarqueeStrip />
      <Showcase hideIntro />
      <CtaBand title="Like what you see?" body="There's more where that came from. Let's talk about your project." />
    </>
  )
}
