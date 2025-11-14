"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, Search, Camera, Upload, Pill, AlertTriangle, Star, Home, Users, Activity } from 'lucide-react'
import { LiveCameraScanner } from "@/components/live-camera-scanner"
import {
  searchMedicines,
  type Medicine,
  getMedicineSuggestions,
  searchMedicineByBarcode,
} from "@/lib/medicine-database"

export default function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Medicine[]>([])
  const [showLiveScanner, setShowLiveScanner] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const handleSearch = async (query?: string) => {
    const q = typeof query === "string" ? query : searchQuery
    if (!q.trim()) return

    setIsSearching(true)
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 400))
      const results = searchMedicines(q)
      setSearchResults(results)
      setSelectedMedicine(results[0] || null)
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
      setSelectedMedicine(null)
    } finally {
      setIsSearching(false)
    }
  }

  const onChangeQuery = (val: string) => {
    setSearchQuery(val)
    if (val.trim()) {
      const next = getMedicineSuggestions(val)
      setSuggestions(next)
    } else {
      setSuggestions([])
    }
  }

  const pickSuggestion = (s: string) => {
    setSearchQuery(s)
    setSuggestions([])
    setTimeout(() => handleSearch(s), 50)
  }

  const handleFileUploadInCameraTab = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsSearching(true)
    try {
      // Basic "OCR" simulation: try to use the filename, else fallback
      const namePart = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ")
      const bestGuess = namePart.length > 2 ? namePart : ""
      let results: Medicine[] = []
      if (bestGuess) {
        results = searchMedicines(bestGuess)
      }

      // Try barcode fallback if filename looks like a barcode (digits)
      if (results.length === 0) {
        const digitsInName = namePart.replace(/\D/g, "")
        if (digitsInName.length >= 8) {
          const m = searchMedicineByBarcode(digitsInName)
          if (m) results = [m]
        }
      }

      setSearchQuery(bestGuess)
      setSearchResults(results)
      setSelectedMedicine(results[0] || null)
    } finally {
      setIsSearching(false)
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setSuggestions([])
      }
    }
    document.addEventListener("click", onDocClick)
    return () => document.removeEventListener("click", onDocClick)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header with Navigation (Medicines before Doctors; no Dashboard) */}
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
            <Button
              variant="default"
              size="sm"
              className="flex items-center space-x-2 bg-blue-600 transition-all duration-300 hover:scale-105"
            >
              <Pill className="h-4 w-4" />
              <span>Medicines</span>
            </Button>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Medicine Database</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Search for medicines, compare details, and learn usage, dosage, precautions, and side effects. Use camera
            features for quick identification.
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
            {/* Text Search with Suggestions */}
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
                <div className="relative" ref={suggestionsRef}>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter medicine name (e.g., Paracetamol, Crocin, Dolo 650)"
                      value={searchQuery}
                      onChange={(e) => onChangeQuery(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleSearch()
                          setSuggestions([])
                        }
                      }}
                    />
                    <Button onClick={() => handleSearch()} disabled={isSearching || !searchQuery.trim()}>
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
                  {suggestions.length > 0 && (
                    <div className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm"
                          onClick={() => pickSuggestion(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Popular Searches */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Popular searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Paracetamol",
                      "Crocin",
                      "Dolo 650",
                      "Ibuprofen",
                      "Azithromycin",
                      "Omeprazole",
                      "Cetirizine",
                      "Metformin",
                      "Amlodipine",
                    ].map((medicine) => (
                      <Badge
                        key={medicine}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() => pickSuggestion(medicine)}
                      >
                        {medicine}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && selectedMedicine && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedMedicine.name}</CardTitle>
                  <CardDescription>{selectedMedicine.genericName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-gray-900">Brand:</span> {selectedMedicine.brand}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">₹{selectedMedicine.price}</p>
                          <div className="flex items-center justify-end space-x-1 mt-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600">4.5</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">Strength:</span> {selectedMedicine.strength}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">Form:</span> {selectedMedicine.form}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">Manufacturer:</span> {selectedMedicine.manufacturer}
                      </div>

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
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Dosage</h5>
                        <p className="text-gray-600 text-sm">{selectedMedicine.dosage}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Side Effects</h5>
                        <ul className="text-gray-600 text-sm space-y-1">
                          {selectedMedicine.sideEffects.map((effect, index) => (
                            <li key={index}>• {effect}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Precautions</h5>
                        <ul className="text-gray-600 text-sm space-y-1">
                          {selectedMedicine.precautions.map((precaution, index) => (
                            <li key={index}>• {precaution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
                    We couldn’t find “{searchQuery}”. Try a different name or check the spelling.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Camera tab: side-by-side Static Upload and Live Scan (desktop), stacked on mobile */}
          <TabsContent value="camera" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Static Camera Scan (Upload) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Static Camera Scan (Upload)
                  </CardTitle>
                  <CardDescription>
                    Upload a clear photo of the medicine label/strip; we’ll identify it.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Drag and drop an image here, or click to select a file</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUploadInCameraTab}
                      className="hidden"
                      id="camera-upload"
                    />
                    <label htmlFor="camera-upload">
                      <Button className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Image
                      </Button>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG, HEIC up to 10MB</p>

                    {isSearching && (
                      <div className="mt-4 text-center">
                        <div className="inline-flex items-center space-x-2 text-blue-600">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span>Analyzing image...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Live Camera Scan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Live Camera Scan
                  </CardTitle>
                  <CardDescription>
                    Automatically detects text, barcodes, and QR codes without manual capture.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowLiveScanner(true)}>
                      <Activity className="h-4 w-4 mr-2" />
                      Start Live Scanner
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            {/* Dedicated Upload (kept for users who look here) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Medicine Image
                </CardTitle>
                <CardDescription>
                  Upload an image of medicine packaging, prescription, or strip for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Drag and drop an image here, or click to select a file</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUploadInCameraTab}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Image
                    </Button>
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Supports JPG, PNG, HEIC up to 10MB</p>

                  {isSearching && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center space-x-2 text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span>Processing image...</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Live Scanner Modal (auto-detect) */}
        {showLiveScanner && (
          <LiveCameraScanner
            onMedicineFound={(m) => {
              setSelectedMedicine(m)
              setSearchResults(m ? [m] : [])
              setShowLiveScanner(false)
            }}
            onClose={() => setShowLiveScanner(false)}
            autoStart
          />
        )}
      </div>
    </div>
  )
}
