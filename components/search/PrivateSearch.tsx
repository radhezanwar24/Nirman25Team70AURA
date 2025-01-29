"use client"

import { useState } from "react"
import { Search, Filter, MessageCircle, UserPlus, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"

type SearchResult = {
  id: string
  title: string
  type: "mentor" | "peer" | "expert"
  name: string
  skills: string[]
  matchPercentage: number
  avatar: string
  isConnected: boolean
}

export default function PrivateSearch() {
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([
    {
      id: "1",
      title: "Senior Web Developer",
      type: "mentor",
      name: "Mayur Singha",
      skills: ["React", "Node.js", "TypeScript"],
      matchPercentage: 92,
      avatar: "/avatars/sarah.jpg",
      isConnected: false
    },
    {
      id: "2",
      title: "UX Designer",
      type: "peer",
      name: "Dhanashri Mundada",
      skills: ["Figma", "UI Design", "User Research"],
      matchPercentage: 85,
      avatar: "/avatars/mike.jpg",
      isConnected: true
    },
    {
      id: "3",
      title: "AI/ML Expert",
      type: "expert",
      name: "Dr. Meera Modi",
      skills: ["Machine Learning", "Python", "Data Science"],
      matchPercentage: 78,
      avatar: "/avatars/emily.jpg",
      isConnected: false
    }
  ])

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <h2 className="text-2xl font-bold mb-4">Advanced Search</h2>
        <p className="text-muted-foreground mb-4">Please log in to access advanced search features</p>
        <Button>Log In</Button>
      </div>
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call
    console.log("Searching for:", searchQuery)
  }

  const handleConnect = (resultId: string) => {
    setResults(results.map(result =>
      result.id === resultId ? { ...result, isConnected: true } : result
    ))
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search for mentors, peers, or experts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>
      </form>

      <div className="grid gap-6 md:grid-cols-2">
        {results.map((result) => (
          <Card key={result.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src={result.avatar}
                  alt={result.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {result.type}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {result.matchPercentage}% match
                    </span>
                  </div>
                  <CardTitle>{result.name}</CardTitle>
                  <CardDescription>{result.title}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {result.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-full bg-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {!result.isConnected ? (
                    <Button
                      className="flex-1"
                      onClick={() => handleConnect(result.id)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  ) : (
                    <Button className="flex-1" variant="secondary">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  )}
                  <Button variant="outline" size="icon">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
