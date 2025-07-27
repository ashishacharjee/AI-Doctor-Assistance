"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, Mic, Camera, Send, Loader2, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [isRecording, setIsRecording] = useState(false)

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return

    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/analyze-symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze symptoms")
      }

      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      console.error("Error analyzing symptoms:", error)
      // Fallback analysis
      setAnalysis({
        disclaimer:
          "This analysis is for informational purposes only. For emergencies, call 102 (Ambulance) or 108 (Emergency Services).",
        possibleConditions: [
          {
            name: "Health Concern",
            probability: 70,
            description: "Unable to process symptoms at this time. Please consult a healthcare professional.",
            symptoms: symptoms.split(",").map((s) => s.trim()),
            severity: "Unknown",
            recommendations: [
              "Consult with a healthcare professional",
              "Monitor your symptoms",
              "For emergencies, call 102 or 108",
            ],
          },
        ],
        aiStatus: "Analysis failed - please consult a doctor",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleVoiceInput = () => {
    setIsRecording(!isRecording)
    // Voice recognition would be implemented here
    if (!isRecording) {
      setTimeout(() => {
        setSymptoms("I have a runny nose, cough, and feel tired")
        setIsRecording(false)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Doctor Assistance</h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/medicines" className="text-gray-600 hover:text-blue-600">
              Medicines
            </Link>
            <Link href="/doctors" className="text-gray-600 hover:text-blue-600">
              Doctors
            </Link>
            <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => window.open("tel:102", "_self")}>
              🚑 Emergency
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Symptom Checker</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Describe your symptoms using text, voice, or images, and our AI will analyze them to suggest possible
              conditions and recommendations.
            </p>
          </div>

          {/* Medical Disclaimer */}
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>Medical Disclaimer:</strong> This tool is for informational purposes only. It does not
                    replace professional medical advice. Always consult healthcare professionals for medical concerns.
                    <strong> For emergencies, call 102 (Ambulance) or 108 (Emergency Services).</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input Methods */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Describe Your Symptoms</CardTitle>
              <CardDescription>Choose your preferred method to input your symptoms</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="text">Text Input</TabsTrigger>
                  <TabsTrigger value="voice">Voice Input</TabsTrigger>
                  <TabsTrigger value="image">Image Upload</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <Textarea
                    placeholder="Describe your symptoms in detail... (e.g., I have a headache, runny nose, and feel tired)"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <Button onClick={handleAnalyze} disabled={!symptoms.trim() || isAnalyzing} className="w-full">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Symptoms...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Analyze Symptoms
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="voice" className="space-y-4">
                  <div className="text-center py-8">
                    <Button
                      onClick={handleVoiceInput}
                      variant={isRecording ? "destructive" : "default"}
                      size="lg"
                      className="w-32 h-32 rounded-full"
                    >
                      <Mic className={`h-8 w-8 ${isRecording ? "animate-pulse" : ""}`} />
                    </Button>
                    <p className="mt-4 text-gray-600">
                      {isRecording ? "Recording... Speak now" : "Click to start voice recording"}
                    </p>
                  </div>
                  {symptoms && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Transcribed text:</p>
                      <p className="text-gray-900">{symptoms}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="image" className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Upload an image of visible symptoms (rash, swelling, etc.)</p>
                    <Input type="file" accept="image/*" className="max-w-xs mx-auto" />
                  </div>
                  <p className="text-sm text-gray-500 text-center">Supported formats: JPG, PNG, GIF (Max 10MB)</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                  AI Analysis Results
                </CardTitle>
                <CardDescription>Based on your symptoms, here are the possible conditions:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysis.possibleConditions.map((condition: any, index: number) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{condition.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              condition.severity === "Mild"
                                ? "secondary"
                                : condition.severity === "Moderate"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {condition.severity}
                          </Badge>
                          <Badge variant="outline">{condition.probability}% match</Badge>
                        </div>
                      </div>
                      <CardDescription>{condition.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Common Symptoms:</h5>
                        <div className="flex flex-wrap gap-2">
                          {condition.symptoms.map((symptom: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Recommendations:</h5>
                        <ul className="space-y-1">
                          {condition.recommendations.map((rec: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild className="flex-1">
                    <Link href="/doctors">Find Specialist</Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 bg-transparent">
                    <Link href="/medicines">Search Medicines</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
