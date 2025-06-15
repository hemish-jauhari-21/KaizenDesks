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
                                    }, 100);
                                }
                            });
                        }
                    }, 800);
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

    // Only initialize map if the element exists
    if (document.querySelector('.map-background')) {
        initMap();
    }

    // Only initialize 3D scene if the canvas element exists
    if (document.getElementById('threejs-canvas')) {
        init3DScene();
    }

    // Only animate qualities section if the element exists
    if (document.querySelector('.qualities')) {
        animateQualitiesSection();
    }
    
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
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const targetPosition = target.offsetTop - navbar.offsetHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section, .projects-section');
        const scrollPosition = window.pageYOffset + navbar.offsetHeight + 50;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (section.classList.contains('projects-section')) {
                    current = 'projects-section';
                } else {
                    current = section.getAttribute('id');
                }
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href && document.getElementById(href) && current.includes(href)) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize general animations
function initAnimations() {
    // Add your general animations here
}

// Initialize scroll effects
function initScrollEffects() {
    const blogPostCards = document.querySelectorAll('.blog-post-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    blogPostCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize service cards functionality
function initServiceCards() {
    // Implement service card specific JavaScript here
}

// Initialize form validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitButton = contactForm.querySelector('.submit-button');
            submitButton.classList.add('loading');
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                const isSuccess = Math.random() > 0.5; // Simulate success/failure
                if (isSuccess) {
                    submitButton.classList.remove('loading');
                    submitButton.classList.add('success');
                    submitButton.innerHTML = '<span>Message Sent!</span>';
                } else {
                    submitButton.classList.remove('loading');
                    submitButton.classList.add('error');
                    submitButton.innerHTML = '<span>Failed to Send</span>';
                }
                setTimeout(() => {
                    submitButton.classList.remove('success', 'error');
                    submitButton.innerHTML = '<span>Send Message</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
                    submitButton.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });

        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.addEventListener('focus', () => {
                input.closest('.form-group').classList.add('focused');
            });
            input.addEventListener('blur', () => {
                input.closest('.form-group').classList.remove('focused');
                if (input.value) {
                    input.closest('.form-group').classList.add('filled');
                } else {
                    input.closest('.form-group').classList.remove('filled');
                }
            });
        });
    }
}

// Initialize counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                const start = 0;
                let startTime = null;

                const animate = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = (currentTime - startTime) / duration;
                    const value = Math.floor(progress * (target - start) + start);
                    counter.textContent = value;
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        counter.textContent = target;
                    }
                };
                requestAnimationFrame(animate);
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize map
function initMap() {
    // Function to initialize Google Map
    // This function is typically called by the Google Maps API script when loaded
    if (typeof google !== 'undefined' && google.maps) {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            const mapOptions = {
                center: { lat: 21.1381239, lng: 79.0718840 }, // Example coordinates (Nagpur, India)
                zoom: 15,
                disableDefaultUI: true,
                zoomControl: false,
                styles: [
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "geometry",
                        "stylers": [
                            { "color": "#C3F00F" }
                        ]
                    }
                ]
            };
            const map = new google.maps.Map(mapElement, mapOptions);

            // Add a marker (optional)
            new google.maps.Marker({
                position: { lat: 21.1381239, lng: 79.0718840 },
                map: map,
                title: 'KaizenDesks Office',
            });
        }
    }
}

// Initialize 3D scene
let scene, camera, renderer, cube;
let targetRotation = { x: 0, y: 0 };
const dampingFactor = 0.05;

function init3DScene() {
    const container = document.getElementById('model-container');
    if (!container) return;

    const canvas = document.getElementById('threejs-canvas');
    scene = new THREE.Scene();

    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
        color: 0xcccccc, // White color for the cube
        specular: 0xffffff,
        shininess: 100,
        reflectivity: 1
    });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    camera.position.z = 4;

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    animate();
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
    if (!container) return; // Add null check for container
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += (targetRotation.x - cube.rotation.x) * dampingFactor;
    cube.rotation.y += (targetRotation.y - cube.rotation.y) * dampingFactor;

    renderer.render(scene, camera);
}

// Text animation for qualities section
function animateQualitiesSection() {
    const qualities = document.querySelectorAll('.qualities .box');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    qualities.forEach(quality => {
        observer.observe(quality);
    });
}

// Cursor reactive elements
function initCursorReactive() {
    const reactiveElements = document.querySelectorAll('.cursor-reactive');

    reactiveElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            element.style.setProperty('--mouse-x', `${x}px`);
            element.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Load More Projects (if needed in main.js, otherwise keep it empty)
// function loadMoreProjects() {
//     // This function is now primarily handled by projects.js for the projects page
// }



