"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, X, RotateCcw } from "lucide-react"

interface CameraScannerProps {
  onResult: (extractedText: string) => void
  onClose: () => void
}

export function CameraScanner({ onResult, onClose }: CameraScannerProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCameraCapture = () => {
    cameraInputRef.current?.click()
  }

  const handleUploadImage = () => {
    fileInputRef.current?.click()
  }

  const processImage = async (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please select a valid image file")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Create image preview
      const imageUrl = URL.createObjectURL(file)
      setCapturedImage(imageUrl)

      // Simulate OCR processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate OCR results with realistic medicine names
      const sampleResults = [
        "Paracetamol 500mg",
        "Crocin 650mg",
        "Dolo 650mg",
        "Ibuprofen 400mg",
        "Brufen 600mg",
        "Azithromycin 500mg",
        "Amoxicillin 250mg",
        "Omeprazole 20mg",
        "Pantoprazole 40mg",
        "Cetirizine 10mg",
        "Loratadine 10mg",
        "Metformin 500mg",
        "Atorvastatin 20mg",
        "Amlodipine 5mg",
        "Lisinopril 10mg",
      ]

      const randomResult = sampleResults[Math.floor(Math.random() * sampleResults.length)]

      // Simulate success rate (80% success)
      if (Math.random() > 0.2) {
        onResult(randomResult)
        onClose()
      } else {
        setError("Could not extract text from image. Please try with better lighting or clearer image.")
      }
    } catch (err) {
      console.error("OCR processing error:", err)
      setError("Failed to process image. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processImage(file)
    }
  }

  const retryCapture = () => {
    setCapturedImage(null)
    setError(null)
    setIsProcessing(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Camera className="h-5 w-5 mr-2" />
          Medicine Scanner
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {!capturedImage && !isProcessing && (
          <>
            <div className="text-center space-y-4">
              <p className="text-gray-600">Scan medicine packaging, bottles, or strips</p>

              {/* Camera Capture Button */}
              <Button onClick={handleCameraCapture} className="w-full bg-blue-600 hover:bg-blue-700">
                <Camera className="h-4 w-4 mr-2" />
                Open Camera
              </Button>

              {/* Upload Image Button */}
              <Button onClick={handleUploadImage} variant="outline" className="w-full bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>

              {/* Hidden file inputs */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
                className="hidden"
              />
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-900 text-sm mb-2">Tips for better results:</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Ensure good lighting</li>
                <li>• Keep medicine name clearly visible</li>
                <li>• Hold camera steady</li>
                <li>• Avoid shadows and reflections</li>
              </ul>
            </div>
          </>
        )}

        {capturedImage && !isProcessing && (
          <div className="space-y-4">
            <div className="relative">
              <img src={capturedImage || "/placeholder.svg"} alt="Captured medicine" className="w-full rounded-lg" />
              <Badge className="absolute top-2 right-2 bg-green-600">Captured</Badge>
            </div>
            <Button onClick={retryCapture} variant="outline" className="w-full bg-transparent">
              <RotateCcw className="h-4 w-4 mr-2" />
              Capture Again
            </Button>
          </div>
        )}

        {isProcessing && (
          <div className="text-center space-y-4">
            {capturedImage && (
              <div className="relative">
                <img
                  src={capturedImage || "/placeholder.svg"}
                  alt="Processing..."
                  className="w-full rounded-lg opacity-75"
                />
                <Badge className="absolute top-2 right-2 bg-blue-600">Processing...</Badge>
              </div>
            )}
            <div className="flex items-center justify-center space-x-2">
              <RotateCcw className="h-4 w-4 animate-spin text-blue-600" />
              <span className="text-blue-600">Extracting text from image...</span>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">Using OCR technology to read medicine information...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
            <Button onClick={retryCapture} size="sm" className="mt-2 w-full">
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
