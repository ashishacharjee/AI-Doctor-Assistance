// AI Doctor Chat JavaScript
class MedicalChatBot {
  constructor() {
    this.sessionId = this.generateSessionId()
    this.isTyping = false
    this.recognition = null
    this.isRecording = false
    this.initializeElements()
    this.setupEventListeners()
    this.setupSpeechRecognition()
  }

  initializeElements() {
    this.chatMessages = document.getElementById("chat-messages")
    this.chatInput = document.getElementById("chat-input")
    this.sendBtn = document.getElementById("send-btn")
    this.voiceBtn = document.getElementById("voice-input-btn")
    this.statusIndicator = document.getElementById("status-indicator")
    this.questionButtons = document.querySelectorAll(".question-btn")
  }

  setupEventListeners() {
    // Send button
    this.sendBtn.addEventListener("click", () => {
      this.sendMessage()
    })

    // Enter key in textarea
    this.chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        this.sendMessage()
      }
    })

    // Voice input button
    this.voiceBtn.addEventListener("click", () => {
      this.toggleVoiceInput()
    })

    // Quick question buttons
    this.questionButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const question = e.target.dataset.question
        this.chatInput.value = question
        this.sendMessage()
      })
    })

    // Auto-resize textarea
    this.chatInput.addEventListener("input", () => {
      this.autoResizeTextarea()
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
        this.voiceBtn.innerHTML = '<i class="fas fa-stop"></i>'
        this.statusIndicator.textContent = "🎤 Listening... Speak clearly"
      }

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        this.chatInput.value = transcript
        this.autoResizeTextarea()
        this.statusIndicator.textContent = "Voice input received. Click send or press Enter."
      }

      this.recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        this.stopRecording()
        this.statusIndicator.textContent = "Voice input error. Please try typing instead."
      }

      this.recognition.onend = () => {
        this.stopRecording()
      }
    } else {
      this.voiceBtn.style.display = "none"
    }
  }

  generateSessionId() {
    return "chat_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
  }

  autoResizeTextarea() {
    this.chatInput.style.height = "auto"
    this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 120) + "px"
  }

  toggleVoiceInput() {
    if (!this.recognition) {
      alert("Speech recognition is not supported in your browser")
      return
    }

    if (this.isRecording) {
      this.recognition.stop()
    } else {
      try {
        this.recognition.start()
      } catch (error) {
        console.error("Failed to start speech recognition:", error)
        this.statusIndicator.textContent = "Voice input failed. Please try again."
      }
    }
  }

  stopRecording() {
    this.isRecording = false
    this.voiceBtn.classList.remove("recording")
    this.voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>'
    if (!this.chatInput.value.trim()) {
      this.statusIndicator.textContent = "Type your message or click the microphone to speak"
    }
  }

  async sendMessage() {
    const message = this.chatInput.value.trim()

    if (!message || this.isTyping) {
      return
    }

    // Add user message to chat
    this.addMessage(message, "user")

    // Clear input
    this.chatInput.value = ""
    this.autoResizeTextarea()

    // Show typing indicator
    this.showTypingIndicator()

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          session_id: this.sessionId,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Remove typing indicator
      this.hideTypingIndicator()

      // Add AI response
      this.addMessage(data.response, "bot")

      this.statusIndicator.textContent = "Message sent successfully"
    } catch (error) {
      console.error("Error sending message:", error)
      this.hideTypingIndicator()

      // Provide fallback response based on user message
      const fallbackResponse = this.getFallbackResponse(message)
      this.addMessage(fallbackResponse, "bot", false)

      this.statusIndicator.textContent = "Using offline mode - limited functionality"
    }
  }

  getFallbackResponse(userMessage) {
    const message = userMessage.toLowerCase()

    // Emergency keywords
    if (
      message.includes("chest pain") ||
      message.includes("heart attack") ||
      message.includes("difficulty breathing")
    ) {
      return `🚨 <strong>MEDICAL EMERGENCY DETECTED</strong> 🚨<br><br>
              If you're experiencing chest pain or difficulty breathing:<br><br>
              <strong>IMMEDIATE ACTIONS:</strong><br>
              - Call <span class="emergency-number">102</span> (Ambulance) or <span class="emergency-number">108</span> (Emergency Services) RIGHT NOW<br>
              - Stop all activity and sit down<br>
              - If you have aspirin and are not allergic, chew one tablet<br>
              - Do NOT drive yourself to the hospital<br>
              - Stay calm and breathe slowly<br><br>
              <strong>This could be a heart attack or other serious condition requiring immediate medical attention.</strong><br><br>
              Please call emergency services immediately. Do not delay!`
    }

    // Fever symptoms
    if (message.includes("fever") || message.includes("temperature") || message.includes("hot")) {
      return `🌡️ <strong>Fever Management Guide</strong><br><br>
              <strong>For fever relief:</strong><br>
              - Take <strong>Paracetamol</strong> 500mg every 6-8 hours (adults)<br>
              - Drink plenty of fluids (water, ORS, coconut water)<br>
              - Rest in a cool, well-ventilated room<br>
              - Use cold compresses on forehead and wrists<br>
              - Wear light, breathable clothing<br><br>
              <strong>When to seek immediate care:</strong><br>
              - Fever above 103°F (39.4°C)<br>
              - Fever lasting more than 3 days<br>
              - Difficulty breathing or chest pain<br>
              - Severe headache with neck stiffness<br>
              - Persistent vomiting<br>
              - Signs of dehydration<br><br>
              <strong>Call <span class="emergency-number">102</span> or <span class="emergency-number">108</span> if you experience severe symptoms.</strong><br><br>
              Would you like to tell me more about your fever symptoms?`
    }

    // Headache symptoms
    if (message.includes("headache") || message.includes("head pain") || message.includes("migraine")) {
      return `🧠 <strong>Headache Relief Guide</strong><br><br>
              <strong>Immediate relief measures:</strong><br>
              - Rest in a quiet, dark room<br>
              - Apply cold compress to forehead or neck<br>
              - Take <strong>Paracetamol</strong> or <strong>Ibuprofen</strong> as directed<br>
              - Stay hydrated with water<br>
              - Gently massage temples and neck<br>
              - Practice deep breathing exercises<br><br>
              <strong>Red flag symptoms - seek immediate care:</strong><br>
              - Sudden, severe headache ("worst headache of my life")<br>
              - Headache with fever and neck stiffness<br>
              - Headache with vision changes or confusion<br>
              - Headache after head injury<br>
              - Progressively worsening headaches<br><br>
              <strong>Call <span class="emergency-number">102</span> or <span class="emergency-number">108</span> for severe symptoms.</strong><br><br>
              Can you describe your headache in more detail? When did it start and how severe is it?`
    }

    // Stomach/abdominal pain
    if (message.includes("stomach") || message.includes("abdominal") || message.includes("belly")) {
      return `🤢 <strong>Stomach Pain Management</strong><br><br>
              <strong>Immediate care:</strong><br>
              - Stop eating solid foods temporarily<br>
              - Sip clear fluids (water, ORS, clear broth)<br>
              - Apply gentle heat with heating pad (low setting)<br>
              - Rest in comfortable position<br>
              - Avoid dairy, spicy, or fatty foods<br><br>
              <strong>Home remedies:</strong><br>
              - Ginger tea for nausea<br>
              - Mint tea for digestion<br>
              - BRAT diet when ready (Banana, Rice, Applesauce, Toast)<br><br>
              <strong>Seek immediate medical care if:</strong><br>
              - Severe, persistent pain<br>
              - Vomiting blood or black material<br>
              - High fever with abdominal pain<br>
              - Signs of dehydration<br>
              - Pain in lower right abdomen (possible appendicitis)<br><br>
              <strong>Call <span class="emergency-number">102</span> or <span class="emergency-number">108</span> for severe symptoms.</strong><br><br>
              Where exactly is the pain located and how long have you had it?`
    }

    // Cough and cold
    if (message.includes("cough") || message.includes("cold") || message.includes("throat")) {
      return `🤧 <strong>Cough & Cold Care</strong><br><br>
              <strong>Natural remedies:</strong><br>
              - <strong>Honey</strong> - 1-2 teaspoons for throat soothing<br>
              - <strong>Warm salt water gargle</strong> - 3-4 times daily<br>
              - <strong>Steam inhalation</strong> - with eucalyptus oil<br>
              - <strong>Ginger tea</strong> with honey and lemon<br>
              - <strong>Turmeric milk</strong> before bedtime<br><br>
              <strong>Medications:</strong><br>
              - <strong>Paracetamol</strong> for body aches and fever<br>
              - <strong>Cough syrup</strong> with dextromethorphan for dry cough<br>
              - <strong>Saline nasal drops</strong> for congestion<br><br>
              <strong>When to see a doctor:</strong><br>
              - Cough lasting more than 2 weeks<br>
              - Blood in cough or sputum<br>
              - High fever with cough<br>
              - Difficulty breathing<br>
              - Chest pain with cough<br><br>
              <strong>Stay hydrated, rest well, and avoid smoking or polluted air.</strong><br><br>
              How long have you had the cough? Is it dry or with phlegm?`
    }

    // General health inquiry
    if (message.includes("help") || message.includes("doctor") || message.includes("health")) {
      return `👨‍⚕️ <strong>Welcome to Dr. AI Medical Assistant</strong><br><br>
              I'm here to help you with:<br>
              - <strong>Symptom analysis</strong> and preliminary guidance<br>
              - <strong>Health information</strong> and home remedies<br>
              - <strong>When to seek medical care</strong> recommendations<br>
              - <strong>Emergency situation</strong> identification<br>
              - <strong>General health</strong> questions and advice<br><br>
              <strong>⚠️ Important:</strong> I provide information only, not medical diagnosis. Always consult qualified healthcare professionals for proper medical care.<br><br>
              <strong>🚨 For emergencies, call:</strong><br>
              - <span class="emergency-number">102</span> - Ambulance<br>
              - <span class="emergency-number">108</span> - Emergency Services<br><br>
              <strong>How can I help you today?</strong><br>
              - Describe your symptoms<br>
              - Ask about a health condition<br>
              - Get advice on when to see a doctor<br>
              - Learn about preventive care<br><br>
              What health concern would you like to discuss?`
    }

    // Default response
    return `👨‍⚕️ <strong>Dr. AI Medical Assistant</strong><br><br>
            I understand you have a health concern. While I can provide general medical information and guidance, it's important to remember that this is not a substitute for professional medical care.<br><br>
            <strong>I can help you with:</strong><br>
            - Understanding your symptoms<br>
            - Providing general health advice<br>
            - Suggesting when to seek medical care<br>
            - Offering home remedies and self-care tips<br>
            - Identifying emergency situations<br><br>
            <strong>🚨 For medical emergencies, immediately call:</strong><br>
            - <span class="emergency-number">102</span> (Ambulance)<br>
            - <span class="emergency-number">108</span> (Emergency Services)<br><br>
            <strong>Please describe your symptoms or health concerns in detail so I can provide you with the most helpful information.</strong><br><br>
            For example, you can tell me:<br>
            - What symptoms you're experiencing<br>
            - How long you've had them<br>
            - How severe they are<br>
            - Any other relevant details<br><br>
            What would you like to know about your health today?`
  }

  addMessage(text, sender, isError = false) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}-message ${isError ? "error-message" : ""}`

    const avatar = document.createElement("div")
    avatar.className = "message-avatar"
    avatar.innerHTML = sender === "user" ? '<i class="fas fa-user"></i>' : '<i class="fas fa-user-md"></i>'

    const content = document.createElement("div")
    content.className = "message-content"

    const messageText = document.createElement("div")
    messageText.className = "message-text"
    messageText.innerHTML = this.formatMessage(text)

    const messageTime = document.createElement("div")
    messageTime.className = "message-time"
    messageTime.textContent = this.formatTime(new Date())

    content.appendChild(messageText)
    content.appendChild(messageTime)
    messageDiv.appendChild(avatar)
    messageDiv.appendChild(content)

    this.chatMessages.appendChild(messageDiv)
    this.scrollToBottom()
  }

  formatMessage(text) {
    // Convert URLs to links
    const urlRegex = /(https?:\/\/[^\s]+)/g
    text = text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>')

    // Convert line breaks to <br>
    text = text.replace(/\n/g, "<br>")

    // Highlight emergency numbers (already handled in fallback responses)
    // text = text.replace(/(102|108)/g, '<span class="emergency-number">$1</span>')

    // Highlight important medical terms
    const medicalTerms = ["emergency", "urgent", "immediate", "serious", "critical"]
    medicalTerms.forEach((term) => {
      const regex = new RegExp(`\\b${term}\\b`, "gi")
      text = text.replace(regex, `<span class="medical-term">$&</span>`)
    })

    return text
  }

  formatTime(date) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  showTypingIndicator() {
    this.isTyping = true
    this.sendBtn.disabled = true
    this.statusIndicator.textContent = "Dr. AI is thinking..."

    const typingDiv = document.createElement("div")
    typingDiv.className = "message bot-message typing-indicator"
    typingDiv.id = "typing-indicator"

    const avatar = document.createElement("div")
    avatar.className = "message-avatar"
    avatar.innerHTML = '<i class="fas fa-user-md"></i>'

    const content = document.createElement("div")
    content.className = "message-content"

    const typingText = document.createElement("div")
    typingText.className = "typing-animation"
    typingText.innerHTML = "<span></span><span></span><span></span>"

    content.appendChild(typingText)
    typingDiv.appendChild(avatar)
    typingDiv.appendChild(content)

    this.chatMessages.appendChild(typingDiv)
    this.scrollToBottom()
  }

  hideTypingIndicator() {
    this.isTyping = false
    this.sendBtn.disabled = false

    const typingIndicator = document.getElementById("typing-indicator")
    if (typingIndicator) {
      typingIndicator.remove()
    }

    this.statusIndicator.textContent = "Type your message or click the microphone to speak"
  }

  scrollToBottom() {
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight
  }
}

// Initialize chat when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new MedicalChatBot()
})

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MedicalChatBot }
}
