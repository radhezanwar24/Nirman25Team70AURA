"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturePreview from "@/components/FeaturePreview";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Send, MessageSquare } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setChatMessages([...chatMessages, userMessage]);
    setInput("");

    try {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "..." },
      ]);

      const result = await model.generateContentStream([input]);

      let botResponse = "";
      for await (const chunk of result.stream) {
        botResponse += chunk.text();
      }

      setChatMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { sender: "bot", text: botResponse || "Sorry, I couldn't understand." },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { sender: "bot", text: "There was an error processing your request." },
      ]);
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <FeaturePreview />
        <Testimonials />
        <CallToAction />

        {/* Chatbot */}
        <div className="fixed bottom-4 right-4">
          {isOpen ? (
            <div className="w-96 bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="bg-[#B10DC9] text-white p-3 flex items-center justify-between">
                <button
                  className="hover:bg-[#960BB0] p-1 rounded-full transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <span className="font-semibold">SwapUP Assistant</span>
                <div className="w-6" /> {/* Spacer for alignment */}
              </div>

              {/* Chat Messages */}
              <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-[#B10DC9] text-white rounded-br-none"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-[#B10DC9] dark:focus:border-[#B10DC9] dark:text-white"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    className="bg-[#B10DC9] hover:bg-[#960BB0] text-white p-2 rounded-full transition-colors"
                    onClick={handleSendMessage}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="bg-[#B10DC9] hover:bg-[#960BB0] text-white p-4 rounded-full shadow-lg transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <MessageSquare size={24} />
            </button>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}