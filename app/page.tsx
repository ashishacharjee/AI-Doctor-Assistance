"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Stethoscope, Pill, Shield, Github, Linkedin, Home, Users, Brain } from "lucide-react"

export default function HomePage() {
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
            {/* Removed AI Online badge */}
            <div className="flex items-center space-x-2" />
          </div>

          <nav className="flex items-center justify-center space-x-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant="default"
              size="sm"
              className="flex items-center space-x-2 bg-blue-600 transition-all duration-300 hover:scale-105"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
            <Link href="/symptoms?tab=analysis&chat=1">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              >
                <Stethoscope className="h-4 w-4" />
                <span>Symptoms</span>
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

      {/* Hero (simplified) */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Your AI-Powered Healthcare Companion</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get instant medical guidance, analyze symptoms, discover medicines, and connect with qualified doctors.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/symptoms?tab=analysis&chat=1">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Stethoscope className="h-5 w-5 mr-2" />
                AI Symptom Checker
              </Button>
            </Link>
            <Link href="/doctors">
              <Button size="lg" variant="outline" className="bg-transparent">
                <Users className="h-5 w-5 mr-2" />
                Find Qualified Doctors
              </Button>
            </Link>
            <Link href="/medicines">
              <Button size="lg" variant="outline" className="bg-transparent">
                <Pill className="h-5 w-5 mr-2" />
                Medicine Database
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats (removed 24/7 card) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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
              This AI Doctor Assistance platform is for informational purposes only and should not replace professional
              medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals. In case of
              emergency, contact emergency services immediately.
            </p>
          </div>
        </div>
      </section>

      {/* About Developer */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">About the Developer</h3>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <p className="text-gray-700 leading-relaxed mb-6">
                This project is developed and maintained by <strong>Ashish Chandra Acharjee</strong>, a passionate
                developer dedicated to solving real-world problems through AI and technology innovation. AI Doctor
                Assistance was created to improve healthcare access for everyone.
              </p>
              <p className="text-gray-600 mb-6">Connect with me for feedback, collaboration, or ideas!</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" asChild>
                  <a
                    href="https://www.linkedin.com/in/ashish-chandra-acharjee/"
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
                    href="https://github.com/ashishacharjee"
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

      {/* Footer (Support column removed previously) */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <Link href="/symptoms?tab=analysis&chat=1" className="hover:text-white">
                    AI Symptom Checker
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
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/ashish-chandra-acharjee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/ashishacharjee"
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
    </div>
  )
}
