document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page's nav item
    switch(currentPage) {
        case 'index.html':
            document.getElementById('nav-dashboard').classList.add('active');
            break;
        case 'my-appointments.html':
            document.getElementById('nav-appointments').classList.add('active');
            break;
        case 'book-appointment.html':
            document.getElementById('nav-book').classList.add('active');
            break;
        case 'medical-history.html':
            document.getElementById('nav-history').classList.add('active');
            break;
        case 'prescriptions.html':
            document.getElementById('nav-prescriptions').classList.add('active');
            break;
        case 'chat-support.html':
            document.getElementById('nav-chat').classList.add('active');
            break;
        case 'settings.html':
            document.getElementById('nav-settings').classList.add('active');
            break;
    }
}); 