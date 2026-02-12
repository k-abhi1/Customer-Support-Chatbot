//   Frontend logic (AJAX, token handling)
// script.js – handles both login and chat pages

const API_BASE = 'http://localhost:5000';

// ---------- LOGIN PAGE ----------
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/chat';
            } else {
                loginError.textContent = data.error || 'Login failed';
            }
        } catch (err) {
            loginError.textContent = 'Server error. Please try again.';
        }
    });
}

// ---------- CHAT PAGE ----------
if (document.getElementById('chatBox')) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
    }

    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const attachBtn = document.getElementById('attachBtn');
    const imageUpload = document.getElementById('imageUpload');
    const logoutBtn = document.getElementById('logoutBtn');

    // Send text message
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        appendMessage('user', message);
        userInput.value = '';

        try {
            const response = await fetch(`${API_BASE}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            if (response.ok) {
                appendMessage('bot', data.reply);
            } else {
                appendMessage('bot', 'Error: ' + (data.error || 'Unable to get response'));
                if (response.status === 401) handleUnauthorized();
            }
        } catch (err) {
            appendMessage('bot', 'Network error. Please check your connection.');
        }
    }

    // Upload image for OCR
    async function uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        appendMessage('user', `📎 Uploaded: ${file.name}`);

        try {
            const response = await fetch(`${API_BASE}/ocr`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                appendMessage('ocr', `📄 Extracted text:\n${data.text}`, true);
            } else {
                appendMessage('bot', 'OCR Error: ' + (data.error || 'Could not process image'));
                if (response.status === 401) handleUnauthorized();
            }
        } catch (err) {
            appendMessage('bot', 'OCR failed. Please try again.');
        }
    }

    function appendMessage(sender, text, isOCR = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        if (sender === 'user') {
            messageDiv.classList.add('user');
            messageDiv.innerHTML = `<span>${text}</span>`;
        } else if (sender === 'bot') {
            messageDiv.classList.add('bot');
            messageDiv.innerHTML = `<span>🤖 ${text}</span>`;
        } else if (isOCR) {
            messageDiv.classList.add('ocr');
            messageDiv.innerHTML = `<span>${text}</span>`;
        }
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function handleUnauthorized() {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    attachBtn.addEventListener('click', () => {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            uploadImage(e.target.files[0]);
            imageUpload.value = ''; // allow re-upload same file
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    });
}