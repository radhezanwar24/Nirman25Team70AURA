"use client"

import { useState } from "react"
import { Send, Paperclip, Smile, Video } from "lucide-react"
import Image from "next/image"
import TopNavBar from "@/components/dashboard/TopNavBar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const recentChats = [
  {
    id: 1,
    name: "Alice Johnson",
    lastMessage: "Hey, when are you free for our next session?",
    avatar: "/placeholder.svg?height=50&width=50",
    messages: [
      {
        id: 1,
        sender: "Alice",
        content: "Hi there! I was wondering if we could schedule our next Python tutoring session?",
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        sender: "You",
        content: "Of course! I'm available this Thursday afternoon. How does 3 PM sound?",
        timestamp: "10:35 AM",
      },
      {
        id: 3,
        sender: "Alice",
        content: "Thursday at 3 PM works perfectly for me. Should we focus on data structures this time?",
        timestamp: "10:40 AM",
      },
      {
        id: 4,
        sender: "You",
        content: "We'll cover lists, dictionaries, and sets. Don't forget to bring any questions you have!",
        timestamp: "10:45 AM",
      },
      {
        id: 5,
        sender: "Alice",
        content: "Great! I'll prepare some questions. Looking forward to it!",
        timestamp: "10:50 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    lastMessage: "Thanks for the great lesson yesterday!",
    avatar: "/placeholder.svg?height=50&width=50",
    messages: [
      {
        id: 1,
        sender: "Bob",
        content: "Hey, I just wanted to say thanks for yesterday's guitar lesson. It was really helpful!",
        timestamp: "9:00 AM",
      },
      {
        id: 2,
        sender: "You",
        content: "I'm glad you found it helpful, Bob! How's your progress with the new chords we learned?",
        timestamp: "9:15 AM",
      },
      {
        id: 3,
        sender: "Bob",
        content: "I've been practicing, and I think I'm getting better. The F chord is still a bit tricky though.",
        timestamp: "9:20 AM",
      },
      {
        id: 4,
        sender: "You",
        content:
          "The F chord can be challenging at first. Keep practicing, and we'll work on it more in our next lesson.",
        timestamp: "9:25 AM",
      },
      { id: 5, sender: "Bob", content: "Sounds good! Looking forward to our next session.", timestamp: "9:30 AM" },
    ],
  },
  {
    id: 3,
    name: "Charlie Brown",
    lastMessage: "Can we reschedule our meeting?",
    avatar: "/placeholder.svg?height=50&width=50",
    messages: [
      {
        id: 1,
        sender: "Charlie",
        content: "Hi there! Something came up at work. Is it possible to reschedule our graphic design session?",
        timestamp: "2:00 PM",
      },
      {
        id: 2,
        sender: "You",
        content: "Of course, Charlie. No problem at all. When would be a better time for you?",
        timestamp: "2:10 PM",
      },
      { id: 3, sender: "Charlie", content: "Would next Monday at the same time work for you?", timestamp: "2:15 PM" },
      {
        id: 4,
        sender: "You",
        content: "Monday works perfectly. Shall we keep the focus on Adobe Illustrator basics?",
        timestamp: "2:20 PM",
      },
      {
        id: 5,
        sender: "Charlie",
        content: "Yes, please. And if we have time, could we touch on logo design principles?",
        timestamp: "2:25 PM",
      },
      { id: 6, sender: "You", content: "We'll cover that too. See you on Monday!", timestamp: "2:30 PM" },
    ],
  },
  {
    id: 4,
    name: "Diana Prince",
    lastMessage: "I have a question about the last topic we covered.",
    avatar: "/placeholder.svg?height=50&width=50",
    messages: [
      {
        id: 1,
        sender: "Diana",
        content:
          "Hello! I hope I'm not bothering you, but I have a question about the marketing strategies we discussed last time.",
        timestamp: "11:00 AM",
      },
      {
        id: 2,
        sender: "You",
        content: "You're not bothering me at all, Diana. What's your question?",
        timestamp: "11:05 AM",
      },
      {
        id: 3,
        sender: "Diana",
        content: "We talked about content marketing, but I'm not sure how to measure its effectiveness. Any tips?",
        timestamp: "11:10 AM",
      },
      {
        id: 4,
        sender: "You",
        content:
          "Great question! Some key metrics to look at are engagement rates, time spent on page, and conversion rates. We can dive deeper into this in our next session if you'd like.",
        timestamp: "11:20 AM",
      },
      {
        id: 5,
        sender: "Diana",
        content: "That would be really helpful. Thanks! Looking forward to our next session.",
        timestamp: "11:25 AM",
      },
    ],
  },
  {
    id: 5,
    name: "Ethan Hunt",
    lastMessage: "Looking forward to our next skill swap!",
    avatar: "/placeholder.svg?height=50&width=50",
    messages: [
      {
        id: 1,
        sender: "Ethan",
        content:
          "Hey there! I'm excited about our upcoming skill swap. Ready to trade some photography tips for cooking lessons?",
        timestamp: "3:00 PM",
      },
      {
        id: 2,
        sender: "You",
        content:
          "Absolutely, Ethan! I can't wait to learn more about photography. Any specific dish you want to start with for the cooking lesson?",
        timestamp: "3:10 PM",
      },
      {
        id: 3,
        sender: "Ethan",
        content:
          "How about we start with a classic Italian pasta dish? And for photography, I was thinking we could cover composition techniques.",
        timestamp: "3:15 PM",
      },
      {
        id: 4,
        sender: "You",
        content:
          "Sounds perfect! I'll prepare some materials on pasta-making. Looking forward to learning about composition!",
        timestamp: "3:20 PM",
      },
      { id: 5, sender: "Ethan", content: "Great! This is going to be fun. See you soon!", timestamp: "3:25 PM" },
    ],
  },
]

export default function Messenger() {
  const [selectedChat, setSelectedChat] = useState(recentChats[0])
  const [message, setMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement send message logic here
    console.log("Sending message:", message)
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex h-[calc(100vh-200px)]">
            {/* Left Panel */}
            <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
              <h2 className="text-xl font-semibold p-4 border-b border-gray-200">Recent Chats</h2>
              <ul>
                {recentChats.map((chat) => (
                  <li
                    key={chat.id}
                    className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedChat.id === chat.id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <Image
                      src={chat.avatar || "/placeholder.svg"}
                      alt={chat.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold">{chat.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <Image
                    src={selectedChat.avatar || "/placeholder.svg"}
                    alt={selectedChat.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <h2 className="ml-4 text-xl font-semibold">{selectedChat.name}</h2>
                </div>
                <Button className="bg-[#B10DC9] hover:bg-[#8a0a9b] text-white">
                  <Video className="h-5 w-5 mr-2" />
                  Start Video Call
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                {selectedChat.messages.map((msg) => (
                  <div key={msg.id} className={`mb-4 ${msg.sender === "You" ? "text-right" : ""}`}>
                    <div
                      className={`inline-block p-2 rounded-lg ${msg.sender === "You" ? "bg-[#B10DC9] text-white" : "bg-gray-200"}`}
                    >
                      <p>{msg.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow mr-4"
                  />
                  <Button type="button" variant="ghost" className="mr-2">
                    <Paperclip className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button type="button" variant="ghost" className="mr-2">
                    <Smile className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button type="submit" className="bg-[#B10DC9] hover:bg-[#8a0a9b] text-white">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

