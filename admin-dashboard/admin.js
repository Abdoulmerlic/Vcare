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
            row.innerHTML = `<td>${user.username}</td><td>${user.role}</td>`;
            usersTable.appendChild(row);
        });
    }

    // Load reports
    const reportsDiv = document.getElementById('reports-list');
    if (reportsDiv) {
        reportsDiv.innerHTML = ''; // Clear previous content
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