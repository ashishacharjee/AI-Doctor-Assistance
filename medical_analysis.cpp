#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <algorithm>
#include <cmath>
#include <json/json.h>

class MedicalAnalyzer {
private:
    std::map<std::string, std::vector<std::string>> symptom_conditions;
    std::map<std::string, std::vector<std::string>> condition_medicines;
    std::vector<std::string> emergency_keywords;
    
public:
    MedicalAnalyzer() {
        // Initialize symptom-condition mappings
        symptom_conditions["fever"] = {"viral infection", "bacterial infection", "malaria", "dengue"};
        symptom_conditions["headache"] = {"tension headache", "migraine", "sinusitis", "cluster headache"};
        symptom_conditions["cough"] = {"common cold", "bronchitis", "pneumonia", "asthma"};
        symptom_conditions["chest pain"] = {"heart attack", "angina", "muscle strain", "acid reflux"};
        symptom_conditions["stomach pain"] = {"gastritis", "food poisoning", "appendicitis", "ulcer"};
        
        // Initialize condition-medicine mappings
        condition_medicines["fever"] = {"Paracetamol", "Ibuprofen", "Aspirin"};
        condition_medicines["headache"] = {"Paracetamol", "Aspirin", "Ibuprofen"};
        condition_medicines["cough"] = {"Salbutamol", "Cough syrup", "Honey"};
        condition_medicines["chest pain"] = {"Aspirin", "Nitroglycerin"};
        condition_medicines["stomach pain"] = {"Omeprazole", "Antacid", "ORS"};
        
        // Emergency keywords
        emergency_keywords = {"chest pain", "difficulty breathing", "unconscious", 
                            "seizure", "severe bleeding", "stroke", "heart attack"};
    }
    
    std::string toLowerCase(const std::string& str) {
        std::string result = str;
        std::transform(result.begin(), result.end(), result.begin(), ::tolower);
        return result;
    }
    
    bool isEmergency(const std::string& symptoms) {
        std::string lower_symptoms = toLowerCase(symptoms);
        for (const auto& keyword : emergency_keywords) {
            if (lower_symptoms.find(keyword) != std::string::npos) {
                return true;
            }
        }
        return false;
    }
    
    int calculateSeverityScore(const std::string& symptoms) {
        std::string lower_symptoms = toLowerCase(symptoms);
        int score = 0;
        
        // Severity indicators
        if (lower_symptoms.find("severe") != std::string::npos) score += 30;
        if (lower_symptoms.find("intense") != std::string::npos) score += 25;
        if (lower_symptoms.find("unbearable") != std::string::npos) score += 35;
        if (lower_symptoms.find("mild") != std::string::npos) score += 10;
        if (lower_symptoms.find("slight") != std::string::npos) score += 5;
        
        // Duration indicators
        if (lower_symptoms.find("days") != std::string::npos) score += 15;
        if (lower_symptoms.find("weeks") != std::string::npos) score += 25;
        if (lower_symptoms.find("sudden") != std::string::npos) score += 20;
        
        return std::min(score, 100);
    }
    
    std::vector<std::string> findSymptoms(const std::string& symptoms) {
        std::vector<std::string> found_symptoms;
        std::string lower_symptoms = toLowerCase(symptoms);
        
        for (const auto& pair : symptom_conditions) {
            if (lower_symptoms.find(pair.first) != std::string::npos) {
                found_symptoms.push_back(pair.first);
            }
        }
        
        return found_symptoms;
    }
    
    Json::Value analyzeSymptoms(const std::string& symptoms) {
        Json::Value result;
        
        // Check for emergency
        if (isEmergency(symptoms)) {
            result["condition"] = "Medical Emergency";
            result["severity"] = "Critical";
            result["urgency"] = "Immediate";
            result["confidence"] = 95;
            result["emergency"] = true;
            
            Json::Value recommendations(Json::arrayValue);
            recommendations.append("Call 102 or 108 immediately");
            recommendations.append("Go to nearest emergency room");
            recommendations.append("Do not delay medical care");
            result["recommendations"] = recommendations;
            
            result["medicines"] = Json::Value(Json::arrayValue);
            return result;
        }
        
        // Find symptoms
        std::vector<std::string> found_symptoms = findSymptoms(symptoms);
        
        if (found_symptoms.empty()) {
            result["condition"] = "General health concern";
            result["severity"] = "mild";
            result["urgency"] = "routine";
            result["confidence"] = 50;
            result["emergency"] = false;
            
            Json::Value medicines(Json::arrayValue);
            medicines.append("Paracetamol");
            result["medicines"] = medicines;
            
            Json::Value recommendations(Json::arrayValue);
            recommendations.append("Rest and monitor symptoms");
            recommendations.append("Stay hydrated");
            recommendations.append("Consult doctor if symptoms persist");
            result["recommendations"] = recommendations;
            
            return result;
        }
        
        // Analyze primary symptom
        std::string primary_symptom = found_symptoms[0];
        std::vector<std::string> conditions = symptom_conditions[primary_symptom];
        std::vector<std::string> medicines = condition_medicines[primary_symptom];
        
        // Calculate severity
        int severity_score = calculateSeverityScore(symptoms);
        std::string severity = "mild";
        std::string urgency = "routine";
        
        if (severity_score > 70) {
            severity = "severe";
            urgency = "urgent";
        } else if (severity_score > 40) {
            severity = "moderate";
            urgency = "routine";
        }
        
        // Build result
        result["condition"] = conditions.empty() ? "Unknown condition" : conditions[0];
        result["severity"] = severity;
        result["urgency"] = urgency;
        result["confidence"] = std::min(80 + (int)found_symptoms.size() * 5, 95);
        result["emergency"] = false;
        
        // Add medicines
        Json::Value medicine_array(Json::arrayValue);
        for (size_t i = 0; i < std::min(medicines.size(), (size_t)3); ++i) {
            medicine_array.append(medicines[i]);
        }
        result["medicines"] = medicine_array;
        
        // Add recommendations
        Json::Value recommendations(Json::arrayValue);
        if (severity == "severe") {
            recommendations.append("Seek immediate medical attention");
        }
        
        if (primary_symptom == "fever") {
            recommendations.append("Rest and stay hydrated");
            recommendations.append("Take paracetamol for fever");
            recommendations.append("Use cold compress");
        } else if (primary_symptom == "headache") {
            recommendations.append("Rest in a quiet, dark room");
            recommendations.append("Stay hydrated");
            recommendations.append("Apply cold compress to forehead");
        } else if (primary_symptom == "cough") {
            recommendations.append("Stay hydrated with warm fluids");
            recommendations.append("Use honey for throat soothing");
            recommendations.append("Avoid smoking and pollutants");
        } else {
            recommendations.append("Rest and monitor symptoms");
            recommendations.append("Stay hydrated");
            recommendations.append("Consult doctor if symptoms worsen");
        }
        
        result["recommendations"] = recommendations;
        
        return result;
    }
};

// C interface for Python integration
extern "C" {
    MedicalAnalyzer* analyzer = nullptr;
    
    void init_analyzer() {
        if (!analyzer) {
            analyzer = new MedicalAnalyzer();
        }
    }
    
    const char* analyze_symptoms(const char* symptoms) {
        init_analyzer();
        
        Json::Value result = analyzer->analyzeSymptoms(std::string(symptoms));
        Json::StreamWriterBuilder builder;
        std::string* json_string = new std::string(Json::writeString(builder, result));
        
        return json_string->c_str();
    }
    
    void cleanup() {
        delete analyzer;
        analyzer = nullptr;
    }
}

// Compile with: g++ -shared -fPIC -o medical_analysis.so medical_analysis.cpp -ljsoncpp
