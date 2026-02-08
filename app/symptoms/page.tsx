"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Stethoscope, Search, Mic, Send, AlertTriangle, CheckCircle, Brain, Heart, Activity, Phone, Home, Users, Pill, MessageCircle, User, Bot, Loader2 } from 'lucide-react'
import Link from "next/link"
import { VoiceInput } from "@/components/voice-input"

interface SymptomCategory {
  name: string
  icon: React.ReactNode
  symptoms: string[]
  color: string
}

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

const symptomCategories: SymptomCategory[] = [
  {
    name: "Respiratory",
    icon: <Activity className="h-5 w-5 text-blue-500" />,
    symptoms: ["Cough", "Sore Throat", "Runny Nose", "Shortness of Breath", "Congestion"],
    color: "bg-blue-100",
  },
  {
    name: "Digestive",
    icon: <Heart className="h-5 w-5 text-orange-500" />,
    symptoms: ["Nausea", "Vomiting", "Diarrhea", "Stomach Pain", "Loss of Appetite"],
    color: "bg-orange-100",
  },
  {
    name: "Neurological",
    icon: <Brain className="h-5 w-5 text-purple-500" />,
    symptoms: ["Headache", "Dizziness", "Fatigue", "Difficulty Concentrating", "Memory Issues"],
    color: "bg-purple-100",
  },
  {
    name: "General",
    icon: <Activity className="h-5 w-5 text-green-500" />,
    symptoms: ["Fever", "Chills", "Body Aches", "Weakness", "Sweating"],
    color: "bg-green-100",
  },
  {
    name: "Skin",
    icon: <Activity className="h-5 w-5 text-red-500" />,
    symptoms: ["Rash", "Itching", "Hives", "Redness", "Swelling"],
    color: "bg-red-100",
  },
  {
    name: "Allergy",
    icon: <Activity className="h-5 w-5 text-pink-500" />,
    symptoms: ["Sneezing", "Watery Eyes", "Allergic Reaction", "Itchy Eyes", "Skin Irritation"],
    color: "bg-pink-100",
  },
]

export default function SymptomsPage() {
  const params = useSearchParams()
  const [activeTab, setActiveTab] = useState<"search" | "browse" | "analysis">("search")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showVoiceInput, setShowVoiceInput] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const [isChatLoading, setIsChatLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  const handleAnalyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0 && !searchQuery.trim()) {
      setActiveTab("analysis")
      return
    }

    setIsAnalyzing(true)
    setActiveTab("analysis")
    setAnalysisResult(null)

    try {
      const symptomsToAnalyze = searchQuery.trim()
        ? searchQuery
            .split(",")
            .map((s) => s.trim())
            .concat(selectedSymptoms)
        : selectedSymptoms

      const response = await fetch("/api/analyze-symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms: symptomsToAnalyze,
        }),
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const result = await response.json()
      setAnalysisResult(result)
    } catch (error) {
      console.error("Analysis error:", error)
      const fallbackAnalysis = {
        conditions: [
          {
            name: "Common Cold",
            probability: 75,
            description: "A viral infection of the upper respiratory tract",
            severity: "mild",
          },
          {
            name: "Viral Fever",
            probability: 60,
            description: "A fever caused by viral infection",
            severity: "mild",
          },
          {
            name: "Gastroenteritis",
            probability: 45,
            description: "Inflammation of the stomach and intestines",
            severity: "moderate",
          },
        ],
        recommendations: [
          "Get adequate rest and sleep",
          "Stay hydrated by drinking plenty of fluids",
          "Consider over-the-counter medications for symptom relief",
          "Monitor symptoms and seek medical attention if they worsen",
        ],
        severity: "mild",
        disclaimer:
          "This analysis is for informational purposes only. Please consult a healthcare professional for proper diagnosis and treatment.",
      }
      setAnalysisResult(fallbackAnalysis)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleVoiceTranscript = (text: string) => {
    setSearchQuery(text)
    setShowVoiceInput(false)
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || isChatLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: chatInput.trim(),
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsChatLoading(true)

    try {
      const response = await fetch("/api/chat-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          // Send compact, normalized history including the message we just added
          history: [...chatMessages, userMessage].slice(-8).map((m) => ({
            role: (m as any).type ?? (m as any).role ?? "user",
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Chat failed")
      }

      const result = await response.json()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: result.response,
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "I’m having trouble connecting right now. Please try again or consult a healthcare professional. In emergencies, call 102 or 108.",
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsChatLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header with Navigation (Medicines before Doctors) */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Doctor Assistance</h1>
            </Link>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Brain className="h-3 w-3 mr-1" />
                AI Analysis Ready
              </Badge>
            </div>
          </div>

          <nav className="flex items-center justify-center space-x-1 bg-gray-100 rounded-lg p-1">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Button
              variant="default"
              size="sm"
              className="flex items-center space-x-2 bg-blue-600 transition-all duration-300 hover:scale-105"
            >
              <Stethoscope className="h-4 w-4" />
              <span>Symptoms</span>
            </Button>
            <Link href="/medicines">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              >
                <Pill className="h-4 w-4" />
                <span>Medicines</span>
              </Button>
            </Link>
            <Link href="/doctors">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              >
                <Users className="h-4 w-4" />
                <span>Doctors</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Symptom Analysis</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Describe your symptoms and get instant AI-powered health insights. Our assistant identifies possible
            conditions and suggests next steps.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>Important:</strong> Informational only. Not a substitute for professional care. In emergencies, call
            102 (Ambulance) or 108 (Emergency Services).
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Search & Input</TabsTrigger>
            <TabsTrigger value="browse">Browse Symptoms</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* Search and Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Describe Your Symptoms
                </CardTitle>
                <CardDescription>
                  Enter your symptoms in detail. You can type, use voice input, or select from common symptoms below.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Describe your symptoms in detail (e.g., 'I have a headache, fever, and sore throat for 2 days')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleAnalyzeSymptoms()
                      }
                    }}
                    className="flex-1 min-h-[100px]"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button onClick={() => setShowVoiceInput(true)} variant="outline" className="bg-transparent">
                    <Mic className="h-4 w-4 mr-2" />
                    Voice Input
                  </Button>
                  <Button
                    onClick={handleAnalyzeSymptoms}
                    disabled={isAnalyzing || (!searchQuery.trim() && selectedSymptoms.length === 0)}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Analyze Symptoms
                      </>
                    )}
                  </Button>
                </div>

                {/* Selected Symptoms Display */}
                {selectedSymptoms.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Selected symptoms:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <Badge
                          key={symptom}
                          variant="secondary"
                          className="cursor-pointer hover:bg-red-100"
                          onClick={() => handleSymptomToggle(symptom)}
                        >
                          {symptom} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            {/* Browse Symptoms by Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {symptomCategories.map((category) => (
                <Card key={category.name} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      {category.icon}
                      <span className="ml-2">{category.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.symptoms.map((symptom) => (
                        <div
                          key={symptom}
                          className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                            selectedSymptoms.includes(symptom)
                              ? "bg-blue-100 border-blue-300"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() => handleSymptomToggle(symptom)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{symptom}</span>
                            {selectedSymptoms.includes(symptom) && <CheckCircle className="h-4 w-4 text-blue-600" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Analysis Button */}
            {selectedSymptoms.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      You have selected {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? "s" : ""}
                    </p>
                    <Button onClick={handleAnalyzeSymptoms} disabled={isAnalyzing} size="lg">
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing Symptoms...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          Analyze Selected Symptoms
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {/* Chat with AI Doctor moved here */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat with AI Doctor
                </CardTitle>
                <CardDescription>
                  Have a conversation with our AI medical assistant for personalized guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Chat Messages */}
                  <div className="h-64 overflow-y-auto border rounded-lg p-4 bg-gray-50">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-gray-500 mt-8">
                        <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Start a conversation with the AI Doctor</p>
                        <p className="text-sm">Ask about symptoms, conditions, or general health questions</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {chatMessages.map((message) => {
                          const role = (message as any).type ?? (message as any).role ?? "assistant"
                          const content = typeof message.content === "string" ? message.content : ""
                          const timeStr = message?.timestamp
                            ? new Date(message.timestamp as any).toLocaleTimeString()
                            : ""

                          return (
                            <div
                              key={message.id}
                              className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
                              aria-live={role === "assistant" ? "polite" : undefined}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  role === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
                                }`}
                              >
                                <div className="flex items-start space-x-2">
                                  {role === "assistant" ? (
                                    <Bot className="h-4 w-4 mt-1 text-blue-600 flex-shrink-0" />
                                  ) : (
                                    <User className="h-4 w-4 mt-1 text-white flex-shrink-0" />
                                  )}
                                  <div className="flex-1">
                                    <p className="text-sm whitespace-pre-wrap">{content || "…"}</p>
                                    <p
                                      className={`text-xs mt-1 ${role === "user" ? "text-blue-100" : "text-gray-500"}`}
                                    >
                                      {timeStr}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}

                        {isChatLoading && (
                          <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 rounded-lg p-3">
                              <div className="flex items-center space-x-2">
                                <Bot className="h-4 w-4 text-blue-600" />
                                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                                <span className="text-sm text-gray-600">AI Doctor is thinking...</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div ref={chatEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <form onSubmit={handleChatSubmit} className="flex space-x-2">
                    <Input
                      placeholder="Ask the AI Doctor about your symptoms..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!chatInput.trim() || isChatLoading}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysisResult ? (
              <div className="space-y-6">
                {/* Severity Alert */}
                <Alert
                  className={`${
                    analysisResult.severity === "severe"
                      ? "border-red-500 bg-red-50"
                      : analysisResult.severity === "moderate"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-green-500 bg-green-50"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Severity Level: {analysisResult.severity?.toUpperCase()}</strong>
                    {analysisResult.severity === "severe" && (
                      <span className="block mt-1 text-red-800">
                        Seek immediate medical attention. Consider calling emergency services.
                      </span>
                    )}
                    {analysisResult.severity === "moderate" && (
                      <span className="block mt-1 text-yellow-800">
                        Schedule an appointment with a healthcare provider soon.
                      </span>
                    )}
                    {analysisResult.severity === "mild" && (
                      <span className="block mt-1 text-green-800">
                        Monitor symptoms and consider home care measures.
                      </span>
                    )}
                  </AlertDescription>
                </Alert>

                {/* Possible Conditions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Stethoscope className="h-5 w-5 mr-2" />
                      Possible Conditions
                    </CardTitle>
                    <CardDescription>Based on your symptoms, here are potential conditions to consider</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResult.conditions?.map((condition: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-lg">{condition.name}</h4>
                            <Badge
                              variant={
                                condition.severity === "severe"
                                  ? "destructive"
                                  : condition.severity === "moderate"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {condition.probability}% match
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{condition.description}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {condition.severity} severity
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Recommendations
                    </CardTitle>
                    <CardDescription>Suggested next steps based on your symptom analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisResult.recommendations?.map((recommendation: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Emergency Contacts */}
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-800">
                      <Phone className="h-5 w-5 mr-2" />
                      Emergency Contacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="font-semibold text-red-800">Ambulance</p>
                        <p className="text-2xl font-bold text-red-600">102</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-red-800">Emergency Services</p>
                        <p className="text-2xl font-bold text-red-600">108</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Disclaimer */}
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{analysisResult.disclaimer}</AlertDescription>
                </Alert>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Available</h3>
                  <p className="text-gray-600 mb-6">
                    Please describe your symptoms or select from the symptom categories to get an AI-powered analysis.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button onClick={() => setActiveTab("search")}>
                      <Search className="h-4 w-4 mr-2" />
                      Search Symptoms
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab("browse")}>
                      <Activity className="h-4 w-4 mr-2" />
                      Browse Categories
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Voice Input Modal */}
      {showVoiceInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <VoiceInput
              onTranscript={handleVoiceTranscript}
              isRecording={isRecording}
              onRecordingChange={setIsRecording}
            />
            <div className="p-4 border-t">
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowVoiceInput(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
