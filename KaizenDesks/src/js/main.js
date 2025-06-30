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
    // GSAP entrance animation for service cards
    if (window.gsap && document.querySelector('.service-animated-card')) {
        gsap.from('.service-animated-card', {
            opacity: 0,
            y: 50,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.services-animated-grid',
                start: 'top 80%',
            }
        });
        document.querySelectorAll('.service-animated-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.07, boxShadow: '0 8px 32px #c3f00f88', duration: 0.3 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', duration: 0.3 });
            });
        });
    }

    // GSAP entrance animation for horizontal scroll gallery
    if (window.gsap && document.querySelector('.service-panel')) {
        gsap.from('.service-panel', {
            x: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.services-scroll-gallery',
                start: 'top 80%',
            }
        });
    }

    // GSAP entrance animation for interactive grid
    if (window.gsap && document.querySelector('.service-tile')) {
        gsap.from('.service-tile', {
            y: 60,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.services-interactive-grid',
                start: 'top 80%',
            }
        });
    }

    // GSAP entrance animation for timeline/stepper
    if (window.gsap && document.querySelector('.timeline-step')) {
        gsap.from('.timeline-step', {
            x: -60,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.services-timeline',
                start: 'top 80%',
            }
        });
    }

    // GSAP entrance animation for masonry/waterfall layout
    if (window.gsap && document.querySelector('.masonry-card')) {
        gsap.from('.masonry-card', {
            y: 60,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.services-masonry',
                start: 'top 80%',
            }
        });
    }
}

// Initialize form validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;
            const mailto = `mailto:kaizendesks@gmail.com?cc=deepak.singh@gmail.com&subject=Appointment%20booking&body=Hello,%20my%20name%20is%20${encodeURIComponent(name)}%20(%20${encodeURIComponent(email)}%20).%20I%20would%20like%20to%20book%20an%20appointment.%0A%0AMessage:%20${encodeURIComponent(message)}`;
            window.location.href = mailto;
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

// Accordion expand/collapse logic and GSAP animation
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
  header.addEventListener('click', function() {
    const item = this.parentElement;
    const panel = item.querySelector('.accordion-panel');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item.open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-panel').style.maxHeight = null;
      }
    });
    if (!isOpen) {
      item.classList.add('open');
      panel.style.maxHeight = panel.scrollHeight + 'px';
      if (window.gsap) {
        gsap.fromTo(panel.querySelector('.accordion-content'), {y: 30, opacity: 0}, {y: 0, opacity: 1, duration: 0.5, ease: 'power2.out'});
      }
    } else {
      item.classList.remove('open');
      panel.style.maxHeight = null;
    }
  });
});

// Flip on tap for masonry cards (mobile support)
document.querySelectorAll('.masonry-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Only trigger on small screens or if not hovering
    if (window.innerWidth <= 900 || !window.matchMedia('(hover: hover)').matches) {
      this.classList.toggle('flipped');
    }
  });
});



