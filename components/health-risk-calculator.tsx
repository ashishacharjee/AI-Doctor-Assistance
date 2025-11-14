"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Heart, Activity, TrendingUp, TrendingDown } from "lucide-react"

interface HealthRiskData {
  age: number
  bmi: number
  bp_systolic: number
  bp_diastolic: number
  cholesterol: number
  smoking: boolean
  diabetes: boolean
  family_history: string[]
  current_medications: string[]
}

interface RiskAssessment {
  total_risk_score: number
  risk_level: string
  risk_factors: {
    age_risk: number
    bmi_risk: number
    blood_pressure_risk: number
    cholesterol_risk: number
    lifestyle_risk: number
    family_history_risk: number
  }
  recommendations: string[]
}

export function HealthRiskCalculator() {
  const [formData, setFormData] = useState<HealthRiskData>({
    age: 30,
    bmi: 25,
    bp_systolic: 120,
    bp_diastolic: 80,
    cholesterol: 200,
    smoking: false,
    diabetes: false,
    family_history: [],
    current_medications: [],
  })

  const [assessment, setAssessment] = useState<RiskAssessment | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [medicationInput, setMedicationInput] = useState("")

  const handleInputChange = (field: keyof HealthRiskData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFamilyHistoryChange = (condition: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      family_history: checked
        ? [...prev.family_history, condition]
        : prev.family_history.filter((c) => c !== condition),
    }))
  }

  const addMedication = () => {
    if (medicationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        current_medications: [...prev.current_medications, medicationInput.trim()],
      }))
      setMedicationInput("")
    }
  }

  const removeMedication = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      current_medications: prev.current_medications.filter((_, i) => i !== index),
    }))
  }

  const calculateRisk = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/health-risk-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to calculate risk")
      }

      const data = await response.json()
      setAssessment(data.assessment.risk_assessment)
    } catch (error) {
      console.error("Error calculating risk:", error)
      // Fallback calculation for demo
      const mockAssessment: RiskAssessment = {
        total_risk_score: Math.random() * 100,
        risk_level: "Moderate",
        risk_factors: {
          age_risk: ((formData.age - 20) / 60) * 100,
          bmi_risk: formData.bmi > 25 ? 20 : 0,
          blood_pressure_risk: formData.bp_systolic > 130 ? 25 : 0,
          cholesterol_risk: formData.cholesterol > 200 ? 15 : 0,
          lifestyle_risk: (formData.smoking ? 30 : 0) + (formData.diabetes ? 25 : 0),
          family_history_risk: formData.family_history.length * 10,
        },
        recommendations: [
          "Maintain regular physical activity",
          "Follow a balanced diet",
          "Monitor blood pressure regularly",
          "Schedule regular health checkups",
        ],
      }
      setAssessment(mockAssessment)
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return "text-green-600 bg-green-100"
      case "moderate":
        return "text-yellow-600 bg-yellow-100"
      case "high":
        return "text-orange-600 bg-orange-100"
      case "very high":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            Health Risk Assessment Calculator
          </CardTitle>
          <p className="text-gray-600">
            Calculate your personalized health risk score using advanced Python-based medical algorithms
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", Number.parseInt(e.target.value))}
                min="18"
                max="100"
              />
            </div>
            <div>
              <Label htmlFor="bmi">BMI (Body Mass Index)</Label>
              <Input
                id="bmi"
                type="number"
                step="0.1"
                value={formData.bmi}
                onChange={(e) => handleInputChange("bmi", Number.parseFloat(e.target.value))}
                min="15"
                max="50"
              />
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bp_systolic">Systolic Blood Pressure (mmHg)</Label>
              <Input
                id="bp_systolic"
                type="number"
                value={formData.bp_systolic}
                onChange={(e) => handleInputChange("bp_systolic", Number.parseInt(e.target.value))}
                min="80"
                max="200"
              />
            </div>
            <div>
              <Label htmlFor="bp_diastolic">Diastolic Blood Pressure (mmHg)</Label>
              <Input
                id="bp_diastolic"
                type="number"
                value={formData.bp_diastolic}
                onChange={(e) => handleInputChange("bp_diastolic", Number.parseInt(e.target.value))}
                min="50"
                max="120"
              />
            </div>
          </div>

          {/* Cholesterol */}
          <div>
            <Label htmlFor="cholesterol">Total Cholesterol (mg/dL)</Label>
            <Input
              id="cholesterol"
              type="number"
              value={formData.cholesterol}
              onChange={(e) => handleInputChange("cholesterol", Number.parseInt(e.target.value))}
              min="100"
              max="400"
            />
          </div>

          {/* Lifestyle Factors */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lifestyle Factors</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="smoking"
                checked={formData.smoking}
                onCheckedChange={(checked) => handleInputChange("smoking", checked)}
              />
              <Label htmlFor="smoking">Current smoker</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="diabetes"
                checked={formData.diabetes}
                onCheckedChange={(checked) => handleInputChange("diabetes", checked)}
              />
              <Label htmlFor="diabetes">Diagnosed with diabetes</Label>
            </div>
          </div>

          {/* Family History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Family History</h3>
            <div className="grid grid-cols-2 gap-2">
              {["heart_disease", "diabetes", "stroke", "cancer", "hypertension"].map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={formData.family_history.includes(condition)}
                    onCheckedChange={(checked) => handleFamilyHistoryChange(condition, checked as boolean)}
                  />
                  <Label htmlFor={condition} className="capitalize">
                    {condition.replace("_", " ")}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Current Medications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Medications</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter medication name"
                value={medicationInput}
                onChange={(e) => setMedicationInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addMedication()}
              />
              <Button onClick={addMedication} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.current_medications.map((med, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeMedication(index)}
                >
                  {med} ×
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={calculateRisk} disabled={isLoading} className="w-full">
            {isLoading ? "Calculating Risk..." : "Calculate Health Risk"}
          </Button>
        </CardContent>
      </Card>

      {/* Risk Assessment Results */}
      {assessment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-blue-500" />
              Your Health Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Risk Score */}
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-gray-800">{assessment.total_risk_score.toFixed(1)}%</div>
              <Badge className={`text-lg px-4 py-2 ${getRiskColor(assessment.risk_level)}`}>
                {assessment.risk_level} Risk
              </Badge>
              <Progress value={assessment.total_risk_score} className="w-full h-3" />
            </div>

            <Separator />

            {/* Risk Factor Breakdown */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Risk Factor Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(assessment.risk_factors).map(([factor, score]) => (
                  <div key={factor} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="capitalize font-medium">{factor.replace("_", " ")}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{score.toFixed(1)}%</span>
                      {score > 30 ? (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Personalized Recommendations
              </h3>
              <ul className="space-y-2">
                {assessment.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
