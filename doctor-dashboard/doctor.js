function loadDoctorDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'doctor') {
        navigateTo('../login.html');
        return;
    }

    // Load appointments
    const appointmentsDiv = document.getElementById('appointments-list');
    if (appointmentsDiv) {
        appointmentsDiv.innerHTML = ''; // Clear previous content
        appointments.filter(app => app.doctor === currentUser.username).forEach(app => {
            const appDiv = document.createElement('div');
            appDiv.className = 'appointment-card';
            appDiv.textContent = `${app.patient} - ${app.date} at ${app.time} (${app.status})`;
            appointmentsDiv.appendChild(appDiv);
        });
    }

    // Load patient records
    const patientRecordsTable = document.getElementById('patient-records-list');
    if (patientRecordsTable) {
        patientRecordsTable.innerHTML = ''; // Clear previous content
        medicalHistory.filter(record => record.doctor === currentUser.username).forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${record.patient}</td><td>${record.date}</td><td>${record.diagnosis}</td><td>${record.prescription}</td>`;
            patientRecordsTable.appendChild(row);
        });
    }

    // Load earnings
    const earningsDiv = document.getElementById('earnings-list');
    if (earningsDiv) {
        earningsDiv.innerHTML = ''; // Clear previous content
        // Mock earnings data
        const earnings = [
            { month: "October", amount: "$2000" },
            { month: "November", amount: "$2500" }
        ];
        earnings.forEach(earning => {
            const earningDiv = document.createElement('div');
            earningDiv.className = 'earning-card';
            earningDiv.textContent = `${earning.month}: ${earning.amount}`;
            earningsDiv.appendChild(earningDiv);
        });
    }
}

// Call this function on page load for doctor dashboard
if (window.location.pathname.includes('doctor-dashboard')) {
    loadDoctorDashboard();
} 