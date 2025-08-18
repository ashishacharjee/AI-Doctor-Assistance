"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Stethoscope,
  Activity,
  Heart,
  Calendar,
  Pill,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Home,
  LayoutDashboard,
  Mic,
  Camera,
  MessageCircle,
  Brain,
  Shield,
  Smartphone,
  UserCheck,
} from "lucide-react"
import Link from "next/link"
import { VoiceInput } from "@/components/voice-input"
import { CameraScanner } from "@/components/camera-scanner"

export default function DashboardPage() {
  const [showVoiceInput, setShowVoiceInput] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const handleVoiceTranscript = (text: string) => {
    console.log("Voice transcript:", text)
    setShowVoiceInput(false)
  }

  const handleCameraResult = (extractedText: string) => {
    console.log("Camera result:", extractedText)
    setShowCamera(false)
  }

  // Mock data for dashboard
  const healthMetrics = {
    heartRate: 72,
    bloodPressure: "120/80",
    weight: 70,
    steps: 8500,
    sleep: 7.5,
    waterIntake: 2.1,
  }

  const recentActivities = [
    {
      id: 1,
      type: "consultation",
      title: "AI Symptom Analysis",
      description: "Analyzed symptoms: headache, fatigue",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "appointment",
      title: "Dr. Amal K. Khan",
      description: "Cardiology consultation scheduled",
      time: "Tomorrow 10:00 AM",
      status: "upcoming",
    },
    {
      id: 3,
      type: "medicine",
      title: "Medicine Reminder",
      description: "Paracetamol 500mg - Take after meal",
      time: "4 hours ago",
      status: "completed",
    },
    {
      id: 4,
      type: "scan",
      title: "Medicine Scan",
      description: "Scanned Crocin 650mg successfully",
      time: "1 day ago",
      status: "completed",
    },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Amal K. Khan",
      specialty: "Cardiology",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Follow-up",
    },
    {
      id: 2,
      doctor: "Dr. Priya Sharma",
      specialty: "Gynecology",
      date: "Dec 25",
      time: "2:30 PM",
      type: "Consultation",
    },
    {
      id: 3,
      doctor: "Dr. Amit Haldar",
      specialty: "Neurology",
      date: "Dec 28",
      time: "11:15 AM",
      type: "Check-up",
    },
  ]

  const medications = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      dosage: "1 tablet",
      frequency: "3 times daily",
      nextDose: "2:00 PM",
      remaining: 15,
    },
    {
      id: 2,
      name: "Vitamin D3",
      dosage: "1 capsule",
      frequency: "Once daily",
      nextDose: "8:00 AM",
      remaining: 28,
    },
    {
      id: 3,
      name: "Omeprazole 20mg",
      dosage: "1 tablet",
      frequency: "Before breakfast",
      nextDose: "7:30 AM",
      remaining: 8,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header with Navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Doctor Assistance</h1>
            </Link>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Activity className="h-3 w-3 mr-1" />
                Dashboard Active
              </Badge>
            </div>
          </div>

          {/* Navigation Menu */}
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
            <Link href="/symptoms">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              >
                <Stethoscope className="h-4 w-4" />
                <span>Symptoms</span>
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
            <Button
              variant="default"
              size="sm"
              className="flex items-center space-x-2 bg-blue-600 transition-all duration-300 hover:scale-105"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Dashboard</h2>
          <p className="text-gray-600">
            Track your health metrics, manage appointments, and monitor your wellness journey
          </p>
        </div>

        {/* AI Chat Feature Highlight */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg mb-8">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Talk to AI Doctor Assistant</h3>
              <p className="text-lg text-gray-600 mb-8">
                Have a real-time conversation with our AI medical assistant. Get personalized health advice, symptom
                analysis, and emergency guidance instantly.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Smart Analysis</h4>
                  <p className="text-sm text-gray-600">AI-powered symptom analysis with medical knowledge base</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Emergency Detection</h4>
                  <p className="text-sm text-gray-600">Immediate identification of critical symptoms</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Smartphone className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Voice Support</h4>
                  <p className="text-sm text-gray-600">Speak your symptoms with voice recognition</p>
                </div>
              </div>
              <Link href="/symptoms">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start Chatting with AI Doctor
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Comprehensive Health Solutions */}
        <section className="py-16 px-4 bg-white rounded-lg mb-8">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Health Solutions</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our AI-powered platform provides multiple ways to address your health concerns with accuracy and
                reliability.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Stethoscope className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Symptom Analysis</CardTitle>
                  <CardDescription>Enter symptoms via text, voice, or image for AI-powered diagnosis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Text-based symptom input</li>
                    <li>• Voice recognition support</li>
                    <li>• Image analysis for visual symptoms</li>
                    <li>• Instant condition suggestions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-green-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Pill className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Medicine Information</CardTitle>
                  <CardDescription>Search medicines by name or symptoms with detailed information</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Comprehensive medicine database</li>
                    <li>• Dosage and usage instructions</li>
                    <li>• Side effects and precautions</li>
                    <li>• Drug interaction warnings</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <UserCheck className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Doctor Finder</CardTitle>
                  <CardDescription>Find specialists based on your condition and location</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Specialist recommendations</li>
                    <li>• Location-based search</li>
                    <li>• Doctor ratings and reviews</li>
                    <li>• Appointment booking assistance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>AI Engine</CardTitle>
                  <CardDescription>Advanced NLP and ML models for accurate health analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Natural language processing</li>
                    <li>• Machine learning algorithms</li>
                    <li>• OCR for prescription reading</li>
                    <li>• Voice-to-text conversion</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle>Security & Privacy</CardTitle>
                  <CardDescription>HIPAA-compliant security with end-to-end encryption</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• End-to-end encryption</li>
                    <li>• HIPAA compliance</li>
                    <li>• Secure data storage</li>
                    <li>• Privacy-first approach</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle>Mobile Optimized</CardTitle>
                  <CardDescription>Responsive design for seamless mobile experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Mobile-first design</li>
                    <li>• Touch-friendly interface</li>
                    <li>• Offline capabilities</li>
                    <li>• Cross-platform compatibility</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Health Tools */}
        <section className="py-16 px-4 bg-gray-50 rounded-lg mb-8">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Interactive Health Tools</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Try our advanced features for a more comprehensive health analysis experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card
                className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setShowVoiceInput(true)}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mic className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Voice Input</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Describe your symptoms using voice commands. Our AI understands natural language and provides
                    accurate analysis.
                  </CardDescription>
                  <Button className="w-full" onClick={() => setShowVoiceInput(true)}>
                    Try Voice Input
                  </Button>
                </CardContent>
              </Card>

              <Card
                className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setShowCamera(true)}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Medicine Scanner</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Scan medicine bottles, prescriptions, or pills to get detailed information, dosage, and interaction
                    warnings.
                  </CardDescription>
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setShowCamera(true)}>
                    Scan Medicine
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Health Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    View comprehensive health analytics and track your progress over time with detailed insights.
                  </CardDescription>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">View Analytics</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health Metrics</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Health Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Heart Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{healthMetrics.heartRate}</p>
                      <p className="text-xs text-gray-500">bpm</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Blood Pressure</p>
                      <p className="text-2xl font-bold text-gray-900">{healthMetrics.bloodPressure}</p>
                      <p className="text-xs text-gray-500">mmHg</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Activity className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Daily Steps</p>
                      <p className="text-2xl font-bold text-gray-900">{healthMetrics.steps.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">steps</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Sleep</p>
                      <p className="text-2xl font-bold text-gray-900">{healthMetrics.sleep}h</p>
                      <p className="text-xs text-gray-500">last night</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest health-related activities and consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {activity.type === "consultation" && <Stethoscope className="h-5 w-5 text-blue-600" />}
                        {activity.type === "appointment" && <Calendar className="h-5 w-5 text-green-600" />}
                        {activity.type === "medicine" && <Pill className="h-5 w-5 text-purple-600" />}
                        {activity.type === "scan" && <Camera className="h-5 w-5 text-orange-600" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <div>
                        {activity.status === "completed" && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        {activity.status === "upcoming" && (
                          <Badge className="bg-blue-100 text-blue-800">
                            <Clock className="h-3 w-3 mr-1" />
                            Upcoming
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            {/* Detailed Health Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vital Signs</CardTitle>
                  <CardDescription>Your current vital signs and health indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Heart Rate</span>
                    <span className="text-sm text-gray-600">{healthMetrics.heartRate} bpm</span>
                  </div>
                  <Progress value={75} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Blood Pressure</span>
                    <span className="text-sm text-gray-600">{healthMetrics.bloodPressure} mmHg</span>
                  </div>
                  <Progress value={80} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Weight</span>
                    <span className="text-sm text-gray-600">{healthMetrics.weight} kg</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Goals</CardTitle>
                  <CardDescription>Track your daily health and wellness goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Steps</span>
                    <span className="text-sm text-gray-600">{healthMetrics.steps.toLocaleString()}/10,000</span>
                  </div>
                  <Progress value={85} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sleep</span>
                    <span className="text-sm text-gray-600">{healthMetrics.sleep}/8 hours</span>
                  </div>
                  <Progress value={94} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Water Intake</span>
                    <span className="text-sm text-gray-600">{healthMetrics.waterIntake}/2.5 L</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Health Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Health Trends</CardTitle>
                <CardDescription>Your health metrics over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Health trends chart would be displayed here</p>
                  <p className="text-sm text-gray-500">Connect wearable devices to see detailed analytics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled medical appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        <p className="text-xs text-gray-500">{appointment.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{appointment.date}</p>
                        <p className="text-sm text-gray-600">{appointment.time}</p>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Reschedule
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Book New Appointment */}
            <Card>
              <CardHeader>
                <CardTitle>Book New Appointment</CardTitle>
                <CardDescription>Schedule a consultation with our qualified doctors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Ready to book your next appointment?</p>
                  <Link href="/doctors">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Users className="h-4 w-4 mr-2" />
                      Find Doctors
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-6">
            {/* Current Medications */}
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>Your active prescriptions and medication schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((medication) => (
                    <div key={medication.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Pill className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{medication.name}</h4>
                        <p className="text-sm text-gray-600">
                          {medication.dosage} - {medication.frequency}
                        </p>
                        <p className="text-xs text-gray-500">Next dose: {medication.nextDose}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{medication.remaining}</p>
                        <p className="text-sm text-gray-600">pills left</p>
                        {medication.remaining <= 10 && (
                          <Badge className="bg-orange-100 text-orange-800 mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Low Stock
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medication Reminders */}
            <Card>
              <CardHeader>
                <CardTitle>Medication Reminders</CardTitle>
                <CardDescription>Set up reminders for your medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Never miss a dose with smart reminders</p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Clock className="h-4 w-4 mr-2" />
                    Set Reminders
                  </Button>
                </div>
              </CardContent>
            </Card>
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

      {/* Camera Scanner Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <CameraScanner onResult={handleCameraResult} onClose={() => setShowCamera(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
