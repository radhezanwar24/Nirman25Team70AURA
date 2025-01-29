"use client"

import { useState } from "react"
import { Send, Phone, Video, MoreVertical, Search, Paperclip } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/context/auth-context"

type Message = {
  id: string
  content: string
  sender: string
  timestamp: string
  isMe: boolean
}

type Chat = {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unread: number
  online: boolean
}

export default function Messenger() {
  const { isAuthenticated } = useAuth()
  const [selectedChat, setSelectedChat] = useState<string | null>("1")
  const [message, setMessage] = useState("")
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "Krishna Pandey",
      avatar: "/avatars/john.jpg",
      lastMessage: "Thanks for the React tips!",
      lastMessageTime: "2m ago",
      unread: 2,
      online: true
    },
    {
      id: "2",
      name: "Yatharth Nyahatkar",
      avatar: "/avatars/emma.jpg",
      lastMessage: "When can we schedule the next session?",
      lastMessageTime: "1h ago",
      unread: 0,
      online: false
    }
  ])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi, I need help with React hooks. Can you explain useEffect?",
      sender: "Krishna Pandey",
      timestamp: "10:30 AM",
      isMe: false
    },
    {
      id: "2",
      content: "Of course! The useEffect hook is used for side effects in function components.",
      sender: "Me",
      timestamp: "10:32 AM",
      isMe: true
    },
    {
      id: "3",
      content: "Thanks for the React tips!",
      sender: "Krishna Pandey",
      timestamp: "10:35 AM",
      isMe: false
    }
  ])

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] p-4">
        <h2 className="text-2xl font-bold mb-4">Messenger</h2>
        <p className="text-muted-foreground mb-4">Please log in to access messages</p>
        <Button>Log In</Button>
      </div>
    )
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "Me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <div className="flex h-[800px] border rounded-lg overflow-hidden">
      {/* Chat List */}
      <div className="w-80 border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(800px-73px)]">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 cursor-pointer hover:bg-secondary/50 ${
                selectedChat === chat.id ? "bg-secondary" : ""
              }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {chat.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat && (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={chats.find(c => c.id === selectedChat)?.avatar}
                  alt="Chat avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">
                    {chats.find(c => c.id === selectedChat)?.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {chats.find(c => c.id === selectedChat)?.online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.isMe
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
              <Button variant="ghost" size="icon" type="button">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
