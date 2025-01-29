"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, BookmarkPlus, Plus } from "lucide-react"
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
  isSaved: boolean
  isPrivate: boolean
}

export default function PrivateReels() {
  const { isAuthenticated } = useAuth()
  const [reels, setReels] = useState<Reel[]>([
    {
      id: "1",
      videoUrl: "/reels/advanced-coding.mp4",
      thumbnail: "/thumbnails/advanced-coding.jpg",
      username: "codingexpert",
      description: "Advanced TypeScript patterns you need to know 🚀 #typescript #coding",
      likes: 450,
      comments: 28,
      isLiked: true,
      isSaved: true,
      isPrivate: true
    },
    {
      id: "2",
      videoUrl: "/reels/system-design.mp4",
      thumbnail: "/thumbnails/system-design.jpg",
      username: "systemarchitect",
      description: "System design interview tips 💡 #systemdesign #interview",
      likes: 320,
      comments: 15,
      isLiked: false,
      isSaved: true,
      isPrivate: true
    }
  ])

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <h2 className="text-2xl font-bold mb-4">Private Reels</h2>
        <p className="text-muted-foreground mb-4">Please log in to view private reels</p>
        <Button>Log In</Button>
      </div>
    )
  }

  const handleLike = (reelId: string) => {
    setReels(reels.map(reel =>
      reel.id === reelId
        ? { ...reel, isLiked: !reel.isLiked, likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1 }
        : reel
    ))
  }

  const handleSave = (reelId: string) => {
    setReels(reels.map(reel =>
      reel.id === reelId
        ? { ...reel, isSaved: !reel.isSaved }
        : reel
    ))
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Private Reels</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Reel
        </Button>
      </div>
      
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSave(reel.id)}
                  className={reel.isSaved ? "text-primary" : ""}
                >
                  <BookmarkPlus className="w-5 h-5" fill={reel.isSaved ? "currentColor" : "none"} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
