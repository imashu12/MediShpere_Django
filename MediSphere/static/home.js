// script.js
document.addEventListener('DOMContentLoaded', () => {
    const sideNav = document.getElementById('sideNav');
    const mainContent = document.getElementById('mainContent');
    let isMobile = false;

    // Check for mobile device
    const checkMobile = () => {
        isMobile = window.matchMedia('(max-width: 768px)').matches;
    };

    // Handle hover and touch events
    const handleNavInteraction = () => {
        if (!isMobile) {
            sideNav.addEventListener('mouseenter', () => {
                sideNav.classList.add('active');
            });
            sideNav.addEventListener('mouseleave', () => {
                sideNav.classList.remove('active');
            });
        } else {
            let touchStartX = 0;
            let touchEndX = 0;

            // Handle touch gestures
            document.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });

            document.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                const deltaX = touchEndX - touchStartX;

                if (Math.abs(deltaX) > 50) {
                    if (deltaX > 0 && touchStartX < 50) {
                        sideNav.classList.add('active');
                    } else {
                        sideNav.classList.remove('active');
                    }
                }
            });

            // Close nav when clicking outside
            document.addEventListener('click', (e) => {
                if (!sideNav.contains(e.target)) {
                    sideNav.classList.remove('active');
                }
            });
        }
    };

    // Handle window resize
    window.addEventListener('resize', () => {
        checkMobile();
        handleNavInteraction();
    });

    // Initialize
    checkMobile();
    handleNavInteraction();
});