// Prepopulate local storage with a default doctor account
document.addEventListener('DOMContentLoaded', function () {
    const defaultDoctor = {
        email: 'doctor@example.com',
        password: '12345',
    };

    const existingUsers = JSON.parse(localStorage.getItem('users')) || { doctors: [] };

    // Check if the default doctor already exists, if not add it
    if (!existingUsers.doctors.some(user => user.email === defaultDoctor.email)) {
        existingUsers.doctors.push(defaultDoctor);
        localStorage.setItem('users', JSON.stringify(existingUsers));
    }
});

// Handle doctor login form submission
document.getElementById('doctorLoginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect login inputs
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Retrieve existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || { doctors: [] };

    // Check if the doctor exists with matching credentials
    const doctor = existingUsers.doctors.find(
        user => user.email === email && user.password === password
    );

    if (doctor) {
        alert('Login successful! Redirecting to the dashboard...');
        window.location.href = '/doctor-dashboard/index.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
});
