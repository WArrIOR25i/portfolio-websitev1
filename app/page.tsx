import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Showcase from "@/components/showcase"
import Resume from "@/components/resume"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { CyberDivider } from "@/components/cyber-divider"
import { CyberBackground } from "@/components/cyber-background"

export default function Home() {
  return (
    <main className="relative bg-transparent text-foreground">
      <CyberBackground />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <CyberDivider variant={1} />
        </div>
        <Showcase />
        <div className="container mx-auto px-4 py-8">
          <CyberDivider variant={2} />
        </div>
        <Resume />
        <div className="container mx-auto px-4 py-8">
          <CyberDivider variant={3} />
        </div>
        <Contact />
        <div className="container mx-auto px-4 py-4">
          <CyberDivider variant={4} />
        </div>
        <Footer />
      </div>
    </main>
  )
}
