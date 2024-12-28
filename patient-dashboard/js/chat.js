document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    const chatWindow = document.querySelector('.chat-window');
    const sendBtn = document.querySelector('.send-btn');

    sendBtn.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            addMessageToChat('You', message);
            chatInput.value = '';
            // Simulate a response from the chatbot
            setTimeout(() => {
                addMessageToChat('Chatbot', 'This is a response to: ' + message);
            }, 1000);
        }
    });

    function addMessageToChat(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
    }
}); 