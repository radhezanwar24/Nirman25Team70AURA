"use client"

import { useState } from "react"
import { Play, Clock, Heart, Share2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Video = {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: number
  likes: number
  instructor: string
  category: string
  isLiked: boolean
}

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "1",
      title: "Introduction to Web Development",
      thumbnail: "/thumbnails/web-dev-intro.jpg",
      duration: "15:30",
      views: 1200,
      likes: 245,
      instructor: "John Smith",
      category: "Web Development",
      isLiked: false
    },
    {
      id: "2",
      title: "Advanced React Patterns",
      thumbnail: "/thumbnails/react-patterns.jpg",
      duration: "23:45",
      views: 850,
      likes: 190,
      instructor: "Emily Brown",
      category: "React",
      isLiked: true
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      thumbnail: "/thumbnails/uiux-design.jpg",
      duration: "18:20",
      views: 950,
      likes: 210,
      instructor: "David Wilson",
      category: "Design",
      isLiked: false
    }
  ])

  const toggleLike = (videoId: string) => {
    setVideos(videos.map(video =>
      video.id === videoId
        ? { ...video, isLiked: !video.isLiked, likes: video.isLiked ? video.likes - 1 : video.likes + 1 }
        : video
    ))
  }

  const formatViews = (views: number) => {
    return views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Learning Videos</h2>
        <div className="flex gap-4">
          <Button variant="outline">
            Filter
          </Button>
          <Button>
            Upload Video
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Play className="w-6 h-6" />
                </Button>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </span>
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                  <CardDescription>{video.instructor}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatViews(video.views)} views
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleLike(video.id)}
                    className={video.isLiked ? "text-red-500" : ""}
                  >
                    <Heart className="w-4 h-4" fill={video.isLiked ? "currentColor" : "none"} />
                  </Button>
                </div>
                <Button variant="ghost" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
