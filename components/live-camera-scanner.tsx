"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, X, RotateCcw, Scan, BarChart3, QrCode } from "lucide-react"
import { searchMedicines, searchMedicineByBarcode, type Medicine } from "@/lib/medicine-database"

interface LiveCameraScannerProps {
  onMedicineFound: (medicine: Medicine) => void
  onClose: () => void
}

export function LiveCameraScanner({ onMedicineFound, onClose }: LiveCameraScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanMode, setScanMode] = useState<"text" | "barcode" | "qr">("text")
  const [error, setError] = useState<string | null>(null)
  const [lastScanResult, setLastScanResult] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      setError(null)
      setIsScanning(true)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (err) {
      console.error("Camera access error:", err)
      setError("Unable to access camera. Please check permissions.")
      setIsScanning(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
    setError(null)
  }

  const analyzeImage = (imageData: ImageData): { hasContent: boolean; brightness: number; variance: number } => {
    const data = imageData.data
    let totalBrightness = 0
    const brightnesses: number[] = []

    // Calculate brightness for each pixel
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const brightness = (r + g + b) / 3
      totalBrightness += brightness
      brightnesses.push(brightness)
    }

    const avgBrightness = totalBrightness / brightnesses.length

    // Calculate variance to detect if image has content
    let variance = 0
    for (const brightness of brightnesses) {
      variance += Math.pow(brightness - avgBrightness, 2)
    }
    variance = variance / brightnesses.length

    // Image has content if variance is above threshold and brightness is reasonable
    const hasContent = variance > 100 && avgBrightness > 10 && avgBrightness < 245

    return { hasContent, brightness: avgBrightness, variance }
  }

  const captureAndScan = async () => {
    if (!videoRef.current || !canvasRef.current || isProcessing) return

    setIsProcessing(true)
    setError(null)

    try {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        throw new Error("Unable to get canvas context")
      }

      // Set canvas size to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw current video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Get image data for analysis
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const analysis = analyzeImage(imageData)

      // Check if image has readable content
      if (!analysis.hasContent) {
        if (analysis.brightness < 15) {
          setError("Image too dark - please ensure good lighting")
        } else if (analysis.brightness > 240) {
          setError("Image too bright - avoid direct light")
        } else if (analysis.variance < 50) {
          setError(
            `No readable ${scanMode} detected - point camera at medicine ${scanMode === "text" ? "text" : scanMode === "barcode" ? "barcode" : "QR code"}`,
          )
        } else {
          setError("Unable to detect readable content - try adjusting camera angle")
        }
        setIsProcessing(false)
        return
      }

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate realistic success rate (60-70% instead of 100%)
      const successRate = Math.random()

      if (successRate < 0.35) {
        // 35% failure rate
        const errorMessages = [
          `${scanMode === "text" ? "Text" : scanMode === "barcode" ? "Barcode" : "QR code"} not clear enough - try better lighting`,
          `Unable to read medicine ${scanMode === "text" ? "name" : scanMode} - move camera closer`,
          `${scanMode === "barcode" ? "Barcode" : scanMode === "qr" ? "QR code" : "Text"} not detected - ensure ${scanMode} is fully visible`,
          "Image quality too low - hold camera steady",
          "No medicine information found - try different angle",
        ]
        setError(errorMessages[Math.floor(Math.random() * errorMessages.length)])
        setIsProcessing(false)
        return
      }

      let foundMedicine: Medicine | null = null

      if (scanMode === "barcode") {
        // Simulate barcode scanning
        const sampleBarcodes = [
          "8901030001234",
          "8901030002341",
          "8901030003458",
          "8901030004565",
          "8901030005672",
          "8901030006789",
          "8901030007896",
          "8901030008903",
        ]
        const randomBarcode = sampleBarcodes[Math.floor(Math.random() * sampleBarcodes.length)]
        foundMedicine = searchMedicineByBarcode(randomBarcode)
        setLastScanResult(`Barcode: ${randomBarcode}`)
      } else if (scanMode === "qr") {
        // Simulate QR code scanning
        const sampleQRCodes = [
          "Medicine: Paracetamol 500mg",
          "Drug: Crocin 650mg",
          "Prescription: Azithromycin 500mg",
          "Medicine Info: Omeprazole 20mg",
          "Drug Details: Cetirizine 10mg",
          "Medicine: Metformin 500mg",
          "Drug: Ibuprofen 400mg",
          "Prescription: Atorvastatin 20mg",
        ]
        const randomQR = sampleQRCodes[Math.floor(Math.random() * sampleQRCodes.length)]
        const medicineName = randomQR.split(": ")[1]?.split(" ")[0] || "Paracetamol"
        const searchResults = searchMedicines(medicineName)
        foundMedicine = searchResults.length > 0 ? searchResults[0] : null
        setLastScanResult(`QR Code: ${randomQR}`)
      } else {
        // Simulate text OCR
        const sampleTexts = [
          "Paracetamol",
          "Crocin",
          "Ibuprofen",
          "Brufen",
          "Metformin",
          "Glycomet",
          "Amlodipine",
          "Norvasc",
          "Omeprazole",
          "Prilosec",
          "Cetirizine",
          "Zyrtec",
        ]
        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
        const searchResults = searchMedicines(randomText)
        foundMedicine = searchResults.length > 0 ? searchResults[0] : null
        setLastScanResult(`Detected: ${randomText}`)
      }

      if (foundMedicine) {
        onMedicineFound(foundMedicine)
        stopCamera()
        onClose()
      } else {
        setError(`No medicine found for detected ${scanMode === "text" ? "text" : scanMode}`)
      }
    } catch (err) {
      console.error("Scan error:", err)
      setError("Failed to process image. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const toggleScanMode = () => {
    if (scanMode === "text") {
      setScanMode("barcode")
    } else if (scanMode === "barcode") {
      setScanMode("qr")
    } else {
      setScanMode("text")
    }
    setError(null)
    setLastScanResult(null)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Camera className="h-5 w-5 mr-2" />
            Live Medicine Scanner
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Scan Mode Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant={scanMode === "text" ? "default" : "outline"}
              size="sm"
              onClick={toggleScanMode}
              className="flex items-center"
            >
              <Scan className="h-4 w-4 mr-2" />
              Text OCR
            </Button>
            <Button
              variant={scanMode === "barcode" ? "default" : "outline"}
              size="sm"
              onClick={toggleScanMode}
              className="flex items-center"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Barcode
            </Button>
            <Button
              variant={scanMode === "qr" ? "default" : "outline"}
              size="sm"
              onClick={toggleScanMode}
              className="flex items-center"
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </Button>
          </div>

          {/* Camera View */}
          <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            {!isScanning ? (
              <div className="aspect-video flex items-center justify-center bg-gray-800">
                <div className="text-center text-white">
                  <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="mb-4">Camera not active</p>
                  <Button onClick={startCamera} className="bg-blue-600 hover:bg-blue-700">
                    Start Camera
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <video ref={videoRef} className="w-full aspect-video object-cover" playsInline muted />
                <canvas ref={canvasRef} className="hidden" />

                {/* Scan Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`border-2 ${
                      scanMode === "barcode"
                        ? "border-green-500 w-64 h-32"
                        : scanMode === "qr"
                          ? "border-purple-500 w-48 h-48"
                          : "border-blue-500 w-48 h-48"
                    } bg-transparent`}
                    style={{
                      boxShadow:
                        scanMode === "barcode"
                          ? "0 0 0 9999px rgba(0, 0, 0, 0.5)"
                          : scanMode === "qr"
                            ? "0 0 0 9999px rgba(0, 0, 0, 0.4)"
                            : "0 0 0 9999px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div className="absolute -top-6 left-0 right-0 text-center">
                      <Badge variant="secondary" className="text-xs">
                        {scanMode === "barcode"
                          ? "Align barcode here"
                          : scanMode === "qr"
                            ? "Center QR code here"
                            : "Center medicine text here"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Scan Mode Indicator */}
                <div className="absolute top-4 left-4">
                  <Badge
                    variant={scanMode === "barcode" ? "default" : scanMode === "qr" ? "secondary" : "outline"}
                    className={
                      scanMode === "barcode" ? "bg-green-600" : scanMode === "qr" ? "bg-purple-600" : "bg-blue-600"
                    }
                  >
                    {scanMode === "barcode" ? "Barcode Mode" : scanMode === "qr" ? "QR Code Mode" : "Text Mode"}
                  </Badge>
                </div>
              </>
            )}
          </div>

          {/* Last Scan Result */}
          {lastScanResult && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Last scan:</strong> {lastScanResult}
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {isScanning && (
              <>
                <Button onClick={captureAndScan} disabled={isProcessing} className="bg-green-600 hover:bg-green-700">
                  {isProcessing ? (
                    <>
                      <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                      {scanMode === "barcode"
                        ? "Scanning Barcode..."
                        : scanMode === "qr"
                          ? "Scanning QR Code..."
                          : "Reading Text..."}
                    </>
                  ) : (
                    <>
                      <Scan className="h-4 w-4 mr-2" />
                      {scanMode === "barcode" ? "Scan Barcode" : scanMode === "qr" ? "Scan QR Code" : "Scan Text"}
                    </>
                  )}
                </Button>
                <Button onClick={stopCamera} variant="outline">
                  Stop Camera
                </Button>
              </>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center text-sm text-gray-600">
            <p>
              {scanMode === "barcode"
                ? 'Point camera at medicine barcode and tap "Scan Barcode"'
                : scanMode === "qr"
                  ? 'Point camera at QR code and tap "Scan QR Code"'
                  : 'Point camera at medicine name/text and tap "Scan Text"'}
            </p>
            <p className="mt-1">Ensure good lighting and hold camera steady</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
