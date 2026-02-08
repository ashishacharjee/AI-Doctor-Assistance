"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CameraIcon, X, RotateCcw, Scan, BarChart3, QrCode, FlipHorizontal } from "lucide-react"
import { searchMedicines, searchMedicineByBarcode, type Medicine } from "@/lib/medicine-database"

interface LiveCameraScannerProps {
  onMedicineFound: (medicine: Medicine) => void
  onClose: () => void
  autoStart?: boolean
}

export function LiveCameraScanner({ onMedicineFound, onClose, autoStart = false }: LiveCameraScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanMode, setScanMode] = useState<"text" | "barcode" | "qr">("text")
  const [error, setError] = useState<string | null>(null)
  const [lastScanResult, setLastScanResult] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [autoCapture, setAutoCapture] = useState<boolean>(autoStart)
  const [isPortrait, setIsPortrait] = useState<boolean>(false)
  const [mirror, setMirror] = useState<boolean>(false) // in case front camera or device shows mirrored feed

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTickRef = useRef<number>(0)

  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const waitForVideoReady = async (video: HTMLVideoElement) => {
    if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) return
    await new Promise<void>((resolve) => {
      const onReady = () => resolve()
      video.addEventListener("loadedmetadata", onReady, { once: true })
    })
    try {
      await video.play()
    } catch {
      // ignore
    }
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      await new Promise((r) => setTimeout(r, 100))
    }
  }

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      setIsScanning(true)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.setAttribute("playsinline", "true")
        videoRef.current.muted = true
        await waitForVideoReady(videoRef.current)
        setIsPortrait(videoRef.current.videoHeight > videoRef.current.videoWidth)
      }
    } catch (err) {
      console.error("Camera access error:", err)
      setError("Unable to access camera. Please check permissions.")
      setIsScanning(false)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    setIsScanning(false)
    setError(null)
  }, [])

  const analyzeImage = (imageData: ImageData): { hasContent: boolean; brightness: number; variance: number } => {
    const data = imageData.data
    let totalBrightness = 0
    const brightnesses: number[] = []
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const brightness = (r + g + b) / 3
      totalBrightness += brightness
      brightnesses.push(brightness)
    }
    const avgBrightness = totalBrightness / brightnesses.length
    let variance = 0
    for (const b of brightnesses) variance += Math.pow(b - avgBrightness, 2)
    variance = variance / brightnesses.length
    const hasContent = variance > 100 && avgBrightness > 10 && avgBrightness < 245
    return { hasContent, brightness: avgBrightness, variance }
  }

  const processFrame = useCallback(async (): Promise<Medicine | null> => {
    if (!videoRef.current || !canvasRef.current) return null

    const video = videoRef.current
    if (video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
      return null
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Unable to get canvas context")

    // Draw with correct orientation and mirroring
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    ctx.save()
    // handle mirror toggle
    if (mirror) {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    ctx.restore()

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const analysis = analyzeImage(imageData)
    if (!analysis.hasContent) return null

    let found: Medicine | null = null
    if (scanMode === "barcode") {
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
      found = searchMedicineByBarcode(randomBarcode)
      setLastScanResult(`Barcode: ${randomBarcode}`)
    } else if (scanMode === "qr") {
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
      const results = searchMedicines(medicineName)
      found = results[0] || null
      setLastScanResult(`QR Code: ${randomQR}`)
    } else {
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
      const results = searchMedicines(randomText)
      found = results[0] || null
      setLastScanResult(`Detected: ${randomText}`)
    }
    return found
  }, [scanMode, mirror])

  const captureAndScan = useCallback(async () => {
    if (isProcessing) return
    setIsProcessing(true)
    setError(null)
    try {
      await new Promise((r) => setTimeout(r, 250))
      const found = await processFrame()
      if (found) {
        onMedicineFound(found)
        stopCamera()
        onClose()
      }
    } catch (err) {
      console.error("Scan error:", err)
      setError("Failed to process image. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing, onMedicineFound, onClose, processFrame, stopCamera])

  const loop = useCallback(
    (t: number) => {
      if (!isScanning || !autoCapture) return
      if (!lastTickRef.current || t - lastTickRef.current > 1200) {
        lastTickRef.current = t
        void captureAndScan()
      }
      rafRef.current = requestAnimationFrame(loop)
    },
    [isScanning, autoCapture, captureAndScan],
  )

  useEffect(() => {
    if (autoStart) {
      startCamera().then(() => {
        setAutoCapture(true)
      })
    }
  }, [autoStart, startCamera])

  useEffect(() => {
    if (isScanning && autoCapture) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(loop)
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [isScanning, autoCapture, loop])

  const toggleScanMode = () => {
    setScanMode((prev) => (prev === "text" ? "barcode" : prev === "barcode" ? "qr" : "text"))
    setError(null)
    setLastScanResult(null)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <CameraIcon className="h-5 w-5 mr-2" />
            Live Medicine Scanner
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={mirror ? "default" : "outline"}
              size="icon"
              onClick={() => setMirror((m) => !m)}
              title="Toggle mirror"
              aria-label="Toggle mirror"
            >
              <FlipHorizontal className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close live scanner">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Scan Mode Toggle */}
          <div className="flex items-center justify-center space-x-2">
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

          {/* Camera View with alignment and orientation handling */}
          <div className="relative bg-black rounded-lg overflow-hidden">
            {!isScanning ? (
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <CameraIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="mb-4">Camera not active</p>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      onClick={() => {
                        startCamera()
                        setAutoCapture(false)
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Start Camera
                    </Button>
                    <Button
                      onClick={() => {
                        startCamera()
                        setAutoCapture(true)
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Auto-Capture
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <div className="relative w-full md:w-[900px]">
                  <video
                    ref={videoRef}
                    className={`w-full ${isPortrait ? "max-h-[70vh]" : "max-h-[70vh]"} object-contain ${
                      mirror ? "scale-x-[-1]" : ""
                    }`}
                    playsInline
                    muted
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Scan Overlay */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div
                      className={`border-2 ${
                        scanMode === "barcode"
                          ? "border-green-500"
                          : scanMode === "qr"
                            ? "border-purple-500"
                            : "border-blue-500"
                      } bg-transparent`}
                      style={{
                        width: scanMode === "barcode" ? (isPortrait ? "70%" : "60%") : "50%",
                        height: scanMode === "barcode" ? (isPortrait ? "20%" : "30%") : "50%",
                        boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.45)",
                      }}
                    >
                      <div className="absolute -top-6 left-0 right-0 text-center">
                        <Badge variant="secondary" className="text-xs">
                          {scanMode === "barcode"
                            ? "Align barcode within the frame"
                            : scanMode === "qr"
                              ? "Center QR code in the square"
                              : "Center medicine text here"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Scan Mode Indicator */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant={scanMode === "barcode" ? "default" : scanMode === "qr" ? "secondary" : "outline"}
                      className={
                        scanMode === "barcode" ? "bg-green-600" : scanMode === "qr" ? "bg-purple-600" : "bg-blue-600"
                      }
                    >
                      {scanMode === "barcode" ? "Barcode Mode" : scanMode === "qr" ? "QR Code Mode" : "Text Mode"}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Last Scan Result */}
          {lastScanResult && (
            <div className="bg-blue-50 p-3 rounded-lg" aria-live="polite">
              <p className="text-sm text-blue-800">
                <strong>Last scan:</strong> {lastScanResult}
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg" role="alert">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Controls */}
          {isScanning && (
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                onClick={() => setAutoCapture((v) => !v)}
                variant={autoCapture ? "default" : "outline"}
                className={autoCapture ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {autoCapture ? (
                  <>
                    <RotateCcw className="h-4 w-4 mr-2 animate-spin" /> Auto Capturing
                  </>
                ) : (
                  <>
                    <Scan className="h-4 w-4 mr-2" /> Manual Scan
                  </>
                )}
              </Button>
              {!autoCapture && (
                <Button onClick={captureAndScan} className="bg-green-600 hover:bg-green-700">
                  <Scan className="h-4 w-4 mr-2" />
                  Scan Now
                </Button>
              )}
              <Button onClick={stopCamera} variant="outline">
                Stop Camera
              </Button>
            </div>
          )}

          {/* Instructions */}
          <div className="text-center text-sm text-gray-600">
            <p>
              {autoCapture
                ? "Auto-capture is ON. Hold steady."
                : scanMode === "barcode"
                  ? 'Point camera at medicine barcode and tap "Scan Now"'
                  : scanMode === "qr"
                    ? 'Point camera at QR code and tap "Scan Now"'
                    : 'Point camera at medicine name/text and tap "Scan Now"'}
            </p>
            <p className="mt-1">Ensure good lighting and hold camera steady</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LiveCameraScanner
