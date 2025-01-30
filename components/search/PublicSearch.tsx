"use client"

import { useState } from "react"
import { Search, Filter, Star, Clock, Users, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type SearchResult = {
  id: string
  title: string
  type: "skill" | "course" | "user"
  description: string
  tags: string[]
  thumbnail: string
  rating: number
  students: number
  duration?: string
  instructor?: string
  level: "Beginner" | "Intermediate" | "Advanced"
  gradient: string
  lastUpdated: string
}

export default function PublicSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([
    {
      id: "1",
      title: "Web Development Fundamentals",
      type: "course",
      description: "Master modern web development with hands-on projects. Learn HTML, CSS, JavaScript, and React through practical examples.",
      tags: ["React", "JavaScript", "HTML/CSS"],
      thumbnail: "/thumbnails/web-dev.jpg",
      rating: 4.8,
      students: 1240,
      duration: "8 weeks",
      instructor: "Sarah Chen",
      level: "Beginner",
      gradient: "from-[#4F46E5] to-[#7C3AED]",
      lastUpdated: "Jan 28, 2025"
    },
    {
      id: "2",
      title: "Digital Photography Masterclass",
      type: "skill",
      description: "Learn professional photography techniques, from composition to post-processing. Perfect for aspiring photographers.",
      tags: ["Photography", "Editing", "Composition"],
      thumbnail: "/thumbnails/photography.jpg",
      rating: 4.9,
      students: 856,
      duration: "6 weeks",
      instructor: "Marcus Rodriguez",
      level: "Intermediate",
      gradient: "from-[#F59E0B] to-[#EF4444]",
      lastUpdated: "Jan 25, 2025"
    },
    {
      id: "3",
      title: "Data Science & Analytics",
      type: "course",
      description: "Comprehensive data science course covering Python, statistics, machine learning, and real-world applications.",
      tags: ["Python", "ML", "Statistics"],
      thumbnail: "/thumbnails/data-science.jpg",
      rating: 4.7,
      students: 932,
      duration: "12 weeks",
      instructor: "Alex Kim",
      level: "Advanced",
      gradient: "from-[#10B981] to-[#3B82F6]",
      lastUpdated: "Jan 20, 2025"
    }
  ])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Find Your Next Skill
        </h1>
        <p className="text-gray-500">
          Discover courses, skills, and connect with expert instructors
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl mx-auto mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search for skills, courses, or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-lg rounded-2xl border-gray-200 focus:border-primary focus:ring-primary"
          />
        </div>
        <Button 
          variant="outline" 
          className="h-12 px-6 rounded-2xl border-gray-200 hover:border-primary hover:text-primary transition-colors"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </Button>
      </form>

      {/* Results Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <div key={result.id} className="group relative">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${result.gradient} opacity-90`} />
              
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={result.thumbnail}
                  alt={result.title}
                  layout="fill"
                  objectFit="cover"
                  className="opacity-20 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Content */}
              <div className="relative h-full p-6 flex flex-col">
                {/* Top Section */}
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white`}>
                      {result.level}
                    </span>
                    <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-yellow-300 mr-1" />
                      <span className="text-white text-sm font-medium">{result.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{result.title}</h3>
                  
                  {result.instructor && (
                    <p className="text-white/90 text-sm mb-2">
                      by {result.instructor}
                    </p>
                  )}
                  
                  <div className="flex items-center text-white/80 text-sm mb-4">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{result.students.toLocaleString()} students</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/90 text-sm mb-6 line-clamp-3">
                  {result.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {result.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Section */}
                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between text-sm text-white/80">
                    {result.duration && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {result.duration}
                      </div>
                    )}
                    <div className="text-white/60 text-xs">
                      Updated {result.lastUpdated}
                    </div>
                  </div>

                  <button className="w-full bg-white/10 text-white py-3 px-4 rounded-xl font-medium 
                    hover:bg-white hover:text-gray-900 transition-all duration-300 
                    group-hover:scale-[1.02] flex items-center justify-center">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
