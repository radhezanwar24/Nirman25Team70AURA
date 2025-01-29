"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            SwapUP
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-primary">
              Home
            </Link>
            <Link href="/reels" className="text-sm font-medium text-gray-500 hover:text-primary">
              Reels
            </Link>
            <Link href="/messenger" className="text-sm font-medium text-gray-500 hover:text-primary">
              Messenger
            </Link>
            <Link href="/search" className="text-sm font-medium text-gray-500 hover:text-primary">
              Search
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <input
                type="search"
                placeholder="What do you want to learn?"
                className="h-9 w-[250px] rounded-full border border-gray-200 bg-white px-4 pl-9 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </form>

            <Button asChild variant="default" size="sm">
              <Link href="/signup">Sign Up</Link>
            </Button>

            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
