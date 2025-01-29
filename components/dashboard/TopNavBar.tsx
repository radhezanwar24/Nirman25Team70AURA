import { Bell, Search } from "lucide-react"
import Link from "next/link"
import UserProfileDropdown from "./UserProfileDropdown"

export default function TopNavBar() {
  // This would typically come from your authentication system
  const userName = "Ankit Pandey"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-[#B10DC9]">SwapUP</span>
            </Link>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#B10DC9] focus:border-[#B10DC9] sm:text-sm"
                  placeholder="Search for skills or users"
                  type="search"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4 ml-4">
              <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-[#B10DC9]">
                Dashboard
              </Link>
              <Link href="/search" className="text-sm font-medium text-gray-500 hover:text-[#B10DC9]">
                Search
              </Link>
              <Link href="/messenger" className="text-sm font-medium text-gray-500 hover:text-[#B10DC9]">
                Messenger
              </Link>
              <Link href="/reels" className="text-sm font-medium text-gray-500 hover:text-[#B10DC9]">
                Reels
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-white p-1 rounded-full text-gray-400 hover:text-[#B10DC9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-3">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>
            <UserProfileDropdown userName={userName} userAvatar={userAvatar} />
          </div>
        </div>
      </div>
    </nav>
  )
}

