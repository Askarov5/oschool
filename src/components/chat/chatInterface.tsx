"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Paperclip, Send } from "lucide-react"
import { IMessage } from "@/lib/types"


export default function ChatInterface() {
  const [messages, setMessages] = useState<IMessage[]>([
    { id: 1, text: "Hello! I'm your AI tutor. How can I help you today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: IMessage = { id: messages.length + 1, text: input, sender: "user" }
      setMessages([...messages, newMessage])
      setInput("")
      
      // Simulate AI response
      setTimeout(() => {
        const botResponse: IMessage = {
          id: messages.length + 2,
          text: `Thanks for your question! I'm processing it and will respond shortly. In the meantime, is there anything else you'd like to know?`,
          sender: "bot"
        }
        setMessages(prevMessages => [...prevMessages, botResponse])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto">
      <ScrollArea className="flex-grow p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {message.sender === "bot" && (
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src="/bot-avatar.png" alt="AI Tutor" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Mic className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}