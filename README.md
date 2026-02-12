# AI-Powered Customer Support Chatbot

A secure and intelligent **AI-powered customer support chatbot** built using Python (Flask) and modern web technologies. This system supports natural language queries, image-based text extraction (OCR), JWT authentication, and is designed for future Azure cloud integration.

---

## 📌 Project Overview

This project demonstrates a complete end-to-end chatbot system including secure authentication, rule-based Natural Language Understanding (NLU), OCR-based image text extraction, RESTful APIs, and a responsive frontend interface. The architecture is cloud-ready and can be easily deployed to Microsoft Azure services.

---

## 🚀 Features

- 🔐 JWT-based secure login authentication  
- 💬 Rule-based chatbot response system  
- 🖼️ OCR support using Tesseract  
- 📁 RESTful API architecture  
- 🔑 Environment variable-based secret management  
- ☁️ Azure integration ready  

---

## 🛠️ Technology Stack

Frontend: HTML5, CSS3, JavaScript  
Backend: Python 3.9+, Flask  
Authentication: PyJWT  
OCR: Tesseract, pytesseract, Pillow  
Secret Management: python-dotenv  
Deployment: Localhost / Azure App Service  

---

## 🧱 System Architecture

Frontend (HTML/CSS/JS) → Flask Backend → JWT Authentication + Rule-Based NLU + Tesseract OCR → JSON Response  

---

## 📋 Prerequisites

- Python 3.9+  
- Tesseract OCR installed  

Install Tesseract:  

Windows: Install from UB Mannheim build  
macOS: brew install tesseract  
Linux: sudo apt install tesseract-ocr  

---

## ⚙️ Installation & Setup

Clone Repository:

git clone [https://github.com/yourusername/ai-customer-support-chatbot.git](https://github.com/k-abhi1/Customer-Support-Chatbot)  
cd ai-customer-support-chatbot  

Backend Setup:

cd backend  
python -m venv venv  
source venv/bin/activate   (Windows: venv\Scripts\activate)  
pip install -r requirements.txt  

Create a .env file inside backend folder:

SECRET_KEY=your-secret-key  
USERNAME=admin  
PASSWORD=secure123  

Run the Application:

python app.py  

Open in browser:  
http://localhost:5000  

---

## 📁 Project Structure

ai-customer-support-chatbot/  
│  
├── backend/  
│   ├── app.py  
│   ├── requirements.txt  
│   ├── faq_data.json  
│   └── .env  
│  
└── frontend/  
    ├── index.html  
    ├── chat.html  
    ├── style.css  
    └── script.js  

---

## 📡 API Endpoints

POST /login – Authenticate user  
POST /chat – Send message to chatbot  
POST /ocr – Upload image for text extraction  
GET / – Serve login page  

---

## 🔒 Security Considerations

- JWT-protected routes  
- Secrets stored in environment variables  
- .env excluded using .gitignore  
- Production-ready for Azure Key Vault  
- Upgrade-ready for Microsoft Entra ID  

---

## ☁️ Azure Integration (Future Scope)

The system can be enhanced by integrating:

- Azure Language Service (advanced NLP)  
- Azure Computer Vision (OCR upgrade)  
- Microsoft Entra ID (OAuth authentication)  
- Azure Key Vault (secure secret management)  
- Azure App Service (cloud deployment)  

---

## 🎯 Use Cases

- Customer support automation  
- FAQ chatbot systems  
- OCR-based support handling  
- Helpdesk automation  
- Academic and portfolio project  

---

## 📄 License

Licensed under the MIT License.

---

## 👨‍💻 Author

Abhishek Kumar  
B.Tech – Machine Learning & Full Stack Development  
Bihar Engineering University  

GitHub: https://github.com/yourusername
