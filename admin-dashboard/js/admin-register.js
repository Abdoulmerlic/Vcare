document.getElementById('adminRegisterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Retrieve existing users from local storage or initialize if not present
    const existingUsers = JSON.parse(localStorage.getItem('users')) || { admins: [] };

    // Add new admin to the admins list
    existingUsers.admins.push({ username, password });

    // Save updated users back to local storage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registration successful! Please login.');
    window.location.href = 'admin-login.html';
});