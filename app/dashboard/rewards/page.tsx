"use client"

import { useState } from "react"
import { Trophy, Star, Gift, Award, Crown, Target, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Achievement = {
  id: string
  title: string
  description: string
  icon: JSX.Element
  progress: number
  total: number
  reward: string
  completed: boolean
  color: string
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    title: "Master Teacher",
    description: "Complete 50 successful skill swaps",
    icon: <Trophy className="w-8 h-8" />,
    progress: 42,
    total: 50,
    reward: "Gold Badge + 1000 Points",
    completed: false,
    color: "from-yellow-500 to-amber-600"
  },
  {
    id: "2",
    title: "Community Champion",
    description: "Receive 100 positive reviews",
    icon: <Star className="w-8 h-8" />,
    progress: 89,
    total: 100,
    reward: "Premium Status + 2000 Points",
    completed: false,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "3",
    title: "Skill Pioneer",
    description: "Teach 5 different skills",
    icon: <Crown className="w-8 h-8" />,
    progress: 5,
    total: 5,
    reward: "Special Badge + 500 Points",
    completed: true,
    color: "from-purple-500 to-purple-600"
  }
]

const CURRENT_POINTS = 2450
const NEXT_REWARD = 3000

const RECENT_ACTIVITIES = [
  { 
    action: "Completed a skill swap",
    points: 100,
    date: "2 hours ago",
    icon: <Zap className="w-5 h-5 text-yellow-500" />
  },
  { 
    action: "Received 5-star review",
    points: 50,
    date: "1 day ago",
    icon: <Star className="w-5 h-5 text-blue-500" />
  },
  { 
    action: "Achievement unlocked",
    points: 200,
    date: "3 days ago",
    icon: <Trophy className="w-5 h-5 text-purple-500" />
  },
  { 
    action: "Weekly bonus",
    points: 100,
    date: "1 week ago",
    icon: <Gift className="w-5 h-5 text-green-500" />
  }
]

export default function Rewards() {
  const [selectedTab, setSelectedTab] = useState<"achievements" | "points">("achievements")

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rewards & Achievements</h1>
          <div className="flex gap-4">
            <Button
              variant={selectedTab === "achievements" ? "default" : "outline"}
              onClick={() => setSelectedTab("achievements")}
              className="rounded-full"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Achievements
            </Button>
            <Button
              variant={selectedTab === "points" ? "default" : "outline"}
              onClick={() => setSelectedTab("points")}
              className="rounded-full"
            >
              <Star className="w-4 h-4 mr-2" />
              Points
            </Button>
          </div>
        </div>

        {selectedTab === "achievements" ? (
          <div className="grid gap-6">
            {ACHIEVEMENTS.map((achievement) => (
              <Card
                key={achievement.id}
                className={`overflow-hidden transition-all duration-300 ${
                  achievement.completed ? "border-2 border-green-500" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${achievement.color} text-white`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {achievement.title}
                            </h3>
                            {achievement.completed && (
                              <Badge variant="success" className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{achievement.description}</p>
                        </div>
                        <Badge variant="outline" className="text-primary border-primary">
                          {achievement.reward}
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span className="font-medium">
                            {achievement.progress} / {achievement.total}
                          </span>
                        </div>
                        <Progress
                          value={(achievement.progress / achievement.total) * 100}
                          className={`h-2 ${
                            achievement.completed ? "bg-green-100" : "bg-gray-100"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Points Overview */}
            <Card className="overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                    <Star className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-4xl font-bold text-primary mb-2">{CURRENT_POINTS}</h2>
                  <p className="text-gray-600">Total Points Earned</p>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Next Reward at {NEXT_REWARD} points</span>
                    <span className="font-medium">
                      {CURRENT_POINTS} / {NEXT_REWARD}
                    </span>
                  </div>
                  <Progress
                    value={(CURRENT_POINTS / NEXT_REWARD) * 100}
                    className="h-3"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <Gift className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">250</div>
                    <div className="text-sm text-gray-600">Points this week</div>
                  </Card>
                  <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-yellow-100">
                    <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">5</div>
                    <div className="text-sm text-gray-600">Achievements Unlocked</div>
                  </Card>
                  <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100">
                    <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">550</div>
                    <div className="text-sm text-gray-600">Points to next reward</div>
                  </Card>
                </div>
              </div>
            </Card>

            {/* Recent Points History */}
            <Card className="overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {RECENT_ACTIVITIES.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-gray-100">
                          {activity.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{activity.action}</div>
                          <div className="text-sm text-gray-500">{activity.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-semibold text-primary">+{activity.points}</div>
                        <Star className="w-4 h-4 text-yellow-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
