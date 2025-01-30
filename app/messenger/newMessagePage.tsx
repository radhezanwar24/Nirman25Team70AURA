import { useState } from "react";
import { Send, Paperclip, Smile, Video } from "lucide-react";
import Image from "next/image";
import TopNavBar from "@/components/dashboard/TopNavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    lastMessage: "Thanks for the help yesterday!",
    avatar: "/placeholder.svg?height=50&width=50",
    messages: [
      {
        id: 1,
        sender: "Bob",
        content: "Thanks for the help yesterday!",
        timestamp: "9:00 AM",
      },
      {
        id: 2,
        sender: "You",
        content: "No problem! Let me know if you have any more questions.",
        timestamp: "9:05 AM",
      },
    ],
  },
];

export default function NewMessagePage() {
  const [selectedChat, setSelectedChat] = useState(recentChats[0]);
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement send message logic here
    console.log("Sending message:", message);
    setMessage("");
  };

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
  );
}
