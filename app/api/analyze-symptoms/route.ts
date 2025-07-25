import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { symptoms } = await request.json()

    if (!symptoms) {
      return NextResponse.json({ error: "Symptoms are required" }, { status: 400 })
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      // Fallback response when AI is not available
      return NextResponse.json({
        disclaimer:
          "This analysis is for informational purposes only and should not replace professional medical advice. Always consult with qualified healthcare professionals.",
        possibleConditions: [
          {
            name: "General Health Concern",
            probability: 70,
            description:
              "Based on your symptoms, you may have a common health condition that requires medical evaluation.",
            symptoms: symptoms
              .split(/[,\n]/)
              .map((s: string) => s.trim())
              .filter(Boolean),
            severity: "Moderate",
            recommendations: [
              "Monitor your symptoms closely",
              "Stay hydrated and get adequate rest",
              "Consult with a healthcare professional",
              "Seek immediate care if symptoms worsen",
              "For emergencies, call 102 (Ambulance) or 108 (Emergency)",
            ],
            whenToSeekCare: "If symptoms persist for more than 2-3 days or worsen significantly",
          },
        ],
        aiStatus: "AI service temporarily unavailable - using fallback analysis",
      })
    }

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: `You are a medical AI assistant for Indian healthcare. Analyze the provided symptoms and return a JSON response with possible conditions. 
        
        IMPORTANT: 
        - Always include a medical disclaimer that this is for informational purposes only
        - Include Indian emergency numbers (102 for Ambulance, 108 for Emergency)
        - Consider common conditions in Indian context
        - Suggest consulting local healthcare professionals
        
        Format your response as a JSON object with this structure:
        {
          "disclaimer": "Medical disclaimer text with Indian emergency numbers",
          "possibleConditions": [
            {
              "name": "Condition name",
              "probability": number (0-100),
              "description": "Brief description",
              "symptoms": ["symptom1", "symptom2"],
              "severity": "Mild|Moderate|Severe",
              "recommendations": ["recommendation1", "recommendation2"],
              "whenToSeekCare": "When to see a doctor"
            }
          ]
        }`,
        prompt: `Analyze these symptoms for an Indian patient and provide possible medical conditions: ${symptoms}`,
      })

      // Parse the AI response
      let analysisResult
      try {
        analysisResult = JSON.parse(text)
        analysisResult.aiStatus = "AI analysis successful"
      } catch (parseError) {
        // Fallback if AI doesn't return valid JSON
        analysisResult = {
          disclaimer:
            "This analysis is for informational purposes only and should not replace professional medical advice. For emergencies, call 102 (Ambulance) or 108 (Emergency Services).",
          possibleConditions: [
            {
              name: "General Health Concern",
              probability: 70,
              description:
                "Based on your symptoms, you may have a common health condition that requires medical evaluation.",
              symptoms: symptoms
                .split(/[,\n]/)
                .map((s: string) => s.trim())
                .filter(Boolean),
              severity: "Moderate",
              recommendations: [
                "Monitor your symptoms closely",
                "Stay hydrated and get adequate rest",
                "Consult with a healthcare professional",
                "Seek immediate care if symptoms worsen",
                "For emergencies, call 102 (Ambulance) or 108 (Emergency)",
              ],
              whenToSeekCare: "If symptoms persist for more than 2-3 days or worsen significantly",
            },
          ],
          aiStatus: "AI parsing failed - using fallback analysis",
        }
      }

      return NextResponse.json(analysisResult)
    } catch (aiError) {
      console.error("AI API Error:", aiError)

      // Fallback when AI API fails
      return NextResponse.json({
        disclaimer:
          "This analysis is for informational purposes only and should not replace professional medical advice. For emergencies, call 102 (Ambulance) or 108 (Emergency Services).",
        possibleConditions: [
          {
            name: "Health Concern Requiring Evaluation",
            probability: 75,
            description: "Your symptoms suggest a condition that would benefit from professional medical evaluation.",
            symptoms: symptoms
              .split(/[,\n]/)
              .map((s: string) => s.trim())
              .filter(Boolean),
            severity: "Moderate",
            recommendations: [
              "Schedule an appointment with a healthcare provider",
              "Keep track of when symptoms occur and their severity",
              "Stay hydrated and get adequate rest",
              "Avoid self-medication without professional guidance",
              "For emergencies, call 102 (Ambulance) or 108 (Emergency)",
            ],
            whenToSeekCare: "As soon as possible for proper diagnosis and treatment",
          },
        ],
        aiStatus: "AI service unavailable - medical consultation recommended",
      })
    }
  } catch (error) {
    console.error("Error analyzing symptoms:", error)
    return NextResponse.json(
      {
        error: "Failed to analyze symptoms. Please try again or consult a healthcare professional.",
        emergency: "For medical emergencies, call 102 (Ambulance) or 108 (Emergency Services)",
      },
      { status: 500 },
    )
  }
}
