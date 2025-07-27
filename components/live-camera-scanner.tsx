"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, X, RotateCcw, Zap, Loader2 } from "lucide-react"

interface LiveCameraScannerProps {
  onResult: (extractedText: string) => void
  onClose: () => void
}

export function LiveCameraScanner({ onResult, onClose }: LiveCameraScannerProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
      }
    } catch (err) {
      console.error("Camera access error:", err)
      setError("Unable to access camera. Please check permissions and try again.")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }, [stream])

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return

    setIsProcessing(true)
    setIsScanning(true)

    try {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context) return

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Simulate OCR processing with more realistic delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock OCR results with Indian medicine names
      const indianMedicines = [
        "Paracetamol 500mg",
        "Crocin Advance Tablet",
        "Dolo 650mg",
        "Azithromycin 250mg",
        "Cetirizine 10mg",
        "Ibuprofen 400mg",
        "Amoxicillin 500mg",
        "Pantoprazole 40mg",
        "Metformin 500mg",
        "Amlodipine 5mg",
        "Atorvastatin 20mg",
        "Omeprazole 20mg",
      ]

      const randomMedicine = indianMedicines[Math.floor(Math.random() * indianMedicines.length)]

      // Add some variation to make it more realistic
      const variations = [
        randomMedicine,
        `${randomMedicine} - Strip of 10 tablets`,
        `${randomMedicine.split(" ")[0]} ${randomMedicine.split(" ")[1] || ""}`,
        `${randomMedicine} MFD: 01/2024 EXP: 12/2026`,
      ]

      const result = variations[Math.floor(Math.random() * variations.length)]
      onResult(result)
    } catch (error) {
      console.error("OCR processing failed:", error)
      onResult("Unable to extract text from camera. Please try again or enter manually.")
    } finally {
      setIsProcessing(false)
      setIsScanning(false)
    }
  }, [onResult])

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [startCamera, stopCamera])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center text-lg">
          <Camera className="h-5 w-5 mr-2" />
          Live Medicine Scanner
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {error ? (
          <div className="text-center space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
            <Button onClick={startCamera} variant="outline" className="w-full bg-transparent">
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Camera View */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video ref={videoRef} className="w-full h-64 object-cover" autoPlay playsInline muted />

              {/* Scanning overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm font-medium">Scanning medicine...</p>
                    <p className="text-xs opacity-75">Hold steady for best results</p>
                  </div>
                </div>
              )}

              {/* Scanning frame overlay */}
              <div className="absolute inset-4 border-2 border-white border-dashed rounded-lg pointer-events-none">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
              </div>

              {/* Instructions */}
              <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-xs p-2 rounded">
                Position medicine strip or bottle within the frame
              </div>
            </div>

            {/* Hidden canvas for image capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Controls */}
            <div className="flex space-x-2">
              <Button onClick={captureAndAnalyze} disabled={isProcessing || !stream} className="flex-1">
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Scan Medicine
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={startCamera} disabled={isProcessing} className="bg-transparent">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-800 font-medium mb-1">📱 Scanning Tips:</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Ensure good lighting</li>
                <li>• Hold phone steady</li>
                <li>• Keep text clearly visible</li>
                <li>• Avoid shadows and glare</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
