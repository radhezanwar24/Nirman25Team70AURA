import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
      <div className="relative container">
        <div className="flex flex-col items-center text-center">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Learn, Share, and Connect – SwapUP the Way You Want!
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Discover a community where skills are developed and shared.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-[#FFDC00] text-gray-900 hover:bg-[#FFDC00]/90">
              <Link href="/signup">Join Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/search" className="bg-transparent border-2 border-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-[#B10DC9] transition duration-300"> Explore Skills </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

