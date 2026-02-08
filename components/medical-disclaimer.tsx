import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export function MedicalDisclaimer() {
  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900 mb-2">Important Medical Disclaimer</h4>
            <p className="text-sm text-yellow-800 leading-relaxed">
              This AI Doctor Assistance platform is designed for informational purposes only and should not replace
              professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare
              professionals for medical concerns. In case of medical emergencies, contact emergency services
              immediately. The AI recommendations are based on general medical knowledge and may not account for
              individual medical history or specific conditions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
