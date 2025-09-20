-- AI Doctor Platform Database Schema
-- MySQL Database Schema for Healthcare Management System

-- Create database
CREATE DATABASE IF NOT EXISTS ai_doctor_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ai_doctor_db;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT,
    gender ENUM('male', 'female', 'other'),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    blood_group VARCHAR(5),
    emergency_contact VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_phone (phone)
);

-- Doctors table
CREATE TABLE doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) UNIQUE,
    phone VARCHAR(20),
    email VARCHAR(120),
    years_experience INT,
    rating DECIMAL(3,2) DEFAULT 0.00,
    consultation_fee DECIMAL(8,2),
    clinic_name VARCHAR(100),
    clinic_address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    available_days VARCHAR(50),
    available_hours VARCHAR(50),
    languages_spoken VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_specialty (specialty),
    INDEX idx_city (city),
    INDEX idx_rating (rating)
);

-- Symptoms table
CREATE TABLE symptoms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    severity_level ENUM('mild', 'moderate', 'severe', 'critical'),
    body_system VARCHAR(50),
    common_causes TEXT,
    red_flags TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_severity (severity_level)
);

-- Conditions table
CREATE TABLE conditions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    severity ENUM('mild', 'moderate', 'severe', 'critical'),
    icd_code VARCHAR(20),
    common_symptoms TEXT,
    risk_factors TEXT,
    complications TEXT,
    prevention TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_icd_code (icd_code)
);

-- Medicines table
CREATE TABLE medicines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    generic_name VARCHAR(100),
    brand VARCHAR(100),
    strength VARCHAR(50),
    form ENUM('tablet', 'capsule', 'syrup', 'injection', 'cream', 'drops', 'inhaler', 'other'),
    price DECIMAL(8,2),
    manufacturer VARCHAR(100),
    description TEXT,
    category VARCHAR(50),
    prescription_required BOOLEAN DEFAULT FALSE,
    barcode VARCHAR(50),
    side_effects TEXT,
    contraindications TEXT,
    dosage_instructions TEXT,
    storage_instructions TEXT,
    expiry_months INT DEFAULT 24,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_generic_name (generic_name),
    INDEX idx_category (category),
    INDEX idx_barcode (barcode),
    INDEX idx_prescription_required (prescription_required)
);

-- Consultations table
CREATE TABLE consultations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    doctor_id INT,
    symptoms TEXT NOT NULL,
    diagnosis TEXT,
    recommendations TEXT,
    prescribed_medicines TEXT,
    severity_score DECIMAL(5,2),
    confidence_score DECIMAL(5,2),
    consultation_type ENUM('ai', 'doctor', 'emergency') DEFAULT 'ai',
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'completed',
    follow_up_required BOOLEAN DEFAULT FALSE,
    follow_up_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_doctor_id (doctor_id),
    INDEX idx_consultation_type (consultation_type),
    INDEX idx_created_at (created_at)
);

-- Chat messages table
CREATE TABLE chat_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    session_id VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    message_type ENUM('symptom', 'general', 'emergency', 'medicine') DEFAULT 'general',
    sentiment ENUM('positive', 'neutral', 'negative', 'urgent') DEFAULT 'neutral',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_session_id (session_id),
    INDEX idx_created_at (created_at)
);

-- Appointments table
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INT DEFAULT 30,
    reason TEXT,
    status ENUM('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
    consultation_fee DECIMAL(8,2),
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_doctor_id (doctor_id),
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_status (status)
);

-- Medical history table
CREATE TABLE medical_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    condition_name VARCHAR(100) NOT NULL,
    diagnosed_date DATE,
    current_status ENUM('active', 'resolved', 'chronic', 'monitoring') DEFAULT 'active',
    severity ENUM('mild', 'moderate', 'severe') DEFAULT 'mild',
    notes TEXT,
    doctor_name VARCHAR(100),
    hospital_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_condition_name (condition_name)
);

-- Prescriptions table
CREATE TABLE prescriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    doctor_id INT,
    consultation_id INT,
    prescription_date DATE NOT NULL,
    medicines TEXT NOT NULL, -- JSON format
    dosage_instructions TEXT,
    duration_days INT,
    refills_allowed INT DEFAULT 0,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    pharmacy_name VARCHAR(100),
    dispensed_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL,
    FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_doctor_id (doctor_id),
    INDEX idx_prescription_date (prescription_date)
);

-- Medicine interactions table
CREATE TABLE medicine_interactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    medicine1_id INT NOT NULL,
    medicine2_id INT NOT NULL,
    interaction_type ENUM('minor', 'moderate', 'major', 'contraindicated') NOT NULL,
    description TEXT,
    severity_score INT DEFAULT 1,
    clinical_significance TEXT,
    management_advice TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medicine1_id) REFERENCES medicines(id) ON DELETE CASCADE,
    FOREIGN KEY (medicine2_id) REFERENCES medicines(id) ON DELETE CASCADE,
    UNIQUE KEY unique_interaction (medicine1_id, medicine2_id),
    INDEX idx_interaction_type (interaction_type)
);

-- Pharmacies table
CREATE TABLE pharmacies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    license_number VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(120),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    operating_hours VARCHAR(100),
    services TEXT, -- JSON format for services offered
    rating DECIMAL(3,2) DEFAULT 0.00,
    is_24_hours BOOLEAN DEFAULT FALSE,
    home_delivery BOOLEAN DEFAULT FALSE,
    online_payment BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_city (city),
    INDEX idx_pincode (pincode),
    INDEX idx_location (latitude, longitude)
);

-- Health records table
CREATE TABLE health_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    record_type ENUM('lab_report', 'prescription', 'scan', 'vaccination', 'other') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    file_path VARCHAR(500),
    file_type VARCHAR(50),
    file_size INT,
    record_date DATE,
    doctor_name VARCHAR(100),
    hospital_name VARCHAR(100),
    tags VARCHAR(200),
    is_critical BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_record_type (record_type),
    INDEX idx_record_date (record_date)
);

-- Emergency contacts table
CREATE TABLE emergency_contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    relationship VARCHAR(50),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(120),
    address TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- System logs table
CREATE TABLE system_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INT,
    details TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);

-- Create views for common queries
CREATE VIEW user_consultations AS
SELECT 
    c.id,
    c.user_id,
    CONCAT(u.first_name, ' ', u.last_name) as user_name,
    c.symptoms,
    c.diagnosis,
    c.severity_score,
    c.consultation_type,
    c.created_at
FROM consultations c
JOIN users u ON c.user_id = u.id;

CREATE VIEW doctor_appointments AS
SELECT 
    a.id,
    a.appointment_date,
    a.appointment_time,
    CONCAT(u.first_name, ' ', u.last_name) as patient_name,
    CONCAT(d.first_name, ' ', d.last_name) as doctor_name,
    d.specialty,
    a.status,
    a.consultation_fee
FROM appointments a
JOIN users u ON a.user_id = u.id
JOIN doctors d ON a.doctor_id = d.id;

-- Create stored procedures
DELIMITER //

CREATE PROCEDURE GetUserMedicalHistory(IN p_user_id INT)
BEGIN
    SELECT 
        mh.condition_name,
        mh.diagnosed_date,
        mh.current_status,
        mh.severity,
        mh.notes,
        mh.doctor_name
    FROM medical_history mh
    WHERE mh.user_id = p_user_id
    ORDER BY mh.diagnosed_date DESC;
END //

CREATE PROCEDURE CheckMedicineInteractions(IN p_medicine_ids TEXT)
BEGIN
    -- This procedure would check for interactions between multiple medicines
    -- Implementation would parse the comma-separated medicine IDs and check interactions
    SELECT 
        m1.name as medicine1,
        m2.name as medicine2,
        mi.interaction_type,
        mi.description,
        mi.management_advice
    FROM medicine_interactions mi
    JOIN medicines m1 ON mi.medicine1_id = m1.id
    JOIN medicines m2 ON mi.medicine2_id = m2.id
    WHERE FIND_IN_SET(mi.medicine1_id, p_medicine_ids) > 0
    AND FIND_IN_SET(mi.medicine2_id, p_medicine_ids) > 0;
END //

CREATE PROCEDURE GetNearbyDoctors(IN p_city VARCHAR(50), IN p_specialty VARCHAR(100))
BEGIN
    SELECT 
        id,
        CONCAT(first_name, ' ', last_name) as doctor_name,
        specialty,
        years_experience,
        rating,
        consultation_fee,
        clinic_name,
        clinic_address,
        phone
    FROM doctors
    WHERE city = p_city
    AND (p_specialty IS NULL OR specialty LIKE CONCAT('%', p_specialty, '%'))
    ORDER BY rating DESC, years_experience DESC
    LIMIT 20;
END //

DELIMITER ;

-- Create triggers
DELIMITER //

CREATE TRIGGER update_user_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

CREATE TRIGGER log_consultation_creation
    AFTER INSERT ON consultations
    FOR EACH ROW
BEGIN
    INSERT INTO system_logs (user_id, action, entity_type, entity_id, details)
    VALUES (NEW.user_id, 'CREATE_CONSULTATION', 'consultation', NEW.id, 
            CONCAT('Consultation created with diagnosis: ', COALESCE(NEW.diagnosis, 'N/A')));
END //

DELIMITER ;
