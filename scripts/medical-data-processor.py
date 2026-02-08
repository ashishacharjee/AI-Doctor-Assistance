"""
Advanced medical data processing and analysis using Python
Handles complex medical calculations, drug interactions, and health risk assessments
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import sqlite3
from typing import Dict, List, Tuple, Optional

class MedicalDataProcessor:
    def __init__(self, db_path: str = "medical_data.db"):
        self.db_path = db_path
        self.init_database()
        
    def init_database(self):
        """Initialize SQLite database for medical data"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create tables for medical data
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS patient_history (
                id INTEGER PRIMARY KEY,
                patient_id TEXT,
                symptoms TEXT,
                diagnosis TEXT,
                medications TEXT,
                date_recorded TIMESTAMP,
                severity_score REAL
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS drug_interactions (
                id INTEGER PRIMARY KEY,
                drug1 TEXT,
                drug2 TEXT,
                interaction_type TEXT,
                severity TEXT,
                description TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS health_metrics (
                id INTEGER PRIMARY KEY,
                patient_id TEXT,
                metric_type TEXT,
                value REAL,
                unit TEXT,
                date_recorded TIMESTAMP,
                normal_range_min REAL,
                normal_range_max REAL
            )
        ''')
        
        conn.commit()
        conn.close()
        
        # Seed with sample drug interaction data
        self.seed_drug_interactions()
    
    def seed_drug_interactions(self):
        """Seed database with common drug interactions"""
        interactions = [
            ("Aspirin", "Warfarin", "Anticoagulant", "High", "Increased bleeding risk"),
            ("Metformin", "Alcohol", "Metabolic", "Medium", "Risk of lactic acidosis"),
            ("Paracetamol", "Alcohol", "Hepatotoxic", "Medium", "Liver damage risk"),
            ("Ibuprofen", "ACE Inhibitors", "Renal", "Medium", "Kidney function impairment"),
            ("Digoxin", "Diuretics", "Electrolyte", "High", "Digitalis toxicity risk")
        ]
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        for interaction in interactions:
            cursor.execute('''
                INSERT OR IGNORE INTO drug_interactions 
                (drug1, drug2, interaction_type, severity, description)
                VALUES (?, ?, ?, ?, ?)
            ''', interaction)
        
        conn.commit()
        conn.close()
    
    def calculate_health_risk_score(self, patient_data: Dict) -> Dict:
        """Calculate comprehensive health risk score"""
        risk_factors = {
            'age': patient_data.get('age', 30),
            'bmi': patient_data.get('bmi', 25),
            'blood_pressure_systolic': patient_data.get('bp_systolic', 120),
            'blood_pressure_diastolic': patient_data.get('bp_diastolic', 80),
            'cholesterol': patient_data.get('cholesterol', 200),
            'smoking': patient_data.get('smoking', False),
            'diabetes': patient_data.get('diabetes', False),
            'family_history': patient_data.get('family_history', [])
        }
        
        # Calculate individual risk scores
        age_risk = min((risk_factors['age'] - 20) / 60 * 100, 100) if risk_factors['age'] > 20 else 0
        
        bmi_risk = 0
        if risk_factors['bmi'] > 30:
            bmi_risk = 40
        elif risk_factors['bmi'] > 25:
            bmi_risk = 20
        
        bp_risk = 0
        if risk_factors['blood_pressure_systolic'] > 140 or risk_factors['blood_pressure_diastolic'] > 90:
            bp_risk = 50
        elif risk_factors['blood_pressure_systolic'] > 130 or risk_factors['blood_pressure_diastolic'] > 85:
            bp_risk = 25
        
        cholesterol_risk = max((risk_factors['cholesterol'] - 200) / 100 * 30, 0) if risk_factors['cholesterol'] > 200 else 0
        
        lifestyle_risk = 0
        if risk_factors['smoking']:
            lifestyle_risk += 30
        if risk_factors['diabetes']:
            lifestyle_risk += 25
        
        family_risk = len(risk_factors['family_history']) * 10
        
        # Weighted total risk score
        total_risk = (
            age_risk * 0.2 +
            bmi_risk * 0.15 +
            bp_risk * 0.25 +
            cholesterol_risk * 0.15 +
            lifestyle_risk * 0.15 +
            family_risk * 0.1
        )
        
        risk_level = "Low"
        if total_risk > 70:
            risk_level = "Very High"
        elif total_risk > 50:
            risk_level = "High"
        elif total_risk > 30:
            risk_level = "Moderate"
        
        return {
            'total_risk_score': round(total_risk, 2),
            'risk_level': risk_level,
            'risk_factors': {
                'age_risk': round(age_risk, 2),
                'bmi_risk': round(bmi_risk, 2),
                'blood_pressure_risk': round(bp_risk, 2),
                'cholesterol_risk': round(cholesterol_risk, 2),
                'lifestyle_risk': round(lifestyle_risk, 2),
                'family_history_risk': round(family_risk, 2)
            },
            'recommendations': self.get_risk_recommendations(total_risk, risk_factors)
        }
    
    def get_risk_recommendations(self, risk_score: float, risk_factors: Dict) -> List[str]:
        """Generate personalized health recommendations"""
        recommendations = []
        
        if risk_score > 50:
            recommendations.append("Consult with a healthcare provider immediately")
            recommendations.append("Consider comprehensive health screening")
        
        if risk_factors['bmi'] > 25:
            recommendations.append("Focus on weight management through diet and exercise")
        
        if risk_factors['blood_pressure_systolic'] > 130:
            recommendations.append("Monitor blood pressure regularly and reduce sodium intake")
        
        if risk_factors['cholesterol'] > 200:
            recommendations.append("Follow a heart-healthy diet low in saturated fats")
        
        if risk_factors['smoking']:
            recommendations.append("Quit smoking - consider nicotine replacement therapy")
        
        if risk_factors['age'] > 40:
            recommendations.append("Schedule regular preventive health checkups")
        
        # General recommendations
        recommendations.extend([
            "Maintain regular physical activity (150 minutes/week)",
            "Follow a balanced diet rich in fruits and vegetables",
            "Ensure adequate sleep (7-9 hours per night)",
            "Manage stress through relaxation techniques"
        ])
        
        return recommendations
    
    def check_drug_interactions(self, medications: List[str]) -> List[Dict]:
        """Check for drug interactions"""
        interactions = []
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        for i, med1 in enumerate(medications):
            for med2 in medications[i+1:]:
                # Check both directions of interaction
                cursor.execute('''
                    SELECT * FROM drug_interactions 
                    WHERE (drug1 = ? AND drug2 = ?) OR (drug1 = ? AND drug2 = ?)
                ''', (med1, med2, med2, med1))
                
                result = cursor.fetchone()
                if result:
                    interactions.append({
                        'drug1': result[1],
                        'drug2': result[2],
                        'interaction_type': result[3],
                        'severity': result[4],
                        'description': result[5]
                    })
        
        conn.close()
        return interactions
    
    def analyze_symptom_patterns(self, patient_id: str, days: int = 30) -> Dict:
        """Analyze symptom patterns over time"""
        conn = sqlite3.connect(self.db_path)
        
        # Get patient history from last N days
        query = '''
            SELECT symptoms, diagnosis, severity_score, date_recorded
            FROM patient_history 
            WHERE patient_id = ? AND date_recorded >= ?
            ORDER BY date_recorded DESC
        '''
        
        cutoff_date = datetime.now() - timedelta(days=days)
        df = pd.read_sql_query(query, conn, params=(patient_id, cutoff_date))
        conn.close()
        
        if df.empty:
            return {'message': 'No recent history found'}
        
        # Analyze patterns
        avg_severity = df['severity_score'].mean()
        symptom_frequency = {}
        
        for symptoms in df['symptoms']:
            for symptom in symptoms.split(','):
                symptom = symptom.strip().lower()
                symptom_frequency[symptom] = symptom_frequency.get(symptom, 0) + 1
        
        most_common_symptoms = sorted(symptom_frequency.items(), key=lambda x: x[1], reverse=True)[:5]
        
        # Trend analysis
        df['date_recorded'] = pd.to_datetime(df['date_recorded'])
        df = df.sort_values('date_recorded')
        
        if len(df) > 1:
            severity_trend = "improving" if df['severity_score'].iloc[-1] < df['severity_score'].iloc[0] else "worsening"
        else:
            severity_trend = "stable"
        
        return {
            'average_severity': round(avg_severity, 2),
            'most_common_symptoms': most_common_symptoms,
            'severity_trend': severity_trend,
            'total_episodes': len(df),
            'analysis_period_days': days
        }
    
    def generate_health_report(self, patient_id: str, patient_data: Dict) -> Dict:
        """Generate comprehensive health report"""
        risk_assessment = self.calculate_health_risk_score(patient_data)
        symptom_patterns = self.analyze_symptom_patterns(patient_id)
        
        medications = patient_data.get('current_medications', [])
        drug_interactions = self.check_drug_interactions(medications)
        
        report = {
            'patient_id': patient_id,
            'report_date': datetime.now().isoformat(),
            'risk_assessment': risk_assessment,
            'symptom_patterns': symptom_patterns,
            'drug_interactions': drug_interactions,
            'health_metrics': self.get_health_metrics_summary(patient_id),
            'recommendations': {
                'immediate': [],
                'short_term': [],
                'long_term': risk_assessment['recommendations']
            }
        }
        
        # Add immediate recommendations based on drug interactions
        if drug_interactions:
            high_severity_interactions = [i for i in drug_interactions if i['severity'] == 'High']
            if high_severity_interactions:
                report['recommendations']['immediate'].append(
                    "Consult doctor immediately about high-severity drug interactions"
                )
        
        return report
    
    def get_health_metrics_summary(self, patient_id: str) -> Dict:
        """Get summary of health metrics"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT metric_type, AVG(value) as avg_value, unit, 
                   normal_range_min, normal_range_max, COUNT(*) as readings
            FROM health_metrics 
            WHERE patient_id = ? AND date_recorded >= ?
            GROUP BY metric_type
        ''', (patient_id, datetime.now() - timedelta(days=90)))
        
        results = cursor.fetchall()
        conn.close()
        
        metrics = {}
        for result in results:
            metric_type, avg_value, unit, min_normal, max_normal, readings = result
            
            status = "Normal"
            if avg_value < min_normal:
                status = "Below Normal"
            elif avg_value > max_normal:
                status = "Above Normal"
            
            metrics[metric_type] = {
                'average_value': round(avg_value, 2),
                'unit': unit,
                'status': status,
                'normal_range': f"{min_normal}-{max_normal}",
                'total_readings': readings
            }
        
        return metrics

def main():
    """Example usage of Medical Data Processor"""
    processor = MedicalDataProcessor()
    
    # Example patient data
    patient_data = {
        'age': 45,
        'bmi': 28.5,
        'bp_systolic': 135,
        'bp_diastolic': 88,
        'cholesterol': 220,
        'smoking': True,
        'diabetes': False,
        'family_history': ['heart_disease', 'diabetes'],
        'current_medications': ['Aspirin', 'Metformin']
    }
    
    # Generate health report
    report = processor.generate_health_report("patient_001", patient_data)
    
    print("Health Risk Assessment Report")
    print("=" * 50)
    print(json.dumps(report, indent=2))

if __name__ == "__main__":
    main()
