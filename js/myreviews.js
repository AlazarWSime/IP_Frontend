// JavaScript for My Reviews Page

// Sample reviews data - In a real app, this would come from a database
const myReviews = [
    {
        id: 1,
        movieTitle: "K-Pop Demon Hunter",
        movieYear: "2025",
        moviePoster: "../resource/KPDHposter.jpeg",
        movieOverviewLink: "overview.html?movie=KPDHposter",
        rating: "★★★★☆",
        reviewText: "An exciting blend of K-Pop and action! The music sequences are incredibly well-choreographed and the demon-hunting concept is fresh and entertaining. While the plot is somewhat predictable, the energy and style make up for it. The visual effects during the concert scenes are particularly impressive.",
        reviewDate: "March 15, 2024",
        likes: 24,
        isLiked: true
    },
    {
        id: 2,
        movieTitle: "Inception",
        movieYear: "2010",
        moviePoster: "../resource/Inception.jpg",
        movieOverviewLink: "#",
        rating: "★★★★★",
        reviewText: "Christopher Nolan's masterpiece that redefined modern cinema. The concept of dream infiltration is brilliantly executed with stunning visuals and a mind-bending plot. The practical effects combined with CGI create a seamless reality-bending experience. The ending still leaves me questioning reality every time I watch it.",
        reviewDate: "February 28, 2024",
        likes: 156,
        isLiked: false
    },
    {
        id: 3,
        movieTitle: "Parasite",
        movieYear: "2019",
        moviePoster: "../resource/Parasite.jpg",
        movieOverviewLink: "#",
        rating: "★★★★★",
        reviewText: "Bong Joon-ho's social commentary is both hilarious and horrifying. The way the film transitions from comedy to thriller to tragedy is masterful. Every scene is meticulously crafted to reveal more about class dynamics. The basement scene will haunt me forever - a perfect example of tension-building in cinema.",
        reviewDate: "January 10, 2024",
        likes: 89,
        isLiked: true
    },
    {
        id: 4,
        movieTitle: "Interstellar",
        movieYear: "2014",
        moviePoster: "../resource/Interstellar.jpg",
        movieOverviewLink: "#",
        rating: "★★★★★",
        reviewText: "A visually stunning and emotionally powerful journey through space and time. Hans Zimmer's score elevates every scene to new heights. The science is fascinating, but it's the father-daughter relationship that truly anchors the film. The water planet and black hole sequences are some of the most breathtaking visuals I've ever seen in cinema.",
        reviewDate: "December 5, 2023",
        likes: 203,
        isLiked: true
    }
];

// DOM Elements
const reviewsContainer = document.getElementById('reviews-container');
const emptyState = document.getElementById('empty-state');
const burgerMenu = document.getElementById('burgerMenu');
const burgerMenuContent = document.getElementById('burgerMenuContent');
const burgerOverlay = document.getElementById('burgerOverlay');

// Function to render reviews
function renderReviews() {
    // Clear container
    reviewsContainer.innerHTML = '';
    
    // Check if reviews are empty
    if (myReviews.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    // Hide empty state
    emptyState.style.display = 'none';
    
    // Add each review to the container
    myReviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        reviewElement.innerHTML = `
            <button class="delete-btn" data-id="${review.id}">
                <i class="fas fa-trash"></i>
            </button>
            
            <div class="review-header">
                <div class="movie-poster">
                    <img src="${review.moviePoster}" alt="${review.movieTitle}" loading="lazy">
                </div>
                <div class="review-movie-info">
                    <div class="review-movie-title">${review.movieTitle}</div>
                    <div class="review-movie-details">
                        <span class="review-movie-year">(${review.movieYear})</span>
                    </div>
                    <div class="review-rating-container">
                        <span class="review-rating-label">My Rating:</span>
                        <span class="review-rating">${review.rating}</span>
                    </div>
                </div>
            </div>
            
            <div class="review-content">
                ${review.reviewText}
            </div>
            
            <div class="review-footer">
                <div class="review-date">
                    Reviewed on ${review.reviewDate}
                </div>
                <div class="review-actions">
                    <button class="review-action-btn like-btn" data-id="${review.id}">
                        <i class="fas fa-thumbs-up ${review.isLiked ? 'liked' : ''}"></i>
                        <span>${review.likes}</span>
                    </button>
                    <button class="review-action-btn edit-btn" data-id="${review.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </div>
        `;
        
        reviewsContainer.appendChild(reviewElement);
        
        // Add click event to movie poster/title
        if (review.movieOverviewLink && review.movieOverviewLink !== '#') {
            const poster = reviewElement.querySelector('.movie-poster');
            const title = reviewElement.querySelector('.review-movie-title');
            
            poster.style.cursor = 'pointer';
            title.style.cursor = 'pointer';
            
            poster.addEventListener('click', () => {
                window.location.href = review.movieOverviewLink;
            });
            
            title.addEventListener('click', () => {
                window.location.href = review.movieOverviewLink;
            });
        }
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const reviewId = parseInt(button.getAttribute('data-id'));
            deleteReview(reviewId);
        });
    });
    
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const reviewId = parseInt(button.getAttribute('data-id'));
            toggleLike(reviewId);
        });
    });
    
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const reviewId = parseInt(button.getAttribute('data-id'));
            editReview(reviewId);
        });
    });
}

// Function to delete review
function deleteReview(reviewId) {
    if (confirm('Delete this review? This action cannot be undone.')) {
        const index = myReviews.findIndex(review => review.id === reviewId);
        if (index !== -1) {
            myReviews.splice(index, 1);
            renderReviews();
            showNotification('Review deleted successfully');
        }
    }
}

// Function to toggle like
function toggleLike(reviewId) {
    const review = myReviews.find(r => r.id === reviewId);
    if (review) {
        review.isLiked = !review.isLiked;
        review.likes = review.isLiked ? review.likes + 1 : review.likes - 1;
        renderReviews();
        showNotification(review.isLiked ? 'Review liked!' : 'Review unliked');
    }
}

// Function to edit review
function editReview(reviewId) {
    const review = myReviews.find(r => r.id === reviewId);
    if (review) {
        const newReviewText = prompt('Edit your review:', review.reviewText);
        if (newReviewText !== null && newReviewText.trim() !== '') {
            review.reviewText = newReviewText.trim();
            renderReviews();
            showNotification('Review updated successfully');
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

// Function to toggle burger menu
function toggleBurgerMenu() {
    burgerMenu.classList.toggle('active');
    burgerMenuContent.classList.toggle('active');
    burgerOverlay.classList.toggle('active');
    document.body.style.overflow = burgerMenuContent.classList.contains('active') ? 'hidden' : 'auto';
}

// Function to close burger menu
function closeBurgerMenu() {
    burgerMenu.classList.remove('active');
    burgerMenuContent.classList.remove('active');
    burgerOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .fa-thumbs-up.liked {
            color: #FF0000;
        }
    `;
    document.head.appendChild(style);
    
    // Render reviews
    renderReviews();
    
    // Setup burger menu
    burgerMenu.addEventListener('click', toggleBurgerMenu);
    burgerOverlay.addEventListener('click', closeBurgerMenu);
    
    // Close burger menu when clicking on a link
    document.querySelectorAll('.burger-nav-links a').forEach(link => {
        link.addEventListener('click', closeBurgerMenu);
    });
    
    // Footer links functionality
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`Navigating to: ${link.textContent.trim()}`);
        });
    });
    
    // Set active link in burger menu
    document.querySelectorAll('.burger-nav-links a').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active-link');
        }
    });
    
    console.log('My Reviews page loaded successfully!');
});