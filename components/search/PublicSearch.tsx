"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type SearchResult = {
  id: string
  title: string
  type: "skill" | "course" | "user"
  description: string
  tags: string[]
  thumbnail?: string
}

export default function PublicSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([
    {
      id: "1",
      title: "Web Development Fundamentals",
      type: "course",
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
    }
  ])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call
    console.log("Searching for:", searchQuery)
  }

  return (
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
          Filters
        </Button>
      </form>

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
        ))}
      </div>
    </div>
  )
}
