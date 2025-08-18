export interface Medicine {
  id: string
  name: string
  genericName: string
  brand: string
  strength: string
  form: string
  price: number
  manufacturer: string
  description: string
  uses: string[]
  sideEffects: string[]
  dosage: string
  precautions: string[]
  category: string
  prescriptionRequired: boolean
  availability: "In Stock" | "Out of Stock" | "Limited Stock"
  conditions: string[]
  barcode: string
}

export const medicineDatabase: Medicine[] = [
  // Pain & Fever Medicines
  {
    id: "1",
    name: "Paracetamol",
    genericName: "Acetaminophen",
    brand: "Crocin",
    strength: "500mg",
    form: "Tablet",
    price: 25,
    manufacturer: "GSK",
    description: "Pain reliever and fever reducer",
    uses: ["Fever", "Headache", "Body pain", "Toothache"],
    sideEffects: ["Nausea", "Stomach upset", "Allergic reactions"],
    dosage: "1-2 tablets every 4-6 hours, max 8 tablets per day",
    precautions: ["Do not exceed recommended dose", "Avoid alcohol", "Consult doctor if pregnant"],
    category: "Analgesic",
    prescriptionRequired: false,
    availability: "In Stock",
    conditions: ["fever", "headache", "pain", "toothache", "body ache", "muscle pain"],
    barcode: "8901030001234",
  },
  {
    id: "2",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    brand: "Brufen",
    strength: "400mg",
    form: "Tablet",
    price: 45,
    manufacturer: "Abbott",
    description: "Anti-inflammatory pain reliever",
    uses: ["Pain", "Inflammation", "Fever", "Arthritis"],
    sideEffects: ["Stomach irritation", "Nausea", "Dizziness"],
    dosage: "1 tablet every 6-8 hours with food",
    precautions: ["Take with food", "Avoid if stomach ulcers", "Monitor blood pressure"],
    category: "NSAID",
    prescriptionRequired: false,
    availability: "In Stock",
    conditions: ["joint pain", "arthritis", "inflammation", "back pain", "muscle strain", "sports injury"],
    barcode: "8901030002341",
  },
  {
    id: "3",
    name: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    brand: "Disprin",
    strength: "325mg",
    form: "Tablet",
    price: 20,
    manufacturer: "Reckitt Benckiser",
    description: "Pain reliever and blood thinner",
    uses: ["Pain", "Fever", "Heart protection", "Stroke prevention"],
    sideEffects: ["Stomach bleeding", "Nausea", "Ringing in ears"],
    dosage: "1-2 tablets every 4 hours for pain, 1 tablet daily for heart protection",
    precautions: ["Not for children under 16", "Take with food", "Monitor for bleeding"],
    category: "Analgesic",
    prescriptionRequired: false,
    availability: "In Stock",
    conditions: ["headache", "fever", "heart disease", "stroke prevention", "chest pain"],
    barcode: "8901030003458",
  },

  // Diabetes Medicines
  {
    id: "4",
    name: "Metformin",
    genericName: "Metformin HCl",
    brand: "Glycomet",
    strength: "500mg",
    form: "Tablet",
    price: 85,
    manufacturer: "USV",
    description: "Diabetes medication to control blood sugar",
    uses: ["Type 2 Diabetes", "PCOS", "Insulin resistance"],
    sideEffects: ["Nausea", "Diarrhea", "Metallic taste", "Vitamin B12 deficiency"],
    dosage: "500mg twice daily with meals",
    precautions: ["Monitor kidney function", "Take with food", "Regular blood sugar monitoring"],
    category: "Antidiabetic",
    prescriptionRequired: true,
    availability: "In Stock",
    conditions: ["diabetes", "high blood sugar", "type 2 diabetes", "insulin resistance", "pcos"],
    barcode: "8901030004565",
  },
  {
    id: "5",
    name: "Glimepiride",
    genericName: "Glimepiride",
    brand: "Amaryl",
    strength: "2mg",
    form: "Tablet",
    price: 120,
    manufacturer: "Sanofi",
    description: "Sulfonylurea for diabetes management",
    uses: ["Type 2 Diabetes", "Blood sugar control"],
    sideEffects: ["Hypoglycemia", "Weight gain", "Nausea"],
    dosage: "1-2mg once daily with breakfast",
    precautions: ["Monitor blood sugar", "Risk of hypoglycemia", "Regular meal timing"],
    category: "Antidiabetic",
    prescriptionRequired: true,
    availability: "In Stock",
    conditions: ["diabetes", "type 2 diabetes", "high blood sugar", "diabetic control"],
    barcode: "8901030005672",
  },
  {
    id: "6",
    name: "Insulin Glargine",
    genericName: "Insulin Glargine",
    brand: "Lantus",
    strength: "100 units/ml",
    form: "Injection",
    price: 850,
    manufacturer: "Sanofi",
    description: "Long-acting insulin for diabetes",
    uses: ["Type 1 Diabetes", "Type 2 Diabetes", "Insulin therapy"],
    sideEffects: ["Hypoglycemia", "Injection site reactions", "Weight gain"],
    dosage: "As prescribed by doctor, usually once daily",
    precautions: ["Proper injection technique", "Rotate injection sites", "Monitor blood sugar"],
    category: "Insulin",
    prescriptionRequired: true,
    availability: "In Stock",
    conditions: ["type 1 diabetes", "type 2 diabetes", "insulin dependent diabetes", "severe diabetes"],
    barcode: "8901030006789",
  },

  // Blood Pressure Medicines
  {
    id: "7",
    name: "Amlodipine",
    genericName: "Amlodipine Besylate",
    brand: "Norvasc",
    strength: "5mg",
    form: "Tablet",
    price: 95,
    manufacturer: "Pfizer",
    description: "Calcium channel blocker for hypertension",
    uses: ["High blood pressure", "Angina", "Coronary artery disease"],
    sideEffects: ["Ankle swelling", "Dizziness", "Flushing", "Fatigue"],
    dosage: "5-10mg once daily",
    precautions: ["Monitor blood pressure", "Rise slowly from sitting", "Regular heart checkups"],
    category: "Antihypertensive",
    prescriptionRequired: true,
    availability: "In Stock",
    conditions: ["high blood pressure", "hypertension", "angina", "chest pain", "heart disease"],
    barcode: "8901030007896",
  },
  {
    id: "8",
    name: "Enalapril",
    genericName: "Enalapril Maleate",
    brand: "Envas",
    strength: "5mg",
    form: "Tablet",
    price: 75,
    manufacturer: "Cadila",
    description: "ACE inhibitor for blood pressure control",
    uses: ["Hypertension", "Heart failure", "Kidney protection"],
    sideEffects: ["Dry cough", "Dizziness", "Hyperkalemia"],
    dosage: "5-10mg twice daily",
    precautions: ["Monitor kidney function", "Check potassium levels", "Avoid salt substitutes"],
    category: "ACE Inhibitor",
    prescriptionRequired: true,
    availability: "In Stock",
    conditions: ["high blood pressure", "hypertension", "heart failure", "kidney disease"],
    barcode: "8901030008903",
  },
  {
    id: "9",
    name: "Atenolol",
    genericName: "Atenolol",
    brand: "Tenormin",
    strength: "50mg",
    form: "Tablet",
    price: 65,
    manufacturer: "AstraZeneca",
    description: "Beta-blocker for heart conditions",
    uses: ["High blood pressure", "Angina", "Heart rhythm disorders"],
    sideEffects: ["Fatigue", "Cold hands/feet", "Slow heart rate"],
    dosage: "25-100mg once daily",
    precautions: ["Don't stop suddenly", "Monitor heart rate", "Caution in diabetes"],
    category: "Beta Blocker",
    prescriptionRequired: true,
    availability: "In Stock",
    conditions: ["high blood pressure", "angina", "heart rhythm problems", "palpitations"],
    barcode: "8901030009010",
  },

  // Respiratory Medicines
  {
    id: "10",
    name: "Salbutamol",
    genericName: "Salbutamol Sulfate",
    brand: "Asthalin",
    strength: "100mcg",
    form: "Inhaler",
    price: 145,
    manufacturer: "Cipla",
    description: "Bronchodilator for asthma and COPD",
    uses: ["Asthma", "COPD", "Bronchospasm", "Wheezing"],
    sideEffects: ["Tremor", "Palpitations", "Headache", "Nervousness"],
    dosage: "1-2 puffs every 4-6 hours as needed",
    precautions: ["Proper inhaler technique", "Rinse mouth after use", "Monitor heart rate"],
    category: "Bronchodilator",
    prescriptionRequired: false,
    availability: "In Stock",
    conditions: ["asthma", "wheezing", "shortness of breath", "copd", "bronchospasm", "cough"],
    barcode: "8901030010127",
  },
  {
    id: "11",
    name: "Montelukast",
    genericName: "Montelukast Sodium",
    brand: "Montair",
    strength: "10mg",
    form: "Tablet",
    price: 185,
    manufacturer: "Cipla",
    description: "Leukotriene receptor antagonist for asthma",
    uses: ["Asthma", "Allergic rhinitis", "Exercise-induced bronchospasm"],
    sideEffects: ["Headache", "Stomach pain", "Mood changes"],
    dosage: "10mg once daily in the evening",
    precautions: ["Monitor for mood changes", "Not for acute asthma attacks", "Take consistently"],
    category: "Anti-asthmatic",
    prescriptionRequired: true,
    availability: "In Stock",
    conditions: ["asthma", "allergic rhinitis", "runny nose", "sneezing", "allergies"],
    barcode: "8901030011234",
  },

  // Gastrointestinal Medicines
  {
    id: "12",
    name: "Omeprazole",
    genericName: "Omeprazole",
    brand: "Prilosec",
    strength: "20mg",
    form: "Capsule",
    price: 125,
    manufacturer: "Dr. Reddy's",
    description: "Proton pump inhibitor for acid-related disorders",
    uses: ["GERD", "Peptic ulcers", "Acid reflux", "Gastritis"],
    sideEffects: ["Headache", "Nausea", "Diarrhea", "Vitamin B12 deficiency"],
    dosage: "20-40mg once daily before breakfast",
    precautions: ["Take before meals", "Long-term use monitoring", "Calcium absorption"],
    category: "PPI",
    prescriptionRequired: false,
    availability: "In Stock",
    conditions: ["acid reflux", "heartburn", "stomach pain", "gastritis", "ulcer", "gerd"],
    barcode: "8901030012341",
  },
  {
    id: "13",
    name: "Domperidone",
    genericName: "Domperidone",
    brand: "Motilium",
    strength: "10mg",
    form: "Tablet",
    price: 85,
    manufacturer: "Johnson & Johnson",
    description: "Antiemetic and prokinetic agent",
    uses: ["Nausea", "Vomiting", "Gastroparesis", "Bloating"],
    sideEffects: ["Dry mouth", "Headache", "Breast tenderness"],
    dosage: "10mg three times daily before meals",
    precautions: ["Heart rhythm monitoring", "Avoid in liver disease", "Short-term use"],
    category: "Antiemetic",
    prescriptionRequired: false,
    availability: "In Stock",
    conditions: ["nausea", "vomiting", "stomach upset", "bloating", "gastroparesis"],
    barcode: "8901030013458",
  },
  {
    id: "14",
    name: "Loperamide",
    genericName: "Loperamide HCl",
    brand: "Imodium",
    strength: "2mg",
    form: "Capsule",
    price: 95,
    manufacturer: "Johnson & Johnson",
    description: "Antidiarrheal medication",
    uses: ["Diarrhea", "IBS with diarrhea", "Traveler's diarrhea"],
    sideEffects: ["Constipation", "Dizziness", "Nausea"],
    dosage: "2mg after each loose stool, max 16mg per day",
    precautions: ["Don't use in bacterial infections", "Avoid in fever", "Short-term use only"],
    category: "Antidiarrheal",
    prescriptionRequired: false,
    availability: "In Stock",
    conditions: ["diarrhea", "loose stools", "ibs", "stomach upset", "traveler's diarrhea"],
    barcode: "8901030014565",
  },

  // Antibiotics
  {
    id: "15",
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    brand: "Amoxil",
    strength: "500mg",
    form: "Capsule",
    price: 145,
    manufacturer: "GSK",
    description: "Broad-spectrum antibiotic",
    uses: ["Bacterial infections", "Respiratory infections", "UTI", "Skin infections"],
    sideEffects: ["Nausea", "Diarrhea", "Allergic reactions", "Rash"],
    dosage: "500mg three times daily for 7-10 days",
    precautions: ["Complete full course", "Check for penicillin allergy", "Take with food"],
    category: "Antibiotic",
    prescriptionRequired: true,
    availability: "In Stock",
    conditions: ["bacterial infection", "respiratory infection", "uti", "skin infection", "throat infection"],
    barcode: "8901030015672",
  },
  {
    id: "16",
    name: "Azithromycin",
    genericName: "Azithromycin",
    brand: "Zithromax",
    strength: "250mg",
    form: "Tablet",
    price: 185,
    manufacturer: "Pfizer",
    description: "Macrolide antibiotic",
    uses: ["Respiratory infections", "Skin infections", "STDs", "Pneumonia"],
    sideEffects: ["Nausea", "Diarrhea", "Stomach pain", "Headache"],
    dosage: "500mg on day 1, then 250mg daily for 4 days",
    precautions: ["Complete full course", "Monitor liver function", "Drug interactions"],
    category: "Antibiotic",
    prescriptionRequired: true,
    availability: "In Stock",
    conditions: ["pneumonia", "bronchitis", "skin infection", "respiratory infection"],
    barcode: "8901030016789",
  },

  // Allergy Medicines
  {
    id: "17",
    name: "Cetirizine",
    genericName: "Cetirizine HCl",
    brand: "Zyrtec",
    strength: "10mg",
    form: "Tablet",
    price: 65,
    manufacturer: "UCB",
    description: "Antihistamine for allergies",
    uses: ["Allergic rhinitis", "Urticaria", "Hay fever", "Skin allergies"],
    sideEffects: ["Drowsiness", "Dry mouth", "Fatigue"],
    dosage: "10mg once daily",
    precautions: ["May cause drowsiness", "Avoid alcohol", "Caution while driving"],
    category: "Antihistamine",
    prescriptionRequired: false,
    availability: "In Stock",
    conditions: ["allergies", "runny nose", "sneezing", "itching", "rash", "hives"],
    barcode: "8901030017896",
  },
  {
    id: "18",
    name: "Loratadine",
    genericName: "Loratadine",
    brand: "Claritin",
    strength: "10mg",
    form: "Tablet",
    price: 85,
    manufacturer: "Schering-Plough",
    description: "Non-sedating antihistamine",
    uses: ["Seasonal allergies", "Perennial rhinitis", "Chronic urticaria"],
    sideEffects: ["Headache", "Fatigue", "Dry mouth"],
    dosage: "10mg once daily",
    precautions: ["Less sedating than other antihistamines", "Take on empty stomach", "Avoid grapefruit juice"],
    category: "Antihistamine",
    prescriptionRequired: false,
    availability: "In Stock",
    conditions: ["seasonal allergies", "hay fever", "allergic rhinitis", "chronic hives"],
    barcode: "8901030018903",
  },

  // Mental Health
  {
    id: "19",
    name: "Sertraline",
    genericName: "Sertraline HCl",
    brand: "Zoloft",
    strength: "50mg",
    form: "Tablet",
    price: 285,
    manufacturer: "Pfizer",
    description: "SSRI antidepressant",
    uses: ["Depression", "Anxiety disorders", "PTSD", "OCD"],
    sideEffects: ["Nausea", "Insomnia", "Sexual dysfunction", "Weight changes"],
    dosage: "50mg once daily, may increase to 200mg",
    precautions: ["Monitor for suicidal thoughts", "Gradual dose changes", "Drug interactions"],
    category: "Antidepressant",
    prescriptionRequired: true,
    availability: "In Stock",
    conditions: ["depression", "anxiety", "panic attacks", "ptsd", "ocd"],
    barcode: "8901030019010",
  },
  {
    id: "20",
    name: "Alprazolam",
    genericName: "Alprazolam",
    brand: "Xanax",
    strength: "0.5mg",
    form: "Tablet",
    price: 125,
    manufacturer: "Pfizer",
    description: "Benzodiazepine for anxiety",
    uses: ["Anxiety disorders", "Panic disorder", "Short-term anxiety relief"],
    sideEffects: ["Drowsiness", "Dizziness", "Memory problems", "Dependence"],
    dosage: "0.25-0.5mg three times daily as needed",
    precautions: ["Risk of dependence", "Avoid alcohol", "Gradual discontinuation"],
    category: "Anxiolytic",
    prescriptionRequired: true,
    availability: "Limited Stock",
    conditions: ["anxiety", "panic attacks", "panic disorder", "severe anxiety"],
    barcode: "8901030020127",
  },
]

// Helper functions for autocomplete and suggestions
export function getMedicineSuggestions(query: string): string[] {
  if (!query.trim()) return []

  const searchTerm = query.toLowerCase()
  const suggestions = new Set<string>()

  // Add medicine names
  medicineDatabase.forEach((medicine) => {
    if (medicine.name.toLowerCase().includes(searchTerm)) {
      suggestions.add(medicine.name)
    }

    // Add generic names
    if (medicine.genericName.toLowerCase().includes(searchTerm)) {
      suggestions.add(medicine.genericName)
    }

    // Add brand names
    if (medicine.brand.toLowerCase().includes(searchTerm)) {
      suggestions.add(medicine.brand)
    }
  })

  return Array.from(suggestions).slice(0, 10).sort()
}

export function getConditionSuggestions(query: string): string[] {
  if (!query.trim()) return []

  const searchTerm = query.toLowerCase()
  const suggestions = new Set<string>()

  // Add conditions from all medicines
  medicineDatabase.forEach((medicine) => {
    medicine.conditions.forEach((condition) => {
      if (condition.toLowerCase().includes(searchTerm)) {
        suggestions.add(condition)
      }
    })
  })

  return Array.from(suggestions).slice(0, 10).sort()
}

export function searchMedicines(query: string): Medicine[] {
  if (!query.trim()) return medicineDatabase

  const searchTerm = query.toLowerCase().trim()

  return medicineDatabase.filter((medicine) => {
    // Search in medicine name, generic name, brand, and conditions
    const searchFields = [
      medicine.name.toLowerCase(),
      medicine.genericName.toLowerCase(),
      medicine.brand.toLowerCase(),
      medicine.category.toLowerCase(),
      ...medicine.uses.map((use) => use.toLowerCase()),
      ...medicine.conditions.map((condition) => condition.toLowerCase()),
    ]

    return searchFields.some(
      (field) => field.includes(searchTerm) || searchTerm.split(" ").every((term) => field.includes(term)),
    )
  })
}

export function searchMedicinesByCondition(condition: string): Medicine[] {
  if (!condition.trim()) return []

  const conditionTerm = condition.toLowerCase().trim()

  return medicineDatabase
    .filter((medicine) =>
      medicine.conditions.some(
        (cond) => cond.toLowerCase().includes(conditionTerm) || conditionTerm.includes(cond.toLowerCase()),
      ),
    )
    .sort((a, b) => {
      // Sort by relevance - exact matches first
      const aExactMatch = a.conditions.some((cond) => cond.toLowerCase() === conditionTerm)
      const bExactMatch = b.conditions.some((cond) => cond.toLowerCase() === conditionTerm)

      if (aExactMatch && !bExactMatch) return -1
      if (!aExactMatch && bExactMatch) return 1

      return 0
    })
}

export function searchMedicineByBarcode(barcode: string): Medicine | null {
  return medicineDatabase.find((medicine) => medicine.barcode === barcode) || null
}

export function getMedicineById(id: string): Medicine | null {
  return medicineDatabase.find((medicine) => medicine.id === id) || null
}

export function getMedicinesByCategory(category: string): Medicine[] {
  return medicineDatabase.filter((medicine) => medicine.category.toLowerCase() === category.toLowerCase())
}

export function getAvailableMedicines(): Medicine[] {
  return medicineDatabase.filter((medicine) => medicine.availability === "In Stock")
}

export function getPrescriptionMedicines(): Medicine[] {
  return medicineDatabase.filter((medicine) => medicine.prescriptionRequired)
}

export function getOTCMedicines(): Medicine[] {
  return medicineDatabase.filter((medicine) => !medicine.prescriptionRequired)
}
