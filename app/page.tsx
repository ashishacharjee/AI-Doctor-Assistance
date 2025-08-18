"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Stethoscope,
  Pill,
  Shield,
  MessageCircle,
  Github,
  Linkedin,
  Mic,
  Camera,
  LayoutDashboard,
  Home,
  Users,
  Activity,
  Heart,
  Brain,
  Clock,
  Star,
} from "lucide-react"
import Link from "next/link"
import { VoiceInput } from "@/components/voice-input"
import { CameraScanner } from "@/components/camera-scanner"

export default function HomePage() {
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
                AI Online
              </Badge>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center justify-center space-x-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant="default"
              size="sm"
              className="flex items-center space-x-2 bg-blue-600 transition-all duration-300 hover:scale-105"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
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
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Your AI-Powered Healthcare Companion</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get instant medical guidance, symptom analysis, and connect with qualified doctors. Experience the future of
            healthcare with our advanced AI technology.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/symptoms">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="h-5 w-5 mr-2" />
                Start AI Consultation
              </Button>
            </Link>
            <Link href="/doctors">
              <Button size="lg" variant="outline" className="bg-transparent">
                <Users className="h-5 w-5 mr-2" />
                Find Doctors
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">25+</h3>
              <p className="text-gray-600">Qualified Doctors</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Pill className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Medicines Database</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AI</h3>
              <p className="text-gray-600">Powered Analysis</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600">Available Support</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* AI Symptom Checker */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="h-6 w-6 mr-3 text-blue-600" />
                AI Symptom Checker
              </CardTitle>
              <CardDescription>Get instant analysis of your symptoms with our advanced AI technology</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Describe your symptoms and receive AI-powered health insights, possible conditions, and recommendations
                for next steps.
              </p>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800">Instant Analysis</Badge>
                <Badge className="bg-blue-100 text-blue-800">AI Powered</Badge>
                <Badge className="bg-purple-100 text-purple-800">24/7 Available</Badge>
              </div>
              <Link href="/symptoms">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Check Symptoms Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Find Doctors */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 mr-3 text-green-600" />
                Find Qualified Doctors
              </CardTitle>
              <CardDescription>Connect with verified healthcare professionals in your area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Browse through our network of qualified doctors, check their specializations, ratings, and book
                appointments easily.
              </p>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800">Verified Doctors</Badge>
                <Badge className="bg-blue-100 text-blue-800">Multiple Specialties</Badge>
                <Badge className="bg-orange-100 text-orange-800">Easy Booking</Badge>
              </div>
              <Link href="/doctors">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Users className="h-4 w-4 mr-2" />
                  Find Doctors
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Tools */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Quick Access Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Voice Input */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowVoiceInput(true)}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Voice Input</h4>
                <p className="text-gray-600 mb-4">Speak your symptoms naturally and get instant AI analysis</p>
                <Button className="w-full" onClick={() => setShowVoiceInput(true)}>
                  <Mic className="h-4 w-4 mr-2" />
                  Start Voice Input
                </Button>
              </CardContent>
            </Card>

            {/* Medicine Scanner */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowCamera(true)}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Scan Medicine</h4>
                <p className="text-gray-600 mb-4">Use camera to scan medicine packaging and get detailed information</p>
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setShowCamera(true)}>
                  <Camera className="h-4 w-4 mr-2" />
                  Open Scanner
                </Button>
              </CardContent>
            </Card>

            {/* Health Dashboard */}
            <Link href="/dashboard">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LayoutDashboard className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Health Dashboard</h4>
                  <p className="text-gray-600 mb-4">
                    Access your personalized health dashboard with analytics and comprehensive tools
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Open Dashboard
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose AI Doctor Assistance?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h4>
              <p className="text-gray-600">
                Your health data is encrypted and protected with industry-standard security measures
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">24/7 Availability</h4>
              <p className="text-gray-600">Get medical guidance anytime, anywhere with our AI-powered platform</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Expert Verified</h4>
              <p className="text-gray-600">All our doctors are verified professionals with proven expertise</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gray-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience AI-Powered Healthcare?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join thousands of users who trust AI Doctor Assistance for their healthcare needs. Get started today and
                experience the future of medical consultation.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/symptoms">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Start Free Consultation
                  </Button>
                </Link>
                <Link href="/doctors">
                  <Button size="lg" variant="outline" className="bg-transparent">
                    <Users className="h-5 w-5 mr-2" />
                    Browse Doctors
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-12 px-4 bg-yellow-50 border-t border-yellow-200">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg p-6 border border-yellow-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Shield className="h-5 w-5 text-yellow-600 mr-2" />
              Important Medical Disclaimer
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              This AI Doctor Assistance platform is designed for informational purposes only and should not replace
              professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare
              professionals for medical concerns. In case of medical emergencies, contact emergency services
              immediately. The AI recommendations are based on general medical knowledge and may not account for
              individual medical history or specific conditions.
            </p>
          </div>
        </div>
      </section>

      {/* About Developer Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">About the Developer</h3>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <p className="text-gray-700 leading-relaxed mb-6">
                This project is developed and maintained by <strong>Soumyadip Chowdhury</strong>, a passionate developer
                dedicated to solving real-world problems through AI and technology innovation. AI Doctor Assistance was
                created to improve healthcare access for everyone.
              </p>
              <p className="text-gray-600 mb-6">Connect with me for feedback, collaboration, or ideas!</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" asChild>
                  <a
                    href="https://linkedin.com/in/soumyadip-chowdhury-458450260"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://github.com/soumyadipdhara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-5 w-5" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Stethoscope className="h-6 w-6 text-blue-400" />
                <h3 className="text-lg font-bold">AI Doctor Assistance</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted AI-powered healthcare companion for medical guidance and doctor consultations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/symptoms" className="hover:text-white">
                    Symptom Checker
                  </Link>
                </li>
                <li>
                  <Link href="/doctors" className="hover:text-white">
                    Find Doctors
                  </Link>
                </li>
                <li>
                  <Link href="/medicines" className="hover:text-white">
                    Medicine Database
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/in/soumyadip-chowdhury-458450260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/soumyadipdhara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  GitHub
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-4">Emergency: Call 102 (Ambulance) or 108 (Emergency Services)</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 AI Doctor Assistance. All rights reserved. | Made with ❤️ for better healthcare
            </p>
          </div>
        </div>
      </footer>

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
