// ===== NAVBAR FUNCTIONALITY =====
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

if (profileSection && profileDropdown) {
    // Show dropdown on hover
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

    // Only prevent default for non-navigation dropdown items
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

// ===== VIDEO PLAYER FUNCTIONALITY =====
const playTrailerBtn = document.getElementById('playTrailerBtn');
const closeVideoBtn = document.getElementById('closeVideoBtn');
const videoContainer = document.getElementById('videoContainer');
const trailerVideo = document.getElementById('trailerVideo');
const heroBackground = document.querySelector('.hero-background');

if (playTrailerBtn && videoContainer && trailerVideo) {
    // Play trailer when play button is clicked
    playTrailerBtn.addEventListener('click', function() {
        // Show video container
        videoContainer.classList.add('active');
        
        // Hide hero background
        heroBackground.style.opacity = '0';
        
        // Play the video
        trailerVideo.play();
        
        // Prevent body scrolling when video is playing
        document.body.style.overflow = 'hidden';
    });

    // Close video when close button is clicked
    closeVideoBtn.addEventListener('click', function() {
        // Hide video container
        videoContainer.classList.remove('active');
        
        // Show hero background
        heroBackground.style.opacity = '1';
        
        // Pause the video
        trailerVideo.pause();
        trailerVideo.currentTime = 0;
        
        // Restore body scrolling
        document.body.style.overflow = '';
    });

    // Close video when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoContainer.classList.contains('active')) {
            videoContainer.classList.remove('active');
            heroBackground.style.opacity = '1';
            trailerVideo.pause();
            trailerVideo.currentTime = 0;
            document.body.style.overflow = '';
        }
    });

    // Close video when clicking outside the video (on the black background)
    videoContainer.addEventListener('click', function(e) {
        if (e.target === videoContainer) {
            videoContainer.classList.remove('active');
            heroBackground.style.opacity = '1';
            trailerVideo.pause();
            trailerVideo.currentTime = 0;
            document.body.style.overflow = '';
        }
    });
}

// ===== MOVIE PAGE FUNCTIONALITY =====
function switchTab(id) {
    // Remove active class from all tabs
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    // Hide all sections
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    
    // Add active class to clicked tab
    document.querySelector(`[onclick="switchTab('${id}')"]`).classList.add("active");
    // Show corresponding section
    document.getElementById(id).classList.add("active");
}

// ===== REVIEW MODAL FUNCTIONALITY =====
const reviewModal = document.getElementById('reviewModal');
const openReviewModalBtn = document.getElementById('openReviewModalBtn');
const openReviewModalPageBtn = document.getElementById('openReviewModalPageBtn');
const closeReviewModalBtn = document.getElementById('closeReviewModalBtn');
const cancelReviewBtn = document.getElementById('cancelReviewBtn');
const submitReviewModalBtn = document.getElementById('submitReviewModalBtn');
const starModals = document.querySelectorAll('.star-modal');
const ratingTextModal = document.querySelector('.rating-text-modal');
const reviewTextareaModal = document.querySelector('.review-textarea-modal');

let selectedModalRating = 0;

// Function to open review modal
function openReviewModal() {
    reviewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset form
    selectedModalRating = 0;
    reviewTextareaModal.value = '';
    updateStarDisplay();
    
    // Focus on textarea after a short delay
    setTimeout(() => {
        reviewTextareaModal.focus();
    }, 300);
}

// Function to close review modal
function closeReviewModal() {
    reviewModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Open modal when Review button is clicked
if (openReviewModalBtn) {
    openReviewModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openReviewModal();
    });
}

// Open modal when "Write a Review" button is clicked in page
if (openReviewModalPageBtn) {
    openReviewModalPageBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openReviewModal();
    });
}

// Close modal when X button is clicked
if (closeReviewModalBtn) {
    closeReviewModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeReviewModal();
    });
}

// Close modal when Cancel button is clicked
if (cancelReviewBtn) {
    cancelReviewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeReviewModal();
    });
}

// Close modal when clicking outside the modal content
reviewModal.addEventListener('click', function(e) {
    if (e.target === reviewModal) {
        closeReviewModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && reviewModal.classList.contains('active')) {
        closeReviewModal();
    }
});

// Update star display function
function updateStarDisplay() {
    starModals.forEach((star, index) => {
        if (index < selectedModalRating) {
            star.classList.add('selected');
            star.textContent = '★';
        } else {
            star.classList.remove('selected');
            star.textContent = '☆';
        }
    });
    
    // Update rating text
    ratingTextModal.textContent = `${selectedModalRating}/5`;
}

// Star rating functionality for modal
starModals.forEach(star => {
    star.addEventListener('click', function() {
        selectedModalRating = parseInt(this.getAttribute('data-rating'));
        updateStarDisplay();
    });
    
    // Hover effect for stars
    star.addEventListener('mouseover', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
        
        starModals.forEach((s, index) => {
            if (index < rating) {
                s.textContent = '★';
            } else {
                s.textContent = '☆';
            }
        });
    });
    
    star.addEventListener('mouseout', function() {
        starModals.forEach((s, index) => {
            if (index < selectedModalRating) {
                s.textContent = '★';
            } else {
                s.textContent = '☆';
            }
        });
    });
});

// Submit review functionality for modal
if (submitReviewModalBtn) {
    submitReviewModalBtn.addEventListener('click', function() {
        const reviewText = reviewTextareaModal.value;
        
        if (!reviewText.trim()) {
            alert('Please write a review before submitting.');
            reviewTextareaModal.focus();
            return;
        }
        
        if (selectedModalRating === 0) {
            alert('Please select a star rating before submitting.');
            return;
        }
        
        // Show loading state
        const originalText = submitReviewModalBtn.textContent;
        submitReviewModalBtn.textContent = 'Submitting...';
        submitReviewModalBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert(`Thank you for your ${selectedModalRating}-star review!\n\nYour review has been submitted successfully.`);
            
            // Reset form
            selectedModalRating = 0;
            reviewTextareaModal.value = '';
            updateStarDisplay();
            
            // Close modal
            closeReviewModal();
            
            // Reset button
            submitReviewModalBtn.textContent = originalText;
            submitReviewModalBtn.disabled = false;
        }, 1000);
    });
}

// ===== ACTION BUTTONS HANDLING =====
// Handle action buttons
document.querySelectorAll('.action').forEach(button => {
    // Check if parent is an anchor tag
    const parentLink = button.parentElement;
    
    if (parentLink.classList.contains('action-link')) {
        // If it's the Review button, it's already handled above
        // Other action links (like Add list) will work normally
    } else {
        // Buttons without parent links (Share, Report)
        button.addEventListener('click', function() {
            const actionText = this.querySelector('.action-text').textContent;
            if (actionText === 'Share') {
                // Share functionality
                if (navigator.share) {
                    navigator.share({
                        title: 'K-POP DEMON HUNTERS',
                        text: 'Check out this movie review on REAL REVIEW!',
                        url: window.location.href
                    });
                } else {
                    alert('Share link copied to clipboard!');
                    // Fallback: Copy URL to clipboard
                    navigator.clipboard.writeText(window.location.href);
                }
            } else if (actionText === 'Report') {
                alert('Report feature coming soon!');
            }
        });
    }
});

// ===== REVIEW FUNCTIONALITY =====
// Like button functionality for reviews
document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const isLiked = this.classList.contains('liked');
        const likesSpan = this.parentElement.querySelector('span');
        let currentLikes = parseInt(likesSpan.textContent.split(' ')[0]);
        
        if (isLiked) {
            this.classList.remove('liked');
            currentLikes--;
        } else {
            this.classList.add('liked');
            currentLikes++;
        }
        
        likesSpan.textContent = `${currentLikes} likes`;
    });
});

// ===== INITIALIZE PAGE =====
// Initialize with Overview tab active
window.addEventListener('DOMContentLoaded', function() {
    // Make sure Overview tab is active by default
    if (!document.querySelector('.tab.active')) {
        switchTab('overview');
    }
});