import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get the base path for GitHub Pages deployment
export const basePath = process.env.NODE_ENV === "production" ? "/AI-Doctor-Assistance-82" : ""

// Helper function for asset paths
export function getAssetPath(path: string) {
  return `${basePath}${path}`
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m away`
  }
  return `${distance.toFixed(1)}km away`
}

export function getEmergencyNumber(): string {
  return "102" // Indian ambulance number
}

export function validatePincode(pincode: string): boolean {
  const pincodeRegex = /^[1-9][0-9]{5}$/
  return pincodeRegex.test(pincode)
}

export function getPincodeRegion(pincode: string): string {
  const firstThree = pincode.substring(0, 3)

  if (firstThree >= "700" && firstThree <= "743") {
    return "West Bengal"
  } else if (firstThree >= "400" && firstThree <= "421") {
    return "Maharashtra"
  } else if (firstThree >= "110" && firstThree <= "140") {
    return "Delhi"
  } else if (firstThree >= "560" && firstThree <= "581") {
    return "Karnataka"
  }

  return "India"
}

// Medical utility functions
export function isEmergencySymptom(symptom: string): boolean {
  const emergencyKeywords = [
    "chest pain",
    "difficulty breathing",
    "stroke",
    "heart attack",
    "severe bleeding",
    "unconscious",
    "seizure",
    "severe headache",
    "difficulty swallowing",
    "severe abdominal pain",
    "severe allergic reaction",
    "loss of consciousness",
    "severe burns",
    "poisoning",
    "severe trauma",
  ]

  return emergencyKeywords.some((keyword) => symptom.toLowerCase().includes(keyword.toLowerCase()))
}

export function getSymptomQuestions(symptom: string): string[] {
  const symptomQuestions: { [key: string]: string[] } = {
    "leg pain": [
      "Is the pain in one leg or both legs?",
      "Is it a sharp, shooting pain or a dull ache?",
      "Does it get worse with walking or sitting?",
      "When did the pain start?",
      "Have you had any recent injuries?",
      "Is there any swelling or redness?",
      "Does the pain radiate to other areas?",
    ],
    headache: [
      "Where exactly is the pain located?",
      "How severe is the pain on a scale of 1-10?",
      "Is it a throbbing or constant pain?",
      "Do you have any visual disturbances?",
      "Have you taken any medication?",
      "Do you have nausea or vomiting?",
      "How long have you had this headache?",
    ],
    fever: [
      "What is your current temperature?",
      "How long have you had the fever?",
      "Do you have any other symptoms?",
      "Have you traveled recently?",
      "Are you taking any medications?",
      "Do you have chills or sweating?",
      "Any body aches or fatigue?",
    ],
    "chest pain": [
      "⚠️ EMERGENCY: Call 102 immediately for chest pain!",
      "Is the pain sharp or crushing?",
      "Does it radiate to your arm, jaw, or back?",
      "Are you having trouble breathing?",
      "Do you feel nauseous or dizzy?",
      "How long has the pain been present?",
    ],
    "abdominal pain": [
      "Where exactly is the pain located?",
      "Is it cramping, sharp, or dull?",
      "Does eating make it better or worse?",
      "Do you have nausea or vomiting?",
      "Any changes in bowel movements?",
      "How severe is the pain (1-10)?",
      "When did it start?",
    ],
    "back pain": [
      "Is it upper, middle, or lower back?",
      "Does the pain radiate down your legs?",
      "Is it worse with movement or rest?",
      "Any numbness or tingling?",
      "Recent injury or heavy lifting?",
      "How long have you had this pain?",
      "Any weakness in your legs?",
    ],
  }

  const normalizedSymptom = symptom.toLowerCase()
  for (const [key, questions] of Object.entries(symptomQuestions)) {
    if (normalizedSymptom.includes(key)) {
      return questions
    }
  }

  return [
    "When did the symptom start?",
    "How severe is it on a scale of 1-10?",
    "Does anything make it better or worse?",
    "Do you have any other symptoms?",
    "Have you taken any medications for this?",
    "Any recent changes in your routine or diet?",
  ]
}

export function getMedicalDisclaimer(): string {
  return "⚠️ MEDICAL DISCLAIMER: This information is for educational purposes only and does not replace professional medical advice. Always consult with a qualified healthcare professional for proper diagnosis and treatment. For medical emergencies, call 102 (Ambulance) or 108 (Emergency Services) immediately."
}

export function getConditionProbability(symptoms: string[], condition: string): number {
  // This is a simplified probability calculation
  // In a real system, this would use machine learning models
  const symptomCount = symptoms.length
  const baseScore = Math.min(symptomCount * 15, 85)
  const randomVariation = Math.random() * 20 - 10
  return Math.max(10, Math.min(95, baseScore + randomVariation))
}

export function getSeverityLevel(symptoms: string[]): "Mild" | "Moderate" | "Severe" {
  const emergencySymptoms = symptoms.filter((symptom) => isEmergencySymptom(symptom))

  if (emergencySymptoms.length > 0) {
    return "Severe"
  }

  if (symptoms.length >= 4) {
    return "Moderate"
  }

  return "Mild"
}

export function getRecommendedSpecialty(symptoms: string[]): string {
  const specialtyMap: { [key: string]: string } = {
    "chest pain": "Cardiology",
    heart: "Cardiology",
    breathing: "Pulmonology",
    lung: "Pulmonology",
    headache: "Neurology",
    seizure: "Neurology",
    abdominal: "Gastroenterology",
    stomach: "Gastroenterology",
    joint: "Orthopedics",
    bone: "Orthopedics",
    skin: "Dermatology",
    rash: "Dermatology",
    eye: "Ophthalmology",
    vision: "Ophthalmology",
    ear: "ENT",
    throat: "ENT",
    mental: "Psychiatry",
    depression: "Psychiatry",
    anxiety: "Psychiatry",
  }

  const allSymptoms = symptoms.join(" ").toLowerCase()

  for (const [keyword, specialty] of Object.entries(specialtyMap)) {
    if (allSymptoms.includes(keyword)) {
      return specialty
    }
  }

  return "General Medicine"
}
