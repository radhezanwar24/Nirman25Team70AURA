<<<<<<< HEAD
"use client"

import { useState } from "react"
import { MessageCircle, Star, Clock, MapPin, Users, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

type Match = {
  id: string
  name: string
  image: string
  skills: string[]
  rating: number
  location: string
  availability: string
  matchPercentage: number
  lastActive: string
  students: number
  status: "pending" | "accepted" | "completed"
}

const SAMPLE_MATCHES: Match[] = [
  {
    id: "1",
    name: "Rahul Mehta",
    image: "/experts/rahul.jpg",
    skills: ["JavaScript", "React", "Node.js"],
    rating: 4.8,
    location: "Mumbai, India",
    availability: "Weekends",
    matchPercentage: 95,
    lastActive: "2 hours ago",
    students: 456,
    status: "pending"
  },
  {
    id: "2",
    name: "Lisa Chen",
    image: "/experts/lisa.jpg",
    skills: ["UI/UX Design", "Figma", "Adobe XD"],
    rating: 4.9,
    location: "Singapore",
    availability: "Weekday Evenings",
    matchPercentage: 92,
    lastActive: "Just now",
    students: 789,
    status: "accepted"
  },
  {
    id: "3",
    name: "Aditya Sharma",
    image: "/experts/aditya.jpg",
    skills: ["Python", "Machine Learning", "Data Science"],
    rating: 4.7,
    location: "Bangalore, India",
    availability: "Flexible Hours",
    matchPercentage: 88,
    lastActive: "1 day ago",
    students: 623,
    status: "completed"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    image: "/experts/sarah.jpg",
    skills: ["Digital Marketing", "SEO", "Content Strategy"],
    rating: 4.9,
    location: "London, UK",
    availability: "Morning Hours",
    matchPercentage: 91,
    lastActive: "3 hours ago",
    students: 892,
    status: "pending"
  },
  {
    id: "5",
    name: "Raj Patel",
    image: "/experts/raj.jpg",
    skills: ["Flutter", "Firebase", "Mobile Development"],
    rating: 4.8,
    location: "Delhi, India",
    availability: "Weekends",
    matchPercentage: 87,
    lastActive: "5 hours ago",
    students: 345,
    status: "accepted"
  }
]

const getStatusColor = (status: Match["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "accepted":
      return "bg-green-100 text-green-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function Matches() {
  const [activeTab, setActiveTab] = useState<Match["status"] | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMatches = SAMPLE_MATCHES.filter((match) => {
    const matchesStatus = activeTab === "all" || match.status === activeTab
    const matchesSearch = match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      match.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const tabs = [
    { id: "all", label: "All Matches", count: SAMPLE_MATCHES.length },
    { id: "pending", label: "Pending", count: SAMPLE_MATCHES.filter(m => m.status === "pending").length },
    { id: "accepted", label: "Accepted", count: SAMPLE_MATCHES.filter(m => m.status === "accepted").length },
    { id: "completed", label: "Completed", count: SAMPLE_MATCHES.filter(m => m.status === "completed").length }
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Matches</h1>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by name, skills, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id as Match["status"] | "all")}
              className="rounded-full"
            >
              {tab.label} <Badge variant="secondary" className="ml-2">{tab.count}</Badge>
            </Button>
          ))}
        </div>

        {/* Matches Grid */}
        <div className="grid gap-6">
          {filteredMatches.map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start gap-6">
                  {/* Profile Image */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={match.image}
                      alt={match.name}
                      layout="fill"
                      className="rounded-xl object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-gray-900">{match.name}</h3>
                          <Badge className={getStatusColor(match.status)}>
                            {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{match.rating}</span>
                          <span className="text-gray-300">•</span>
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{match.students} students</span>
                          <span className="text-gray-300">•</span>
                          <span>Active {match.lastActive}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {match.matchPercentage}%
                        </div>
                        <div className="text-sm text-gray-500">Match Score</div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {match.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="px-3 py-1 rounded-full"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {match.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {match.availability}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      {match.status === "pending" && (
                        <Button className="flex-1 md:flex-none">
                          Accept Match
                        </Button>
                      )}
                      <Button variant="outline" className="flex-1 md:flex-none">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                      {match.status === "accepted" && (
                        <Button variant="outline" className="flex-1 md:flex-none">
                          Schedule Meeting
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Empty State */}
          {filteredMatches.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl">
              <div className="text-gray-500 mb-4">No matches found</div>
              <Button onClick={() => { setActiveTab("all"); setSearchQuery("") }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
=======
export default function Matches() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Your Matches</h1>
      {/* Add matches content here */}
    </div>
  )
}

>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
