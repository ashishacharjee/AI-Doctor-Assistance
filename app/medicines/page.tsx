"use client"

import type React from "react"
import { X } from "lucide-react" // Import the X component

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Stethoscope,
  Search,
  Camera,
  Upload,
  Pill,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  Home,
  Users,
  LayoutDashboard,
  Activity,
  Info,
} from "lucide-react"
import Link from "next/link"
import { CameraScanner } from "@/components/camera-scanner"
import { LiveCameraScanner } from "@/components/live-camera-scanner"
import { searchMedicines, type Medicine } from "@/lib/medicine-database"

export default function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Medicine[]>([])
  const [showCameraScanner, setShowCameraScanner] = useState(false)
  const [showLiveScanner, setShowLiveScanner] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const results = searchMedicines(searchQuery)
      setSearchResults(results)
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleCameraResult = (extractedText: string) => {
    setSearchQuery(extractedText)
    setShowCameraScanner(false)
    // Auto-search with extracted text
    setTimeout(() => {
      handleSearch()
    }, 500)
  }

  const handleMedicineFound = (medicine: Medicine) => {
    setSelectedMedicine(medicine)
    setShowLiveScanner(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      // Simulate OCR processing
      setIsSearching(true)
      setTimeout(() => {
        const sampleMedicines = [
          "Paracetamol 500mg",
          "Crocin Advance",
          "Dolo 650mg",
          "Ibuprofen 400mg",
          "Azithromycin 500mg",
        ]
        const randomMedicine = sampleMedicines[Math.floor(Math.random() * sampleMedicines.length)]
        setSearchQuery(randomMedicine)
        const results = searchMedicines(randomMedicine)
        setSearchResults(results)
        setIsSearching(false)
      }, 2000)
    }
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
                <Pill className="h-3 w-3 mr-1" />
                Medicine Database
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
            <Button
              variant="default"
              size="sm"
              className="flex items-center space-x-2 bg-blue-600 transition-all duration-300 hover:scale-105"
            >
              <Pill className="h-4 w-4" />
              <span>Medicines</span>
            </Button>
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

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Medicine Database</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Search for medicines, check availability, compare prices, and get detailed information about medications.
            Use our advanced scanning features for quick identification.
          </p>
        </div>

        {/* Safety Warning */}
        <div className="mb-8">
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-orange-900 mb-2">Important Medicine Safety Information</h4>
                  <p className="text-orange-800 text-sm mb-3">
                    Always consult with a healthcare professional before taking any medication. Check expiry dates,
                    dosage instructions, and potential side effects. Never share prescription medications.
                  </p>
                  <div className="flex space-x-2">
                    <Badge className="bg-orange-100 text-orange-800 text-xs">Prescription Required</Badge>
                    <Badge className="bg-orange-100 text-orange-800 text-xs">Check Expiry Date</Badge>
                    <Badge className="bg-orange-100 text-orange-800 text-xs">Follow Dosage</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">By Medicine Name</TabsTrigger>
            <TabsTrigger value="camera">Camera Scan</TabsTrigger>
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* Text Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search Medicines
                </CardTitle>
                <CardDescription>
                  Enter medicine name, brand name, or generic name to search our comprehensive database
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter medicine name (e.g., Paracetamol, Crocin, Dolo 650)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()}>
                    {isSearching ? (
                      <>
                        <Search className="h-4 w-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </>
                    )}
                  </Button>
                </div>

                {/* Popular Searches */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Popular searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Paracetamol", "Crocin", "Dolo 650", "Ibuprofen", "Azithromycin", "Omeprazole", "Cetirizine"].map(
                      (medicine) => (
                        <Badge
                          key={medicine}
                          variant="outline"
                          className="cursor-pointer hover:bg-blue-50"
                          onClick={() => {
                            setSearchQuery(medicine)
                            setTimeout(handleSearch, 100)
                          }}
                        >
                          {medicine}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Search Results ({searchResults.length})</CardTitle>
                  <CardDescription>Found medicines matching your search</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.map((medicine) => (
                      <Card key={medicine.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">{medicine.name}</h4>
                              <p className="text-sm text-gray-600 mb-2">{medicine.genericName}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span>{medicine.manufacturer}</span>
                                <span>•</span>
                                <span>{medicine.strength}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">₹{medicine.price}</p>
                              <div className="flex items-center space-x-1 mt-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-xs text-gray-600">4.5</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 mb-3">
                            <div className="flex items-center space-x-2 text-xs text-gray-600">
                              <Pill className="h-3 w-3" />
                              <span>{medicine.category}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-600">
                              <Clock className="h-3 w-3" />
                              <span>Form: {medicine.form}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-600">
                              <MapPin className="h-3 w-3" />
                              <span>{medicine.availability}</span>
                            </div>
                          </div>

                          {/* Uses Section */}
                          <div className="mb-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <Info className="h-3 w-3 text-blue-600" />
                              <span className="text-xs font-medium text-blue-900">Used for:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {medicine.uses.slice(0, 3).map((use, index) => (
                                <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-800">
                                  {use}
                                </Badge>
                              ))}
                              {medicine.uses.length > 3 && (
                                <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600">
                                  +{medicine.uses.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {medicine.prescriptionRequired && (
                              <Badge className="bg-red-100 text-red-800 text-xs">Prescription Required</Badge>
                            )}
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                medicine.availability === "In Stock"
                                  ? "bg-green-50 text-green-800"
                                  : medicine.availability === "Limited Stock"
                                    ? "bg-orange-50 text-orange-800"
                                    : "bg-red-50 text-red-800"
                              }`}
                            >
                              {medicine.availability}
                            </Badge>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              onClick={() => setSelectedMedicine(medicine)}
                            >
                              View Details
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              Find Nearby
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {searchQuery && searchResults.length === 0 && !isSearching && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No medicines found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any medicines matching "{searchQuery}". Try searching with a different name or
                    check the spelling.
                  </p>
                  <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="camera" className="space-y-6">
            {/* Camera Scanning */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setShowCameraScanner(true)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Static Camera Scan
                  </CardTitle>
                  <CardDescription>
                    Take a photo of medicine packaging, strips, or bottles for identification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Camera className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Capture medicine packaging for OCR analysis</p>
                    <Button className="w-full" onClick={() => setShowCameraScanner(true)}>
                      <Camera className="h-4 w-4 mr-2" />
                      Open Camera Scanner
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setShowLiveScanner(true)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Live Camera Scan
                  </CardTitle>
                  <CardDescription>Real-time scanning with barcode and QR code support</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Activity className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Live scanning with instant recognition</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setShowLiveScanner(true)}>
                      <Activity className="h-4 w-4 mr-2" />
                      Start Live Scanner
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Scanning Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Scanning Tips for Best Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900">For Text Recognition:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Ensure good lighting conditions</li>
                      <li>• Keep medicine name clearly visible</li>
                      <li>• Hold camera steady</li>
                      <li>• Avoid shadows and reflections</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900">For Barcode/QR Scanning:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Align barcode/QR code in frame</li>
                      <li>• Maintain proper distance</li>
                      <li>• Ensure code is not damaged</li>
                      <li>• Clean camera lens if needed</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Medicine Image
                </CardTitle>
                <CardDescription>
                  Upload an image of medicine packaging, prescription, or medicine strip for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Drag and drop an image here, or click to select a file</p>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload">
                    <Button className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Image
                    </Button>
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Supports JPG, PNG, HEIC formats up to 10MB</p>
                </div>

                {isSearching && (
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center space-x-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span>Processing image with OCR...</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upload Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Image Upload Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-900 mb-2">Good Quality</h5>
                    <p className="text-sm text-gray-600">Clear, well-lit images with readable text</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-900 mb-2">Proper Angle</h5>
                    <p className="text-sm text-gray-600">Straight, front-facing view of medicine packaging</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-900 mb-2">Full Visibility</h5>
                    <p className="text-sm text-gray-600">Medicine name and details clearly visible</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Camera Scanner Modal */}
      {showCameraScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <CameraScanner onResult={handleCameraResult} onClose={() => setShowCameraScanner(false)} />
          </div>
        </div>
      )}

      {/* Live Scanner Modal */}
      {showLiveScanner && (
        <LiveCameraScanner onMedicineFound={handleMedicineFound} onClose={() => setShowLiveScanner(false)} />
      )}

      {/* Selected Medicine Modal */}
      {selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Medicine Details
                <Button variant="ghost" size="sm" onClick={() => setSelectedMedicine(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">{selectedMedicine.name}</h4>
                  <p className="text-gray-600 mb-2">{selectedMedicine.genericName}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Brand:</span> {selectedMedicine.brand}
                    </div>
                    <div>
                      <span className="font-medium">Strength:</span> {selectedMedicine.strength}
                    </div>
                    <div>
                      <span className="font-medium">Form:</span> {selectedMedicine.form}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span> ₹{selectedMedicine.price}
                    </div>
                    <div>
                      <span className="font-medium">Manufacturer:</span> {selectedMedicine.manufacturer}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {selectedMedicine.category}
                    </div>
                  </div>
                </div>

                {/* Uses */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Uses & Indications</h5>
                  <p className="text-gray-600 text-sm mb-2">{selectedMedicine.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMedicine.uses.map((use, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800">
                        {use}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Dosage */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Dosage</h5>
                  <p className="text-gray-600 text-sm">{selectedMedicine.dosage}</p>
                </div>

                {/* Side Effects */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Side Effects</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {selectedMedicine.sideEffects.map((effect, index) => (
                      <li key={index}>• {effect}</li>
                    ))}
                  </ul>
                </div>

                {/* Precautions */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Precautions</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {selectedMedicine.precautions.map((precaution, index) => (
                      <li key={index}>• {precaution}</li>
                    ))}
                  </ul>
                </div>

                {/* Availability */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">Availability:</span>
                    <Badge
                      className={`ml-2 ${
                        selectedMedicine.availability === "In Stock"
                          ? "bg-green-100 text-green-800"
                          : selectedMedicine.availability === "Limited Stock"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedMedicine.availability}
                    </Badge>
                  </div>
                  {selectedMedicine.prescriptionRequired && (
                    <Badge className="bg-red-100 text-red-800">Prescription Required</Badge>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Find Nearby Pharmacy</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
