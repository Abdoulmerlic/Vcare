function loadPatientDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'patient') {
        navigateTo('../login.html');
        return;
    }

    // Load appointments
    const appointmentsDiv = document.getElementById('appointments-list');
    if (appointmentsDiv) {
        appointmentsDiv.innerHTML = ''; // Clear previous content
        appointments.filter(app => app.patient === currentUser.username).forEach(app => {
            const appDiv = document.createElement('div');
            appDiv.className = 'appointment-card';
            appDiv.textContent = `${app.doctor} - ${app.date} at ${app.time} (${app.status})`;
            appointmentsDiv.appendChild(appDiv);
        });
    }

    // Load prescriptions
    const prescriptionsTable = document.getElementById('prescriptions-list');
    if (prescriptionsTable) {
        prescriptionsTable.innerHTML = ''; // Clear previous content
        medicalHistory.filter(record => record.patient === currentUser.username).forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${record.date}</td><td>${record.diagnosis}</td><td>${record.prescription}</td>`;
            prescriptionsTable.appendChild(row);
        });
    }
}

// Call this function on page load for patient dashboard
if (window.location.pathname.includes('patient-dashboard')) {
    loadPatientDashboard();
} 