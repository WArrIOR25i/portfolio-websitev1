import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Showcase from "@/components/showcase"
import Resume from "@/components/resume"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { CyberWatermark } from "@/components/cyber-watermark"

export default function Home() {
  return (
    <main className="relative bg-transparent text-foreground">
      <CyberWatermark />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Showcase />
        <Resume />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
