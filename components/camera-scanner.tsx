"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, X, Upload, Loader2 } from "lucide-react"

interface CameraScannerProps {
  onResult: (extractedText: string) => void
  onClose: () => void
}

export function CameraScanner({ onResult, onClose }: CameraScannerProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processImage = useCallback(
    async (imageFile: File) => {
      setIsProcessing(true)

      try {
        // Create a mock OCR result for demonstration
        // In a real implementation, you would use Tesseract.js or send to a backend OCR service
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate processing time

        // Mock extracted text based on common medicine names
        const mockResults = [
          "Paracetamol 500mg",
          "Crocin Advance Tablet",
          "Azithromycin 250mg",
          "Cetirizine 10mg",
          "Ibuprofen 400mg",
          "Amoxicillin 500mg",
        ]

        const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
        onResult(randomResult)
      } catch (error) {
        console.error("OCR processing failed:", error)
        onResult("Unable to extract text from image. Please try again or enter manually.")
      } finally {
        setIsProcessing(false)
      }
    },
    [onResult],
  )

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setCapturedImage(imageUrl)
        processImage(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    // For mobile devices, this will open the camera
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
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
        {!capturedImage ? (
          <div className="text-center space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Capture or upload an image of medicine strip, bottle, or prescription
              </p>

              <div className="space-y-2">
                <Button onClick={handleCameraCapture} className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Open Camera
                </Button>

                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-transparent"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment" // This enables camera on mobile
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="text-xs text-gray-500 space-y-1">
              <p>• Ensure good lighting and clear text</p>
              <p>• Hold camera steady for best results</p>
              <p>• Supports JPG, PNG formats</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={capturedImage || "/placeholder.svg"}
                alt="Captured medicine"
                className="w-full h-48 object-cover rounded-lg"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="text-white text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm">Processing image...</p>
                    <p className="text-xs">Extracting medicine information</p>
                  </div>
                </div>
              )}
            </div>

            {!isProcessing && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCapturedImage(null)
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ""
                    }
                  }}
                  className="flex-1 bg-transparent"
                >
                  Retake
                </Button>
                <Button onClick={() => processImage(new File([], "retry"))} className="flex-1">
                  Process Again
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>OCR Technology:</strong> This feature uses Optical Character Recognition to extract text from
            images. For best results, ensure the text is clear and well-lit.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
