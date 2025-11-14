import { type NextRequest, NextResponse } from "next/server"
import { spawn } from "child_process"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const patientData = await request.json()

    if (!patientData) {
      return NextResponse.json({ error: "Patient data is required" }, { status: 400 })
    }

    // Call Python health risk assessment
    const pythonScript = path.join(process.cwd(), "scripts", "medical-data-processor.py")

    return new Promise((resolve) => {
      const python = spawn("python3", [pythonScript])

      let dataString = ""
      let errorString = ""

      // Send patient data to Python script
      python.stdin.write(JSON.stringify(patientData))
      python.stdin.end()

      python.stdout.on("data", (data) => {
        dataString += data.toString()
      })

      python.stderr.on("data", (data) => {
        errorString += data.toString()
      })

      python.on("close", (code) => {
        if (code !== 0) {
          console.error("Python health assessment error:", errorString)
          resolve(NextResponse.json({ error: "Failed to assess health risk" }, { status: 500 }))
          return
        }

        try {
          const assessment = JSON.parse(dataString)
          resolve(NextResponse.json({ assessment }))
        } catch (parseError) {
          console.error("Failed to parse Python output:", parseError)
          resolve(NextResponse.json({ error: "Failed to process assessment" }, { status: 500 }))
        }
      })
    })
  } catch (error) {
    console.error("Error in health risk assessment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
