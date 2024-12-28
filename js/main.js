function navigateTo(page) {
    window.location.href = page;
}

// Mock data for demonstration
const users = {
    patients: [
        { username: "patient1", password: "pass1", role: "patient" },
        { username: "patient2", password: "pass2", role: "patient" }
    ],
    doctors: [
        { username: "doctor1", password: "pass1", role: "doctor" },
        { username: "doctor2", password: "pass2", role: "doctor" }
    ],
    admins: [
        { username: "admin1", password: "pass1", role: "admin" }
    ]
};

const appointments = [
    { patient: "patient1", doctor: "Dr. Smith", date: "2023-11-01", time: "10:00 AM", status: "Confirmed" },
    { patient: "patient2", doctor: "Dr. Jones", date: "2023-11-02", time: "2:00 PM", status: "Pending" }
];

const medicalHistory = [
    { patient: "patient1", date: "2023-10-01", diagnosis: "Flu", prescription: "Rest and hydration" },
    { patient: "patient2", date: "2023-09-15", diagnosis: "Allergy", prescription: "Antihistamines" }
];

function login(username, password) {
    // Retrieve users from local storage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || { patients: [], doctors: [], admins: [] };
    const allUsers = [...storedUsers.patients, ...storedUsers.doctors, ...storedUsers.admins];

    const user = allUsers.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        redirectToDashboard(user.role);
    } else {
        alert('Invalid credentials');
    }
}

function redirectToDashboard(role) {
    switch (role) {
        case 'patient':
            navigateTo('patient-dashboard/index.html');
            break;
        case 'doctor':
            navigateTo('doctor-dashboard/index.html');
            break;
        case 'admin':
            navigateTo('admin-dashboard/index.html');
            break;
        default:
            navigateTo('index.html');
    }
}

function loadPatientDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'patient') {
        navigateTo('../login.html');
        return;
    }

    // Load appointments
    const appointmentsDiv = document.getElementById('appointments-list');
    appointmentsDiv.innerHTML = ''; // Clear previous content
    appointments.filter(app => app.patient === currentUser.username).forEach(app => {
        const appDiv = document.createElement('div');
        appDiv.className = 'appointment-card';
        appDiv.textContent = `${app.doctor} - ${app.date} at ${app.time} (${app.status})`;
        appointmentsDiv.appendChild(appDiv);
    });

    // Load prescriptions
    const prescriptionsTable = document.getElementById('prescriptions-list');
    prescriptionsTable.innerHTML = ''; // Clear previous content
    medicalHistory.filter(record => record.patient === currentUser.username).forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${record.date}</td><td>${record.diagnosis}</td><td>${record.prescription}</td>`;
        prescriptionsTable.appendChild(row);
    });
}

function searchDoctors() {
    const query = document.getElementById('search').value;
    alert(`Searching for doctors with query: ${query}`);
}

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
            { month: "October", amount: "N2000" },
            { month: "November", amount: "N2500" }
        ];
        earnings.forEach(earning => {
            const earningDiv = document.createElement('div');
            earningDiv.className = 'earning-card';
            earningDiv.textContent = `${earning.month}: ${earning.amount}`;
            earningsDiv.appendChild(earningDiv);
        });
    }
}

// Call this function on page load for patient dashboard
if (window.location.pathname.includes('patient-dashboard.html')) {
    loadPatientDashboard();
}

// Call this function on page load for doctor dashboard
if (window.location.pathname.includes('/doctor-dashboard/index.html')) {
    loadDoctorDashboard();
} 