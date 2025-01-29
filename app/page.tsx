import Header from "@/components/Header"
import Hero from "@/components/Hero"
import FeaturePreview from "@/components/FeaturePreview"
import Testimonials from "@/components/Testimonials"
import CallToAction from "@/components/CallToAction"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <FeaturePreview />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}

