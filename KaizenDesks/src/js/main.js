// Loader Animation
document.addEventListener('DOMContentLoaded', () => {
    // Hide the main content initially
    document.body.style.overflow = 'hidden';

    if (sessionStorage.getItem("loaderPlayed")) {
        document.querySelector(".load").style.display = "none";
        document.body.style.overflow = '';
        showNavigation();
        initializeWebsiteAnimations();
        return;
    }

    // Start loader animation
    startLoader();
    sessionStorage.setItem("loaderPlayed", "true");

    function startLoader() {
        let counterElement = document.querySelector(".count p");
        let currentValue = 0;

        function updateCounter() {
            if (currentValue < 100) {
                let increment = Math.floor(Math.random() * 10) + 1;
                currentValue = Math.min(currentValue + increment, 100);
                counterElement.textContent = currentValue;

                let delay = Math.floor(Math.random() * 200) + 50;
                setTimeout(updateCounter, delay);
            }
        }

        updateCounter();

        // Counter fade out
        gsap.to(".count", { opacity: 0, delay: 3.5, duration: 0.5 });

        // Split text animation
        let textWrapper = document.querySelector(".ml16");
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        // Titles animation
        let titleDivs = document.querySelectorAll('.titles > div');
        let currentIndex = 0;

        // Set initial state for all titles
        gsap.set(titleDivs, { opacity: 0 });

        function animateNextTitle() {
            if (currentIndex >= titleDivs.length) {
                return; // Animation sequence complete
            }

            // Fade in current word
            gsap.to(titleDivs[currentIndex], {
                opacity: 1,
                duration: 0.3,
                onComplete: () => {
                    // Hold the word
                    setTimeout(() => {
                        // Make sure the element still exists before fading out
                        if (titleDivs[currentIndex]) {
                            // Fade out current word
                            gsap.to(titleDivs[currentIndex], {
                                opacity: 0,
                                duration: 0.3,
                                onComplete: () => {
                                    // Wait for fade out to complete before moving to next word
                                    setTimeout(() => {
                                        // Increment and animate next only if we haven't reached the end
                                        currentIndex++;
                                        if (currentIndex < titleDivs.length) {
                                            animateNextTitle();
                                        }
                                    }, 100); // Small delay to ensure complete fade out
                                }
                            });
                        }
                    }, 800); // Hold duration
                }
            });
        }

        // Start the sequence after a delay
        setTimeout(animateNextTitle, 1000);

        // Kaizen text animation
        anime.timeline({ loop: false })
            .add({
                targets: ".ml16 .letter",
                translateY: [-300, 0],
                easing: "easeOutExpo",
                duration: 1000,
                delay: (el, i) => 30 * i
            })
            .add({
                targets: ".ml16 .letter",
                translateY: [0, 100],
                easing: "easeOutExpo",
                duration: 3000,
                delay: (el, i) => 2000 + 30 * i
            });

        // Final animations
        gsap.to(".pre-loader", {
            scale: 0.5,
            ease: "power4.inOut",
            duration: 2,
            delay: 6,
            onComplete: () => {
                document.querySelector(".pre-loader").style.zIndex = "-1";
                document.querySelector(".loader-content").style.zIndex = "-1";
            }
        });

        gsap.to(".loader", {
            height: "0",
            ease: "power4.inOut",
            duration: 1.5,
            delay: 6.75
        });

        gsap.to(".loader-bg", {
            height: "0",
            ease: "power4.inOut",
            duration: 1,
            delay: 7
        });

        gsap.from(".header span", {
            y: 200,
            ease: "power4.inOut",
            duration: 1,
            delay: 7,
            stagger: 0.05
        });

        gsap.to(".header span", {
            y: -150,
            ease: "power4.inOut",
            opacity: 0,
            duration: 1.5,
            delay: 8.5,
            stagger: 0.05,
            onComplete: () => {
                document.querySelector(".brand").style.zIndex = "-1";
                document.querySelector(".load").style.display = "none";
                document.body.style.overflow = '';
                showNavigation();
                initializeWebsiteAnimations();
            }
        });
    }
});

// Function to show navigation
function showNavigation() {
    const navbar = document.querySelector('.navbar');
    initNavigation();
    setTimeout(() => {
        navbar.classList.add('visible');
    }, 100);
}

// Initialize website animations after loader
function initializeWebsiteAnimations() {
    // Initialize all components except navigation
    initAnimations();
    initScrollEffects();
    initServiceCards();
    initFormValidation();
    initCounters();
    initMap();
    // Projects section is now handled by projects.js
    animateQualitiesSection();
    initCursorReactive();
}

// Mobile Navigation Toggle
function initNavigation() {
    const menuBtn = document.querySelector('.menu__btn');
    const menuItems = document.querySelector('.menu__items');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.menu__items a');
    // Toggle menu on button click
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuItems.classList.toggle('show');
            menuBtn.setAttribute('aria-expanded', menuItems.classList.contains('show'));
            document.body.style.overflow = menuItems.classList.contains('show') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !menuItems.contains(e.target) && menuItems.classList.contains('show')) {
            menuItems.classList.remove('show');
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking a link (for mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuItems.classList.remove('show');
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for anchor links with offset
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const targetPosition = target.offsetTop - navbar.offsetHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.pageYOffset + navbar.offsetHeight + 50;
        
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
    
    // Sticky Header with Hide on Scroll Down
    let lastScroll = 0;
    const scrollThreshold = 10;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 80) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll - scrollThreshold) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
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
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each element
    fadeElements.forEach(element => {
        element.classList.add('animate-hidden');
        observer.observe(element);
    });
}

// Interactive service cards
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                if (input.value.trim() !== '') {
                    input.parentElement.classList.add('filled');
                } else {
                    input.parentElement.classList.remove('filled');
                }
            });
        });
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-button');
            
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                submitBtn.innerHTML = '<span>Message Sent!</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                    submitBtn.innerHTML = '<span>Send Message</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
                    inputs.forEach(input => input.parentElement.classList.remove('filled'));
                }, 3000);
                
            } catch (error) {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('error');
                submitBtn.innerHTML = '<span>Error! Try Again</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('error');
                    submitBtn.innerHTML = '<span>Send Message</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
                }, 3000);
            }
        });
    }
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

// Parallax Effect for Hero Section
const heroShapes = document.querySelectorAll('.hero-shapes .shape');
if (heroShapes.length) {
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = Math.round((clientX / window.innerWidth) * 100);
        const y = Math.round((clientY / window.innerHeight) * 100);
        
        heroShapes.forEach((shape, i) => {
            const factor = (i + 1) * 0.1;
            shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });
}

// Initialize Google Maps
function initMap() {
    const mapElement = document.getElementById('map-background');
    if (!mapElement) {
        console.error('Map container not found');
        return;
    }

    // Define office locations
    const offices = [
        { lat: 37.7749, lng: -122.4194, title: 'California Office' },  // California
        { lat: 28.5355, lng: 77.3910, title: 'Noida Office' },        // Noida
        { lat: 21.1458, lng: 79.0882, title: 'Nagpur Office' }        // Nagpur
    ];

    // Map options
    const mapOptions = {
        zoom: 2,
        center: offices[1],
        disableDefaultUI: true,
        zoomControl: false,
        gestureHandling: 'none',
        keyboardShortcuts: false,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{ "color": "#e9e9e9" }]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{ "color": "#f5f5f5" }]
            },
            {
                "featureType": "road",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "poi",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "transit",
                "stylers": [{ "visibility": "off" }]
            }
        ]
    };

    // Create map
    const map = new google.maps.Map(mapElement, mapOptions);

    // Custom marker icon
    const markerIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#8b5cf6",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#ffffff"
    };

    // Add markers for each office
    offices.forEach(office => {
        new google.maps.Marker({
            position: office,
            map: map,
            title: office.title,
            icon: markerIcon
        });
    });

    // Recenter map on window resize
    window.addEventListener('resize', () => {
        const center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });
}

// Call initMap when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (window.google && window.google.maps) {
        initMap();
    } else {
        console.error('Google Maps API not loaded');
    }
});

// 3D Model Initialization
let scene, camera, renderer, cube;
let targetRotation = { x: 0, y: 0 };
const dampingFactor = 0.05;

function init3DScene() {
    // Scene setup
    scene = new THREE.Scene();
    
    // Get the container dimensions
    const container = document.getElementById('model-container');
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
    
    // Renderer setup
    const canvas = document.getElementById('threejs-canvas');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Create a cube with better materials
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
        color: 0x70767A, // Changed to match the theme color
        specular: 0xffffff,
        shininess: 100,
        reflectivity: 1
    });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    camera.position.z = 4;

    // Event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
}

function onMouseMove(event) {
    const containerRect = document.getElementById('model-container').getBoundingClientRect();
    const mouseX = ((event.clientX - containerRect.left) / containerRect.width) * 2 - 1;
    const mouseY = -((event.clientY - containerRect.top) / containerRect.height) * 2 + 1;

    targetRotation.y = mouseX * Math.PI;
    targetRotation.x = mouseY * Math.PI / 2;
}

function onWindowResize() {
    const container = document.getElementById('model-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Smooth rotation
    cube.rotation.x += (targetRotation.x - cube.rotation.x) * dampingFactor;
    cube.rotation.y += (targetRotation.y - cube.rotation.y) * dampingFactor;

    renderer.render(scene, camera);
}

// Initialize 3D scene when the page loads
document.addEventListener('DOMContentLoaded', () => {
    init3DScene();
    animate();
});

// Animate cards in on scroll
if (window.gsap && window.ScrollTrigger) {
    gsap.utils.toArray('.service-animated-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 60,
            scale: 0.9,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Animate text color on hover
    document.querySelectorAll('.service-animated-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.services-item_title'), { color: '#fff', duration: 0.3 });
            gsap.to(card, { scale: 1.09, rotate: -3, boxShadow: '0 24px 64px rgba(251, 194, 235, 0.35)', duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.services-item_title'), { color: '#222', duration: 0.3 });
            gsap.to(card, { scale: 1, rotate: 0, boxShadow: '0 8px 32px rgba(161, 140, 209, 0.15)', duration: 0.3 });
        });
    });
}

// Add cursor glow effect for service cards
document.querySelectorAll('.service-animated-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Qualities section animation
function animateQualitiesSection() {
    const elements = document.querySelectorAll('.quality-animate-title, .quality-animate-desc, .quality-animate-box, .quality-animate-text');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (window.gsap) {
                    gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
                } else {
                    entry.target.classList.add('visible');
                }
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    elements.forEach(el => {
        observer.observe(el);
    });
}

// Cursor reactive effect for headings/texts
function initCursorReactive() {
    const reactives = document.querySelectorAll('.cursor-reactive');
    document.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        reactives.forEach(el => {
            const strength = 18;
            el.style.transform = `translate(${dx * strength}px, ${dy * strength}px) scale(1.04)`;
            el.style.textShadow = `${-dx*8}px ${-dy*8}px 24px rgba(139,92,246,0.12)`;
        });
    });
    document.addEventListener('mouseleave', () => {
        reactives.forEach(el => {
            el.style.transform = '';
            el.style.textShadow = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.services-swiper')) {
    new Swiper('.services-swiper', {
      slidesPerView: 3,
      spaceBetween: 40,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        600: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }
});