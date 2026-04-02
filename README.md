# 🩺 Swasthya Path AI — Smart Prescription Simplifier

![Status](https://img.shields.io/badge/status-active-success)
![Tech](https://img.shields.io/badge/stack-React%20%7C%20AI%20%7C%20Web-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Hackathon](https://img.shields.io/badge/built%20for-hackathon-orange)

> 💡 AI-powered healthcare assistant that converts complex medical prescriptions into simple, easy-to-understand steps for everyone.

---

## 🚀 Problem Statement

Medical prescriptions are often:
- ❌ Hard to understand  
- ❌ Written in complex language  
- ❌ Difficult for rural & low-literacy users  

👉 This leads to **wrong medication usage** and **health risks**

---

## 🎯 Solution

**Swasthya Path AI** simplifies prescriptions into:
- ✅ Clear steps  
- ✅ Time-based schedule (Morning / Afternoon / Night)  
- ✅ Voice guidance  
- ✅ Multi-language output  

---

## ✨ Key Features

### 🧠 AI Prescription Simplifier
- Converts complex instructions into simple steps
- Structured output:
  - 🌅 Morning  
  - ☀️ Afternoon  
  - 🌙 Night  

---

### 🔊 Voice Output (Text-to-Speech)
- “Play Audio” button
- Generates fresh audio every time
- Helpful for elderly & low-literacy users

---

### 🌍 Multi-language Support
- English 🇬🇧  
- Hindi 🇮🇳  
- Bengali 🇧🇩  

---

### ⚡ Smart Fallback System
- Works even if AI fails
- Ensures **zero crashes**
- Always returns structured output

---

### 🎨 Clean Modern UI
- Card-based layout
- Healthcare-themed gradient (green/blue)
- Responsive design (mobile + desktop)
- Smooth UX

---

### ⏳ Loading & Feedback
- Spinner during processing
- Error handling system

---

### 🧪 Demo Mode (Hackathon Ready)
- “Try Sample” button
- Preloaded example for quick demo

---

### 🚨 Emergency Detection
- Detects keywords like:
  - "severe"
  - "pain"
  - "bleeding"
- Shows alert:
  > ⚠️ Consult a doctor immediately

---

### 🕓 Recent History
- Stores last few inputs
- Quick access to previous results

---

### ♿ Accessibility Mode
- 🔍 Larger text toggle  
- 🌗 High contrast mode  

---

## 🖥️ Tech Stack

### Frontend
- ⚛️ React + TypeScript  
- 🎨 Tailwind CSS  
- 🧩 Component-based UI  

### Backend (Optional / Extendable)
- 🐍 Python Flask  

### AI Layer
- 🤖 Rule-based + AI-ready architecture  
- (Can integrate OpenAI / LLM APIs)

### Audio
- 🔊 Browser Speech Synthesis / gTTS  

---

## 🧱 Project Structure


src/
├── components/
│ ├── Header.tsx
│ ├── PrescriptionInput.tsx
│ ├── PrescriptionOutput.tsx
│ ├── HistoryPanel.tsx
│
├── lib/
│ └── prescription-engine.ts
│
├── pages/
├── App.tsx
└── main.tsx

public/
└── my-logo.png


---

## ⚙️ How It Works


User Input
↓
AI / Parsing Engine
↓
Structured Output
↓
UI Rendering
↓
Audio Generation


---

## 🧪 Sample Input


Take one tablet after breakfast and syrup before sleep.


### ✅ Output


🌅 Morning:
• Take one tablet after breakfast

🌙 Night:
• Take syrup before sleep


---


💡 Future Improvements
📷 Prescription Image Scanner (OCR)
⏰ Smart reminders
💊 Medicine recognition
☁️ Cloud deployment
📱 Mobile app (React Native)
🧠 Inspiration

Healthcare should be:

Simple
Accessible
Understandable

This project aims to bridge the gap between medical complexity and human understanding.

👨‍💻 Author

Arijit Sen

GitHub: https://github.com/Arijitsen-ece
📜 License

MIT License

❤️ Acknowledgements
Open-source community
Hackathon inspiration
Healthcare workers worldwide

🚀 Built with passion to make healthcare accessible for everyone


