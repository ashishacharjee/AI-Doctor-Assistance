-- Seed data for AI Doctor Platform
USE ai_doctor_db;

-- Insert sample doctors
INSERT INTO doctors (first_name, last_name, specialty, license_number, phone, email, years_experience, rating, consultation_fee, clinic_name, clinic_address, city, state, pincode, available_days, available_hours, languages_spoken) VALUES
('Rajesh', 'Kumar', 'General Medicine', 'MED001', '+91-9876543210', 'dr.rajesh@clinic.com', 15, 4.8, 500.00, 'Kumar Medical Center', '123 MG Road, Near City Hospital', 'Mumbai', 'Maharashtra', '400001', 'Mon-Sat', '9:00 AM - 6:00 PM', 'Hindi, English, Marathi'),
('Priya', 'Sharma', 'Cardiology', 'CARD001', '+91-9876543211', 'dr.priya@heartcare.com', 12, 4.9, 800.00, 'Heart Care Clinic', '456 Park Street, Medical Complex', 'Delhi', 'Delhi', '110001', 'Mon-Fri', '10:00 AM - 5:00 PM', 'Hindi, English'),
('Amit', 'Patel', 'Pediatrics', 'PED001', '+91-9876543212', 'dr.amit@childcare.com', 10, 4.7, 600.00, 'Child Care Center', '789 Children Avenue', 'Ahmedabad', 'Gujarat', '380001', 'Mon-Sat', '8:00 AM - 7:00 PM', 'Hindi, English, Gujarati'),
('Sunita', 'Singh', 'Dermatology', 'DERM001', '+91-9876543213', 'dr.sunita@skincare.com', 8, 4.6, 700.00, 'Skin & Hair Clinic', '321 Beauty Plaza', 'Bangalore', 'Karnataka', '560001', 'Tue-Sun', '11:00 AM - 8:00 PM', 'Hindi, English, Kannada'),
('Vikram', 'Gupta', 'Orthopedics', 'ORTHO001', '+91-9876543214', 'dr.vikram@bonecare.com', 18, 4.9, 900.00, 'Bone & Joint Center', '654 Sports Complex Road', 'Chennai', 'Tamil Nadu', '600001', 'Mon-Sat', '9:00 AM - 6:00 PM', 'Hindi, English, Tamil'),
('Meera', 'Joshi', 'Gynecology', 'GYNO001', '+91-9876543215', 'dr.meera@womenshealth.com', 14, 4.8, 750.00, 'Women\'s Health Clinic', '987 Ladies Corner', 'Pune', 'Maharashtra', '411001', 'Mon-Sat', '10:00 AM - 7:00 PM', 'Hindi, English, Marathi'),
('Arjun', 'Reddy', 'Neurology', 'NEURO001', '+91-9876543216', 'dr.arjun@neurocare.com', 16, 4.9, 1000.00, 'Brain & Spine Center', '147 Medical Tower', 'Hyderabad', 'Telangana', '500001', 'Mon-Fri', '9:00 AM - 5:00 PM', 'Hindi, English, Telugu'),
('Kavita', 'Nair', 'Ophthalmology', 'EYE001', '+91-9876543217', 'dr.kavita@eyecare.com', 11, 4.7, 650.00, 'Vision Care Center', '258 Eye Street', 'Kochi', 'Kerala', '682001', 'Mon-Sat', '8:00 AM - 6:00 PM', 'Hindi, English, Malayalam'),
('Ravi', 'Agarwal', 'ENT', 'ENT001', '+91-9876543218', 'dr.ravi@entcare.com', 13, 4.6, 550.00, 'Ear Nose Throat Clinic', '369 Sound Avenue', 'Jaipur', 'Rajasthan', '302001', 'Mon-Sat', '9:00 AM - 7:00 PM', 'Hindi, English, Rajasthani'),
('Deepika', 'Malhotra', 'Psychiatry', 'PSY001', '+91-9876543219', 'dr.deepika@mindcare.com', 9, 4.8, 800.00, 'Mental Health Center', '741 Peace Road', 'Chandigarh', 'Punjab', '160001', 'Mon-Sun', '10:00 AM - 8:00 PM', 'Hindi, English, Punjabi');

-- Insert comprehensive medicines database
INSERT INTO medicines (name, generic_name, brand, strength, form, price, manufacturer, description, category, prescription_required, barcode, side_effects, contraindications, dosage_instructions, storage_instructions) VALUES
-- Pain Relief & Fever
('Paracetamol', 'Acetaminophen', 'Crocin', '500mg', 'tablet', 25.00, 'GSK', 'Pain reliever and fever reducer', 'Analgesic', FALSE, '8901030001', 'Nausea, skin rash (rare)', 'Liver disease, alcohol dependency', '1-2 tablets every 4-6 hours, max 8 tablets/day', 'Store below 30°C, keep dry'),
('Ibuprofen', 'Ibuprofen', 'Brufen', '400mg', 'tablet', 45.00, 'Abbott', 'Anti-inflammatory pain reliever', 'NSAID', FALSE, '8901030002', 'Stomach upset, dizziness, headache', 'Peptic ulcer, severe heart failure', '1 tablet 2-3 times daily with food', 'Store below 25°C, protect from light'),
('Aspirin', 'Acetylsalicylic Acid', 'Disprin', '325mg', 'tablet', 20.00, 'Reckitt Benckiser', 'Pain relief and blood thinner', 'Analgesic', FALSE, '8901030003', 'Stomach irritation, bleeding risk', 'Children under 16, bleeding disorders', '1-2 tablets every 4 hours with water', 'Store in cool, dry place'),
('Diclofenac', 'Diclofenac Sodium', 'Voveran', '50mg', 'tablet', 35.00, 'Novartis', 'Strong anti-inflammatory', 'NSAID', TRUE, '8901030004', 'GI upset, dizziness, skin reactions', 'Severe heart, liver, kidney disease', '1 tablet 2-3 times daily after meals', 'Store below 30°C'),

-- Antibiotics
('Amoxicillin', 'Amoxicillin', 'Novamox', '500mg', 'capsule', 120.00, 'Cipla', 'Broad-spectrum antibiotic', 'Antibiotic', TRUE, '8901030005', 'Diarrhea, nausea, skin rash', 'Penicillin allergy', 'Complete full course as prescribed', 'Store below 25°C, keep dry'),
('Azithromycin', 'Azithromycin', 'Azee', '500mg', 'tablet', 180.00, 'Dr. Reddy\'s', 'Macrolide antibiotic', 'Antibiotic', TRUE, '8901030006', 'Nausea, diarrhea, abdominal pain', 'Liver disease, heart rhythm disorders', '1 tablet daily for 3-5 days', 'Store below 30°C, protect from moisture'),
('Ciprofloxacin', 'Ciprofloxacin', 'Ciplox', '500mg', 'tablet', 95.00, 'Cipla', 'Fluoroquinolone antibiotic', 'Antibiotic', TRUE, '8901030007', 'Nausea, diarrhea, dizziness', 'Pregnancy, children under 18', '1 tablet twice daily with plenty of water', 'Store below 25°C'),

-- Cough & Cold
('Dextromethorphan', 'Dextromethorphan HBr', 'Benadryl DR', '15mg/5ml', 'syrup', 85.00, 'Johnson & Johnson', 'Cough suppressant', 'Antitussive', FALSE, '8901030008', 'Drowsiness, dizziness, nausea', 'MAO inhibitor use, severe liver disease', '10ml every 4-6 hours, max 60ml/day', 'Store below 25°C, do not freeze'),
('Guaifenesin', 'Guaifenesin', 'Grilinctus', '100mg/5ml', 'syrup', 75.00, 'Pfizer', 'Expectorant for productive cough', 'Expectorant', FALSE, '8901030009', 'Nausea, vomiting, drowsiness', 'None known', '10ml every 4 hours with water', 'Store at room temperature'),
('Cetirizine', 'Cetirizine HCl', 'Zyrtec', '10mg', 'tablet', 55.00, 'UCB', 'Antihistamine for allergies', 'Antihistamine', FALSE, '8901030010', 'Drowsiness, dry mouth, fatigue', 'Severe kidney disease', '1 tablet once daily, preferably evening', 'Store below 30°C, keep dry'),
('Phenylephrine', 'Phenylephrine HCl', 'Nasivion', '0.1%', 'drops', 65.00, 'Merck', 'Nasal decongestant', 'Decongestant', FALSE, '8901030011', 'Nasal irritation, rebound congestion', 'High blood pressure, heart disease', '2-3 drops in each nostril, max 3 days', 'Store below 25°C'),

-- Gastrointestinal
('Omeprazole', 'Omeprazole', 'Prilosec', '20mg', 'capsule', 145.00, 'AstraZeneca', 'Proton pump inhibitor for acidity', 'PPI', FALSE, '8901030012', 'Headache, nausea, diarrhea', 'Severe liver disease', '1 capsule daily before breakfast', 'Store below 25°C, protect from moisture'),
('Ranitidine', 'Ranitidine HCl', 'Aciloc', '150mg', 'tablet', 35.00, 'Cadila', 'H2 receptor blocker for acidity', 'H2 Blocker', FALSE, '8901030013', 'Headache, dizziness, constipation', 'Kidney disease, porphyria', '1 tablet twice daily with or without food', 'Store below 30°C'),
('Domperidone', 'Domperidone', 'Domstal', '10mg', 'tablet', 45.00, 'Torrent', 'Anti-nausea and prokinetic agent', 'Antiemetic', FALSE, '8901030014', 'Dry mouth, headache, diarrhea', 'Heart rhythm disorders, liver disease', '1 tablet 3 times daily before meals', 'Store below 25°C'),
('Loperamide', 'Loperamide HCl', 'Imodium', '2mg', 'capsule', 85.00, 'Johnson & Johnson', 'Anti-diarrheal medication', 'Antidiarrheal', FALSE, '8901030015', 'Constipation, dizziness, nausea', 'Bacterial diarrhea, ulcerative colitis', '2 capsules initially, then 1 after each loose stool', 'Store below 25°C'),

-- Diabetes Management
('Metformin', 'Metformin HCl', 'Glycomet', '500mg', 'tablet', 25.00, 'USV', 'First-line diabetes medication', 'Antidiabetic', TRUE, '8901030016', 'Nausea, diarrhea, metallic taste', 'Kidney disease, heart failure', '1 tablet twice daily with meals', 'Store below 30°C, keep dry'),
('Glimepiride', 'Glimepiride', 'Amaryl', '2mg', 'tablet', 95.00, 'Sanofi', 'Sulfonylurea for diabetes', 'Antidiabetic', TRUE, '8901030017', 'Hypoglycemia, weight gain, nausea', 'Type 1 diabetes, severe liver/kidney disease', '1 tablet daily with breakfast', 'Store below 25°C, protect from light'),
('Insulin', 'Human Insulin', 'Humulin', '100IU/ml', 'injection', 450.00, 'Eli Lilly', 'Injectable insulin for diabetes', 'Hormone', TRUE, '8901030018', 'Hypoglycemia, injection site reactions', 'Hypoglycemia episodes', 'As prescribed by doctor, rotate injection sites', 'Refrigerate, do not freeze'),

-- Hypertension
('Amlodipine', 'Amlodipine Besylate', 'Norvasc', '5mg', 'tablet', 65.00, 'Pfizer', 'Calcium channel blocker for BP', 'Antihypertensive', TRUE, '8901030019', 'Ankle swelling, dizziness, flushing', 'Severe aortic stenosis, cardiogenic shock', '1 tablet once daily, same time each day', 'Store below 25°C'),
('Enalapril', 'Enalapril Maleate', 'Enam', '5mg', 'tablet', 45.00, 'Dr. Reddy\'s', 'ACE inhibitor for BP and heart', 'ACE Inhibitor', TRUE, '8901030020', 'Dry cough, dizziness, hyperkalemia', 'Pregnancy, bilateral renal artery stenosis', '1 tablet twice daily, monitor BP regularly', 'Store below 30°C'),
('Atenolol', 'Atenolol', 'Tenormin', '50mg', 'tablet', 35.00, 'AstraZeneca', 'Beta-blocker for BP and heart', 'Beta Blocker', TRUE, '8901030021', 'Fatigue, cold hands/feet, bradycardia', 'Asthma, severe heart block', '1 tablet once daily, do not stop suddenly', 'Store below 25°C'),

-- Respiratory
('Salbutamol', 'Salbutamol Sulfate', 'Asthalin', '100mcg/dose', 'inhaler', 125.00, 'Cipla', 'Bronchodilator for asthma/COPD', 'Bronchodilator', FALSE, '8901030022', 'Tremor, palpitations, headache', 'Hypersensitivity to salbutamol', '1-2 puffs as needed, max 8 puffs/day', 'Store below 30°C, do not puncture'),
('Montelukast', 'Montelukast Sodium', 'Montair', '10mg', 'tablet', 185.00, 'Cipla', 'Leukotriene receptor antagonist', 'Anti-asthmatic', TRUE, '8901030023', 'Headache, dizziness, abdominal pain', 'Phenylketonuria (chewable tablets)', '1 tablet once daily in evening', 'Store below 25°C, keep dry'),

-- Vitamins & Supplements
('Vitamin D3', 'Cholecalciferol', 'Calcirol', '60000 IU', 'capsule', 45.00, 'Cadila', 'Vitamin D supplement', 'Vitamin', FALSE, '8901030024', 'Nausea, vomiting, weakness (overdose)', 'Hypercalcemia, kidney stones', '1 capsule weekly or as prescribed', 'Store below 25°C, protect from light'),
('Vitamin B12', 'Methylcobalamin', 'Methylcobal', '1500mcg', 'tablet', 125.00, 'Sun Pharma', 'Vitamin B12 supplement', 'Vitamin', FALSE, '8901030025', 'Mild diarrhea, anxiety (rare)', 'Cobalt hypersensitivity', '1 tablet daily or as prescribed', 'Store below 30°C'),
('Iron', 'Ferrous Sulfate', 'Fefol', '200mg', 'tablet', 85.00, 'GSK', 'Iron supplement for anemia', 'Mineral', FALSE, '8901030026', 'Constipation, nausea, dark stools', 'Hemochromatosis, hemosiderosis', '1 tablet daily with vitamin C, empty stomach', 'Store below 25°C, keep away from children'),
('Calcium', 'Calcium Carbonate', 'Shelcal', '500mg', 'tablet', 95.00, 'Torrent', 'Calcium supplement', 'Mineral', FALSE, '8901030027', 'Constipation, gas, bloating', 'Hypercalcemia, kidney stones', '1-2 tablets daily with meals', 'Store below 30°C'),

-- Topical Applications
('Betamethasone', 'Betamethasone Valerate', 'Betnovate', '0.1%', 'cream', 65.00, 'GSK', 'Topical corticosteroid', 'Corticosteroid', TRUE, '8901030028', 'Skin thinning, burning, itching', 'Viral skin infections, rosacea', 'Apply thin layer 1-2 times daily', 'Store below 25°C, do not freeze'),
('Clotrimazole', 'Clotrimazole', 'Candid', '1%', 'cream', 45.00, 'Glenmark', 'Antifungal cream', 'Antifungal', FALSE, '8901030029', 'Local irritation, burning sensation', 'Hypersensitivity to clotrimazole', 'Apply 2-3 times daily for 2-4 weeks', 'Store below 30°C'),
('Mupirocin', 'Mupirocin', 'Bactroban', '2%', 'cream', 185.00, 'GSK', 'Topical antibiotic', 'Antibiotic', TRUE, '8901030030', 'Local burning, stinging, itching', 'Hypersensitivity to mupirocin', 'Apply 3 times daily for 5-10 days', 'Store below 25°C');

-- Insert symptoms data
INSERT INTO symptoms (name, description, category, severity_level, body_system, common_causes, red_flags) VALUES
('Fever', 'Elevated body temperature above normal range', 'Systemic', 'moderate', 'Immune System', 'Viral infections, bacterial infections, inflammatory conditions', 'Temperature >104°F, persistent fever >3 days, difficulty breathing'),
('Headache', 'Pain in the head or upper neck region', 'Neurological', 'mild', 'Nervous System', 'Tension, stress, dehydration, sinusitis, migraine', 'Sudden severe headache, fever with headache, vision changes, confusion'),
('Cough', 'Forceful expulsion of air from lungs', 'Respiratory', 'mild', 'Respiratory System', 'Common cold, bronchitis, pneumonia, asthma, allergies', 'Blood in cough, difficulty breathing, chest pain, persistent cough >3 weeks'),
('Chest Pain', 'Discomfort or pain in chest area', 'Cardiovascular', 'severe', 'Cardiovascular System', 'Heart attack, angina, muscle strain, acid reflux, anxiety', 'Crushing pain, radiating to arm/jaw, shortness of breath, sweating'),
('Stomach Pain', 'Abdominal discomfort or cramping', 'Gastrointestinal', 'moderate', 'Digestive System', 'Gastritis, food poisoning, appendicitis, ulcers, IBS', 'Severe pain, vomiting blood, black stools, fever with pain'),
('Back Pain', 'Pain in the back region', 'Musculoskeletal', 'moderate', 'Musculoskeletal System', 'Muscle strain, herniated disc, arthritis, poor posture', 'Numbness in legs, loss of bladder control, severe pain, fever'),
('Dizziness', 'Feeling of lightheadedness or unsteadiness', 'Neurological', 'mild', 'Nervous System', 'Dehydration, low blood pressure, inner ear problems, medications', 'Fainting, severe headache, chest pain, difficulty speaking'),
('Nausea', 'Feeling of sickness with urge to vomit', 'Gastrointestinal', 'mild', 'Digestive System', 'Food poisoning, motion sickness, pregnancy, medications', 'Severe dehydration, blood in vomit, severe abdominal pain'),
('Fatigue', 'Extreme tiredness or lack of energy', 'Systemic', 'mild', 'Multiple Systems', 'Lack of sleep, stress, anemia, thyroid disorders, depression', 'Sudden onset, chest pain, difficulty breathing, confusion'),
('Sore Throat', 'Pain or irritation in the throat', 'Respiratory', 'mild', 'Respiratory System', 'Viral infections, bacterial infections, allergies, dry air', 'Difficulty swallowing, high fever, swollen lymph nodes, rash');

-- Insert conditions data
INSERT INTO conditions (name, description, category, severity, icd_code, common_symptoms, risk_factors, complications, prevention) VALUES
('Common Cold', 'Viral upper respiratory tract infection', 'Respiratory', 'mild', 'J00', 'Runny nose, cough, sore throat, sneezing', 'Close contact with infected persons, weakened immunity', 'Secondary bacterial infections, sinusitis', 'Hand hygiene, avoid close contact with sick people'),
('Hypertension', 'High blood pressure condition', 'Cardiovascular', 'moderate', 'I10', 'Often asymptomatic, headache, dizziness', 'Age, family history, obesity, high sodium intake', 'Heart attack, stroke, kidney disease', 'Healthy diet, regular exercise, limit sodium'),
('Type 2 Diabetes', 'Metabolic disorder with high blood sugar', 'Endocrine', 'moderate', 'E11', 'Increased thirst, frequent urination, fatigue', 'Obesity, family history, sedentary lifestyle, age', 'Heart disease, kidney damage, nerve damage', 'Healthy weight, regular exercise, balanced diet'),
('Gastritis', 'Inflammation of stomach lining', 'Gastrointestinal', 'mild', 'K29', 'Stomach pain, nausea, bloating, heartburn', 'H. pylori infection, NSAIDs, alcohol, stress', 'Peptic ulcers, bleeding, increased cancer risk', 'Avoid irritants, manage stress, treat H. pylori'),
('Migraine', 'Severe recurring headache disorder', 'Neurological', 'moderate', 'G43', 'Severe headache, nausea, light sensitivity', 'Family history, hormonal changes, stress, certain foods', 'Chronic daily headache, medication overuse', 'Identify triggers, stress management, regular sleep'),
('Asthma', 'Chronic respiratory condition with airway inflammation', 'Respiratory', 'moderate', 'J45', 'Wheezing, shortness of breath, chest tightness, cough', 'Allergies, family history, environmental factors', 'Severe asthma attacks, respiratory failure', 'Avoid triggers, proper medication use, regular monitoring'),
('Depression', 'Mental health disorder with persistent sadness', 'Mental Health', 'moderate', 'F32', 'Persistent sadness, loss of interest, fatigue, sleep changes', 'Family history, trauma, chronic illness, substance abuse', 'Suicide, social isolation, physical health problems', 'Social support, stress management, professional help'),
('Osteoarthritis', 'Degenerative joint disease', 'Musculoskeletal', 'moderate', 'M15', 'Joint pain, stiffness, reduced range of motion', 'Age, obesity, joint injury, genetics', 'Severe disability, chronic pain, joint deformity', 'Maintain healthy weight, regular exercise, joint protection'),
('Urinary Tract Infection', 'Bacterial infection of urinary system', 'Genitourinary', 'mild', 'N39.0', 'Burning urination, frequent urination, pelvic pain', 'Female gender, sexual activity, certain contraceptives', 'Kidney infection, sepsis, recurrent infections', 'Proper hygiene, adequate hydration, complete antibiotic courses'),
('Anxiety Disorder', 'Mental health condition with excessive worry', 'Mental Health', 'mild', 'F41', 'Excessive worry, restlessness, fatigue, difficulty concentrating', 'Family history, trauma, chronic stress, substance use', 'Depression, substance abuse, social isolation', 'Stress management, regular exercise, professional counseling');

-- Insert pharmacies data
INSERT INTO pharmacies (name, license_number, phone, email, address, city, state, pincode, latitude, longitude, operating_hours, services, rating, is_24_hours, home_delivery, online_payment) VALUES
('Apollo Pharmacy', 'PHARM001', '+91-9876543220', 'info@apollopharmacy.com', 'Shop 1, Ground Floor, Apollo Hospital Complex', 'Mumbai', 'Maharashtra', '400001', 19.0760, 72.8777, '8:00 AM - 10:00 PM', '["prescription_filling", "health_checkup", "vaccination", "consultation"]', 4.5, FALSE, TRUE, TRUE),
('MedPlus', 'PHARM002', '+91-9876543221', 'support@medplus.com', '45 Commercial Street, Near Metro Station', 'Delhi', 'Delhi', '110001', 28.6139, 77.2090, '24 Hours', '["prescription_filling", "home_delivery", "online_consultation"]', 4.3, TRUE, TRUE, TRUE),
('Wellness Forever', 'PHARM003', '+91-9876543222', 'care@wellnessforever.com', '78 Health Plaza, Medical District', 'Bangalore', 'Karnataka', '560001', 12.9716, 77.5946, '7:00 AM - 11:00 PM', '["prescription_filling", "health_products", "consultation"]', 4.4, FALSE, TRUE, TRUE),
('Guardian Pharmacy', 'PHARM004', '+91-9876543223', 'help@guardianpharmacy.com', '123 Care Street, Hospital Road', 'Chennai', 'Tamil Nadu', '600001', 13.0827, 80.2707, '8:00 AM - 9:00 PM', '["prescription_filling", "medical_equipment", "health_checkup"]', 4.2, FALSE, FALSE, TRUE),
('Netmeds', 'PHARM005', '+91-9876543224', 'support@netmeds.com', 'Online Pharmacy - Multiple Locations', 'Pune', 'Maharashtra', '411001', 18.5204, 73.8567, '24 Hours Online', '["online_ordering", "home_delivery", "consultation", "subscription"]', 4.6, TRUE, TRUE, TRUE);

-- Insert medicine interactions
INSERT INTO medicine_interactions (medicine1_id, medicine2_id, interaction_type, description, severity_score, clinical_significance, management_advice) VALUES
(2, 4, 'moderate', 'Both NSAIDs increase risk of GI bleeding and cardiovascular events', 6, 'Increased risk of serious side effects', 'Avoid concurrent use, consider alternative pain management'),
(3, 19, 'major', 'Aspirin with ACE inhibitors may reduce antihypertensive effect', 8, 'May compromise blood pressure control', 'Monitor BP closely, consider low-dose aspirin if needed'),
(12, 5, 'minor', 'Omeprazole may reduce absorption of amoxicillin', 3, 'Slightly reduced antibiotic effectiveness', 'Take amoxicillin 2 hours before omeprazole'),
(16, 17, 'moderate', 'Metformin with glimepiride increases hypoglycemia risk', 5, 'Enhanced blood sugar lowering effect', 'Monitor blood glucose closely, adjust doses as needed'),
(20, 21, 'moderate', 'ACE inhibitors with beta-blockers may cause excessive BP reduction', 6, 'Risk of hypotension and bradycardia', 'Start with low doses, monitor vital signs'),
(1, 3, 'minor', 'Paracetamol with aspirin - no significant interaction', 2, 'Safe combination for pain relief', 'Can be used together, monitor for side effects'),
(10, 22, 'moderate', 'Antihistamines with bronchodilators may cause increased heart rate', 5, 'Potential cardiovascular effects', 'Monitor heart rate and blood pressure'),
(13, 14, 'minor', 'H2 blockers with prokinetic agents - complementary effects', 2, 'May enhance gastric protection', 'Generally safe combination'),
(6, 7, 'major', 'Azithromycin with ciprofloxacin may increase QT prolongation risk', 9, 'Risk of serious heart rhythm abnormalities', 'Avoid combination, use alternative antibiotics'),
(11, 15, 'minor', 'Nasal decongestants with antidiarrheals - no significant interaction', 1, 'No clinically relevant interaction', 'Safe to use together');

-- Insert sample users (for testing)
INSERT INTO users (email, password_hash, first_name, last_name, age, gender, phone, city, state, blood_group) VALUES
('john.doe@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VJWZFsMlO', 'John', 'Doe', 35, 'male', '+91-9876543230', 'Mumbai', 'Maharashtra', 'O+'),
('jane.smith@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VJWZFsMlO', 'Jane', 'Smith', 28, 'female', '+91-9876543231', 'Delhi', 'Delhi', 'A+'),
('raj.patel@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VJWZFsMlO', 'Raj', 'Patel', 42, 'male', '+91-9876543232', 'Ahmedabad', 'Gujarat', 'B+');

-- Insert sample consultations
INSERT INTO consultations (user_id, symptoms, diagnosis, recommendations, severity_score, confidence_score, consultation_type) VALUES
(1, 'I have fever and headache for 2 days', 'Viral Fever', '["Rest and stay hydrated", "Take paracetamol for fever", "Consult doctor if fever persists"]', 65.0, 80.0, 'ai'),
(2, 'Chest pain and shortness of breath', 'Possible Cardiac Event', '["Seek immediate medical attention", "Call emergency services", "Take aspirin if not allergic"]', 95.0, 90.0, 'ai'),
(3, 'Stomach pain after eating spicy food', 'Gastritis', '["Avoid spicy foods", "Take antacid", "Eat bland foods", "Stay hydrated"]', 45.0, 75.0, 'ai');

-- Create indexes for better performance
CREATE INDEX idx_medicines_name_generic ON medicines(name, generic_name);
CREATE INDEX idx_doctors_specialty_city ON doctors(specialty, city);
CREATE INDEX idx_consultations_user_date ON consultations(user_id, created_at);
CREATE INDEX idx_symptoms_category_severity ON symptoms(category, severity_level);
CREATE INDEX idx_conditions_category ON conditions(category);
CREATE INDEX idx_pharmacies_city_services ON pharmacies(city, home_delivery);

-- Insert system configuration data
INSERT INTO system_logs (action, entity_type, details) VALUES
('SYSTEM_INIT', 'database', 'Database initialized with seed data'),
('DATA_SEED', 'medicines', 'Inserted 30 medicines into database'),
('DATA_SEED', 'doctors', 'Inserted 10 doctors into database'),
('DATA_SEED', 'symptoms', 'Inserted 10 symptoms into database'),
('DATA_SEED', 'conditions', 'Inserted 10 conditions into database'),
('DATA_SEED', 'pharmacies', 'Inserted 5 pharmacies into database');
