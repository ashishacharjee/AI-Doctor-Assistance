import type { NextRequest } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "AIzaSyBhK7HlcS95u4_k9pK_3HkjJWUyN068xEM")

export async function POST(req: NextRequest) {
  try {
    const { message, chatHistory = [] } = await req.json()

    if (!message) {
      return new NextResponse(JSON.stringify({ error: "Message is required" }), { status: 400 })
    }

    // Create a readable stream
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-pro" })

          const medicalPrompt = `You are an AI medical assistant. Provide helpful, accurate medical information while always recommending users consult healthcare professionals for proper diagnosis and treatment. 

Key guidelines:
- Be empathetic and supportive
- Provide evidence-based information
- Always recommend consulting healthcare professionals
- Identify potential emergencies and advise immediate medical attention
- Don't provide specific diagnoses
- Focus on general health guidance and symptom information

User message: ${message}

Previous conversation context: ${chatHistory.map((msg: any) => `${msg.role}: ${msg.content}`).join("\n")}`

          const result = await model.generateContentStream(medicalPrompt)

          for await (const chunk of result.stream) {
            const chunkText = chunk.text()
            if (chunkText) {
              const data = {
                id: "chatcmpl-" + Date.now(),
                object: "chat.completion.chunk",
                created: Math.floor(Date.now() / 1000),
                model: "gemini-pro",
                choices: [
                  {
                    index: 0,
                    delta: {
                      content: chunkText,
                    },
                    finish_reason: null,
                  },
                ],
              }

              controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
            }
          }

          // Send final chunk
          const finalData = {
            id: "chatcmpl-" + Date.now(),
            object: "chat.completion.chunk",
            created: Math.floor(Date.now() / 1000),
            model: "gemini-pro",
            choices: [
              {
                index: 0,
                delta: {},
                finish_reason: "stop",
              },
            ],
          }

          controller.enqueue(encoder.encode(`data: ${JSON.stringify(finalData)}\n\n`))
          controller.enqueue(encoder.encode("data: [DONE]\n\n"))
          controller.close()
        } catch (error) {
          console.error("Gemini API Error:", error)

          // Fallback response
          const fallbackResponse = `I understand you're asking about: "${message}"

As an AI medical assistant, I want to help you with general health information. However, I'm currently experiencing some technical difficulties.

Here's some general guidance:

🩺 **For Medical Concerns:**
- If you're experiencing severe symptoms, please contact emergency services (102 or 108)
- For non-emergency concerns, consider consulting with a healthcare professional
- Keep track of your symptoms, including when they started and their severity

💊 **General Health Tips:**
- Stay hydrated and get adequate rest
- Maintain a balanced diet
- Exercise regularly as appropriate for your condition
- Take medications as prescribed by your doctor

🚨 **Seek Immediate Medical Attention If:**
- You have chest pain or difficulty breathing
- Severe headache with neck stiffness
- High fever that doesn't respond to medication
- Any symptoms that are getting worse rapidly

**Important:** This information is for general guidance only and should not replace professional medical advice. Please consult with qualified healthcare professionals for proper diagnosis and treatment.

Would you like me to help you find doctors in your area or provide information about specific symptoms?`

          const chunks = fallbackResponse.split(" ")

          for (let i = 0; i < chunks.length; i += 3) {
            const chunkText = chunks.slice(i, i + 3).join(" ") + " "

            const data = {
              id: "chatcmpl-" + Date.now(),
              object: "chat.completion.chunk",
              created: Math.floor(Date.now() / 1000),
              model: "fallback",
              choices: [
                {
                  index: 0,
                  delta: {
                    content: chunkText,
                  },
                  finish_reason: null,
                },
              ],
            }

            controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))

            // Add small delay for streaming effect
            await new Promise((resolve) => setTimeout(resolve, 50))
          }

          // Send final chunk
          const finalData = {
            id: "chatcmpl-" + Date.now(),
            object: "chat.completion.chunk",
            created: Math.floor(Date.now() / 1000),
            model: "fallback",
            choices: [
              {
                index: 0,
                delta: {},
                finish_reason: "stop",
              },
            ],
          }

          controller.enqueue(encoder.encode(`data: ${JSON.stringify(finalData)}\n\n`))
          controller.enqueue(encoder.encode("data: [DONE]\n\n"))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("API Route Error:", error)
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 })
  }
}
