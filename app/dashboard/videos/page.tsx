"use client"

import { useState } from "react"
import { Play, Clock, Eye, ThumbsUp, Plus, Filter, Upload, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type Video = {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: number
  likes: number
  date: string
  category: string
  description: string
}

const SAMPLE_VIDEOS: Video[] = [
  {
    id: "1",
    title: "Introduction to React Hooks",
    description: "Learn the basics of React Hooks and how to use them effectively in your applications.",
    thumbnail: "/thumbnails/react-hooks.jpg",
    duration: "15:30",
    views: 1234,
    likes: 89,
    date: "2 days ago",
    category: "Programming"
  },
  {
    id: "2",
    title: "Advanced UI Design Principles",
    description: "Master the principles of modern UI design and create beautiful user interfaces.",
    thumbnail: "/thumbnails/ui-design.jpg",
    duration: "22:45",
    views: 856,
    likes: 67,
    date: "1 week ago",
    category: "Design"
  },
  {
    id: "3",
    title: "Machine Learning Basics",
    description: "Get started with machine learning concepts and practical implementations.",
    thumbnail: "/thumbnails/ml-basics.jpg",
    duration: "18:20",
    views: 2341,
    likes: 156,
    date: "3 days ago",
    category: "Data Science"
  }
]

export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["all", "Programming", "Design", "Data Science", "Business"]

  const filteredVideos = SAMPLE_VIDEOS.filter((video) => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Videos</h1>
          <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Upload className="w-4 h-4 mr-2" />
            Upload New Video
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search your videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-4 h-4 text-gray-500" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap rounded-full"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Thumbnail */}
              <div className="relative aspect-video group">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  layout="fill"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="lg" className="rounded-full">
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-sm rounded-md">
                  {video.duration}
                </div>
                <Badge className="absolute top-2 right-2 bg-primary/90" variant="default">
                  {video.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {video.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {video.likes.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {video.date}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 pb-4 flex gap-2">
                <Button variant="outline" className="flex-1">
                  Edit
                </Button>
                <Button variant="outline" className="flex-1">
                  Share
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No videos found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "Upload your first video to get started"}
              </p>
              <div className="flex justify-center gap-4">
                {(searchQuery || selectedCategory !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Video
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
