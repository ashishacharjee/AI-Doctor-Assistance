"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, Bot, User, Loader2, AlertTriangle, Heart, Stethoscope, MessageCircle, Mic, MicOff } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIDocChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello! I'm your AI Medical Assistant. I'm here to help you with:

🩺 **Symptom Analysis** - Describe your symptoms and get preliminary guidance
💊 **Medicine Information** - Learn about medications and interactions  
🏥 **Health Guidance** - Get general health advice and recommendations
🚨 **Emergency Detection** - Identify when you need immediate medical care

**Important:** I provide general health information only. For proper diagnosis and treatment, always consult qualified healthcare professionals.

How can I help you today?`,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  function sendMessageFactory() {
    return async function sendMessage(this: void) {
      if (!inputMessage.trim() || isLoading) return

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: inputMessage.trim(),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInputMessage("")
      setIsLoading(true)

      try {
        const response = await fetch("/api/chat-doctor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage.content,
            // Send a simple, compact history to the server:
            chatHistory: messages.slice(-5).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get response")
        }

        const data = await response.json()

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: typeof data?.response === "string" ? data.response : "I had trouble generating a reply.",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch (error) {
        console.error("Error:", error)
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: `I’m having trouble connecting right now.

For immediate medical concerns:
🚑 Emergency: Call 102 (Ambulance) or 108 (Emergency Services)

You can also try:
- Using our symptom checker
- Finding doctors in your area
- Searching our medicine database`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const sendMessage = sendMessageFactory()

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickQuestions = [
    "I have a headache and fever",
    "What should I do for chest pain?",
    "Tell me about diabetes symptoms",
    "How to manage high blood pressure?",
    "What are the signs of a heart attack?",
    "I'm feeling dizzy and nauseous",
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Emergency Alert */}
      <Alert className="mb-6 border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Medical Emergency?</strong> For life-threatening symptoms, call{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-red-800 font-bold underline"
            onClick={() => window.open("tel:102", "_self")}
          >
            102 (Ambulance)
          </Button>{" "}
          or{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-red-800 font-bold underline"
            onClick={() => window.open("tel:108", "_self")}
          >
            108 (Emergency)
          </Button>{" "}
          immediately.
        </AlertDescription>
      </Alert>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-full">
              <Stethoscope className="h-5 w-5 text-blue-600" />
            </div>
            <span>AI Medical Assistant</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Online
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div className={`p-2 rounded-full ${message.role === "user" ? "bg-blue-100" : "bg-green-100"}`}>
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user" ? "bg-blue-600 text-white ml-auto" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{message.timestamp.toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-green-100">
                    <Bot className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-gray-100">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                        <span className="text-sm text-gray-600">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Questions:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start h-auto p-2 text-xs bg-white hover:bg-blue-50"
                    onClick={() => setInputMessage(question)}
                  >
                    <MessageCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your symptoms or ask a health question..."
                  disabled={isLoading}
                  className="pr-12"
                />
                {typeof window !== "undefined" && "webkitSpeechRecognition" in window && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={isListening ? stopListening : startListening}
                    disabled={isLoading}
                  >
                    {isListening ? (
                      <MicOff className="h-4 w-4 text-red-500" />
                    ) : (
                      <Mic className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                )}
              </div>
              <Button onClick={sendMessage} disabled={!inputMessage.trim() || isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send. This AI provides general health information only - consult healthcare professionals
              for medical advice.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Medical Disclaimer */}
      <Alert className="mt-4 border-blue-200 bg-blue-50">
        <Heart className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Medical Disclaimer:</strong> This AI assistant provides general health information for educational
          purposes only. It does not replace professional medical advice, diagnosis, or treatment. Always consult
          qualified healthcare professionals for medical concerns.
        </AlertDescription>
      </Alert>
    </div>
  )
}
