document.getElementById('settings-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const notifications = document.getElementById('notifications').value;

    // Here you would typically send the data to the server
    console.log('Settings updated:', { username, email, password, notifications });

    alert('Settings saved successfully!');
}); 