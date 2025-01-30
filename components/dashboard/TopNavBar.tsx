<<<<<<< HEAD
"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import Link from "next/link"
import UserProfileDropdown from "./UserProfileDropdown"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type Notification = {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

export default function TopNavBar() {
  const userName = "Ankit Pandey" // This would typically come from your authentication system
  const userAvatar = "/placeholder.svg?height=32&width=32"

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Match Request",
      message: "Ankit Pandey wants to learn React from you",
      time: "5m ago",
      read: false
    },
    {
      id: "2",
      title: "Achievement Unlocked",
      message: "You've earned the 'Mentor' badge!",
      time: "1h ago",
      read: false
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard">
                <span className="text-2xl font-bold text-[#B10DC9]">SwapUP</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard/matches"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Matches
              </Link>
              <Link
                href="/dashboard/videos"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Videos
              </Link>
              <Link
                href="/dashboard/rewards"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Rewards
              </Link>
              <Link
                href="/messenger/newMessagePage"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Messages
=======
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
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
              </Link>
            </div>
          </div>
          <div className="flex items-center">
<<<<<<< HEAD
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <span className="font-semibold">Notifications</span>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className={`px-4 py-2 cursor-pointer ${!notification.read ? 'bg-muted/50' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div>
                          <div className="font-medium">{notification.title}</div>
                          <div className="text-sm text-muted-foreground">{notification.message}</div>
                          <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-center text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
=======
            <button className="bg-white p-1 rounded-full text-gray-400 hover:text-[#B10DC9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-3">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
            <UserProfileDropdown userName={userName} userAvatar={userAvatar} />
          </div>
        </div>
      </div>
    </nav>
  )
}
<<<<<<< HEAD
=======

>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
