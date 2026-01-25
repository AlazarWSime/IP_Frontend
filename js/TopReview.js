// ========== NAVBAR FUNCTIONALITY ==========
// Get elements
const mobileMenu = document.getElementById('mobile-menu');
const burgerMenuContent = document.getElementById('burgerMenuContent');
const burgerOverlay = document.getElementById('burgerOverlay');

// Toggle burger menu
if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        burgerMenuContent.classList.toggle('active');
        burgerOverlay.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        document.body.style.overflow = burgerMenuContent.classList.contains('active') ? 'hidden' : '';
    });
}

// Close burger menu when clicking on overlay
if (burgerOverlay) {
    burgerOverlay.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        burgerMenuContent.classList.remove('active');
        burgerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close burger menu when clicking on a link
document.querySelectorAll('.burger-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        burgerMenuContent.classList.remove('active');
        burgerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Profile dropdown functionality
const profileSection = document.querySelector('.profile-section');
const profileDropdown = document.querySelector('.profile-dropdown');

// Show dropdown on hover
if (profileSection && profileDropdown) {
    profileSection.addEventListener('mouseenter', () => {
        profileDropdown.style.opacity = '1';
        profileDropdown.style.visibility = 'visible';
        profileDropdown.style.transform = 'translateY(0)';
    });

    // Hide dropdown when mouse leaves
    profileSection.addEventListener('mouseleave', () => {
        profileDropdown.style.opacity = '0';
        profileDropdown.style.visibility = 'hidden';
        profileDropdown.style.transform = 'translateY(-10px)';
    });

    // Only prevent default for "#" links (My Profile, Settings)
    // Let actual links navigate normally
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Only prevent default for "#" links
            if (item.getAttribute('href') === '#') {
                e.preventDefault();
                const itemText = item.textContent.trim();
                alert(`Selected: ${itemText}`);
                
                // Close dropdown
                profileDropdown.style.opacity = '0';
                profileDropdown.style.visibility = 'hidden';
                profileDropdown.style.transform = 'translateY(-10px)';
            }
            // For actual links (myreviews.html, watchlist.html, login2.html), let them navigate normally
        });
    });
}

// Close burger menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burgerMenuContent.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        burgerMenuContent.classList.remove('active');
        burgerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Footer links - allow navigation
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Only prevent default for "#" links
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
            const linkText = link.textContent.trim();
            alert(`Navigating to: ${linkText}`);
        }
        // For actual links (about.html, contact.html, privacy.html), let them navigate normally
    });
});

// Leaderboard item click functionality - View Reviewer Profile
document.querySelectorAll('.leaderboard-item').forEach(item => {
    item.addEventListener('click', function() {
        const username = this.querySelector('.user-name').textContent.split('\n')[0].trim();
        const realName = this.querySelector('.user-real-name').textContent;
        const userImg = this.querySelector('.user-avatar img').src;
        
        const rankElement = this.querySelector('.rank');
        const medalElement = rankElement.querySelector('.rank-medal');
        let rank;
        
        if (medalElement) {
            const medalNumber = medalElement.querySelector('.medal-number').textContent;
            const medalType = medalElement.classList.contains('gold') ? 'Gold' : 
                             medalElement.classList.contains('silver') ? 'Silver' : 'Bronze';
            rank = `${medalNumber} (${medalType} Medal)`;
        } else {
            rank = rankElement.querySelector('.rank-number').textContent;
        }
        
        const xp = this.querySelector('.xp-points').textContent;
        
        // Create a modal-like alert with user info
        const modalHTML = `
            <div style="text-align: center;">
                <img src="${userImg}" alt="${realName}" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 10px; border: 3px solid #FF0000;">
                <h3 style="margin: 10px 0; color: #FF0000;">${username}</h3>
                <p style="margin: 5px 0; font-weight: bold;">${realName}</p>
                <p style="margin: 5px 0;">Rank: ${rank}</p>
                <p style="margin: 5px 0;">XP Points: ${xp}</p>
                <p style="margin-top: 15px; color: #666; font-size: 0.9em;">Click would view detailed profile, reviews, and watchlist</p>
            </div>
        `;
        
        // Use a more styled alert (in production you'd use a modal)
        alert(`Reviewer Profile:\n\n${realName} (@${username})\nRank: ${rank}\nXP: ${xp}\n\nClicking would view this reviewer's full profile, their reviews, and watchlist.`);
    });
});

// Stat card click functionality
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', function() {
        const statLabel = this.querySelector('.stat-label').textContent;
        const statValue = this.querySelector('.stat-value').textContent;
        
        alert(`${statLabel}: ${statValue}\n\nThis shows the ${statLabel.toLowerCase()} on the platform.`);
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const userAvatars = document.querySelectorAll('.user-avatar img');
    
    userAvatars.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Initial styles for fade-in effect
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});