"use client"

import { useState } from "react"
import { Trophy, Award, Gift, Star, ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Achievement = {
  id: string
  title: string
  description: string
  progress: number
  total: number
  reward: string
  icon: "Trophy" | "Award" | "Star"
}

type Reward = {
  id: string
  title: string
  points: number
  description: string
  image: string
  claimed: boolean
}

export default function Rewards() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Skill Master",
      description: "Complete 10 skill assessments",
      progress: 7,
      total: 10,
      reward: "50 Points",
      icon: "Trophy"
    },
    {
      id: "2",
      title: "Helpful Mentor",
      description: "Help 5 users with their learning goals",
      progress: 3,
      total: 5,
      reward: "100 Points",
      icon: "Award"
    },
    {
      id: "3",
      title: "Content Creator",
      description: "Create and share 3 learning resources",
      progress: 1,
      total: 3,
      reward: "75 Points",
      icon: "Star"
    }
  ])

  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: "1",
      title: "Premium Course Access",
      points: 500,
      description: "Get 1 month free access to premium courses",
      image: "/rewards/premium-course.jpg",
      claimed: false
    },
    {
      id: "2",
      title: "1-on-1 Mentoring Session",
      points: 750,
      description: "30-minute session with an expert mentor",
      image: "/rewards/mentoring.jpg",
      claimed: false
    },
    {
      id: "3",
      title: "Skill Certificate",
      points: 1000,
      description: "Get a verified certificate for your skills",
      image: "/rewards/certificate.jpg",
      claimed: true
    }
  ])

  const [userPoints, setUserPoints] = useState(650)

  const getIcon = (iconName: "Trophy" | "Award" | "Star") => {
    switch (iconName) {
      case "Trophy": return <Trophy className="w-6 h-6" />
      case "Award": return <Award className="w-6 h-6" />
      case "Star": return <Star className="w-6 h-6" />
    }
  }

  const claimReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId)
    if (reward && !reward.claimed && userPoints >= reward.points) {
      setRewards(rewards.map(r =>
        r.id === rewardId ? { ...r, claimed: true } : r
      ))
      setUserPoints(userPoints - reward.points)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rewards & Achievements</h2>
        <div className="flex items-center space-x-2">
          <Gift className="w-5 h-5" />
          <span className="font-semibold">{userPoints} Points</span>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Current Achievements</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {getIcon(achievement.icon)}
                </div>
                <div>
                  <CardTitle>{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{achievement.progress} / {achievement.total}</span>
                    <span className="text-primary">{achievement.reward}</span>
                  </div>
                  <Progress value={(achievement.progress / achievement.total) * 100} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-8">Available Rewards</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward) => (
            <Card key={reward.id} className={reward.claimed ? "opacity-75" : ""}>
              <div className="relative aspect-video">
                <img
                  src={reward.image}
                  alt={reward.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle>{reward.title}</CardTitle>
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{reward.points} Points</span>
                  <Button
                    variant={reward.claimed ? "secondary" : "default"}
                    disabled={reward.claimed || userPoints < reward.points}
                    onClick={() => claimReward(reward.id)}
                  >
                    {reward.claimed ? "Claimed" : "Claim Reward"}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
