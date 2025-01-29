"use client"

import { useState } from "react"
import Image from "next/image"
import { MessageCircle, Star, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Match = {
  id: string
  name: string
  skills: string[]
  matchPercentage: number
  avatar: string
  status: "pending" | "connected" | "messaged"
}

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([
    {
      id: "1",
      name: "Radhe",
      skills: ["Python", "Machine Learning", "Data Analysis"],
      matchPercentage: 95,
      avatar: "/avatars/alex.jpg",
      status: "pending"
    },
    {
      id: "2",
      name: " Abhinav",
      skills: ["UI/UX Design", "Figma", "Web Design"],
      matchPercentage: 88,
      avatar: "/avatars/sarah.jpg",
      status: "connected"
    },
    {
      id: "3",
      name: "Jiya",
      skills: ["JavaScript", "React", "Node.js"],
      matchPercentage: 85,
      avatar: "/avatars/michael.jpg",
      status: "messaged"
    }
  ])

  const handleConnect = (matchId: string) => {
    setMatches(matches.map(match =>
      match.id === matchId ? { ...match, status: "connected" } : match
    ))
  }

  const handleMessage = (matchId: string) => {
    setMatches(matches.map(match =>
      match.id === matchId ? { ...match, status: "messaged" } : match
    ))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Matches</h2>
        <Button variant="outline">
          Filter Matches
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <Card key={match.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative h-12 w-12">
                  <Image
                    src={match.avatar}
                    alt={match.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  <span 
                    className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3"
                    title="Online"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">{match.name}</CardTitle>
                  <CardDescription>
                    {match.matchPercentage}% Match
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {match.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-secondary px-2 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  {match.status === "pending" && (
                    <Button
                      className="flex-1"
                      onClick={() => handleConnect(match.id)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  )}
                  {match.status !== "pending" && (
                    <Button
                      className="flex-1"
                      variant={match.status === "messaged" ? "secondary" : "default"}
                      onClick={() => handleMessage(match.id)}
                    >
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
