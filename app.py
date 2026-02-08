from flask import Flask, render_template, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import mysql.connector
from datetime import datetime, timedelta
import json
import os
import hashlib
import requests
from werkzeug.security import generate_password_hash, check_password_hash
import openai

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/ai_doctor_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

# OpenAI configuration (you'll need to set your API key)
openai.api_key = os.getenv('OPENAI_API_KEY', 'your-openai-api-key')

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer)
    phone = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Symptom(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50))
    severity_level = db.Column(db.String(20))

class Medicine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    generic_name = db.Column(db.String(100))
    brand = db.Column(db.String(100))
    strength = db.Column(db.String(50))
    form = db.Column(db.String(50))
    price = db.Column(db.Float)
    manufacturer = db.Column(db.String(100))
    description = db.Column(db.Text)
    category = db.Column(db.String(50))
    prescription_required = db.Column(db.Boolean, default=False)
    barcode = db.Column(db.String(50))

class Consultation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    symptoms = db.Column(db.Text, nullable=False)
    diagnosis = db.Column(db.Text)
    recommendations = db.Column(db.Text)
    severity_score = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    specialty = db.Column(db.String(100), nullable=False)
    license_number = db.Column(db.String(50), unique=True)
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))
    years_experience = db.Column(db.Integer)
    rating = db.Column(db.Float, default=0.0)
    clinic_address = db.Column(db.Text)
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))

class ChatMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    session_id = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Enhanced Medical Analysis Class
class AdvancedMedicalAnalyzer:
    def __init__(self):
        self.medical_knowledge = {
            # Respiratory System
            'cough': {
                'conditions': {
                    'common_cold': {'probability': 0.4, 'severity': 'mild'},
                    'bronchitis': {'probability': 0.25, 'severity': 'moderate'},
                    'pneumonia': {'probability': 0.15, 'severity': 'severe'},
                    'asthma': {'probability': 0.2, 'severity': 'moderate'}
                },
                'medicines': ['Dextromethorphan', 'Guaifenesin', 'Salbutamol', 'Honey'],
                'red_flags': ['blood in cough', 'difficulty breathing', 'chest pain'],
                'duration_factor': {'acute': '<3 weeks', 'chronic': '>8 weeks'}
            },
            
            # Cardiovascular System
            'chest pain': {
                'conditions': {
                    'heart_attack': {'probability': 0.1, 'severity': 'critical'},
                    'angina': {'probability': 0.15, 'severity': 'severe'},
                    'muscle_strain': {'probability': 0.3, 'severity': 'mild'},
                    'acid_reflux': {'probability': 0.25, 'severity': 'mild'},
                    'anxiety': {'probability': 0.2, 'severity': 'mild'}
                },
                'medicines': ['Aspirin', 'Nitroglycerin', 'Antacid'],
                'red_flags': ['crushing pain', 'radiating to arm', 'shortness of breath', 'sweating'],
                'emergency': True
            },
            
            # Neurological System
            'headache': {
                'conditions': {
                    'tension_headache': {'probability': 0.45, 'severity': 'mild'},
                    'migraine': {'probability': 0.25, 'severity': 'moderate'},
                    'sinusitis': {'probability': 0.15, 'severity': 'mild'},
                    'cluster_headache': {'probability': 0.05, 'severity': 'severe'},
                    'brain_tumor': {'probability': 0.01, 'severity': 'critical'}
                },
                'medicines': ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Sumatriptan'],
                'red_flags': ['sudden severe headache', 'fever with headache', 'vision changes', 'confusion'],
                'triggers': ['stress', 'lack of sleep', 'dehydration', 'bright lights']
            },
            
            # Gastrointestinal System
            'stomach pain': {
                'conditions': {
                    'gastritis': {'probability': 0.3, 'severity': 'mild'},
                    'food_poisoning': {'probability': 0.25, 'severity': 'moderate'},
                    'appendicitis': {'probability': 0.1, 'severity': 'severe'},
                    'peptic_ulcer': {'probability': 0.15, 'severity': 'moderate'},
                    'ibs': {'probability': 0.2, 'severity': 'mild'}
                },
                'medicines': ['Omeprazole', 'Ranitidine', 'Antacid', 'ORS'],
                'red_flags': ['severe pain', 'vomiting blood', 'black stools', 'fever'],
                'location_specific': {
                    'right_lower': 'appendicitis',
                    'upper_center': 'gastritis',
                    'upper_right': 'gallbladder'
                }
            },
            
            # Systemic Symptoms
            'fever': {
                'conditions': {
                    'viral_infection': {'probability': 0.5, 'severity': 'mild'},
                    'bacterial_infection': {'probability': 0.25, 'severity': 'moderate'},
                    'malaria': {'probability': 0.1, 'severity': 'severe'},
                    'dengue': {'probability': 0.08, 'severity': 'severe'},
                    'typhoid': {'probability': 0.07, 'severity': 'severe'}
                },
                'medicines': ['Paracetamol', 'Ibuprofen', 'Aspirin'],
                'red_flags': ['high fever >103°F', 'persistent fever >3 days', 'rash', 'difficulty breathing'],
                'temperature_ranges': {
                    'low_grade': '99-100.4°F',
                    'moderate': '100.4-102°F',
                    'high': '102-104°F',
                    'hyperpyrexia': '>104°F'
                }
            },
            
            # Musculoskeletal System
            'back pain': {
                'conditions': {
                    'muscle_strain': {'probability': 0.4, 'severity': 'mild'},
                    'herniated_disc': {'probability': 0.2, 'severity': 'moderate'},
                    'sciatica': {'probability': 0.15, 'severity': 'moderate'},
                    'kidney_stones': {'probability': 0.1, 'severity': 'severe'},
                    'spinal_stenosis': {'probability': 0.15, 'severity': 'moderate'}
                },
                'medicines': ['Ibuprofen', 'Diclofenac', 'Paracetamol', 'Muscle relaxants'],
                'red_flags': ['numbness in legs', 'loss of bladder control', 'severe pain', 'fever'],
                'location_specific': {
                    'lower_back': 'lumbar strain',
                    'upper_back': 'thoracic strain',
                    'neck': 'cervical strain'
                }
            }
        }
        
        self.emergency_keywords = [
            'chest pain', 'difficulty breathing', 'unconscious', 'seizure',
            'severe bleeding', 'stroke symptoms', 'heart attack', 'severe allergic reaction',
            'suicide thoughts', 'severe burns', 'poisoning', 'severe trauma'
        ]
        
        self.severity_modifiers = {
            'mild': ['slight', 'mild', 'little', 'minor', 'occasional'],
            'moderate': ['moderate', 'noticeable', 'persistent', 'regular'],
            'severe': ['severe', 'intense', 'excruciating', 'unbearable', 'extreme', 'terrible'],
            'critical': ['life-threatening', 'emergency', 'critical', 'dying', 'can\'t breathe']
        }

    def analyze_symptoms(self, symptoms_text, patient_age=None, patient_gender=None):
        symptoms_lower = symptoms_text.lower()
        
        # Check for emergency first
        if self.is_emergency(symptoms_lower):
            return self.create_emergency_response()
        
        # Extract symptoms and modifiers
        detected_symptoms = self.extract_symptoms(symptoms_lower)
        severity_level = self.assess_overall_severity(symptoms_lower)
        duration = self.extract_duration(symptoms_lower)
        
        if not detected_symptoms:
            return self.create_default_response()
        
        # Analyze primary symptom
        primary_symptom = detected_symptoms[0]
        analysis = self.analyze_primary_symptom(primary_symptom, symptoms_lower, severity_level)
        
        # Add contextual factors
        if patient_age:
            analysis = self.adjust_for_age(analysis, patient_age)
        
        if duration:
            analysis = self.adjust_for_duration(analysis, duration)
        
        return analysis

    def extract_symptoms(self, symptoms_text):
        detected = []
        for symptom in self.medical_knowledge.keys():
            if symptom in symptoms_text:
                detected.append(symptom)
        
        # Also check for common variations
        symptom_variations = {
            'headache': ['head pain', 'head ache', 'migraine'],
            'stomach pain': ['abdominal pain', 'belly pain', 'tummy ache'],
            'chest pain': ['chest discomfort', 'heart pain'],
            'back pain': ['backache', 'spine pain'],
            'fever': ['temperature', 'hot', 'burning up']
        }
        
        for main_symptom, variations in symptom_variations.items():
            for variation in variations:
                if variation in symptoms_text and main_symptom not in detected:
                    detected.append(main_symptom)
        
        return detected

    def assess_overall_severity(self, symptoms_text):
        severity_scores = {'mild': 0, 'moderate': 0, 'severe': 0, 'critical': 0}
        
        for severity, keywords in self.severity_modifiers.items():
            for keyword in keywords:
                if keyword in symptoms_text:
                    severity_scores[severity] += 1
        
        # Return the severity with highest score
        max_severity = max(severity_scores, key=severity_scores.get)
        return max_severity if severity_scores[max_severity] > 0 else 'moderate'

    def extract_duration(self, symptoms_text):
        duration_patterns = {
            'acute': ['today', 'this morning', 'few hours', 'suddenly'],
            'subacute': ['yesterday', 'few days', '2-3 days', 'this week'],
            'chronic': ['weeks', 'months', 'long time', 'always']
        }
        
        for duration_type, patterns in duration_patterns.items():
            for pattern in patterns:
                if pattern in symptoms_text:
                    return duration_type
        
        return None

    def analyze_primary_symptom(self, symptom, full_text, severity):
        symptom_data = self.medical_knowledge[symptom]
        
        # Calculate condition probabilities
        conditions = symptom_data['conditions']
        most_likely_condition = max(conditions.items(), key=lambda x: x[1]['probability'])
        
        # Check for red flags
        red_flags_present = []
        for red_flag in symptom_data.get('red_flags', []):
            if red_flag in full_text:
                red_flags_present.append(red_flag)
        
        # Adjust severity based on red flags
        if red_flags_present:
            severity = 'severe' if severity != 'critical' else 'critical'
        
        # Get appropriate medicines
        medicines = symptom_data['medicines'][:3]  # Top 3 medicines
        
        # Generate recommendations
        recommendations = self.generate_recommendations(symptom, severity, red_flags_present)
        
        # Calculate confidence
        confidence = self.calculate_confidence(symptom, severity, red_flags_present)
        
        return {
            'condition': most_likely_condition[0].replace('_', ' ').title(),
            'severity': severity,
            'urgency': self.determine_urgency(severity, red_flags_present),
            'confidence': confidence,
            'medicines': medicines,
            'recommendations': recommendations,
            'red_flags': red_flags_present,
            'emergency': len(red_flags_present) > 0 and severity in ['severe', 'critical']
        }

    def generate_recommendations(self, symptom, severity, red_flags):
        base_recommendations = {
            'cough': [
                'Stay hydrated with warm fluids',
                'Use honey to soothe throat',
                'Avoid smoking and irritants',
                'Rest and get adequate sleep'
            ],
            'chest pain': [
                'Stop all physical activity immediately',
                'Sit down and rest',
                'Take deep, slow breaths',
                'Seek immediate medical attention'
            ],
            'headache': [
                'Rest in a quiet, dark room',
                'Apply cold compress to forehead',
                'Stay hydrated',
                'Avoid bright lights and loud sounds'
            ],
            'stomach pain': [
                'Avoid solid foods temporarily',
                'Stay hydrated with clear fluids',
                'Use heating pad on low setting',
                'Avoid dairy and spicy foods'
            ],
            'fever': [
                'Rest and stay hydrated',
                'Use cool compresses',
                'Wear light clothing',
                'Monitor temperature regularly'
            ],
            'back pain': [
                'Apply ice for first 24-48 hours',
                'Gentle stretching and movement',
                'Maintain good posture',
                'Avoid bed rest for extended periods'
            ]
        }
        
        recommendations = base_recommendations.get(symptom, [
            'Rest and monitor symptoms',
            'Stay hydrated',
            'Avoid strenuous activities'
        ])
        
        # Add severity-specific recommendations
        if severity == 'severe' or red_flags:
            recommendations.insert(0, 'Seek immediate medical attention')
        elif severity == 'moderate':
            recommendations.append('Consult a doctor if symptoms persist or worsen')
        
        return recommendations

    def determine_urgency(self, severity, red_flags):
        if severity == 'critical' or red_flags:
            return 'immediate'
        elif severity == 'severe':
            return 'urgent'
        elif severity == 'moderate':
            return 'routine'
        else:
            return 'routine'

    def calculate_confidence(self, symptom, severity, red_flags):
        base_confidence = 75
        
        # Adjust based on symptom specificity
        if symptom in ['chest pain', 'fever']:
            base_confidence += 10
        
        # Adjust based on red flags
        if red_flags:
            base_confidence += 15
        
        # Adjust based on severity clarity
        if severity in ['mild', 'severe']:
            base_confidence += 5
        
        return min(base_confidence, 95)

    def is_emergency(self, symptoms):
        return any(emergency in symptoms for emergency in self.emergency_keywords)

    def create_emergency_response(self):
        return {
            'condition': 'Medical Emergency',
            'severity': 'critical',
            'urgency': 'immediate',
            'confidence': 95,
            'medicines': [],
            'recommendations': [
                'Call 102 (Ambulance) or 108 (Emergency) immediately',
                'Go to nearest emergency room',
                'Do not drive yourself',
                'Stay calm and follow emergency operator instructions'
            ],
            'red_flags': ['Emergency situation detected'],
            'emergency': True
        }

    def create_default_response(self):
        return {
            'condition': 'General Health Concern',
            'severity': 'mild',
            'urgency': 'routine',
            'confidence': 50,
            'medicines': ['Paracetamol'],
            'recommendations': [
                'Monitor symptoms closely',
                'Rest and stay hydrated',
                'Consult a healthcare provider if symptoms persist',
                'Maintain a healthy lifestyle'
            ],
            'red_flags': [],
            'emergency': False
        }

    def adjust_for_age(self, analysis, age):
        # Adjust recommendations based on age
        if age < 18:
            analysis['recommendations'].append('Consult pediatrician for proper dosage')
        elif age > 65:
            analysis['recommendations'].append('Consider age-related factors and existing conditions')
        
        return analysis

    def adjust_for_duration(self, analysis, duration):
        if duration == 'chronic':
            analysis['recommendations'].append('Consider underlying chronic condition')
            analysis['urgency'] = 'routine' if analysis['urgency'] == 'immediate' else analysis['urgency']
        elif duration == 'acute':
            if analysis['severity'] in ['severe', 'critical']:
                analysis['urgency'] = 'immediate'
        
        return analysis

# Initialize analyzer
analyzer = AdvancedMedicalAnalyzer()

# AI Chat Service
class MedicalChatBot:
    def __init__(self):
        self.system_prompt = """You are Dr. AI, a knowledgeable and empathetic medical assistant. You provide helpful medical information while being careful to:

1. Always recommend consulting with healthcare professionals for serious concerns
2. Provide accurate, evidence-based medical information
3. Be empathetic and understanding
4. Ask clarifying questions when needed
5. Explain medical terms in simple language
6. Consider Indian healthcare context and common conditions
7. Mention emergency numbers (102, 108) when appropriate

Remember: You are providing information, not diagnosing or replacing professional medical care."""

    def get_chat_response(self, user_message, chat_history=None):
        try:
            messages = [{"role": "system", "content": self.system_prompt}]
            
            # Add chat history if available
            if chat_history:
                for msg in chat_history[-10:]:  # Last 10 messages for context
                    messages.append({"role": "user", "content": msg['message']})
                    messages.append({"role": "assistant", "content": msg['response']})
            
            # Add current message
            messages.append({"role": "user", "content": user_message})
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"OpenAI API error: {e}")
            return self.get_fallback_response(user_message)

    def get_fallback_response(self, user_message):
        # Fallback responses when OpenAI API is not available
        message_lower = user_message.lower()
        
        if any(word in message_lower for word in ['fever', 'temperature', 'hot']):
            return """For fever management:
- Take paracetamol (500mg for adults) every 6-8 hours
- Stay hydrated with plenty of fluids
- Rest in a cool environment
- Use cold compresses on forehead
- Seek medical attention if fever exceeds 103°F or persists for more than 3 days
- Call 102 or 108 if you experience difficulty breathing or severe symptoms"""

        elif any(word in message_lower for word in ['headache', 'head pain', 'migraine']):
            return """For headache relief:
- Rest in a quiet, dark room
- Apply cold compress to forehead or neck
- Stay hydrated
- Take paracetamol or ibuprofen as directed
- Avoid bright lights and loud sounds
- Consider stress management techniques
- Consult a doctor if headaches are severe, frequent, or accompanied by fever, vision changes, or neck stiffness"""

        elif any(word in message_lower for word in ['chest pain', 'heart pain']):
            return """⚠️ CHEST PAIN REQUIRES IMMEDIATE ATTENTION ⚠️

If you're experiencing chest pain:
- Stop all activity and sit down immediately
- Call 102 or 108 for emergency services
- Take aspirin (if not allergic) while waiting for help
- Do not drive yourself to hospital
- Stay calm and breathe slowly

Chest pain can indicate serious conditions including heart attack. Please seek immediate medical care."""

        elif any(word in message_lower for word in ['cough', 'cold', 'throat']):
            return """For cough and cold:
- Stay hydrated with warm fluids like tea, soup, or warm water
- Use honey to soothe throat (1-2 teaspoons)
- Gargle with warm salt water
- Rest and get adequate sleep
- Use a humidifier or breathe steam from hot shower
- Avoid smoking and irritants
- Consider cough syrup if cough is persistent
- Consult doctor if symptoms worsen or persist beyond 7-10 days"""

        else:
            return """I understand you have health concerns. While I can provide general health information, it's important to consult with a qualified healthcare professional for proper diagnosis and treatment.

For immediate medical emergencies, please call:
- 102 (Ambulance)
- 108 (Emergency Services)

For routine care, consider visiting your local doctor or clinic. Is there a specific symptom or health topic you'd like information about?"""

# Initialize chatbot
chatbot = MedicalChatBot()

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return render_template('login.html')
    return render_template('dashboard.html')

@app.route('/symptoms')
def symptoms():
    return render_template('symptoms.html')

@app.route('/medicines')
def medicines():
    medicines = Medicine.query.all()
    return render_template('medicines.html', medicines=medicines)

@app.route('/doctors')
def doctors():
    doctors = Doctor.query.all()
    return render_template('doctors.html', doctors=doctors)

@app.route('/chat')
def chat():
    return render_template('chat.html')

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'User already exists'}), 400
    
    # Create new user
    user = User(
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        first_name=data['first_name'],
        last_name=data['last_name'],
        age=data.get('age'),
        phone=data.get('phone')
    )
    
    db.session.add(user)
    db.session.commit()
    
    session['user_id'] = user.id
    return jsonify({'message': 'User registered successfully', 'user_id': user.id})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful', 'user_id': user.id})
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/analyze-symptoms', methods=['POST'])
def analyze_symptoms():
    data = request.get_json()
    symptoms = data.get('symptoms', '')
    patient_age = data.get('age')
    patient_gender = data.get('gender')
    
    if not symptoms:
        return jsonify({'error': 'Symptoms are required'}), 400
    
    # Use enhanced analyzer
    analysis = analyzer.analyze_symptoms(symptoms, patient_age, patient_gender)
    
    # Save consultation if user is logged in
    if 'user_id' in session:
        consultation = Consultation(
            user_id=session['user_id'],
            symptoms=symptoms,
            diagnosis=analysis['condition'],
            recommendations=json.dumps(analysis['recommendations']),
            severity_score=analysis['confidence']
        )
        db.session.add(consultation)
        db.session.commit()
    
    return jsonify(analysis)

@app.route('/api/chat', methods=['POST'])
def chat_with_ai():
    data = request.get_json()
    message = data.get('message', '')
    session_id = data.get('session_id', 'default')
    
    if not message:
        return jsonify({'error': 'Message is required'}), 400
    
    # Get chat history for context
    chat_history = ChatMessage.query.filter_by(session_id=session_id).order_by(ChatMessage.created_at.desc()).limit(10).all()
    history_list = [{'message': msg.message, 'response': msg.response} for msg in reversed(chat_history)]
    
    # Get AI response
    response = chatbot.get_chat_response(message, history_list)
    
    # Save chat message
    chat_msg = ChatMessage(
        user_id=session.get('user_id'),
        session_id=session_id,
        message=message,
        response=response
    )
    db.session.add(chat_msg)
    db.session.commit()
    
    return jsonify({
        'response': response,
        'session_id': session_id,
        'timestamp': datetime.utcnow().isoformat()
    })

@app.route('/api/search-medicines', methods=['GET'])
def search_medicines():
    query = request.args.get('q', '')
    condition = request.args.get('condition', '')
    
    medicines_query = Medicine.query
    
    if query:
        medicines_query = medicines_query.filter(
            db.or_(
                Medicine.name.contains(query),
                Medicine.generic_name.contains(query),
                Medicine.brand.contains(query)
            )
        )
    
    if condition:
        # Enhanced condition-based filtering
        condition_medicines = {
            'fever': ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Acetaminophen'],
            'headache': ['Paracetamol', 'Aspirin', 'Ibuprofen', 'Sumatriptan'],
            'cough': ['Dextromethorphan', 'Guaifenesin', 'Salbutamol', 'Honey'],
            'stomach pain': ['Omeprazole', 'Ranitidine', 'Antacid', 'Simethicone'],
            'chest pain': ['Aspirin', 'Nitroglycerin'],
            'back pain': ['Ibuprofen', 'Diclofenac', 'Paracetamol'],
            'diabetes': ['Metformin', 'Glimepiride', 'Insulin', 'Glipizide'],
            'hypertension': ['Amlodipine', 'Enalapril', 'Atenolol', 'Losartan'],
            'cold': ['Cetirizine', 'Phenylephrine', 'Paracetamol'],
            'allergy': ['Cetirizine', 'Loratadine', 'Diphenhydramine']
        }
        
        medicine_names = condition_medicines.get(condition.lower(), [])
        if medicine_names:
            medicines_query = medicines_query.filter(Medicine.name.in_(medicine_names))
    
    medicines = medicines_query.limit(20).all()
    
    return jsonify([{
        'id': m.id,
        'name': m.name,
        'generic_name': m.generic_name,
        'brand': m.brand,
        'strength': m.strength,
        'form': m.form,
        'price': m.price,
        'manufacturer': m.manufacturer,
        'description': m.description,
        'category': m.category,
        'prescription_required': m.prescription_required
    } for m in medicines])

@app.route('/api/search-doctors', methods=['GET'])
def search_doctors():
    specialty = request.args.get('specialty', '')
    city = request.args.get('city', '')
    
    doctors_query = Doctor.query
    
    if specialty:
        doctors_query = doctors_query.filter(Doctor.specialty.contains(specialty))
    
    if city:
        doctors_query = doctors_query.filter(Doctor.city.contains(city))
    
    doctors = doctors_query.order_by(Doctor.rating.desc()).limit(20).all()
    
    return jsonify([{
        'id': d.id,
        'name': f"{d.first_name} {d.last_name}",
        'specialty': d.specialty,
        'years_experience': d.years_experience,
        'rating': d.rating,
        'phone': d.phone,
        'email': d.email,
        'clinic_address': d.clinic_address,
        'city': d.city,
        'state': d.state
    } for d in doctors])

@app.route('/api/barcode-scan', methods=['POST'])
def barcode_scan():
    data = request.get_json()
    barcode = data.get('barcode', '')
    
    if not barcode:
        return jsonify({'error': 'Barcode is required'}), 400
    
    medicine = Medicine.query.filter_by(barcode=barcode).first()
    
    if medicine:
        return jsonify({
            'found': True,
            'medicine': {
                'id': medicine.id,
                'name': medicine.name,
                'generic_name': medicine.generic_name,
                'brand': medicine.brand,
                'strength': medicine.strength,
                'form': medicine.form,
                'price': medicine.price,
                'manufacturer': medicine.manufacturer,
                'description': medicine.description,
                'prescription_required': medicine.prescription_required
            }
        })
    
    return jsonify({'found': False, 'message': 'Medicine not found'})

@app.route('/api/user-history')
def user_history():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    consultations = Consultation.query.filter_by(user_id=session['user_id']).order_by(Consultation.created_at.desc()).limit(10).all()
    
    return jsonify([{
        'id': c.id,
        'symptoms': c.symptoms,
        'diagnosis': c.diagnosis,
        'recommendations': json.loads(c.recommendations) if c.recommendations else [],
        'severity_score': c.severity_score,
        'created_at': c.created_at.isoformat()
    } for c in consultations])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
