"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"

interface VoiceInputProps {
  onTranscript: (text: string) => void
  isRecording: boolean
  onRecordingChange: (recording: boolean) => void
}

export function VoiceInput({ onTranscript, isRecording, onRecordingChange }: VoiceInputProps) {
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<any>(null)

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false)
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onstart = () => {
      onRecordingChange(true)
    }

    recognition.onresult = (event: any) => {
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        }
      }

      if (finalTranscript) {
        onTranscript(finalTranscript)
      }
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error)
      onRecordingChange(false)
    }

    recognition.onend = () => {
      onRecordingChange(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  if (!isSupported) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Voice input is not supported in your browser</p>
      </div>
    )
  }

  return (
    <div className="text-center py-8">
      <Button
        onClick={toggleRecording}
        variant={isRecording ? "destructive" : "default"}
        size="lg"
        className="w-32 h-32 rounded-full"
      >
        {isRecording ? <MicOff className="h-8 w-8 animate-pulse" /> : <Mic className="h-8 w-8" />}
      </Button>
      <p className="mt-4 text-gray-600">{isRecording ? "Recording... Speak now" : "Click to start voice recording"}</p>
    </div>
  )
}
