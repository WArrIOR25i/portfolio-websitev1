import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Showcase from "@/components/showcase"
import Resume from "@/components/resume"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="relative bg-transparent text-foreground">
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
