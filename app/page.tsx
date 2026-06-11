import Hero from "@/components/hero"
import { MarqueeStrip } from "@/components/marquee-strip"
import Showcase from "@/components/showcase"
import { AboutIntro } from "@/components/about-intro"
import Resume from "@/components/resume"
import { SocialTabs } from "@/components/social-tabs"
import { CtaBand } from "@/components/cta-band"

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Showcase />
      <AboutIntro withHeading />
      <Resume />
      <SocialTabs />
      <CtaBand />
    </>
  )
}
