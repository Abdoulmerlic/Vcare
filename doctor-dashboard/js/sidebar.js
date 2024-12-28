function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const isMobile = window.innerWidth <= 768;

    // Set initial state based on screen size
    if (isMobile) {
        sidebar.classList.add('collapsed');
    }

    // Toggle sidebar
    toggleBtn.addEventListener('click', () => {
        if (isMobile) {
            sidebar.classList.toggle('expanded');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            sidebar.classList.remove('expanded');
        } else {
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('expanded');
        }
    });

    // Highlight active menu item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu-item').forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}

// Initialize if sidebar is already in the DOM
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('sidebar')) {
        initializeSidebar();
    }
}); 