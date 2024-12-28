document.getElementById('doctorRegistrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form inputs
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const specialization = document.querySelector('select[name="specialization"]').value;
    const license = document.querySelector('input[name="license"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Retrieve existing users from local storage or initialize if not present
    const existingUsers = JSON.parse(localStorage.getItem('users')) || { doctors: [] };

    // Add new doctor to the doctors list
    existingUsers.doctors.push({
        name,
        email,
        phone,
        specialization,
        license,
        password
    });

    // Save updated users back to local storage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registration successful! Please login.');
    window.location.href = '/doctor-login.html';
});