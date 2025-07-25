"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, Pill, UserCheck, Activity, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
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
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Activity className="h-3 w-3 mr-1" />
              System Online
            </Badge>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Health Dashboard</h2>
          <p className="text-gray-600">
            Choose from our AI-powered health tools to get started with your health analysis.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available 24/7</p>
                  <p className="text-2xl font-bold text-green-600">Online</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Time</p>
                  <p className="text-2xl font-bold text-blue-600">{"< 30s"}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
                  <p className="text-2xl font-bold text-purple-600">95%+</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Symptom Checker */}
          <Card className="border-2 hover:border-blue-200 transition-all duration-200 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Symptom Checker</CardTitle>
              <CardDescription>
                Analyze your symptoms using AI-powered diagnosis with multiple input methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Text-based symptom input
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Voice recognition support
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Image analysis for visual symptoms
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/symptoms">Start Symptom Check</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Medicine Finder */}
          <Card className="border-2 hover:border-green-200 transition-all duration-200 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Pill className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Medicine Information</CardTitle>
              <CardDescription>Search for medicines by name or symptoms with comprehensive details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Comprehensive medicine database
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Dosage and usage instructions
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Side effects and precautions
                </div>
              </div>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/medicines">Find Medicine</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Doctor Finder */}
          <Card className="border-2 hover:border-purple-200 transition-all duration-200 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Doctor Finder</CardTitle>
              <CardDescription>Find specialists based on your condition and get recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Specialist recommendations
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Location-based search
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Ratings and reviews
                </div>
              </div>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link href="/doctors">Find Doctors</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Notice */}
        <Card className="mt-8 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-sm font-bold">!</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 mb-2">Medical Emergency?</h4>
                <p className="text-red-800 text-sm mb-3">
                  If you are experiencing a medical emergency, do not use this platform. Call emergency services
                  immediately or go to the nearest emergency room.
                </p>
                <div className="flex items-center space-x-4">
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => window.open("tel:102", "_self")}
                  >
                    🚑 Call 102 (Ambulance)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-700 bg-transparent"
                    onClick={() => window.open("tel:108", "_self")}
                  >
                    🚑 Call 108 (Emergency)
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
