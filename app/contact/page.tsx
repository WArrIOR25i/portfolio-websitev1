import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import Contact from "@/components/contact"

export const metadata: Metadata = {
  title: "Contact — Rajath K",
  description:
    "Get in touch with Rajath K for game development, 3D art, animation, and software opportunities.",
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact"
        intro="Open to opportunities in game development, 3D art, and software. Have a project or just want to talk shop? My inbox is open."
      />
      <Contact />
    </>
  )
}
