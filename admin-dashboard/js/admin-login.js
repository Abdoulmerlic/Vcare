document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Retrieve existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || { admins: [] };

    // Check if the admin exists
    const admin = existingUsers.admins.find(admin => admin.username === username && admin.password === password);

    if (admin) {
        alert('Login successful!');
        window.location.href = 'admin-dashboard/index.html';
    } else {
        alert('Invalid username or password.');
    }
});
