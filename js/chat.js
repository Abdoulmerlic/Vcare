let socket;

function connectWebSocket() {
    socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    socket.onmessage = event => {
        const chatWindow = document.getElementById('chat-window');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'doctor-message';
        messageDiv.textContent = `Doctor: ${event.data}`;
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    socket.onclose = () => {
        console.log('Disconnected from WebSocket server');
    };
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    if (message && socket.readyState === WebSocket.OPEN) {
        const chatWindow = document.getElementById('chat-window');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.textContent = `You: ${message}`;
        chatWindow.appendChild(messageDiv);
        chatInput.value = '';

        // Send the message to the server
        socket.send(message);
    }
}

function sendFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (file && socket.readyState === WebSocket.OPEN) {
        const reader = new FileReader();
        reader.onload = function(event) {
            socket.send(event.target.result);
            alert('File sent successfully');
        };
        reader.readAsArrayBuffer(file);
    }
}

// Connect to WebSocket server on page load
document.addEventListener('DOMContentLoaded', connectWebSocket); 