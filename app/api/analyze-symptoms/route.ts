import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

// Enhanced symptom-to-condition mapping
const symptomDatabase = {
  // Respiratory conditions
  cough: {
    conditions: ["Common Cold", "Bronchitis", "Pneumonia", "Asthma"],
    severity: ["Mild", "Moderate", "Severe", "Moderate"],
  },
  "runny nose": {
    conditions: ["Common Cold", "Allergic Rhinitis", "Sinusitis"],
    severity: ["Mild", "Mild", "Moderate"],
  },
  "sore throat": {
    conditions: ["Viral Pharyngitis", "Strep Throat", "Tonsillitis"],
    severity: ["Mild", "Moderate", "Moderate"],
  },
  "shortness of breath": {
    conditions: ["Asthma", "Pneumonia", "Heart Disease", "Anxiety"],
    severity: ["Moderate", "Severe", "Severe", "Mild"],
  },

  // Gastrointestinal conditions
  "stomach pain": {
    conditions: ["Gastritis", "Food Poisoning", "Appendicitis", "IBS"],
    severity: ["Moderate", "Moderate", "Severe", "Mild"],
  },
  nausea: {
    conditions: ["Food Poisoning", "Gastroenteritis", "Pregnancy", "Migraine"],
    severity: ["Moderate", "Moderate", "Mild", "Moderate"],
  },
  diarrhea: {
    conditions: ["Gastroenteritis", "Food Poisoning", "IBS", "Infection"],
    severity: ["Moderate", "Moderate", "Mild", "Moderate"],
  },
  vomiting: {
    conditions: ["Food Poisoning", "Gastroenteritis", "Migraine", "Appendicitis"],
    severity: ["Moderate", "Moderate", "Moderate", "Severe"],
  },

  // Neurological conditions
  headache: {
    conditions: ["Tension Headache", "Migraine", "Sinusitis", "Hypertension"],
    severity: ["Mild", "Moderate", "Moderate", "Moderate"],
  },
  dizziness: {
    conditions: ["Vertigo", "Low Blood Pressure", "Dehydration", "Inner Ear Infection"],
    severity: ["Moderate", "Mild", "Mild", "Moderate"],
  },
  fatigue: {
    conditions: ["Anemia", "Thyroid Disorder", "Depression", "Sleep Disorder"],
    severity: ["Moderate", "Moderate", "Mild", "Mild"],
  },

  // Musculoskeletal conditions
  "joint pain": {
    conditions: ["Arthritis", "Rheumatoid Arthritis", "Gout", "Injury"],
    severity: ["Moderate", "Severe", "Severe", "Moderate"],
  },
  "back pain": {
    conditions: ["Muscle Strain", "Herniated Disc", "Sciatica", "Arthritis"],
    severity: ["Mild", "Severe", "Moderate", "Moderate"],
  },
  "muscle pain": {
    conditions: ["Muscle Strain", "Fibromyalgia", "Viral Infection", "Overuse"],
    severity: ["Mild", "Moderate", "Mild", "Mild"],
  },

  // Skin conditions
  rash: {
    conditions: ["Allergic Reaction", "Eczema", "Contact Dermatitis", "Viral Rash"],
    severity: ["Moderate", "Mild", "Mild", "Mild"],
  },
  itching: {
    conditions: ["Allergic Reaction", "Dry Skin", "Eczema", "Insect Bite"],
    severity: ["Moderate", "Mild", "Mild", "Mild"],
  },

  // Cardiovascular conditions
  "chest pain": {
    conditions: ["Heart Attack", "Angina", "Acid Reflux", "Muscle Strain"],
    severity: ["Severe", "Severe", "Mild", "Mild"],
  },
  palpitations: {
    conditions: ["Anxiety", "Arrhythmia", "Hyperthyroidism", "Caffeine Excess"],
    severity: ["Mild", "Moderate", "Moderate", "Mild"],
  },

  // General symptoms
  fever: {
    conditions: ["Viral Infection", "Bacterial Infection", "Flu", "COVID-19"],
    severity: ["Moderate", "Moderate", "Moderate", "Moderate"],
  },
  chills: {
    conditions: ["Flu", "Bacterial Infection", "Malaria", "Sepsis"],
    severity: ["Moderate", "Moderate", "Severe", "Severe"],
  },
}

function analyzeSymptoms(symptomsText: string) {
  const symptoms = symptomsText
    .toLowerCase()
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
  const foundConditions = new Map()

  // Analyze each symptom
  symptoms.forEach((symptom) => {
    Object.keys(symptomDatabase).forEach((key) => {
      if (symptom.includes(key) || key.includes(symptom)) {
        const data = symptomDatabase[key as keyof typeof symptomDatabase]
        data.conditions.forEach((condition, index) => {
          if (!foundConditions.has(condition)) {
            foundConditions.set(condition, {
              name: condition,
              probability: 0,
              symptoms: [],
              severity: data.severity[index],
              matchedSymptoms: [],
            })
          }

          const existing = foundConditions.get(condition)
          existing.probability += 25 // Increase probability for each matching symptom
          existing.matchedSymptoms.push(symptom)
        })
      }
    })
  })

  // Convert to array and sort by probability
  const conditions = Array.from(foundConditions.values())
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 3) // Top 3 conditions
    .map((condition) => ({
      ...condition,
      probability: Math.min(condition.probability, 85), // Cap at 85%
      description: getConditionDescription(condition.name),
      symptoms: getConditionSymptoms(condition.name),
      recommendations: getConditionRecommendations(condition.name, condition.severity),
      whenToSeekCare: getWhenToSeekCare(condition.severity),
    }))

  return conditions.length > 0 ? conditions : getDefaultCondition(symptoms)
}

function getConditionDescription(condition: string): string {
  const descriptions: { [key: string]: string } = {
    "Common Cold": "A viral infection of the upper respiratory tract, typically mild and self-limiting.",
    Bronchitis: "Inflammation of the bronchial tubes, often following a cold or respiratory infection.",
    Pneumonia: "Infection that inflames air sacs in one or both lungs, which may fill with fluid.",
    Asthma: "A respiratory condition where airways narrow and swell, producing extra mucus.",
    "Allergic Rhinitis": "An allergic response causing runny nose, sneezing, and congestion.",
    Sinusitis: "Inflammation or swelling of the tissue lining the sinuses.",
    "Viral Pharyngitis": "Inflammation of the throat caused by viral infection.",
    "Strep Throat": "Bacterial infection causing severe throat pain and inflammation.",
    Tonsillitis: "Inflammation of the tonsils, usually due to viral or bacterial infection.",
    Gastritis: "Inflammation of the stomach lining, often causing pain and nausea.",
    "Food Poisoning": "Illness caused by consuming contaminated food or beverages.",
    Appendicitis: "Inflammation of the appendix, requiring immediate medical attention.",
    IBS: "Irritable Bowel Syndrome - a common disorder affecting the large intestine.",
    Gastroenteritis: "Inflammation of the stomach and intestines, often called stomach flu.",
    "Tension Headache": "Most common type of headache, often stress-related.",
    Migraine: "Severe headache often accompanied by nausea and light sensitivity.",
    Hypertension: "High blood pressure, often called the silent killer.",
    Vertigo: "Sensation of spinning or dizziness, often related to inner ear problems.",
    Anemia: "Condition where blood lacks enough healthy red blood cells.",
    Arthritis: "Inflammation of joints causing pain and stiffness.",
    "Heart Attack": "Serious medical emergency requiring immediate treatment.",
    "Viral Infection": "Infection caused by viruses, often self-limiting.",
    Flu: "Influenza - a respiratory illness caused by influenza viruses.",
  }

  return descriptions[condition] || "A medical condition that requires professional evaluation."
}

function getConditionSymptoms(condition: string): string[] {
  const symptomMap: { [key: string]: string[] } = {
    "Common Cold": ["runny nose", "sneezing", "mild cough", "sore throat", "low-grade fever"],
    Bronchitis: ["persistent cough", "mucus production", "chest discomfort", "fatigue"],
    Pneumonia: ["high fever", "chills", "cough with phlegm", "shortness of breath", "chest pain"],
    Asthma: ["wheezing", "shortness of breath", "chest tightness", "coughing"],
    Gastritis: ["stomach pain", "nausea", "bloating", "loss of appetite"],
    "Food Poisoning": ["nausea", "vomiting", "diarrhea", "stomach cramps", "fever"],
    Migraine: ["severe headache", "nausea", "light sensitivity", "sound sensitivity"],
    "Tension Headache": ["dull headache", "pressure around head", "neck stiffness"],
    Arthritis: ["joint pain", "stiffness", "swelling", "reduced range of motion"],
    "Heart Attack": ["chest pain", "shortness of breath", "nausea", "sweating", "arm pain"],
  }

  return symptomMap[condition] || ["various symptoms", "discomfort", "general malaise"]
}

function getConditionRecommendations(condition: string, severity: string): string[] {
  const baseRecommendations = [
    "Monitor your symptoms closely",
    "Stay hydrated and get adequate rest",
    "Maintain a healthy diet",
  ]

  const severityRecommendations: { [key: string]: string[] } = {
    Mild: [
      "Rest and home care may be sufficient",
      "Over-the-counter medications may help",
      "Consult a doctor if symptoms worsen",
    ],
    Moderate: [
      "Schedule an appointment with your doctor",
      "Follow prescribed treatment plans",
      "Monitor symptoms and report changes",
    ],
    Severe: [
      "Seek immediate medical attention",
      "Do not delay treatment",
      "Call emergency services if symptoms worsen rapidly",
    ],
  }

  const conditionSpecific: { [key: string]: string[] } = {
    "Heart Attack": ["Call 102 immediately", "Chew aspirin if not allergic", "Do not drive yourself"],
    Appendicitis: ["Seek emergency care immediately", "Do not eat or drink", "Do not take pain medications"],
    Asthma: ["Use prescribed inhaler", "Avoid known triggers", "Keep rescue medications handy"],
    "Food Poisoning": ["Stay hydrated with clear fluids", "Avoid solid foods initially", "Use ORS solution"],
  }

  return [
    ...baseRecommendations,
    ...(severityRecommendations[severity] || []),
    ...(conditionSpecific[condition] || []),
    "For emergencies, call 102 (Ambulance) or 108 (Emergency Services)",
  ]
}

function getWhenToSeekCare(severity: string): string {
  const careAdvice: { [key: string]: string } = {
    Mild: "If symptoms persist for more than 3-5 days or worsen significantly",
    Moderate: "Within 24-48 hours, or sooner if symptoms worsen",
    Severe: "Immediately - do not delay seeking medical care",
  }

  return careAdvice[severity] || "Consult healthcare professional for proper evaluation"
}

function getDefaultCondition(symptoms: string[]): any[] {
  return [
    {
      name: "General Health Concern",
      probability: 60,
      description: "Your symptoms suggest a condition that would benefit from professional medical evaluation.",
      symptoms: symptoms,
      severity: "Moderate",
      recommendations: [
        "Schedule an appointment with a healthcare provider",
        "Keep track of when symptoms occur and their severity",
        "Stay hydrated and get adequate rest",
        "Avoid self-medication without professional guidance",
        "For emergencies, call 102 (Ambulance) or 108 (Emergency Services)",
      ],
      whenToSeekCare: "As soon as possible for proper diagnosis and treatment",
    },
  ]
}

export async function POST(request: NextRequest) {
  try {
    const { symptoms } = await request.json()

    if (!symptoms) {
      return NextResponse.json({ error: "Symptoms are required" }, { status: 400 })
    }

    // First try local analysis
    const localAnalysis = analyzeSymptoms(symptoms)

    // Check if OpenAI API key is available for enhanced analysis
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        disclaimer:
          "This analysis is for informational purposes only and should not replace professional medical advice. For emergencies, call 102 (Ambulance) or 108 (Emergency Services).",
        possibleConditions: localAnalysis,
        aiStatus: "Local analysis - AI enhancement unavailable",
      })
    }

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: `You are a medical AI assistant for Indian healthcare. Enhance the provided symptom analysis with additional medical insights.
        
        IMPORTANT: 
        - Always include a medical disclaimer
        - Include Indian emergency numbers (102 for Ambulance, 108 for Emergency)
        - Consider common conditions in Indian context
        - Provide specific, actionable recommendations
        
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
        prompt: `Enhance this symptom analysis for an Indian patient:
        
        Symptoms: ${symptoms}
        
        Initial Analysis: ${JSON.stringify(localAnalysis)}
        
        Provide enhanced medical insights, specific recommendations, and ensure accuracy for Indian healthcare context.`,
      })

      let enhancedAnalysis
      try {
        enhancedAnalysis = JSON.parse(text)
        enhancedAnalysis.aiStatus = "AI-enhanced analysis successful"
      } catch (parseError) {
        enhancedAnalysis = {
          disclaimer:
            "This analysis is for informational purposes only and should not replace professional medical advice. For emergencies, call 102 (Ambulance) or 108 (Emergency Services).",
          possibleConditions: localAnalysis,
          aiStatus: "AI parsing failed - using local analysis",
        }
      }

      return NextResponse.json(enhancedAnalysis)
    } catch (aiError) {
      console.error("AI API Error:", aiError)

      return NextResponse.json({
        disclaimer:
          "This analysis is for informational purposes only and should not replace professional medical advice. For emergencies, call 102 (Ambulance) or 108 (Emergency Services).",
        possibleConditions: localAnalysis,
        aiStatus: "AI service unavailable - using local analysis",
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
