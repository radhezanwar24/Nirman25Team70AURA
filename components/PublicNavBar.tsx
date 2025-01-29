"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

export default function PublicNavBar() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            SwapUP
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className="text-sm font-medium text-gray-500 hover:text-primary"
            >
              Home
            </Link>
            <Link 
              href="/reels"
              className="text-sm font-medium text-gray-500 hover:text-primary"
            >
              Reels
            </Link>
            <Link 
              href="/search"
              className="text-sm font-medium text-gray-500 hover:text-primary"
            >
              Search
            </Link>
            <Link 
              href="/messenger"
              className="text-sm font-medium text-gray-500 hover:text-primary"
            >
              Messenger
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="default">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="default">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
