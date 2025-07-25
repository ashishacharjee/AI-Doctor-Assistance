"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, Search, Pill, AlertTriangle, Clock, Shield, Camera } from "lucide-react"
import Link from "next/link"
import { LiveCameraScanner } from "@/components/live-camera-scanner"

export default function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showCamera, setShowCamera] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate medicine search with Indian medicines and prices
    setTimeout(() => {
      const mockResults = [
        {
          name: "Paracetamol (Crocin)",
          genericName: "Paracetamol",
          category: "Pain Reliever/Fever Reducer",
          dosage: "500mg every 4-6 hours",
          maxDaily: "3000mg per day",
          purpose: "Relief of minor aches, pains, and fever",
          sideEffects: ["Nausea", "Stomach upset", "Liver damage (with overdose)"],
          precautions: [
            "Do not exceed recommended dose",
            "Avoid alcohol while taking",
            "Consult doctor if pregnant or breastfeeding",
          ],
          interactions: ["Warfarin", "Alcohol", "Other paracetamol-containing products"],
          availability: "Over-the-counter",
          price: "₹15-45",
          manufacturer: "GSK Pharmaceuticals",
        },
        {
          name: "Ibuprofen (Brufen)",
          genericName: "Ibuprofen",
          category: "NSAID Pain Reliever",
          dosage: "400mg every 6-8 hours",
          maxDaily: "1200mg per day (OTC)",
          purpose: "Pain relief, inflammation reduction, fever reduction",
          sideEffects: ["Stomach upset", "Heartburn", "Dizziness", "Headache"],
          precautions: [
            "Take with food to reduce stomach upset",
            "Not recommended for people with heart disease",
            "Avoid if allergic to NSAIDs",
          ],
          interactions: ["Blood thinners", "ACE inhibitors", "Lithium"],
          availability: "Over-the-counter",
          price: "₹25-80",
          manufacturer: "Abbott Healthcare",
        },
        {
          name: "Cetirizine (Zyrtec)",
          genericName: "Cetirizine",
          category: "Antihistamine",
          dosage: "10mg once daily",
          maxDaily: "10mg per day",
          purpose: "Allergy relief, hay fever, urticaria",
          sideEffects: ["Drowsiness", "Dry mouth", "Fatigue", "Headache"],
          precautions: [
            "May cause drowsiness - avoid driving",
            "Not recommended for children under 2",
            "Consult doctor if you have kidney problems",
          ],
          interactions: ["Alcohol", "Sedatives", "CNS depressants"],
          availability: "Over-the-counter",
          price: "₹35-120",
          manufacturer: "Dr. Reddy's Laboratories",
        },
        {
          name: "Azithromycin (Azee)",
          genericName: "Azithromycin",
          category: "Antibiotic",
          dosage: "500mg once daily for 3 days",
          maxDaily: "500mg per day",
          purpose: "Bacterial infections, respiratory tract infections",
          sideEffects: ["Nausea", "Diarrhea", "Abdominal pain", "Headache"],
          precautions: ["Complete the full course", "Take on empty stomach", "Inform doctor about heart conditions"],
          interactions: ["Antacids", "Warfarin", "Digoxin"],
          availability: "Prescription only",
          price: "₹85-250",
          manufacturer: "Cipla Limited",
        },
      ]

      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1500)
  }

  const handleCameraResult = (extractedText: string) => {
    setSearchQuery(extractedText)
    setShowCamera(false)
    // Automatically search after OCR
    setTimeout(() => handleSearch(), 500)
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
            <Link href="/symptoms" className="text-gray-600 hover:text-blue-600">
              Symptoms
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Medicine Information Finder</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search for detailed information about medicines including dosage, side effects, precautions, and drug
              interactions. Scan medicine strips with your camera for instant recognition.
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search Medicines</CardTitle>
              <CardDescription>Search by medicine name, scan with camera, or search by symptoms</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="name" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="name">By Medicine Name</TabsTrigger>
                  <TabsTrigger value="camera">Camera Scan</TabsTrigger>
                  <TabsTrigger value="symptom">By Symptoms</TabsTrigger>
                </TabsList>

                <TabsContent value="name" className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter medicine name (e.g., Paracetamol, Crocin, Brufen)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <Button onClick={handleSearch} disabled={isSearching}>
                      <Search className="h-4 w-4 mr-2" />
                      {isSearching ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="camera" className="space-y-4">
                  {!showCamera ? (
                    <div className="text-center py-8">
                      <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        Use live camera to scan medicine strips, bottles, or prescriptions
                      </p>
                      <Button onClick={() => setShowCamera(true)} size="lg">
                        <Camera className="h-5 w-5 mr-2" />
                        Open Live Camera
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        Real-time OCR technology for instant medicine recognition
                      </p>
                    </div>
                  ) : (
                    <LiveCameraScanner onResult={handleCameraResult} onClose={() => setShowCamera(false)} />
                  )}

                  {searchQuery && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Extracted text:</p>
                      <p className="text-gray-900">{searchQuery}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="symptom" className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter symptoms (e.g., headache, fever, allergies)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <Button onClick={handleSearch} disabled={isSearching}>
                      <Search className="h-4 w-4 mr-2" />
                      {isSearching ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Search Results ({searchResults.length} found)</h3>

              {searchResults.map((medicine, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          <Pill className="h-5 w-5 mr-2 text-green-600" />
                          {medicine.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Generic: {medicine.genericName} • Category: {medicine.category}
                        </CardDescription>
                        <p className="text-sm text-gray-500 mt-1">Manufacturer: {medicine.manufacturer}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant="secondary">{medicine.availability}</Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {medicine.price}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Purpose */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Purpose
                      </h5>
                      <p className="text-gray-700 text-sm">{medicine.purpose}</p>
                    </div>

                    {/* Dosage Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-blue-600" />
                          Dosage
                        </h5>
                        <p className="text-sm text-gray-700">{medicine.dosage}</p>
                        <p className="text-xs text-gray-500 mt-1">Max daily: {medicine.maxDaily}</p>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-green-600" />
                          Availability & Price
                        </h5>
                        <p className="text-sm text-gray-700">{medicine.availability}</p>
                        <p className="text-sm font-medium text-green-600 mt-1">Price range: {medicine.price}</p>
                      </div>
                    </div>

                    {/* Side Effects */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                        Common Side Effects
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {medicine.sideEffects.map((effect: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Precautions */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Precautions & Warnings</h5>
                      <ul className="space-y-1">
                        {medicine.precautions.map((precaution: string, idx: number) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            {precaution}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Drug Interactions */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Drug Interactions</h5>
                      <div className="flex flex-wrap gap-2">
                        {medicine.interactions.map((interaction: string, idx: number) => (
                          <Badge key={idx} variant="destructive" className="text-xs">
                            {interaction}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Always consult your doctor or pharmacist about potential drug interactions.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Medicine Safety Notice */}
          <Card className="mt-8 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-2">Important Medicine Safety Information</h4>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• Always consult healthcare professionals before starting any medication</li>
                    <li>• Follow prescribed dosages and never exceed recommended amounts</li>
                    <li>• Inform your doctor about all medications you are currently taking</li>
                    <li>• Read all labels and warnings before taking any medicine</li>
                    <li>• Store medicines safely and check expiration dates regularly</li>
                    <li>• For emergencies, call 102 (Ambulance) or 108 (Emergency Services)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
