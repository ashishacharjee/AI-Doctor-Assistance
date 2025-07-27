"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, Pill, UserCheck, Brain, Shield, Smartphone } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Doctor Assistance</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/symptoms" className="text-gray-600 hover:text-blue-600 transition-colors">
              Symptom Checker
            </Link>
            <Link href="/medicines" className="text-gray-600 hover:text-blue-600 transition-colors">
              Medicine Finder
            </Link>
            <Link href="/doctors" className="text-gray-600 hover:text-blue-600 transition-colors">
              Find Doctors
            </Link>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">AI-Powered Healthcare Assistant</Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Your Personal Health
            <span className="text-blue-600"> AI Assistant</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get instant medical guidance, symptom analysis, and doctor recommendations powered by advanced AI
            technology. Available 24/7 for your health concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/symptoms">Check Symptoms Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">Explore Platform</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
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

            <Card className="border-2 hover:border-blue-200 transition-colors">
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

            <Card className="border-2 hover:border-blue-200 transition-colors">
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
                This project is developed and maintained by <strong>Ashish Chandra Acharjee</strong>, a B.Tech student
                at Guru Nanak Institute of Technology. Passionate about solving real-world problems through AI and tech
                innovation, he created AI Doctor Assistance to improve healthcare access for everyone across India.
              </p>
              <p className="text-gray-600 mb-6">Connect with me on LinkedIn for feedback, collaboration, or ideas!</p>
              <div className="flex justify-center">
                <Button variant="outline" asChild>
                  <a
                    href="https://www.linkedin.com/in/ashish-chandra-acharjee"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Stethoscope className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-semibold">AI Doctor Assistance</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted AI-powered healthcare companion for better health decisions.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Features</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/symptoms" className="hover:text-white transition-colors">
                    Symptom Checker
                  </Link>
                </li>
                <li>
                  <Link href="/medicines" className="hover:text-white transition-colors">
                    Medicine Finder
                  </Link>
                </li>
                <li>
                  <Link href="/doctors" className="hover:text-white transition-colors">
                    Doctor Finder
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Emergency</h5>
              <p className="text-sm text-gray-400 mb-2">For medical emergencies, call:</p>
              <div className="space-y-1">
                <p className="text-lg font-bold text-red-400">Ambulance: 102 / 108</p>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 w-full"
                  onClick={() => window.open("tel:102", "_self")}
                >
                  🚑 Emergency Call
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 AI Doctor Assistance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
