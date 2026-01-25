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

if (profileSection && profileDropdown) {
    profileSection.addEventListener('mouseenter', () => {
        profileDropdown.style.opacity = '1';
        profileDropdown.style.visibility = 'visible';
        profileDropdown.style.transform = 'translateY(0)';
    });

    profileSection.addEventListener('mouseleave', () => {
        profileDropdown.style.opacity = '0';
        profileDropdown.style.visibility = 'hidden';
        profileDropdown.style.transform = 'translateY(-10px)';
    });

    // Close dropdown when clicking on a dropdown item
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const itemText = item.textContent.trim();
            alert(`Selected: ${itemText}`);
            
            // Close dropdown
            profileDropdown.style.opacity = '0';
            profileDropdown.style.visibility = 'hidden';
            profileDropdown.style.transform = 'translateY(-10px)';
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

// Make footer links clickable (these are still alerts since pages don't exist)
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const linkText = link.textContent.trim();
        alert(`Navigating to: ${linkText}`);
    });
});

// ========== SEARCH FUNCTIONALITY ==========
// DOM elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const currentLetterSpan = document.getElementById('current-letter');
const allMovieRows = document.querySelectorAll('.movie-row');

// Function to filter movies by first letter
function filterMoviesByLetter(letter) {
    if (!letter || letter.trim() === '') {
        return;
    }
    
    // Get the first character and convert to uppercase
    const firstChar = letter.charAt(0).toUpperCase();
    
    // Update the current letter display
    currentLetterSpan.textContent = firstChar;
    
    // Hide all movies initially
    allMovieRows.forEach(row => {
        row.style.display = 'none';
    });
    
    // Show only movies that start with the given letter
    const filteredRows = document.querySelectorAll(`.movie-row[data-letter="${firstChar}"]`);
    
    // Remove any existing no-results message
    const existingNoResults = document.querySelector('.no-results');
    if (existingNoResults) {
        existingNoResults.remove();
    }
    
    if (filteredRows.length === 0) {
        // Show no results message
        const resultsContainer = document.getElementById('results-container');
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `<p>No movies found starting with "${firstChar}"</p>`;
        resultsContainer.appendChild(noResults);
    } else {
        // Show filtered movies
        filteredRows.forEach(row => {
            row.style.display = 'block';
        });
    }
}

// Function to perform search
function performSearch() {
    const searchTerm = searchInput.value;
    
    if (searchTerm.trim() === '') {
        alert('Please enter a letter to search');
        return;
    }
    
    // Remove any existing no-results message
    const existingNoResults = document.querySelector('.no-results');
    if (existingNoResults) {
        existingNoResults.remove();
    }
    
    // Filter movies by the first letter
    filterMoviesByLetter(searchTerm);
}

// Initialize with movies starting with 'A'
window.addEventListener('DOMContentLoaded', function() {
    filterMoviesByLetter('A');
});

// Search functionality on button click
searchButton.addEventListener('click', function() {
    performSearch();
});

// Search functionality on Enter key
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Real-time filtering as user types
searchInput.addEventListener('input', function() {
    if (this.value.length === 1) {
        performSearch();
    }
});

// Make the search button animate on click
searchButton.addEventListener('mousedown', function() {
    this.style.transform = 'translateY(0)';
});

searchButton.addEventListener('mouseup', function() {
    this.style.transform = 'translateY(-2px)';
});

// ========== MOVIE CARD NAVIGATION TO OVERVIEW.HTML ==========
// Function to convert movie title to URL-friendly slug
function createMovieSlug(title) {
    return title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric with hyphens
        .replace(/^-|-$/g, '');       // Remove leading/trailing hyphens
}

// Add click event to each movie card
document.querySelectorAll('.movie-horizontal-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.movie-horizontal-title').textContent;
        const movieSlug = createMovieSlug(title);
        window.location.href = `overview.html?movie=${movieSlug}`;
    });
    
    // Make the card look clickable
    card.style.cursor = 'pointer';
});