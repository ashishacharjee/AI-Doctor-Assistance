import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

export async function POST(req: Request) {
  const reqStart = Date.now()
  try {
    const body = await req.json().catch(() => ({}))

    const rawMessage: unknown = (body as any)?.message
    const rawHistory: unknown = (body as any)?.history ?? (body as any)?.chatHistory ?? []

    if (typeof rawMessage !== "string" || rawMessage.trim().length === 0) {
      console.warn("[chat-doctor] Invalid message payload")
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const message = rawMessage.trim()
    const history = Array.isArray(rawHistory) ? rawHistory : []
    const openaiKey = process.env.OPENAI_API_KEY
    const googleKey = "AIzaSyBzmMbmGpGmrDubqdv0nBSxorNfVTlK_rI"

    console.log("[chat-doctor] Incoming", {
      hasOpenAI: Boolean(openaiKey),
      hasGoogle: Boolean(googleKey),
      messageLen: message.length,
      historyLen: history.length,
    })

    const hasOpenAI = Boolean(openaiKey)
    const hasGoogle = Boolean(googleKey)

    if (!hasOpenAI && !hasGoogle) {
      console.warn("[chat-doctor] No provider configured")
      return NextResponse.json(
        {
          response:
            "AI is not configured. Add an OpenAI or Google API key. Meanwhile, share your symptoms, duration, severity, and any medications taken. For emergencies, call 102 or 108.",
          aiStatus: "No API key configured",
        },
        { status: 200 },
      )
    }

    // Build short conversation context
    const conversation = history
      .slice(-8)
      .map((m: any) => {
        const role = m?.type ?? m?.role
        const content = typeof m?.content === "string" ? m.content : ""
        return `${role === "user" ? "User" : "Assistant"}: ${content}`
      })
      .join("\n")

    // Choose model (OpenAI preferred)
    let aiStatus = "Google"
    let model: any
    if (hasOpenAI) {
      model = openai("gpt-4o-mini")
      aiStatus = "OpenAI"
    } else {
      const google = createGoogleGenerativeAI({ apiKey: googleKey })
      model = google("gemini-2.0-flash")
      aiStatus = "Google"
    }
    console.log("[chat-doctor] Using provider", { aiStatus })

    const systemPrompt = [
      "You are a cautious, helpful medical assistant for Indian healthcare.",
      "Provide concise, clear, step-by-step guidance.",
      "Include safety notes and specific red flags that require urgent care.",
      "Do not give a definitive diagnosis; use probabilities where helpful.",
      "If unsure, say so and suggest next steps.",
      "Support English and Hindi mixed replies based on the user's phrasing.",
      "Always end with: 'For emergencies, call 102 or 108.'",
    ].join(" ")

    const fewShot = `
Format your answers with:
1) Possible causes (with rough likelihood)
2) What you can do now (specific at-home steps)
3) When to seek care (clear red flags)
4) Medication caution (avoid naming prescription-only drugs)
5) Next steps (follow-up, tests, or doctor types)
    `.trim()

    const genStart = Date.now()
    const { text } = await generateText({
      model,
      system: systemPrompt,
      prompt: `${conversation ? conversation + "\n" : ""}${fewShot}\n\nUser: ${message}\nAssistant:`,
    })
    const genMs = Date.now() - genStart
    console.log("[chat-doctor] generateText OK", { ms: genMs, chars: text?.length ?? 0 })

    const totalMs = Date.now() - reqStart
    console.log("[chat-doctor] Completed", { aiStatus, totalMs })

    return NextResponse.json(
      {
        response: text,
        aiStatus,
      },
      { status: 200 },
    )
  } catch (err: any) {
    const totalMs = Date.now() - reqStart
    console.error("[chat-doctor] Error", {
      totalMs,
      name: err?.name,
      message: err?.message,
      stack: err?.stack?.split("\n")?.slice(0, 3)?.join(" | "),
    })
    return NextResponse.json(
      {
        response:
          "Sorry, I'm having trouble right now. Please share your symptoms, duration, severity, and medications. For emergencies, call 102 or 108.",
        aiStatus: "Error fallback",
      },
      { status: 200 },
    )
  }
}
