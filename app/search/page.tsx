"use client"

import { useAuth } from "@/context/auth-context"
import PublicNavBar from "@/components/PublicNavBar"
import TopNavBar from "@/components/dashboard/TopNavBar"
<<<<<<< HEAD
import { useState, useMemo } from "react"
import { Search, Star, MapPin, Clock, Users, ChevronRight, Sparkles } from "lucide-react"
=======
import PublicSearch from "@/components/search/PublicSearch"
import PrivateSearch from "@/components/search/PrivateSearch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { SearchIcon, Star, MapPin, Clock } from "lucide-react"
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
<<<<<<< HEAD

const SAMPLE_USERS = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 4.9,
    skills: [
      { name: "Machine Learning", color: "from-[#4F46E5] to-[#7C3AED]" },
      { name: "Python", color: "from-[#2563EB] to-[#7C3AED]" },
      { name: "Data Science", color: "from-[#7C3AED] to-[#9333EA]" }
    ],
    location: "Bangalore, India",
    availability: "Weekday Evenings",
    image: "/experts/priya.jpg",
    level: "Expert",
    students: 1580,
    gradient: "from-[#4F46E5] to-[#7C3AED]",
    languages: ["English", "Hindi", "Kannada"]
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    rating: 4.8,
    skills: [
      { name: "Photography", color: "from-[#F59E0B] to-[#EF4444]" },
      { name: "Video Editing", color: "from-[#EF4444] to-[#DC2626]" },
      { name: "Adobe Suite", color: "from-[#DC2626] to-[#B91C1C]" }
    ],
    location: "New York, USA",
    availability: "Flexible Hours",
    image: "/experts/marcus.jpg",
    level: "Professional",
    students: 856,
    gradient: "from-[#F59E0B] to-[#EF4444]",
    languages: ["English", "Spanish"]
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    rating: 4.7,
    skills: [
      { name: "Web Development", color: "from-[#10B981] to-[#059669]" },
      { name: "React", color: "from-[#059669] to-[#047857]" },
      { name: "Node.js", color: "from-[#047857] to-[#065F46]" }
    ],
    location: "Mumbai, India",
    availability: "Weekends",
    image: "/experts/rajesh.jpg",
    level: "Advanced",
    students: 932,
    gradient: "from-[#10B981] to-[#3B82F6]",
    languages: ["English", "Hindi", "Marathi"]
  },
  {
    id: 4,
    name: "Emma Thompson",
    rating: 4.9,
    skills: [
      { name: "Business Strategy", color: "from-[#8B5CF6] to-[#6D28D9]" },
      { name: "Marketing", color: "from-[#6D28D9] to-[#5B21B6]" },
      { name: "Leadership", color: "from-[#5B21B6] to-[#4C1D95]" }
    ],
    location: "London, UK",
    availability: "Morning Hours",
    image: "/experts/emma.jpg",
    level: "Expert",
    students: 1245,
    gradient: "from-[#8B5CF6] to-[#6D28D9]",
    languages: ["English", "French"]
  },
  {
    id: 5,
    name: "Ananya Patel",
    rating: 4.8,
    skills: [
      { name: "UI/UX Design", color: "from-[#EC4899] to-[#BE185D]" },
      { name: "Figma", color: "from-[#BE185D] to-[#9D174D]" },
      { name: "Product Design", color: "from-[#9D174D] to-[#831843]" }
    ],
    location: "Delhi, India",
    availability: "Weekdays",
    image: "/experts/ananya.jpg",
    level: "Professional",
    students: 745,
    gradient: "from-[#EC4899] to-[#BE185D]",
    languages: ["English", "Hindi"]
  },
  {
    id: 6,
    name: "Arjun Reddy",
    rating: 4.7,
    skills: [
      { name: "Mobile Development", color: "from-[#F97316] to-[#EA580C]" },
      { name: "Flutter", color: "from-[#EA580C] to-[#C2410C]" },
      { name: "Firebase", color: "from-[#C2410C] to-[#9A3412]" }
    ],
    location: "Hyderabad, India",
    availability: "Evenings & Weekends",
    image: "/experts/arjun.jpg",
    level: "Advanced",
    students: 678,
    gradient: "from-[#F97316] to-[#EA580C]",
    languages: ["English", "Hindi", "Telugu"]
  },
  {
    id: 7,
    name: "Neha Gupta",
    rating: 4.9,
    skills: [
      { name: "Digital Marketing", color: "from-[#06B6D4] to-[#0891B2]" },
      { name: "Social Media", color: "from-[#0891B2] to-[#0E7490]" },
      { name: "Content Creation", color: "from-[#0E7490] to-[#155E75]" }
    ],
    location: "Pune, India",
    availability: "Flexible Hours",
    image: "/experts/neha.jpg",
    level: "Expert",
    students: 1123,
    gradient: "from-[#06B6D4] to-[#0891B2]",
    languages: ["English", "Hindi", "Marathi"]
  },
  {
    id: 8,
    name: "David Chen",
    rating: 4.8,
    skills: [
      { name: "Game Development", color: "from-[#8B5CF6] to-[#7C3AED]" },
      { name: "Unity", color: "from-[#7C3AED] to-[#6D28D9]" },
      { name: "C#", color: "from-[#6D28D9] to-[#5B21B6]" }
    ],
    location: "Vancouver, Canada",
    availability: "Evening Hours",
    image: "/experts/david.jpg",
    level: "Professional",
    students: 892,
    gradient: "from-[#8B5CF6] to-[#7C3AED]",
    languages: ["English", "Mandarin"]
  },
  {
    id: 9,
    name: "Ravi Verma",
    rating: 4.7,
    skills: [
      { name: "Blockchain", color: "from-[#14B8A6] to-[#0D9488]" },
      { name: "Smart Contracts", color: "from-[#0D9488] to-[#0F766E]" },
      { name: "Solidity", color: "from-[#0F766E] to-[#115E59]" }
    ],
    location: "Ahmedabad, India",
    availability: "Weekends",
    image: "/experts/ravi.jpg",
    level: "Advanced",
    students: 645,
    gradient: "from-[#14B8A6] to-[#0D9488]",
    languages: ["English", "Hindi", "Gujarati"]
  },
  {
    id: 10,
    name: "Sophie Martin",
    rating: 4.9,
    skills: [
      { name: "3D Animation", color: "from-[#F43F5E] to-[#E11D48]" },
      { name: "Blender", color: "from-[#E11D48] to-[#BE123C]" },
      { name: "Motion Graphics", color: "from-[#BE123C] to-[#9F1239]" }
    ],
    location: "Paris, France",
    availability: "Weekdays",
    image: "/experts/sophie.jpg",
    level: "Expert",
    students: 978,
    gradient: "from-[#F43F5E] to-[#E11D48]",
    languages: ["English", "French"]
  },
  {
    id: 11,
    name: "Karthik Iyer",
    rating: 4.8,
    skills: [
      { name: "DevOps", color: "from-[#84CC16] to-[#65A30D]" },
      { name: "AWS", color: "from-[#65A30D] to-[#4D7C0F]" },
      { name: "Docker", color: "from-[#4D7C0F] to-[#3F6212]" }
    ],
    location: "Chennai, India",
    availability: "Morning Hours",
    image: "/experts/karthik.jpg",
    level: "Professional",
    students: 756,
    gradient: "from-[#84CC16] to-[#65A30D]",
    languages: ["English", "Tamil", "Hindi"]
  },
  {
    id: 12,
    name: "Meera Shah",
    rating: 4.7,
    skills: [
      { name: "Data Analytics", color: "from-[#6366F1] to-[#4F46E5]" },
      { name: "Tableau", color: "from-[#4F46E5] to-[#4338CA]" },
      { name: "SQL", color: "from-[#4338CA] to-[#3730A3]" }
    ],
    location: "Kolkata, India",
    availability: "Flexible Hours",
    image: "/experts/meera.jpg",
    level: "Advanced",
    students: 534,
    gradient: "from-[#6366F1] to-[#4F46E5]",
    languages: ["English", "Bengali", "Hindi"]
  }
]
=======
import { useRouter, useSearchParams } from "next/navigation"
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435

export default function SearchPage() {
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [skillLevel, setSkillLevel] = useState("all")
  const [availability, setAvailability] = useState("any")
  const [location, setLocation] = useState("all")
<<<<<<< HEAD

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return SAMPLE_USERS.filter(user => {
      const matchesSearch = searchQuery === "" || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.languages.some(lang => lang.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesLevel = skillLevel === "all" || user.level.toLowerCase() === skillLevel.toLowerCase()
      
      const matchesAvailability = availability === "any" || 
        user.availability.toLowerCase().includes(availability.toLowerCase())
      
      const matchesLocation = location === "all" || 
        (location === "local" && user.location.includes("India")) ||
        (location === "global" && !user.location.includes("India"))

      return matchesSearch && matchesLevel && matchesAvailability && matchesLocation
    })
  }, [searchQuery, skillLevel, availability, location])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? <TopNavBar /> : <PublicNavBar />}
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#B10DC9] bg-clip-text text-transparent mb-4">
              Find Your Perfect Skill Match
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with expert instructors and learn the skills you've always wanted
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12">
            <div className="flex shadow-lg rounded-2xl">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input
                  type="text"
                  placeholder="Search by name, skills, location, or language..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-l-2xl border-0 ring-0 focus:ring-0 focus:border-0"
                />
              </div>
              <Button type="submit" className="h-14 px-8 rounded-r-2xl bg-gradient-to-r from-[#4F46E5] to-[#B10DC9] text-white hover:opacity-90 transition-opacity">
                <Search className="h-5 w-5 mr-2" />
                <span>Search</span>
=======
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
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
              </Button>
            </div>
          </form>

          {/* Filters Panel */}
<<<<<<< HEAD
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#B10DC9]" />
                Smart Filters
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="skill-level" className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Level
                </label>
                <Select value={skillLevel} onValueChange={setSkillLevel}>
                  <SelectTrigger id="skill-level" className="h-12">
=======
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="skill-level" className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Level
                </label>
                <Select value={skillLevel} onValueChange={setSkillLevel}>
                  <SelectTrigger id="skill-level">
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
<<<<<<< HEAD
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
=======
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
                  </SelectContent>
                </Select>
              </div>
              <div>
<<<<<<< HEAD
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger id="availability" className="h-12">
=======
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger id="availability">
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Time</SelectItem>
<<<<<<< HEAD
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="weekday">Weekdays</SelectItem>
                    <SelectItem value="weekend">Weekends</SelectItem>
=======
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="flexible">Flexible Hours</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="morning">Morning</SelectItem>
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
                  </SelectContent>
                </Select>
              </div>
              <div>
<<<<<<< HEAD
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location" className="h-12">
=======
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
<<<<<<< HEAD
                    <SelectItem value="local">India</SelectItem>
                    <SelectItem value="global">International</SelectItem>
=======
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="global">Global</SelectItem>
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

<<<<<<< HEAD
          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUsers.map((user) => (
              <div key={user.id} className="group">
                <div className="relative h-[420px] bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${user.gradient} opacity-90`} />
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <Image
                      src="/patterns/grid.svg"
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      className="opacity-20"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col text-white">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-16 h-16">
                        <Image
                          src={user.image}
                          alt={user.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{user.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-300" />
                            <span className="ml-1 font-medium">{user.rating}</span>
                          </div>
                          <span className="text-white/60">•</span>
                          <span className="text-white/90">{user.level}</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-4 mb-6">
                      <h4 className="font-semibold">Expert in</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                          <span
                            key={skill.name}
                            className={`px-3 py-1 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors`}
=======
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
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
<<<<<<< HEAD

                    {/* Info */}
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{user.availability}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{user.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {user.languages.map((lang) => (
                          <span key={lang} className="text-white/80 text-xs">
                            {lang}{user.languages.indexOf(lang) < user.languages.length - 1 ? " • " : ""}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto space-y-3">
                      <Button className="w-full h-11 bg-white/10 hover:bg-white hover:text-gray-900 transition-colors">
                        Request Skill Swap
                      </Button>
                      <Button className="w-full h-11 bg-white text-gray-900 hover:bg-white/90 flex items-center justify-center gap-2">
                        View Profile
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
=======
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
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
        </div>
      </main>
    </div>
  )
}
