"""
Python-based medical AI service for advanced symptom analysis
This can be called from the Next.js API routes for complex medical processing
"""

import json
import re
from typing import Dict, List, Any
from dataclasses import dataclass
import requests

@dataclass
class SymptomAnalysis:
    condition: str
    severity: str
    urgency: str
    confidence: float
    recommendations: List[str]
    red_flags: List[str]

class MedicalAIService:
    def __init__(self):
        self.symptom_patterns = {
            'fever': {
                'keywords': ['fever', 'temperature', 'hot', 'chills', 'burning'],
                'conditions': ['viral infection', 'bacterial infection', 'malaria', 'dengue'],
                'severity_indicators': {
                    'mild': ['low grade fever', 'slight temperature'],
                    'moderate': ['fever', 'high temperature'],
                    'severe': ['high fever', 'very hot', 'burning fever']
                }
            },
            'respiratory': {
                'keywords': ['cough', 'breathing', 'chest', 'lungs', 'shortness of breath'],
                'conditions': ['respiratory infection', 'asthma', 'pneumonia', 'bronchitis'],
                'severity_indicators': {
                    'mild': ['dry cough', 'slight cough'],
                    'moderate': ['persistent cough', 'chest discomfort'],
                    'severe': ['difficulty breathing', 'severe chest pain', 'blood in cough']
                }
            },
            'gastrointestinal': {
                'keywords': ['stomach', 'nausea', 'vomiting', 'diarrhea', 'abdominal'],
                'conditions': ['gastritis', 'food poisoning', 'gastroenteritis', 'appendicitis'],
                'severity_indicators': {
                    'mild': ['mild stomach ache', 'slight nausea'],
                    'moderate': ['stomach pain', 'vomiting', 'diarrhea'],
                    'severe': ['severe abdominal pain', 'blood in vomit', 'severe dehydration']
                }
            },
            'neurological': {
                'keywords': ['headache', 'dizziness', 'confusion', 'seizure', 'weakness'],
                'conditions': ['tension headache', 'migraine', 'stroke', 'meningitis'],
                'severity_indicators': {
                    'mild': ['mild headache', 'slight dizziness'],
                    'moderate': ['headache', 'dizziness', 'fatigue'],
                    'severe': ['severe headache', 'confusion', 'loss of consciousness']
                }
            }
        }
        
        self.emergency_keywords = [
            'chest pain', 'difficulty breathing', 'unconscious', 'seizure',
            'severe bleeding', 'stroke symptoms', 'heart attack', 'severe allergic reaction'
        ]
        
        self.indian_health_context = {
            'common_diseases': ['diabetes', 'hypertension', 'tuberculosis', 'malaria', 'dengue'],
            'seasonal_concerns': {
                'monsoon': ['dengue', 'malaria', 'typhoid', 'hepatitis'],
                'summer': ['heat stroke', 'dehydration', 'food poisoning'],
                'winter': ['respiratory infections', 'joint pain']
            },
            'nutritional_deficiencies': ['iron deficiency', 'vitamin D', 'vitamin B12']
        }

    def analyze_symptoms(self, symptoms_text: str, patient_context: Dict = None) -> SymptomAnalysis:
        """
        Advanced symptom analysis using pattern matching and medical knowledge
        """
        symptoms_lower = symptoms_text.lower()
        
        # Check for emergency symptoms first
        if self._is_emergency(symptoms_lower):
            return SymptomAnalysis(
                condition="Medical Emergency",
                severity="Critical",
                urgency="Immediate",
                confidence=0.95,
                recommendations=[
                    "Call 102 or 108 immediately",
                    "Go to nearest emergency room",
                    "Do not delay medical care"
                ],
                red_flags=["Emergency symptoms detected"]
            )
        
        # Analyze symptom categories
        detected_categories = []
        for category, data in self.symptom_patterns.items():
            if any(keyword in symptoms_lower for keyword in data['keywords']):
                detected_categories.append(category)
        
        if not detected_categories:
            return self._default_analysis()
        
        # Determine primary category and severity
        primary_category = detected_categories[0]
        severity = self._assess_severity(symptoms_lower, primary_category)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(primary_category, severity)
        
        # Assess urgency
        urgency = self._assess_urgency(severity, symptoms_lower)
        
        # Get possible conditions
        conditions = self.symptom_patterns[primary_category]['conditions']
        primary_condition = conditions[0] if conditions else "General health concern"
        
        return SymptomAnalysis(
            condition=primary_condition,
            severity=severity,
            urgency=urgency,
            confidence=0.75,
            recommendations=recommendations,
            red_flags=self._identify_red_flags(symptoms_lower)
        )

    def _is_emergency(self, symptoms: str) -> bool:
        """Check if symptoms indicate a medical emergency"""
        return any(emergency in symptoms for emergency in self.emergency_keywords)

    def _assess_severity(self, symptoms: str, category: str) -> str:
        """Assess symptom severity based on keywords"""
        severity_data = self.symptom_patterns[category]['severity_indicators']
        
        for severity, indicators in severity_data.items():
            if any(indicator in symptoms for indicator in indicators):
                return severity
        
        return 'moderate'  # Default

    def _assess_urgency(self, severity: str, symptoms: str) -> str:
        """Determine urgency level"""
        if severity == 'severe' or any(urgent in symptoms for urgent in ['severe', 'intense', 'unbearable']):
            return 'urgent'
        elif severity == 'moderate':
            return 'routine'
        else:
            return 'routine'

    def _generate_recommendations(self, category: str, severity: str) -> List[str]:
        """Generate category-specific recommendations"""
        base_recommendations = {
            'fever': [
                "Rest and stay hydrated",
                "Take paracetamol for fever reduction",
                "Use cooling measures like cold compress",
                "Monitor temperature regularly"
            ],
            'respiratory': [
                "Rest and avoid exertion",
                "Stay hydrated with warm fluids",
                "Use steam inhalation",
                "Avoid smoking and pollutants"
            ],
            'gastrointestinal': [
                "Stay hydrated with ORS",
                "Eat bland, easy-to-digest foods",
                "Avoid dairy and spicy foods",
                "Rest and monitor symptoms"
            ],
            'neurological': [
                "Rest in a quiet, dark room",
                "Stay hydrated",
                "Apply cold compress to head",
                "Avoid bright lights and loud sounds"
            ]
        }
        
        recommendations = base_recommendations.get(category, [
            "Rest and monitor symptoms",
            "Stay hydrated",
            "Maintain good hygiene"
        ])
        
        if severity == 'severe':
            recommendations.insert(0, "Seek medical attention promptly")
        
        return recommendations

    def _identify_red_flags(self, symptoms: str) -> List[str]:
        """Identify concerning symptoms that require medical attention"""
        red_flags = []
        
        red_flag_patterns = {
            'high fever': ['fever above 104', 'very high fever', 'burning fever'],
            'breathing difficulty': ['can\'t breathe', 'gasping', 'choking'],
            'severe pain': ['unbearable pain', 'excruciating', 'worst pain'],
            'neurological': ['confusion', 'loss of consciousness', 'seizure'],
            'bleeding': ['bleeding', 'blood in', 'hemorrhage']
        }
        
        for flag, patterns in red_flag_patterns.items():
            if any(pattern in symptoms for pattern in patterns):
                red_flags.append(flag)
        
        return red_flags

    def _default_analysis(self) -> SymptomAnalysis:
        """Default analysis for unrecognized symptoms"""
        return SymptomAnalysis(
            condition="General health concern",
            severity="mild",
            urgency="routine",
            confidence=0.5,
            recommendations=[
                "Monitor symptoms closely",
                "Rest and stay hydrated",
                "Consult doctor if symptoms persist"
            ],
            red_flags=[]
        )

    def get_medicine_suggestions(self, condition: str) -> List[Dict]:
        """Get medicine suggestions based on condition"""
        medicine_db = {
            'fever': [
                {'name': 'Paracetamol', 'dosage': '500mg every 6 hours', 'prescription': False},
                {'name': 'Ibuprofen', 'dosage': '400mg every 8 hours', 'prescription': False}
            ],
            'cough': [
                {'name': 'Honey', 'dosage': '1 tsp as needed', 'prescription': False},
                {'name': 'Cough syrup', 'dosage': 'As per label', 'prescription': False}
            ],
            'headache': [
                {'name': 'Paracetamol', 'dosage': '500mg as needed', 'prescription': False},
                {'name': 'Rest', 'dosage': 'Adequate sleep', 'prescription': False}
            ]
        }
        
        return medicine_db.get(condition.lower(), [])

def main():
    """Example usage of the Medical AI Service"""
    service = MedicalAIService()
    
    # Test cases
    test_symptoms = [
        "I have fever and headache for 2 days",
        "Severe chest pain and difficulty breathing",
        "Mild stomach ache after eating",
        "Persistent cough with phlegm"
    ]
    
    for symptom in test_symptoms:
        print(f"\nSymptom: {symptom}")
        analysis = service.analyze_symptoms(symptom)
        print(f"Condition: {analysis.condition}")
        print(f"Severity: {analysis.severity}")
        print(f"Urgency: {analysis.urgency}")
        print(f"Recommendations: {', '.join(analysis.recommendations)}")
        if analysis.red_flags:
            print(f"Red Flags: {', '.join(analysis.red_flags)}")
        print("-" * 50)

if __name__ == "__main__":
    main()
