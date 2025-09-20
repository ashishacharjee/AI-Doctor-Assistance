"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Scan, ImageIcon } from "lucide-react"
import { searchMedicines, type Medicine } from "@/lib/medicine-database"

interface StaticImageScannerProps {
  onMedicineFound: (medicine: Medicine) => void
}

export default function StaticImageScanner({ onMedicineFound }: StaticImageScannerProps) {
  const [fileName, setFileName] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const simulateOCR = async (file: File): Promise<string> => {
    // Try to infer from filename as a simple demo, otherwise pick a random medicine term
    const lower = file.name.toLowerCase()
    const known = [
      "paracetamol",
      "crocin",
      "ibuprofen",
      "brufen",
      "metformin",
      "amlodipine",
      "omeprazole",
      "cetirizine",
    ]
    for (const k of known) {
      if (lower.includes(k)) return k
    }
    const random = known[Math.floor(Math.random() * known.length)]
    return random
  }

  const onSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setStatus("Analyzing image...")
    const url = URL.createObjectURL(file)
    setPreview(url)

    // Simulate OCR
    await new Promise((r) => setTimeout(r, 500))
    const term = await simulateOCR(file)
    const results = searchMedicines(term)
    if (results[0]) {
      setStatus(`Detected: ${term}`)
      onMedicineFound(results[0])
    } else {
      setStatus(`No results for: ${term}`)
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Static Image Scan (Upload)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Input ref={inputRef} type="file" accept="image/*" onChange={onSelect} />
          <Button variant="outline" onClick={() => inputRef.current?.click()}>
            <Scan className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
        {fileName && <p className="text-xs text-muted-foreground">{fileName}</p>}
        {preview && (
          <div className="rounded-md border overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview || "/placeholder.svg"}
              alt="Upload preview"
              className="w-full max-h-64 object-contain bg-black"
            />
          </div>
        )}
        {status && <p className="text-sm">{status}</p>}
      </CardContent>
    </Card>
  )
}
