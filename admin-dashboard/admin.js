function loadAdminDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        navigateTo('../admin-login.html');
        return;
    }

    // Load users
    const usersTable = document.getElementById('users-list');
    if (usersTable) {
        usersTable.innerHTML = ''; // Clear previous content
        const storedUsers = JSON.parse(localStorage.getItem('users')) || { patients: [], doctors: [], admins: [] };
        storedUsers.patients.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${user.username}</td><td>Patient</td>`;
            usersTable.appendChild(row);
        });
        storedUsers.doctors.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${user.username}</td><td>Doctor</td>`;
            usersTable.appendChild(row);
        });
    }

    // Load doctors
    const doctorsTable = document.getElementById('doctors-list');
    if (doctorsTable) {
        doctorsTable.innerHTML = ''; // Clear previous content
        const storedUsers = JSON.parse(localStorage.getItem('users')) || { patients: [], doctors: [], admins: [] };
        storedUsers.doctors.forEach(doctor => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${doctor.username}</td><td>Doctor</td>`;
            doctorsTable.appendChild(row);
        });
    }

    // Load appointments
    const appointmentsTable = document.getElementById('appointments-list');
    if (appointmentsTable) {
        appointmentsTable.innerHTML = ''; // Clear previous content
        appointments.forEach(app => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${app.patient}</td><td>${app.doctor}</td><td>${app.date}</td><td>${app.time}</td><td>${app.status}</td>`;
            appointmentsTable.appendChild(row);
        });
    }

    // Load reports
    const reportsDiv = document.getElementById('reports-list');
    if (reportsDiv) {
        reportsDiv.innerHTML = ''; // Clear previous content
        // Mock reports data
        const reports = [
            { title: "Monthly Report", date: "2023-11-01" },
            { title: "Weekly Summary", date: "2023-11-07" }
        ];
        reports.forEach(report => {
            const reportDiv = document.createElement('div');
            reportDiv.className = 'report-card';
            reportDiv.textContent = `${report.title} - ${report.date}`;
            reportsDiv.appendChild(reportDiv);
        });
    }
}

// Call this function on page load for admin dashboard
if (window.location.pathname.includes('admin-dashboard')) {
    loadAdminDashboard();
} 