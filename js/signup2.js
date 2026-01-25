// Password validation function
function validatePassword(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    
    // Update UI for each requirement
    document.getElementById('req-length').className = requirements.length ? 'valid' : 'invalid';
    document.getElementById('req-uppercase').className = requirements.uppercase ? 'valid' : 'invalid';
    document.getElementById('req-number').className = requirements.number ? 'valid' : 'invalid';
    document.getElementById('req-special').className = requirements.special ? 'valid' : 'invalid';
    
    // Return true if all requirements are met
    return Object.values(requirements).every(req => req === true);
}

// Form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!terms) {
        alert('You must agree to the Terms of Service and Privacy Policy');
        return;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        alert('Password does not meet requirements');
        return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        document.getElementById('confirmPassword').focus();
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        document.getElementById('email').focus();
        return;
    }
    
    // Simulate form submission
    const signupButton = document.querySelector('.signup-button');
    signupButton.textContent = 'Creating Account...';
    signupButton.disabled = true;
    
    setTimeout(() => {
        alert(`Account created successfully!\nWelcome ${fullName}!`);
        signupButton.textContent = 'Create Account';
        signupButton.disabled = false;
        
        // Redirect to login page after successful signup
        window.location.href = 'login2.html';
    }, 1500);
});

// Real-time password validation
document.getElementById('password').addEventListener('input', function() {
    validatePassword(this.value);
    
    // Check password confirmation match in real-time
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword) {
        if (this.value !== confirmPassword) {
            document.getElementById('confirmPassword').style.borderColor = '#ef4444';
        } else {
            document.getElementById('confirmPassword').style.borderColor = '#10b981';
        }
    }
});

// Confirm password validation
document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    if (password && this.value) {
        if (password !== this.value) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#10b981';
        }
    }
});

// Terms and Privacy links
document.getElementById('termsLink').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Terms of Service page would open here');
});

document.getElementById('privacyLink').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Privacy Policy page would open here');
});

// Google signup
document.querySelector('.google-signup').addEventListener('click', function() {
    alert('This would redirect to Google OAuth for signup');
});

// Add focus effects to input fields
document.querySelectorAll('.input-field').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Enter key to submit form
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.querySelector('.signup-button:not(:disabled)')) {
        document.getElementById('signupForm').dispatchEvent(new Event('submit'));
    }
});

// Initialize form validation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Validate any existing password on page load
    const passwordField = document.getElementById('password');
    if (passwordField.value) {
        validatePassword(passwordField.value);
    }
    
    // Check password match on page load
    const confirmPasswordField = document.getElementById('confirmPassword');
    const passwordValue = passwordField.value;
    const confirmPasswordValue = confirmPasswordField.value;
    
    if (passwordValue && confirmPasswordValue) {
        if (passwordValue !== confirmPasswordValue) {
            confirmPasswordField.style.borderColor = '#ef4444';
        } else {
            confirmPasswordField.style.borderColor = '#10b981';
        }
    }
});