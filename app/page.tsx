import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { CompaniesSection } from "@/components/companies-section"
import { ResumeSection } from "@/components/resume-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CommandPalette } from "@/components/command-palette"
import { SystemStatus } from "@/components/system-status"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <SystemStatus />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <CompaniesSection />
      <ResumeSection />
      <ContactSection />
      <Footer />
      <CommandPalette />
    </main>
  )
}
