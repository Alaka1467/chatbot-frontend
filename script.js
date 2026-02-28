const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatBox = document.getElementById('chat-box');

// This function creates the bubbles and assigns the Right/Left classes
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    
    // Links to your CSS: 'user-message' goes RIGHT, 'bot-message' goes LEFT
    if (sender === 'user') {
        msgDiv.classList.add('user-message');
    } else {
        msgDiv.classList.add('bot-message');
    }
    
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    
    // Always scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleSend() {
    const message = userInput.value.trim();
    if (!message) return;

    // 1. Show your message on the right
    appendMessage(message, 'user');
    userInput.value = '';

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        
        // 2. Show Gemini's message on the left
        appendMessage(data.reply, 'bot');
    } catch (error) {
        appendMessage("System: Connection lost. Please check your server.", "bot");
    }
}

// Listen for the Send button click
sendBtn.addEventListener('click', handleSend);

// FIX: Listen for the 'Enter' (Return) key on the keyboard
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});