"use client"

import { useAuth } from "@/context/auth-context"
import PublicNavBar from "@/components/PublicNavBar"
import TopNavBar from "@/components/dashboard/TopNavBar"
import PublicSearch from "@/components/search/PublicSearch"
import PrivateSearch from "@/components/search/PrivateSearch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { SearchIcon, Star, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"

export default function SearchPage() {
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [skillLevel, setSkillLevel] = useState("all")
  const [availability, setAvailability] = useState("any")
  const [location, setLocation] = useState("all")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize search query from URL parameter
  useEffect(() => {
    const queryParam = searchParams.get('q')
    if (queryParam) {
      setSearchQuery(queryParam)
    }
  }, [searchParams])

  // Sample users data - can be modified as needed
  const users = [
    {
      id: 1,
      name: "Alex Thompson",
      rating: 4.8,
      avatar: "/avatars/alex.jpg",
      skills: [
        { name: "React", color: "#2ECC40" },
        { name: "TypeScript", color: "#0074D9" },
        { name: "Node.js", color: "#FFDC00" }
      ],
      location: "San Francisco, USA",
      availability: "Evenings & Weekends",
      expertise: "Senior Frontend Developer",
      skillLevel: "advanced",
      hourlyRate: "$50-70",
      languages: ["English", "Spanish"],
      projectCount: 25
    },
    {
      id: 2,
      name: "Sarah Chen",
      rating: 4.9,
      avatar: "/avatars/sarah.jpg",
      skills: [
        { name: "UI/UX Design", color: "#FF4136" },
        { name: "Figma", color: "#B10DC9" },
        { name: "Adobe XD", color: "#01FF70" }
      ],
      location: "Toronto, Canada",
      availability: "Full-time",
      expertise: "Product Designer",
      skillLevel: "advanced",
      hourlyRate: "$45-65",
      languages: ["English", "Mandarin"],
      projectCount: 32
    },
    {
      id: 3,
      name: "Miguel Rodriguez",
      rating: 4.7,
      avatar: "/avatars/miguel.jpg",
      skills: [
        { name: "Python", color: "#2ECC40" },
        { name: "Machine Learning", color: "#0074D9" },
        { name: "TensorFlow", color: "#FF851B" }
      ],
      location: "Madrid, Spain",
      availability: "Weekdays",
      expertise: "ML Engineer",
      skillLevel: "advanced",
      hourlyRate: "$55-75",
      languages: ["English", "Spanish"],
      projectCount: 18
    },
    {
      id: 4,
      name: "Priya Patel",
      rating: 4.6,
      avatar: "/avatars/priya.jpg",
      skills: [
        { name: "AWS", color: "#FF4136" },
        { name: "Docker", color: "#7FDBFF" },
        { name: "Kubernetes", color: "#B10DC9" }
      ],
      location: "Bangalore, India",
      availability: "Flexible Hours",
      expertise: "DevOps Engineer",
      skillLevel: "intermediate",
      hourlyRate: "$40-60",
      languages: ["English", "Hindi"],
      projectCount: 28
    },
    {
      id: 5,
      name: "David Kim",
      rating: 4.9,
      avatar: "/avatars/david.jpg",
      skills: [
        { name: "Flutter", color: "#2ECC40" },
        { name: "Firebase", color: "#FF851B" },
        { name: "Swift", color: "#0074D9" }
      ],
      location: "Seoul, South Korea",
      availability: "Morning Hours",
      expertise: "Mobile Developer",
      skillLevel: "advanced",
      hourlyRate: "$45-65",
      languages: ["English", "Korean"],
      projectCount: 22
    },
    {
      id: 6,
      name: "Emma Wilson",
      rating: 4.7,
      avatar: "/avatars/emma.jpg",
      skills: [
        { name: "Java", color: "#FF4136" },
        { name: "Spring Boot", color: "#2ECC40" },
        { name: "PostgreSQL", color: "#0074D9" }
      ],
      location: "London, UK",
      availability: "Weekdays",
      expertise: "Backend Developer",
      skillLevel: "advanced",
      hourlyRate: "$50-70",
      languages: ["English"],
      projectCount: 30
    },
    {
      id: 7,
      name: "Rahul Sharma",
      rating: 4.8,
      avatar: "/avatars/rahul.jpg",
      skills: [
        { name: "Angular", color: "#FF4136" },
        { name: "MongoDB", color: "#2ECC40" },
        { name: "Express.js", color: "#0074D9" }
      ],
      location: "Mumbai, India",
      availability: "Full-time",
      expertise: "Full Stack Developer",
      skillLevel: "advanced",
      hourlyRate: "$35-55",
      languages: ["English", "Hindi", "Marathi"],
      projectCount: 35
    },
    {
      id: 8,
      name: "Anjali Desai",
      rating: 4.7,
      avatar: "/avatars/anjali.jpg",
      skills: [
        { name: "Data Analysis", color: "#B10DC9" },
        { name: "R Programming", color: "#01FF70" },
        { name: "Tableau", color: "#FF851B" }
      ],
      location: "Chennai, India",
      availability: "Weekdays",
      expertise: "Data Analyst",
      skillLevel: "intermediate",
      hourlyRate: "$30-50",
      languages: ["English", "Tamil", "Hindi"],
      projectCount: 24
    },
    {
      id: 9,
      name: "Arjun Reddy",
      rating: 4.9,
      avatar: "/avatars/arjun.jpg",
      skills: [
        { name: "Blockchain", color: "#FF4136" },
        { name: "Solidity", color: "#7FDBFF" },
        { name: "Smart Contracts", color: "#B10DC9" }
      ],
      location: "Hyderabad, India",
      availability: "Flexible Hours",
      expertise: "Blockchain Developer",
      skillLevel: "advanced",
      hourlyRate: "$45-65",
      languages: ["English", "Telugu", "Hindi"],
      projectCount: 28
    }
  ]

  const filterUsers = () => {
    return users.filter(user => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = 
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchLower) ||
        user.skills.some(skill => skill.name.toLowerCase().includes(searchLower)) ||
        user.expertise.toLowerCase().includes(searchLower) ||
        user.location.toLowerCase().includes(searchLower)

      // Location filter
      const matchesLocation = 
        location === "all" ||
        (location === "india" && user.location.includes("India")) ||
        (location === "global" && !user.location.includes("India"))

      // Availability filter
      const matchesAvailability =
        availability === "any" ||
        user.availability.toLowerCase().includes(availability.toLowerCase())

      // Skill level filter
      const matchesSkillLevel =
        skillLevel === "all" ||
        user.skillLevel === skillLevel

      return matchesSearch && matchesLocation && matchesAvailability && matchesSkillLevel
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search query
    const newUrl = searchQuery.trim() 
      ? `/search?q=${encodeURIComponent(searchQuery.trim())}`
      : '/search'
    router.push(newUrl)
  }

  const filteredUsers = filterUsers()

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
                <Select value={skillLevel} onValueChange={setSkillLevel}>
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
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Time</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="flexible">Flexible Hours</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="morning">Morning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-4 text-gray-600">
            {filteredUsers.length > 0 ? (
              `Found ${filteredUsers.length} matches`
            ) : (
              <div className="text-center py-8">
                <div className="text-xl font-semibold text-gray-700 mb-2">No Matches Found</div>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms to find more results
                </p>
              </div>
            )}
          </div>

          {filteredUsers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold">{user.name}</h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <span className="ml-1 text-gray-600">{user.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-600 mb-3">
                      <span className="font-medium">{user.expertise}</span>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 rounded-full text-sm text-white"
                            style={{ backgroundColor: skill.color }}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>{user.availability}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium mr-2">Rate:</span>
                        <span>{user.hourlyRate}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium mr-2">Languages:</span>
                        <span>{user.languages.join(", ")}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium mr-2">Projects:</span>
                        <span>{user.projectCount} completed</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-[#B10DC9] hover:bg-[#8a0a9b] text-white">Request Skill Swap</Button>
                      <Button className="flex-1 bg-[#0074D9] hover:bg-[#0056a3] text-white">Send Message</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
