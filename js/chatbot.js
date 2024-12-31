// Initialize the Generative AI with proper configuration
async function initializeAI() {
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro/generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer AIzaSyAB7MroMEUiGnUr7kwe8Bz1ND46Cz8ts-s`
            },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: 'Initialize chat' }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('AI initialized successfully');
    } catch (error) {
        console.error('Error initializing AI:', error);
    }
}

// Initialize chat history
let chatHistory = [];

async function sendMessage(message) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyAB7MroMEUiGnUr7kwe8Bz1ND46Cz8ts-s`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a professional healthcare chatbot named Vcare AI. Respond in a professional medical format without using asterisks (*). Use numbers for lists and proper paragraph spacing. When discussing medications or treatments, organize them clearly with numbers and proper medical terminology. ${message}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.9,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_NONE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_NONE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_NONE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_NONE"
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            let botMessage = data.candidates[0].content.parts[0].text;
            
            // Format the message to remove asterisks and improve formatting
            botMessage = botMessage
                .replace(/\*/g, '')
                .replace(/\n\n/g, '\n')
                .trim();
            
            // Add to chat history
            chatHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: botMessage }
            );
            
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
            
            return botMessage;
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error('Error in sendMessage:', error);
        return 'Sorry, I encountered an error. Please try again.';
    }
}

function updateChat(message, isUser = false) {
    try {
    const chatWindow = document.querySelector('.chat-window');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (!isUser) {
        messageDiv.innerHTML = `
            <div class="bot-avatar">
                <i class="fas fa-robot"></i>
            </div>
        `;
    }
    
    messageDiv.innerHTML += `
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    } catch (error) {
        console.error('Error in updateChat:', error);
    }
}

// Load chat history when page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            chatHistory = JSON.parse(savedHistory);
            chatHistory.forEach(msg => {
                updateChat(msg.content, msg.role === 'user');
            });
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
    }
});

// Handle form submission
document.querySelector('.chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.querySelector('.chat-input');
    const message = input.value.trim();
    
    if (message) {
        try {
            // Show user message immediately
        updateChat(message, true);
        input.value = '';
        
            // Show loading indicator
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'message bot';
            loadingDiv.innerHTML = `
                <div class="bot-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>Typing...</p>
                </div>
            `;
            document.querySelector('.chat-window').appendChild(loadingDiv);
            
            // Get bot response
        const response = await sendMessage(message);
            
            // Remove loading indicator
            loadingDiv.remove();
            
            // Show bot response
        updateChat(response);
        } catch (error) {
            console.error('Error in form submission:', error);
            updateChat('Sorry, something went wrong. Please try again.');
        }
    }
});

// Back button functionality
document.querySelector('.back-button').addEventListener('click', () => {
    window.history.back();
});

let uploadedFiles = [];

document.getElementById('file-upload').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const files = event.target.files;
    const previewContainer = document.querySelector('.file-upload-preview');
    
    for (let file of files) {
        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert(`File ${file.name} is too large. Maximum size is 5MB.`);
            continue;
        }

        uploadedFiles.push(file);
        
        // Create preview element
        const preview = document.createElement('div');
        preview.className = 'file-preview';
        
        // Choose icon based on file type
        let icon = 'fa-file';
        if (file.type.startsWith('image/')) icon = 'fa-image';
        else if (file.type === 'application/pdf') icon = 'fa-file-pdf';
        else if (file.type.includes('word')) icon = 'fa-file-word';
        
        preview.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${file.name}</span>
            <i class="fas fa-times remove-file"></i>
        `;
        
        // Add remove functionality
        preview.querySelector('.remove-file').addEventListener('click', () => {
            uploadedFiles = uploadedFiles.filter(f => f !== file);
            preview.remove();
        });
        
        previewContainer.appendChild(preview);
    }
}

async function sendMessageWithFiles(message) {
    const formData = new FormData();
    formData.append('message', message);
    
    uploadedFiles.forEach((file, index) => {
        formData.append(`file${index}`, file);
    });

    // Add file information to the message
    if (uploadedFiles.length > 0) {
        const fileNames = uploadedFiles.map(f => f.name).join(', ');
        message += `\n\nAttached files: ${fileNames}`;
    }

    // Send message and files
    const response = await sendMessage(message);
    
    // Clear uploaded files after sending
    uploadedFiles = [];
    document.querySelector('.file-upload-preview').innerHTML = '';
    
    return response;
}

// Update the form submission handler
document.querySelector('.chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.querySelector('.chat-input');
    const message = input.value.trim();
    
    if (message || uploadedFiles.length > 0) {
        try {
            updateChat(message, true);
            input.value = '';
            
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'message bot';
            loadingDiv.innerHTML = `
                <div class="bot-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>Typing...</p>
                </div>
            `;
            document.querySelector('.chat-window').appendChild(loadingDiv);
            
            const response = await sendMessageWithFiles(message);
            
            loadingDiv.remove();
            updateChat(response);
        } catch (error) {
            console.error('Error in form submission:', error);
            updateChat('Sorry, something went wrong. Please try again.');
        }
    }
});
