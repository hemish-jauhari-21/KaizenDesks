// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initScrollEffects();
    initServiceCards();
    initFormValidation();
    initCounters();
});

// Mobile Navigation Toggle
function initNavigation() {
    const menuBtn = document.querySelector('.menu__btn');
    const menuItems = document.querySelector('.menu__items');
    
    // Toggle menu on button click
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            menuItems.classList.toggle('show');
            menuBtn.textContent = menuItems.classList.contains('show') ? 'Close' : 'Menu';
        });
    }
    
    // Close menu when clicking a link (for mobile)
    const navLinks = document.querySelectorAll('.menu__items a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuItems.classList.remove('show');
                menuBtn.textContent = 'Menu';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.menu__items a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Magic text and UI animations
function initAnimations() {
    // Magic star animation
    const magicStars = document.querySelectorAll('.magic-star');
    
    if (magicStars.length > 0) {
        magicStars.forEach(star => {
            gsapStarAnimation(star);
        });
    }
    
    // Header scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Hero text animation on load
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaButton = document.querySelector('.hero .cta-button');
    
    if (heroTitle && heroSubtitle && ctaButton) {
        heroTitle.style.opacity = '0';
        heroSubtitle.style.opacity = '0';
        ctaButton.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 1s ease';
            heroTitle.style.opacity = '1';
            
            setTimeout(() => {
                heroSubtitle.style.transition = 'all 1s ease';
                heroSubtitle.style.opacity = '1';
                
                setTimeout(() => {
                    ctaButton.style.transition = 'all 1s ease';
                    ctaButton.style.opacity = '1';
                    ctaButton.style.transform = 'translateY(0)';
                }, 300);
            }, 300);
        }, 300);
    }
}

// Helper function for star animation
function gsapStarAnimation(star) {
    // Random movement animation
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // Animate each star with random movement
    setInterval(() => {
        star.style.setProperty('--star-left', `${random(10, 90)}%`);
        star.style.setProperty('--star-top', `${random(-40, 80)}px`);
    }, 3000);
}

// Scroll-based animations and effects
function initScrollEffects() {
    // Fade in elements as they come into view
    const fadeElements = document.querySelectorAll('.section-heading, .about-text p, .service-card, .benefit');
    
    // Create IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each element
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Add class when element comes into view
    document.addEventListener('scroll', function() {
        fadeElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('fade-in');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Interactive service cards
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle scale effect
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            
            // Highlight service icon
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Reset previous validation states
            resetValidation(nameInput);
            resetValidation(emailInput);
            resetValidation(messageInput);
            
            // Validate name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            // If valid, show success and reset form
            if (isValid) {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you! Your message has been sent.';
                successMessage.style.color = '#10b981';
                successMessage.style.padding = '15px';
                successMessage.style.marginTop = '15px';
                successMessage.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                successMessage.style.borderRadius = '8px';
                successMessage.style.textAlign = 'center';
                
                // Replace form with success message
                contactForm.style.opacity = '0';
                setTimeout(() => {
                    contactForm.innerHTML = '';
                    contactForm.appendChild(successMessage);
                    contactForm.style.opacity = '1';
                }, 300);
            }
        });
    }
}

// Helper functions for form validation
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.color = '#ef4444';
    errorMessage.style.fontSize = '0.875rem';
    errorMessage.style.marginTop = '5px';
    
    input.style.borderColor = '#ef4444';
    
    // Remove any existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        formGroup.removeChild(existingError);
    }
    
    formGroup.appendChild(errorMessage);
}

function resetValidation(input) {
    const formGroup = input.parentElement;
    input.style.borderColor = '#ddd';
    
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        formGroup.removeChild(existingError);
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Animated counters (for statistics or other numbers)
function initCounters() {
    // If we want to add statistics counters later, we can add them here
    // Example:
    // const counters = document.querySelectorAll('.counter');
    // counters.forEach(counter => {
    //     const target = parseInt(counter.getAttribute('data-target'));
    //     const increment = target / 100;
    //     
    //     const updateCounter = () => {
    //         const count = parseInt(counter.innerText);
    //         if (count < target) {
    //             counter.innerText = Math.min(count + Math.ceil(increment), target);
    //             setTimeout(updateCounter, 10);
    //         }
    //     };
    //     
    //     counter.innerText = '0';
    //     
    //     // Start counter when element comes into view
    //     const observer = new IntersectionObserver((entries) => {
    //         if (entries[0].isIntersecting) {
    //             updateCounter();
    //             observer.unobserve(entries[0].target);
    //         }
    //     }, { threshold: 0.5 });
    //     
    //     observer.observe(counter);
    // });
}