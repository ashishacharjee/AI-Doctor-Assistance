// Symptom Checker JavaScript
class SymptomChecker {
  constructor() {
    this.currentInputMethod = "text"
    this.isRecording = false
    this.recognition = null
    this.initializeElements()
    this.setupEventListeners()
    this.setupSpeechRecognition()
  }

  initializeElements() {
    this.symptomsText = document.getElementById("symptoms-text")
    this.analyzeBtn = document.getElementById("analyze-btn")
    this.resultsSection = document.getElementById("results-section")
    this.voiceBtn = document.getElementById("voice-btn")
    this.voiceStatus = document.getElementById("voice-status")
    this.inputMethods = document.querySelectorAll(".input-method")
    this.textInput = document.getElementById("text-input")
    this.voiceInput = document.getElementById("voice-input")
    this.symptomButtons = document.querySelectorAll(".symptom-btn")
    this.emergencyAlert = document.getElementById("emergency-alert")
  }

  setupEventListeners() {
    // Input method switching
    this.inputMethods.forEach((method) => {
      method.addEventListener("click", (e) => {
        this.switchInputMethod(e.target.dataset.method)
      })
    })

    // Analyze button
    this.analyzeBtn.addEventListener("click", () => {
      this.analyzeSymptoms()
    })

    // Quick symptom buttons
    this.symptomButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.symptomsText.value = e.target.dataset.symptom
      })
    })

    // Voice button
    if (this.voiceBtn) {
      this.voiceBtn.addEventListener("click", () => {
        this.toggleVoiceRecording()
      })
    }

    // Enter key in textarea
    this.symptomsText.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.ctrlKey) {
        this.analyzeSymptoms()
      }
    })
  }

  setupSpeechRecognition() {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      this.recognition = new SpeechRecognition()

      this.recognition.continuous = false
      this.recognition.interimResults = false
      this.recognition.lang = "en-US"

      this.recognition.onstart = () => {
        this.isRecording = true
        this.voiceBtn.classList.add("recording")
        this.voiceStatus.textContent = "Listening... Speak now"
      }

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        this.symptomsText.value = transcript
        this.voiceStatus.textContent = "Voice input captured successfully"
      }

      this.recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        this.voiceStatus.textContent = "Error: Could not capture voice input"
        this.stopRecording()
      }

      this.recognition.onend = () => {
        this.stopRecording()
      }
    } else {
      console.warn("Speech recognition not supported")
      if (this.voiceBtn) {
        this.voiceBtn.disabled = true
        this.voiceStatus.textContent = "Voice input not supported in this browser"
      }
    }
  }

  switchInputMethod(method) {
    this.currentInputMethod = method

    // Update active button
    this.inputMethods.forEach((btn) => {
      btn.classList.remove("active")
      if (btn.dataset.method === method) {
        btn.classList.add("active")
      }
    })

    // Show/hide input containers
    if (method === "text") {
      this.textInput.classList.remove("hidden")
      this.voiceInput.classList.add("hidden")
    } else {
      this.textInput.classList.add("hidden")
      this.voiceInput.classList.remove("hidden")
    }
  }

  toggleVoiceRecording() {
    if (!this.recognition) {
      alert("Speech recognition is not supported in your browser")
      return
    }

    if (this.isRecording) {
      this.recognition.stop()
    } else {
      this.recognition.start()
    }
  }

  stopRecording() {
    this.isRecording = false
    this.voiceBtn.classList.remove("recording")
    if (this.voiceStatus.textContent === "Listening... Speak now") {
      this.voiceStatus.textContent = "Ready to listen..."
    }
  }

  async analyzeSymptoms() {
    const symptoms = this.symptomsText.value.trim()

    if (!symptoms) {
      alert("Please describe your symptoms first")
      return
    }

    // Show loading state
    this.analyzeBtn.classList.add("loading")
    this.analyzeBtn.textContent = "Analyzing..."
    this.analyzeBtn.disabled = true

    try {
      const response = await fetch("/api/analyze-symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze symptoms")
      }

      const analysis = await response.json()
      this.displayResults(analysis)
    } catch (error) {
      console.error("Error analyzing symptoms:", error)
      alert("Error analyzing symptoms. Please try again.")
    } finally {
      // Reset button state
      this.analyzeBtn.classList.remove("loading")
      this.analyzeBtn.textContent = "Analyze Symptoms"
      this.analyzeBtn.disabled = false
    }
  }

  displayResults(analysis) {
    // Show results section
    this.resultsSection.style.display = "block"
    this.resultsSection.scrollIntoView({ behavior: "smooth" })

    // Update condition info
    document.getElementById("condition-name").textContent = analysis.condition

    const severityBadge = document.getElementById("severity-badge")
    severityBadge.textContent = analysis.severity
    severityBadge.className = `severity-badge severity-${analysis.severity.toLowerCase()}`

    document.getElementById("confidence-score").textContent = analysis.confidence

    // Update urgency info
    const urgencyLevel = document.getElementById("urgency-level")
    urgencyLevel.textContent = analysis.urgency
    urgencyLevel.className = `urgency-level urgency-${analysis.urgency.toLowerCase()}`

    document.getElementById("urgency-description").textContent =
      analysis.urgency === "urgent" ? "Seek medical attention promptly" : "Monitor symptoms and consult if needed"

    // Update medicines
    const medicinesList = document.getElementById("medicines-list")
    if (analysis.medicines && analysis.medicines.length > 0) {
      medicinesList.innerHTML = analysis.medicines
        .map(
          (medicine) => `
                <div class="medicine-item">
                    <div class="medicine-name">${medicine}</div>
                    <div class="medicine-info">Consult pharmacist for proper dosage</div>
                </div>
            `,
        )
        .join("")
    } else {
      medicinesList.innerHTML = "<p>No specific medicines recommended. Consult a healthcare provider.</p>"
    }

    // Update recommendations
    const recommendationsList = document.getElementById("recommendations-list")
    if (analysis.recommendations && analysis.recommendations.length > 0) {
      recommendationsList.innerHTML = analysis.recommendations
        .map(
          (rec) => `
                <div class="recommendation-item">
                    <i class="fas fa-check-circle"></i>
                    <span>${rec}</span>
                </div>
            `,
        )
        .join("")
    } else {
      recommendationsList.innerHTML = "<p>No specific recommendations available.</p>"
    }

    // Show emergency alert if needed
    if (analysis.emergency) {
      this.emergencyAlert.classList.remove("hidden")
      this.emergencyAlert.scrollIntoView({ behavior: "smooth" })
    } else {
      this.emergencyAlert.classList.add("hidden")
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SymptomChecker()
})

// Utility functions
function formatSeverity(severity) {
  const severityMap = {
    mild: { class: "severity-mild", text: "Mild" },
    moderate: { class: "severity-moderate", text: "Moderate" },
    severe: { class: "severity-severe", text: "Severe" },
  }
  return severityMap[severity.toLowerCase()] || { class: "severity-mild", text: severity }
}

function formatUrgency(urgency) {
  const urgencyMap = {
    routine: { class: "urgency-routine", text: "Routine Care" },
    urgent: { class: "urgency-urgent", text: "Urgent Care" },
    immediate: { class: "urgency-immediate", text: "Immediate Care" },
  }
  return urgencyMap[urgency.toLowerCase()] || { class: "urgency-routine", text: urgency }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SymptomChecker, formatSeverity, formatUrgency }
}
