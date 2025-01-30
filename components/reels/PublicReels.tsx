"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, BookmarkPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"

type Reel = {
  id: string
  videoUrl: string
  thumbnail: string
  username: string
  description: string
  likes: number
  comments: number
  isLiked: boolean
}

export default function PublicReels() {
  const { isAuthenticated } = useAuth()
  const [reels, setReels] = useState<Reel[]>([
    {
      id: "1",
      videoUrl: "/reels/coding-tutorial.mp4",
      thumbnail: "/thumbnails/coding.jpg",
      username: "techmaster",
      description: "Quick tutorial on React Hooks #coding #webdev",
      likes: 1200,
      comments: 45,
      isLiked: false
    },
    {
      id: "2",
      videoUrl: "/reels/design-tips.mp4",
      thumbnail: "/thumbnails/design.jpg",
      username: "designpro",
      description: "Essential UI/UX tips for beginners 🎨 #design",
      likes: 890,
      comments: 32,
      isLiked: false
    }
  ])

  const handleLike = (reelId: string) => {
    if (!isAuthenticated) {
      alert("Please log in to like reels")
      return
    }
    setReels(reels.map(reel =>
      reel.id === reelId
        ? { ...reel, isLiked: !reel.isLiked, likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1 }
        : reel
    ))
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold">Trending Skills</h2>
      
      <div className="space-y-6">
        {reels.map((reel) => (
          <Card key={reel.id} className="overflow-hidden">
            <div className="relative aspect-[9/16] bg-black">
              <img
                src={reel.thumbnail}
                alt={reel.description}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="font-semibold">@{reel.username}</p>
                <p className="text-sm">{reel.description}</p>
              </div>
            </div>
            
            <div className="p-4 flex justify-between items-center">
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(reel.id)}
                  className={reel.isLiked ? "text-red-500" : ""}
                >
                  <Heart className="w-5 h-5 mr-1" fill={reel.isLiked ? "currentColor" : "none"} />
                  {reel.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-5 h-5 mr-1" />
                  {reel.comments}
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
                {isAuthenticated && (
                  <Button variant="ghost" size="icon">
                    <BookmarkPlus className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
