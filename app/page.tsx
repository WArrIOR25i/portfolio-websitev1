import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Showcase from "@/components/showcase"
import Resume from "@/components/resume"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { CyberDivider } from "@/components/cyber-divider"
import { InteractiveBackground } from "@/components/interactive-background"

export default function Home() {
  return (
    <div className="relative bg-transparent text-foreground">
      <InteractiveBackground />
      <div className="relative z-10">
        <Navigation />
        <main id="main-content">
          <Hero />
          <div className="max-w-[1400px] mx-auto px-4 py-6" aria-hidden="true">
            <CyberDivider variant={1} />
          </div>
          <Showcase />
          <div className="max-w-[1400px] mx-auto px-4 py-6" aria-hidden="true">
            <CyberDivider variant={2} />
          </div>
          <Resume />
          <div className="max-w-[1400px] mx-auto px-4 py-6" aria-hidden="true">
            <CyberDivider variant={3} />
          </div>
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
