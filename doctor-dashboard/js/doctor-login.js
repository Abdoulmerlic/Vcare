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
