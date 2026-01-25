// Home Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ===== HERO SLIDER FUNCTIONALITY =====
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const playButtons = document.querySelectorAll('.play-btn');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Ensure index is within bounds
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Function to go to next slide
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        showSlide(currentSlide);
    }

    // Function to go to previous slide
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        showSlide(currentSlide);
    }

    // Event listeners for arrows
    if (nextArrow) {
        nextArrow.addEventListener('click', nextSlide);
    }
    
    if (prevArrow) {
        prevArrow.addEventListener('click', prevSlide);
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetInterval();
        });
    });

    // Auto slide functionality
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Start the slideshow
    startSlideShow();

    // Pause slideshow on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        heroSection.addEventListener('mouseleave', () => {
            startSlideShow();
        });
    }

    // ===== PLAY BUTTON FUNCTIONALITY - REMOVED REDIRECTION CODE =====
    // Note: Play buttons are now anchor tags with href to video files
    // No JavaScript needed for redirection - it's handled by the anchor tag
    
    // ===== BURGER MENU FUNCTIONALITY =====
    const mobileMenu = document.getElementById('mobile-menu');
    const burgerMenuContent = document.getElementById('burgerMenuContent');
    const burgerOverlay = document.getElementById('burgerOverlay');
    
    if (mobileMenu && burgerMenuContent && burgerOverlay) {
        mobileMenu.addEventListener('click', function() {
            // Toggle active class for animation
            this.classList.toggle('active');
            
            // Show/hide burger menu and overlay
            burgerMenuContent.classList.toggle('active');
            burgerOverlay.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu when clicking overlay
        burgerOverlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            burgerMenuContent.classList.remove('active');
            this.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        // Close menu when clicking menu links
        const burgerLinks = document.querySelectorAll('.burger-nav-links a');
        burgerLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                burgerMenuContent.classList.remove('active');
                burgerOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // ===== PROFILE DROPDOWN FUNCTIONALITY =====
    const profileSection = document.querySelector('.profile-section');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (profileSection && profileDropdown) {
        profileSection.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            profileDropdown.classList.remove('active');
        });
        
        // Prevent dropdown from closing when clicking inside it
        profileDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // ===== ENHANCED MOVIE CARD INTERACTIVITY =====
    // Note: Movie cards are now <a> tags, so no need for click events
    // But we can add additional effects
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        // Add keyboard navigation for accessibility
        card.setAttribute('tabindex', '0');
        
        // Add focus effects
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid #ff0000';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ADD ACTIVE STATE TO NAV LINKS BASED ON SCROLL =====
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
    }
    
    // Only run if we have sections with IDs
    if (sections.length > 0 && sections[0].hasAttribute('id')) {
        window.addEventListener('scroll', highlightNavLink);
    }

    // ===== LAZY LOADING FOR IMAGES =====
    const lazyImages = document.querySelectorAll('.movie-poster');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('src');
                    
                    // Load the image
                    img.src = src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===== FOOTER YEAR UPDATE =====
    const yearElement = document.querySelector('.copyright span:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} REAL REVIEW`;
    }

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        // Left arrow for previous slide
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        }
        
        // Right arrow for next slide
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
        }
        
        // Escape to close menus
        if (e.key === 'Escape') {
            if (burgerMenuContent && burgerMenuContent.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                burgerMenuContent.classList.remove('active');
                burgerOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
            
            if (profileDropdown && profileDropdown.classList.contains('active')) {
                profileDropdown.classList.remove('active');
            }
        }
        
        // Space/Enter to activate focused movie card
        if (e.key === ' ' || e.key === 'Enter') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('movie-card')) {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });

    // ===== ADD LOADING STATE FOR MOVIE CARDS =====
    // Show loading animation for movie cards
    movieCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Add loading state
            const originalHTML = this.innerHTML;
            this.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Loading...</span>
                </div>
            `;
            this.style.pointerEvents = 'none';
            
            // Store original content to restore if navigation fails
            this.dataset.originalContent = originalHTML;
            
            // Timeout to restore content if navigation takes too long
            setTimeout(() => {
                if (this.innerHTML.includes('loading-spinner')) {
                    this.innerHTML = originalHTML;
                    this.style.pointerEvents = 'auto';
                    console.log('Navigation timeout - restored content');
                }
            }, 5000);
        });
    });

    console.log('Home page JavaScript loaded successfully!');
});