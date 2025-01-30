"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserProfileDropdownProps {
  userName: string
  userAvatar: string
}

export default function UserProfileDropdown({ userName, userAvatar }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  return (
    <div className="relative">
      <Button onClick={toggleDropdown} variant="ghost" className="flex items-center space-x-2 focus:outline-none">
        <Image src={userAvatar || "/placeholder.svg"} alt={userName} width={32} height={32} className="rounded-full" />
        <span className="font-medium text-sm">{userName}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
          </div>

          <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Dashboard
          </Link>
          <Link href="/dashboard/matches" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Matches
          </Link>
          <Link href="/dashboard/videos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            My Videos
          </Link>
          <Link href="/dashboard/rewards" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Rewards
          </Link>
          <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Settings
          </Link>
        </div>
      )}
    </div>
  )
}
