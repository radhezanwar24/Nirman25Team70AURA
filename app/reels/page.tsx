"use client"

import { useState } from "react"
import { Play, Heart, BookmarkPlus } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import PublicNavBar from "@/components/PublicNavBar"
import TopNavBar from "@/components/dashboard/TopNavBar"
import PublicReels from "@/components/reels/PublicReels"
import PrivateReels from "@/components/reels/PrivateReels"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

const categories = ["All", "Programming", "Design", "Marketing", "Cooking", "Music", "Language"]

const videos = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    category: "Programming",
    thumbnail: "/placeholder.svg?height=200&width=350",
    likes: 1200,
    saves: 450,
  },
  {
    id: 2,
    title: "Mastering UI/UX Design Principles",
    category: "Design",
    thumbnail: "/placeholder.svg?height=200&width=350",
    likes: 980,
    saves: 320,
  },
  {
    id: 3,
    title: "Digital Marketing Strategies for 2023",
    category: "Marketing",
    thumbnail: "/placeholder.svg?height=200&width=350",
    likes: 1500,
    saves: 600,
  },
  {
    id: 4,
    title: "Gourmet Cooking at Home",
    category: "Cooking",
    thumbnail: "/placeholder.svg?height=200&width=350",
    likes: 2200,
    saves: 890,
  },
  {
    id: 5,
    title: "Guitar Basics for Beginners",
    category: "Music",
    thumbnail: "/placeholder.svg?height=200&width=350",
    likes: 1800,
    saves: 720,
  },
  {
    id: 6,
    title: "Spanish for Travelers",
    category: "Language",
    thumbnail: "/placeholder.svg?height=200&width=350",
    likes: 1100,
    saves: 480,
  },
]

export default function ReelsPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen">
      {isAuthenticated ? <TopNavBar /> : <PublicNavBar />}
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="public" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8">
              <TabsTrigger value="public">Public Reels</TabsTrigger>
              <TabsTrigger value="private">Private Reels</TabsTrigger>
            </TabsList>
            <TabsContent value="public">
              <PublicReels />
            </TabsContent>
            <TabsContent value="private">
              <PrivateReels />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
