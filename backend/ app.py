 # Flask applicationimport os
import json
import jwt
import pytesseract
from PIL import Image
from datetime import datetime, timedelta
from functools import wraps
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

# ---------- Configuration ----------
SECRET_KEY = os.getenv('SECRET_KEY')
USERNAME = os.getenv('USERNAME')
PASSWORD = os.getenv('PASSWORD')

# Load FAQ
with open('faq_data.json') as f:
    FAQ = json.load(f)

# ---------- Authentication Helpers ----------
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token missing'}), 401
        try:
            token = token.split(' ')[1]  # Bearer <token>
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            request.user = data['user']
        except:
            return jsonify({'error': 'Invalid token'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if data.get('username') == USERNAME and data.get('password') == PASSWORD:
        token = jwt.encode({
            'user': data['username'],
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token})
    return jsonify({'error': 'Invalid credentials'}), 401

# ---------- NLU / Chat ----------
def get_bot_response(message):
    message = message.lower()
    for intent, keywords in FAQ.items():
        if any(kw in message for kw in keywords):
            if intent == 'greeting':
                return "Hello! How can I assist you today?"
            elif intent == 'hours':
                return "Our support team is available Monday–Friday, 9 AM – 6 PM (EST)."
            elif intent == 'refund':
                return "Refunds are processed within 5–7 business days. Please provide your order number."
            elif intent == 'contact':
                return "You can reach a human agent at support@example.com or call +1-800-555-0199."
    return "I'm sorry, I didn't understand that. Please rephrase or contact our support team."

@app.route('/chat', methods=['POST'])
@token_required
def chat():
    data = request.json
    user_msg = data.get('message', '')
    reply = get_bot_response(user_msg)
    return jsonify({'reply': reply})

# ---------- OCR ----------
@app.route('/ocr', methods=['POST'])
@token_required
def ocr():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    file = request.files['image']
    try:
        img = Image.open(file.stream)
        extracted_text = pytesseract.image_to_string(img)
        return jsonify({'text': extracted_text.strip()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ---------- Serve Frontend ----------
@app.route('/')
def serve_login():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/chat')
def serve_chat():
    return send_from_directory(app.static_folder, 'chat.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)