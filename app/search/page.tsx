"use client"

import { useAuth } from "@/context/auth-context"
import PublicNavBar from "@/components/PublicNavBar"
import TopNavBar from "@/components/dashboard/TopNavBar"
import PublicSearch from "@/components/search/PublicSearch"
import PrivateSearch from "@/components/search/PrivateSearch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { SearchIcon, Star, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchPage() {
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic here
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="min-h-screen">
      {isAuthenticated ? <TopNavBar /> : <PublicNavBar />}
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Skills and Users on SkillUp</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex">
              <Input
                type="text"
                placeholder="Search for skills or users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow text-lg py-3 px-4 rounded-l-lg focus:ring-2 focus:ring-[#B10DC9] focus:border-transparent"
              />
              <Button type="submit" className="bg-[#B10DC9] hover:bg-[#8a0a9b] text-white rounded-r-lg px-6">
                <SearchIcon className="h-5 w-5" />
                <span className="ml-2">Search</span>
              </Button>
            </div>
          </form>

          {/* Filters Panel */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="skill-level" className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Level
                </label>
                <Select>
                  <SelectTrigger id="skill-level">
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <Select>
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Time</SelectItem>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="weekend">Weekend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Select>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="local">Local Matches</SelectItem>
                    <SelectItem value="global">Global Matches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((user) => (
              <div key={user} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      src={`/placeholder.svg?height=100&width=100`}
                      alt={`User ${user}`}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">User {user}</h3>
                      <div className="flex items-center mt-1">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-gray-600">4.5</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-[#2ECC40] text-white px-2 py-1 rounded-full text-sm">Skill 1</span>
                      <span className="bg-[#0074D9] text-white px-2 py-1 rounded-full text-sm">Skill 2</span>
                      <span className="bg-[#FFDC00] text-gray-800 px-2 py-1 rounded-full text-sm">Skill 3</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>City, Country</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Available Evenings & Weekends</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-[#B10DC9] hover:bg-[#8a0a9b] text-white">Request Skill Swap</Button>
                    <Button className="flex-1 bg-[#0074D9] hover:bg-[#0056a3] text-white">Send Message</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
