"use client"

import { useState } from "react"
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
import { Search, Filter, Star, Clock, Users, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
<<<<<<< HEAD
=======
=======
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366

type SearchResult = {
  id: string
  title: string
  type: "skill" | "course" | "user"
  description: string
  tags: string[]
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
  thumbnail: string
  rating: number
  students: number
  duration?: string
  instructor?: string
  level: "Beginner" | "Intermediate" | "Advanced"
  gradient: string
  lastUpdated: string
<<<<<<< HEAD
=======
=======
  thumbnail?: string
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
}

export default function PublicSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([
    {
      id: "1",
      title: "Web Development Fundamentals",
      type: "course",
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
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
<<<<<<< HEAD
=======
=======
      description: "Learn the basics of web development with HTML, CSS, and JavaScript",
      tags: ["web development", "beginner", "coding"],
      thumbnail: "/thumbnails/web-dev.jpg"
    },
    {
      id: "2",
      title: "UI/UX Design",
      type: "skill",
      description: "Essential skill for creating user-friendly interfaces",
      tags: ["design", "ui", "ux"],
      thumbnail: "/thumbnails/uiux.jpg"
    },
    {
      id: "3",
      title: "Python Programming",
      type: "course",
      description: "Master Python programming from scratch",
      tags: ["python", "programming", "beginner"],
      thumbnail: "/thumbnails/python.jpg"
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
    }
  ])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call
    console.log("Searching for:", searchQuery)
  }

  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
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
<<<<<<< HEAD
=======
=======
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search for skills, courses, or users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
          Filters
        </Button>
      </form>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
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
<<<<<<< HEAD
=======
=======
      <div className="grid gap-6 md:grid-cols-2">
        {results.map((result) => (
          <Card key={result.id}>
            {result.thumbnail && (
              <div className="relative aspect-video">
                <img
                  src={result.thumbnail}
                  alt={result.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {result.type}
                </span>
              </div>
              <CardTitle>{result.title}</CardTitle>
              <CardDescription>{result.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
        ))}
      </div>
    </div>
  )
}
