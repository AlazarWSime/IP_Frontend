// DOM elements
const genreItems = document.querySelectorAll('.genre-item');
const selectedGenreTitle = document.getElementById('selected-genre');
const moviesContainer = document.getElementById('movies-container');

// Genre display names with emoji
const genreDisplayNames = {
    'action': '🎭 Action',
    'adventure': '🌍 Adventure',
    'animation': '🎨 Animation',
    'comedy': '😂 Comedy',
    'crime': '🕵️ Crime',
    'drama': '🎭 Drama',
    'fantasy': '🧙 Fantasy',
    'horror': '👻 Horror',
    'music': '🎵 Music',
    'mystery': '🧠 Mystery',
    'romance': '💖 Romance',
    'scifi': '🚀 Sci-Fi',
    'thriller': '😱 Thriller'
};

// Function to select a genre
function selectGenre(genre) {
    // Remove active class from all genre items
    genreItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to the clicked genre
    const clickedGenre = document.querySelector(`.genre-item[data-genre="${genre}"]`);
    if (clickedGenre) {
        clickedGenre.classList.add('active');
    }
    
    // Update the selected genre title with emoji
    selectedGenreTitle.textContent = genreDisplayNames[genre] || genre;
    
    // Get all movie items
    const allMovieItems = document.querySelectorAll('.movie-item');
    
    // Hide all movies first
    allMovieItems.forEach(item => {
        item.style.display = 'none';
    });
    
    // Show movies for the selected genre
    const genreMovieItems = document.querySelectorAll(`.movie-item[data-genre="${genre}"]`);
    
    if (genreMovieItems.length === 0) {
        // Remove any existing no-movies message
        const existingNoMovies = document.querySelector('.no-movies');
        if (existingNoMovies) {
            existingNoMovies.remove();
        }
        
        // Show no movies message
        const noMovies = document.createElement('div');
        noMovies.className = 'no-movies';
        noMovies.textContent = `No movies found for ${genreDisplayNames[genre]}. Coming soon!`;
        moviesContainer.appendChild(noMovies);
    } else {
        // Remove any existing no-movies message
        const existingNoMovies = document.querySelector('.no-movies');
        if (existingNoMovies) {
            existingNoMovies.remove();
        }
        
        // Show the movies
        genreMovieItems.forEach(item => {
            item.style.display = 'flex';
        });
    }
}

// Add click event to all genre items
genreItems.forEach(item => {
    item.addEventListener('click', function() {
        const genre = this.getAttribute('data-genre');
        selectGenre(genre);
    });
});

// Initialize with Action genre selected
selectGenre('action');

// ========== NAVBAR FUNCTIONALITY ==========
const mobileMenu = document.getElementById('mobile-menu');
const burgerMenuContent = document.getElementById('burgerMenuContent');
const burgerOverlay = document.getElementById('burgerOverlay');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        burgerMenuContent.classList.toggle('active');
        burgerOverlay.classList.toggle('active');
        document.body.style.overflow = burgerMenuContent.classList.contains('active') ? 'hidden' : '';
    });
}

if (burgerOverlay) {
    burgerOverlay.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        burgerMenuContent.classList.remove('active');
        burgerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

document.querySelectorAll('.burger-nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
        }
        mobileMenu.classList.remove('active');
        burgerMenuContent.classList.remove('active');
        burgerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Profile dropdown
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

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Check if this is the login button or a real link
            const href = item.getAttribute('href');
            
            if (item.id === 'login-button' || (href && href !== '#' && !href.startsWith('javascript'))) {
                // Allow default behavior for actual links
                // Just hide the dropdown
                profileDropdown.style.opacity = '0';
                profileDropdown.style.visibility = 'hidden';
                profileDropdown.style.transform = 'translateY(-10px)';
                return;
            }
            
            e.preventDefault();
            alert(`Selected: ${item.textContent.trim()}`);
            profileDropdown.style.opacity = '0';
            profileDropdown.style.visibility = 'hidden';
            profileDropdown.style.transform = 'translateY(-10px)';
        });
    });
}

// Escape key to close burger menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burgerMenuContent && burgerMenuContent.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        burgerMenuContent.classList.remove('active');
        burgerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Footer links
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`Navigating to: ${link.textContent.trim()}`);
    });
});

console.log('Genre page loaded successfully!');