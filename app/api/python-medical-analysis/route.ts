import { type NextRequest, NextResponse } from "next/server"
import { spawn } from "child_process"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const { symptoms, patientContext } = await request.json()

    if (!symptoms) {
      return NextResponse.json({ error: "Symptoms are required" }, { status: 400 })
    }

    // Call Python medical analysis service
    const pythonScript = path.join(process.cwd(), "scripts", "medical-ai-service.py")

    return new Promise((resolve) => {
      const python = spawn("python3", [pythonScript])

      let dataString = ""
      let errorString = ""

      // Send input to Python script
      python.stdin.write(JSON.stringify({ symptoms, patientContext }))
      python.stdin.end()

      python.stdout.on("data", (data) => {
        dataString += data.toString()
      })

      python.stderr.on("data", (data) => {
        errorString += data.toString()
      })

      python.on("close", (code) => {
        if (code !== 0) {
          console.error("Python script error:", errorString)
          resolve(NextResponse.json({ error: "Failed to analyze symptoms" }, { status: 500 }))
          return
        }

        try {
          const analysis = JSON.parse(dataString)
          resolve(NextResponse.json({ analysis }))
        } catch (parseError) {
          console.error("Failed to parse Python output:", parseError)
          resolve(NextResponse.json({ error: "Failed to process analysis" }, { status: 500 }))
        }
      })
    })
  } catch (error) {
    console.error("Error in Python medical analysis:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
