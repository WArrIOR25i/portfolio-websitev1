import Hero from "@/components/hero"
import Showcase from "@/components/showcase"
import { AboutIntro } from "@/components/about-intro"
import Resume from "@/components/resume"
import { CtaBand } from "@/components/cta-band"

export default function Home() {
  return (
    <>
      <Hero />
      {/* Work section (scroll target: #work) */}
      <Showcase />
      {/* About section (scroll target: #about) */}
      <AboutIntro withHeading />
      <Resume />
      <CtaBand />
    </>
  )
}
