-- Seed data for AI Doctor Assistance platform

-- Insert sample symptoms
INSERT INTO symptoms (name, description, category, severity_level) VALUES
('Headache', 'Pain in the head or upper neck', 'neurological', 'mild'),
('Fever', 'Elevated body temperature above normal', 'general', 'moderate'),
('Cough', 'Sudden expulsion of air from the lungs', 'respiratory', 'mild'),
('Sore throat', 'Pain or irritation in the throat', 'respiratory', 'mild'),
('Runny nose', 'Excess nasal discharge', 'respiratory', 'mild'),
('Fatigue', 'Extreme tiredness or exhaustion', 'general', 'moderate'),
('Nausea', 'Feeling of sickness with urge to vomit', 'gastrointestinal', 'mild'),
('Chest pain', 'Pain in the chest area', 'cardiovascular', 'severe'),
('Shortness of breath', 'Difficulty breathing', 'respiratory', 'severe'),
('Dizziness', 'Feeling unsteady or lightheaded', 'neurological', 'moderate');

-- Insert sample conditions
INSERT INTO conditions (name, description, category, severity, icd_10_code) VALUES
('Common Cold', 'Viral infection of the upper respiratory tract', 'respiratory', 'mild', 'J00'),
('Influenza', 'Viral infection affecting the respiratory system', 'respiratory', 'moderate', 'J11'),
('Seasonal Allergies', 'Allergic reaction to environmental allergens', 'allergic', 'mild', 'J30'),
('Migraine', 'Severe recurring headache', 'neurological', 'moderate', 'G43'),
('Hypertension', 'High blood pressure', 'cardiovascular', 'moderate', 'I10'),
('Type 2 Diabetes', 'Metabolic disorder with high blood sugar', 'endocrine', 'moderate', 'E11'),
('Gastroenteritis', 'Inflammation of stomach and intestines', 'gastrointestinal', 'moderate', 'K59'),
('Anxiety Disorder', 'Mental health condition with excessive worry', 'mental health', 'moderate', 'F41'),
('Pneumonia', 'Infection that inflames air sacs in lungs', 'respiratory', 'severe', 'J18'),
('Heart Attack', 'Blockage of blood flow to heart muscle', 'cardiovascular', 'severe', 'I21');

-- Insert Indian medicines with INR pricing
INSERT INTO medicines (name, generic_name, category, dosage_form, strength, description, side_effects, precautions, interactions, dosage_instructions, max_daily_dose, availability, price_range) VALUES
('Crocin Advance', 'Paracetamol', 'Pain Reliever', 'Tablet', '500mg', 'Pain and fever reducer', ARRAY['nausea', 'stomach upset'], ARRAY['Do not exceed recommended dose', 'Avoid alcohol'], ARRAY['warfarin', 'alcohol'], '1-2 tablets every 4-6 hours', '3000mg', 'over-the-counter', '₹15-45'),
('Brufen', 'Ibuprofen', 'NSAID', 'Tablet', '400mg', 'Pain, inflammation, and fever reducer', ARRAY['stomach upset', 'heartburn', 'dizziness'], ARRAY['Take with food', 'Not for heart disease patients'], ARRAY['blood thinners', 'ACE inhibitors'], '1 tablet every 6-8 hours', '1200mg', 'over-the-counter', '₹25-80'),
('Zyrtec', 'Cetirizine', 'Antihistamine', 'Tablet', '10mg', 'Allergy relief and hay fever', ARRAY['drowsiness', 'dry mouth', 'fatigue'], ARRAY['May cause drowsiness', 'Not for children under 2'], ARRAY['alcohol', 'sedatives'], '1 tablet daily', '10mg', 'over-the-counter', '₹35-120'),
('Azee', 'Azithromycin', 'Antibiotic', 'Tablet', '500mg', 'Bacterial infections treatment', ARRAY['nausea', 'diarrhea', 'abdominal pain'], ARRAY['Complete full course', 'Take on empty stomach'], ARRAY['antacids', 'warfarin'], '1 tablet daily for 3 days', '500mg', 'prescription', '₹85-250'),
('Telma', 'Telmisartan', 'ARB', 'Tablet', '40mg', 'Blood pressure medication', ARRAY['dizziness', 'headache', 'fatigue'], ARRAY['Monitor blood pressure', 'Check kidney function'], ARRAY['potassium supplements', 'NSAIDs'], '1 tablet daily', '80mg', 'prescription', '₹120-350');

-- Insert Indian insurance providers
INSERT INTO insurance_providers (name, type) VALUES
('Star Health Insurance', 'private'),
('HDFC ERGO', 'private'),
('ICICI Lombard', 'private'),
('Max Bupa Health Insurance', 'private'),
('Bajaj Allianz', 'private'),
('Religare Health Insurance', 'private'),
('Government Health Schemes', 'government'),
('ESI (Employee State Insurance)', 'government');

-- Insert Indian doctors
INSERT INTO doctors (first_name, last_name, specialty, license_number, phone, email, years_experience, education, certifications, languages, rating, review_count) VALUES
('Rajesh', 'Kumar', 'Internal Medicine', 'MCI123456', '+91-44-2829-3333', 'rajesh.kumar@apollo.com', 15, 'MBBS from AIIMS Delhi, MD Internal Medicine', ARRAY['Board Certified Internal Medicine', 'ACLS Certified'], ARRAY['English', 'Hindi', 'Tamil'], 4.8, 156),
('Priya', 'Sharma', 'Cardiology', 'MCI234567', '+91-172-496-7000', 'priya.sharma@fortis.com', 20, 'MBBS from PGI Chandigarh, DM Cardiology', ARRAY['Board Certified Cardiology', 'Interventional Cardiology'], ARRAY['English', 'Hindi', 'Punjabi'], 4.9, 203),
('Amit', 'Patel', 'Family Medicine', 'MCI345678', '+91-80-7122-7122', 'amit.patel@narayana.com', 8, 'MBBS from Grant Medical College Mumbai', ARRAY['Board Certified Family Medicine', 'Pediatric Care'], ARRAY['English', 'Hindi', 'Gujarati', 'Kannada'], 4.7, 89),
('Sunita', 'Reddy', 'Dermatology', 'MCI456789', '+91-40-4488-5555', 'sunita.reddy@kims.com', 12, 'MBBS, MD Dermatology from Osmania Medical College', ARRAY['Board Certified Dermatology', 'Cosmetic Dermatology'], ARRAY['English', 'Hindi', 'Telugu'], 4.6, 134),
('Arjun', 'Singh', 'Pediatrics', 'MCI567890', '+91-11-2692-5858', 'arjun.singh@aiims.edu', 18, 'MBBS, MD Pediatrics from AIIMS Delhi', ARRAY['Board Certified Pediatrics', 'Neonatal Care'], ARRAY['English', 'Hindi'], 4.9, 278);

-- Insert Indian doctor locations
INSERT INTO doctor_locations (doctor_id, clinic_name, address, city, state, zip_code, phone, latitude, longitude) VALUES
(1, 'Apollo Hospital', '21, Greams Lane, Off Greams Road', 'Chennai', 'Tamil Nadu', '600006', '+91-44-2829-3333', 13.0827, 80.2707),
(2, 'Fortis Hospital', 'Sector 62, Phase VIII', 'Mohali', 'Punjab', '160062', '+91-172-496-7000', 30.7046, 76.7179),
(3, 'Narayana Health City', '258/A, Bommasandra Industrial Area', 'Bangalore', 'Karnataka', '560099', '+91-80-7122-7122', 12.8056, 77.6803),
(4, 'KIMS Hospital', '1-8-31/1, Minister Rd, Krishna Nagar Colony, Begumpet', 'Hyderabad', 'Telangana', '500003', '+91-40-4488-5555', 17.4399, 78.4983),
(5, 'AIIMS Delhi', 'Ansari Nagar', 'New Delhi', 'Delhi', '110029', '+91-11-2692-5858', 28.5672, 77.2100);

-- Insert doctor insurance relationships
INSERT INTO doctor_insurance (doctor_id, insurance_provider_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 7), -- Dr. Johnson accepts Blue Cross, Aetna, Cigna, Medicare
(2, 4), (2, 1), (2, 5), -- Dr. Chen accepts United Healthcare, Blue Cross, Humana
(3, 8), (3, 1), (3, 6), -- Dr. Rodriguez accepts Medicaid, Blue Cross, Kaiser
(4, 1), (4, 2), (4, 4), -- Dr. Kim accepts Blue Cross, Aetna, United Healthcare
(5, 1), (5, 3), (5, 7), (5, 8); -- Dr. Thompson accepts Blue Cross, Cigna, Medicare, Medicaid

-- Insert symptom-condition relationships
INSERT INTO symptom_conditions (symptom_id, condition_id, probability_weight) VALUES
-- Common Cold
(3, 1, 0.9), -- cough -> common cold
(4, 1, 0.8), -- sore throat -> common cold
(5, 1, 0.9), -- runny nose -> common cold
(6, 1, 0.7), -- fatigue -> common cold
-- Influenza
(2, 2, 0.9), -- fever -> influenza
(3, 2, 0.8), -- cough -> influenza
(6, 2, 0.9), -- fatigue -> influenza
(1, 2, 0.7), -- headache -> influenza
-- Seasonal Allergies
(5, 3, 0.9), -- runny nose -> allergies
(4, 3, 0.6), -- sore throat -> allergies
-- Migraine
(1, 4, 0.9), -- headache -> migraine
(7, 4, 0.6), -- nausea -> migraine
(10, 4, 0.5), -- dizziness -> migraine
-- Heart conditions
(8, 10, 0.9), -- chest pain -> heart attack
(9, 10, 0.8); -- shortness of breath -> heart attack

-- Insert condition-medicine relationships
INSERT INTO condition_medicines (condition_id, medicine_id, treatment_type) VALUES
(1, 1, 'symptomatic'), -- Common cold -> Acetaminophen
(1, 3, 'symptomatic'), -- Common cold -> Diphenhydramine
(2, 1, 'symptomatic'), -- Influenza -> Acetaminophen
(2, 2, 'symptomatic'), -- Influenza -> Ibuprofen
(3, 3, 'primary'), -- Seasonal allergies -> Diphenhydramine
(4, 1, 'symptomatic'), -- Migraine -> Acetaminophen
(4, 2, 'symptomatic'), -- Migraine -> Ibuprofen
(5, 4, 'primary'), -- Hypertension -> Lisinopril
(6, 5, 'primary'); -- Type 2 Diabetes -> Metformin
