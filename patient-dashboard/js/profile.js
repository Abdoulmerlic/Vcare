document.addEventListener('DOMContentLoaded', function() {
    const profileUpload = document.getElementById('profileUpload');
    const profileImage = document.getElementById('profileImage');
    
    // Load saved profile picture if exists
    const savedProfilePic = localStorage.getItem('profilePicture');
    if (savedProfilePic) {
        profileImage.src = savedProfilePic;
    }

    profileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                // Save to localStorage
                localStorage.setItem('profilePicture', e.target.result);
            }
            reader.readAsDataURL(file);
        }
    });

    // Load user info
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        if (currentUser.name) {
            document.getElementById('patientName').textContent = currentUser.name;
        }
        if (currentUser.email) {
            document.getElementById('patientEmail').textContent = currentUser.email;
        }
    }

    // Sidebar Toggle Functionality
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        
        // Save sidebar state to localStorage
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
    
    // Restore sidebar state on page load
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
    }
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
        } else if (!sidebarCollapsed) {
            sidebar.classList.remove('collapsed');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
}); 