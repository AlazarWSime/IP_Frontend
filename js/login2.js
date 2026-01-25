document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const googleCheckbox = document.getElementById('google-login');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const googleStatus = document.getElementById('googleStatus');
    const rememberCheckbox = document.getElementById('remember');
    
    // Check if user is already logged in (for demo purposes)
    checkLoginStatus();
    
    // Google login checkbox toggle
    googleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // When Google login is selected
            emailField.disabled = true;
            passwordField.disabled = true;
            emailField.placeholder = "Using Google login";
            passwordField.placeholder = "Using Google login";
            emailField.value = ""; // Clear any entered values
            passwordField.value = ""; // Clear any entered values
            
            // Update UI
            loginButton.textContent = "Continue with Google";
            loginButton.classList.add('google-mode');
            googleStatus.classList.add('show');
            
            // Focus on the button for better UX
            loginButton.focus();
        } else {
            // When Google login is not selected
            emailField.disabled = false;
            passwordField.disabled = false;
            emailField.placeholder = "Enter your email";
            passwordField.placeholder = "Enter your password";
            
            // Update UI
            loginButton.textContent = "Login";
            loginButton.classList.remove('google-mode');
            googleStatus.classList.remove('show');
            
            // Focus on email field for better UX
            emailField.focus();
        }
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (googleCheckbox.checked) {
            // Google login flow
            handleGoogleLogin();
        } else {
            // Email/password login flow
            handleEmailLogin();
        }
    });
    
    function handleGoogleLogin() {
        // Visual feedback
        const originalText = loginButton.textContent;
        loginButton.textContent = "Redirecting to Google...";
        loginButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            showSuccessMessage("Google Login Successful!", "Redirecting to home page...");
            
            // Store login state
            localStorage.setItem('realReviewLoggedIn', 'true');
            localStorage.setItem('realReviewUser', 'Google User');
            localStorage.setItem('realReviewLoginMethod', 'google');
            
            // Reset button (briefly show before redirect)
            setTimeout(() => {
                loginButton.textContent = originalText;
                loginButton.disabled = false;
                
                // Redirect to home page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 2000);
            }, 500);
            
        }, 1500);
    }
    
    function handleEmailLogin() {
        const email = emailField.value.trim();
        const password = passwordField.value.trim();
        const remember = rememberCheckbox.checked;
        
        // Validation
        if (!email || !password) {
            showError("Please enter both email and password.");
            
            // Highlight empty fields
            if (!email) {
                emailField.style.borderColor = "#ef4444";
                emailField.focus();
            }
            if (!password && email) {
                passwordField.style.borderColor = "#ef4444";
                passwordField.focus();
            }
            return;
        }
        
        // Reset any error highlighting
        emailField.style.borderColor = "";
        passwordField.style.borderColor = "";
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("Please enter a valid email address.");
            emailField.style.borderColor = "#ef4444";
            emailField.focus();
            return;
        }
        
        // Validate password (at least 6 characters for demo)
        if (password.length < 6) {
            showError("Password must be at least 6 characters long.");
            passwordField.style.borderColor = "#ef4444";
            passwordField.focus();
            return;
        }
        
        // Demo credentials check (for testing purposes)
        const demoCredentials = {
            "user@example.com": "password123",
            "test@test.com": "test123",
            "admin@realreview.com": "admin123"
        };
        
        // Check if it's a demo credential
        if (demoCredentials[email] && password === demoCredentials[email]) {
            // Visual feedback
            const originalText = loginButton.textContent;
            loginButton.textContent = "Logging in...";
            loginButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Create success message
                showSuccessMessage("Login Successful!", `Welcome back, ${email.split('@')[0]}!`, "Redirecting to home page...");
                
                // Store login state in localStorage
                localStorage.setItem('realReviewLoggedIn', 'true');
                localStorage.setItem('realReviewEmail', email);
                localStorage.setItem('realReviewUsername', email.split('@')[0]);
                localStorage.setItem('realReviewLoginMethod', 'email');
                
                if (remember) {
                    localStorage.setItem('realReviewRemember', 'true');
                } else {
                    localStorage.removeItem('realReviewRemember');
                }
                
                // Reset button (briefly show before redirect)
                setTimeout(() => {
                    loginButton.textContent = originalText;
                    loginButton.disabled = false;
                    
                    // Redirect to home page after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'home.html';
                    }, 2000);
                }, 500);
                
            }, 1500);
        } else {
            // Invalid credentials
            showError("Invalid email or password. Try: user@example.com / password123");
            passwordField.style.borderColor = "#ef4444";
            passwordField.focus();
        }
    }
    
    function showSuccessMessage(title, message1, message2 = "") {
        // Remove any existing success messages
        const existingSuccess = document.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="success-text">
                <h3>${title}</h3>
                <p>${message1}</p>
                ${message2 ? `<p>${message2}</p>` : ''}
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        // Auto-remove success message after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);
    }
    
    function showError(message) {
        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Insert error message after welcome text
        const loginOptions = document.querySelector('.login-options');
        if (loginOptions) {
            loginOptions.parentNode.insertBefore(errorDiv, loginOptions.nextSibling);
        }
        
        // Auto-remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('realReviewLoggedIn');
        const savedEmail = localStorage.getItem('realReviewEmail');
        const remember = localStorage.getItem('realReviewRemember');
        
        // If user is already logged in, redirect to home
        if (isLoggedIn === 'true') {
            // Check if we should redirect directly
            const currentPage = window.location.pathname;
            if (currentPage.includes('login2.html') || currentPage.endsWith('login2.html')) {
                // Show message and redirect
                showSuccessMessage("Already Logged In", "Redirecting to home page...");
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 2000);
                return;
            }
        }
        
        // If user saved email and remember is true, pre-fill the email field
        if (savedEmail && remember === 'true') {
            emailField.value = savedEmail;
            rememberCheckbox.checked = true;
            passwordField.focus();
        } else {
            emailField.focus();
        }
    }
    
    // Visual feedback for input fields
    const inputFields = document.querySelectorAll('.input-field');
    inputFields.forEach(field => {
        // Remove error highlighting when user starts typing
        field.addEventListener('input', function() {
            this.style.borderColor = "";
            // Remove error message when user starts typing
            const errorMsg = document.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
        
        // Animation on focus
        field.addEventListener('focus', function() {
            if (!this.disabled) {
                this.parentElement.style.transform = 'translateY(-2px)';
            }
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Enter key to submit form
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !loginButton.disabled) {
            // Check if focus is not on the Google checkbox
            if (document.activeElement !== googleCheckbox) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }
    });
    
    // Demo credentials hint
    console.log("Demo credentials available:");
    console.log("- user@example.com / password123");
    console.log("- test@test.com / test123");
    console.log("- admin@realreview.com / admin123");
});