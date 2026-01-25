// JavaScript for Watchlist Page

// Sample watchlist data - In a real app, this would come from a database
const watchlistMovies = [
    {
        id: 1,
        title: "K-Pop Demon Hunter",
        year: "2025",
        views: "650k view",
        rating: "★★★★☆",
        poster: "../resource/KPDHposter.jpeg",
        genre: "action",
        overviewLink: "overview.html?movie=KPDHposter"
    },
    {
        id: 2,
        title: "Inception",
        year: "2010",
        views: "2.9M view",
        rating: "★★★★★",
        poster: "../resource/Inception.jpg",
        genre: "action",
        overviewLink: "#"
    },
    {
        id: 3,
        title: "Interstellar",
        year: "2014",
        views: "2.6M view",
        rating: "★★★★★",
        poster: "../resource/Interstellar.jpg",
        genre: "adventure",
        overviewLink: "#"
    },
    {
        id: 4,
        title: "Parasite",
        year: "2019",
        views: "900k view",
        rating: "★★★★★",
        poster: "../resource/Parasite.jpg",
        genre: "comedy",
        overviewLink: "#"
    }
];

// DOM Elements
const watchlistContainer = document.getElementById('watchlist-container');
const emptyState = document.getElementById('empty-state');

// Function to render watchlist movies
function renderWatchlist() {
    // Clear container
    watchlistContainer.innerHTML = '';
    
    // Check if watchlist is empty
    if (watchlistMovies.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    // Hide empty state
    emptyState.style.display = 'none';
    
    // Add each movie to the container
    watchlistMovies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        movieElement.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            </div>
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-details">
                    <span class="movie-views">(${movie.views})</span>
                    <span class="movie-rating">${movie.rating}</span>
                </div>
                <div class="movie-year">(${movie.year})</div>
            </div>
            <button class="remove-btn" data-id="${movie.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        watchlistContainer.appendChild(movieElement);
        
        // Add click event to movie item
        if (movie.overviewLink && movie.overviewLink !== '#') {
            movieElement.style.cursor = 'pointer';
            movieElement.addEventListener('click', (e) => {
                if (!e.target.classList.contains('remove-btn') && 
                    !e.target.closest('.remove-btn')) {
                    window.location.href = movie.overviewLink;
                }
            });
        }
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieId = parseInt(button.getAttribute('data-id'));
            removeFromWatchlist(movieId);
        });
    });
}

// Function to remove movie from watchlist
function removeFromWatchlist(movieId) {
    if (confirm('Remove this movie from your watchlist?')) {
        const index = watchlistMovies.findIndex(movie => movie.id === movieId);
        if (index !== -1) {
            watchlistMovies.splice(index, 1);
            renderWatchlist();
            showNotification('Movie removed from watchlist');
        }
    }
}

// Function to show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #FF0000;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderWatchlist();
    console.log('Watchlist page loaded successfully!');
});