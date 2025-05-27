// Counter Animation (0-3.5s)
function startLoader() {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
        let counterElement = document.querySelector(".count p");
        let currentValue = 0;
        const totalDuration = 3500; // 3.5 seconds
        const startTime = Date.now();

        // Set initial states
        gsap.set(".brand", {
            opacity: 0,
            visibility: "hidden"
        });
        gsap.set(".loader-content", { 
            opacity: 0,
            visibility: "visible"
        });

        // Titles animation: show one by one
        let titleDivs = document.querySelectorAll('.titles > div');
        if (titleDivs.length > 0) {
            // Hide all titles initially
            titleDivs.forEach((div) => {
                gsap.set(div, { 
                    opacity: 0,
                    y: 40,
                    visibility: "hidden"
                });
            });

            let current = 0;
            function showNextTitle() {
                if (current > 0) {
                    // Fade out previous and move it up
                    gsap.to(titleDivs[current - 1], {
                        opacity: 0,
                        y: -40,
                        duration: 0.5,
                        ease: "power2.inOut",
                        onComplete: () => {
                            gsap.set(titleDivs[current - 1], { visibility: "hidden" });
                            // Reset position for next time
                            gsap.set(titleDivs[current - 1], { y: 40 });
                            if (current < titleDivs.length) {
                                fadeInCurrent();
                            } else {
                                // All titles done, continue loader
                                setTimeout(() => {
                                    transitionToKaizen();
                                }, 300);
                            }
                        }
                    });
                } else {
                    fadeInCurrent();
                }
            }

            function fadeInCurrent() {
                // Set initial position
                gsap.set(titleDivs[current], { 
                    y: 40,
                    visibility: "visible" 
                });
                
                // Animate from bottom to top
                gsap.to(titleDivs[current], {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    onComplete: () => {
                        setTimeout(() => {
                            current++;
                            showNextTitle();
                        }, 800); // Hold time for each title
                    }
                });
            }
            showNextTitle();
        } else {
            // fallback: continue loader if no titles
            setTimeout(() => {
                transitionToKaizen();
            }, 2000);
        }

        // Split text animation using Anime.js
        let textWrapper = document.querySelector(".ml16");
        if (textWrapper) {
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

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
        }

        // Show slogan with a delay
        // Show loader content with a slight delay
        gsap.to(".loader-content", {
            opacity: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out",
            visibility: "visible"
        });

        function updateCounter() {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / totalDuration, 1);
            
            if (progress < 1) {
                currentValue = Math.floor(progress * 100);
                counterElement.textContent = currentValue;
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.textContent = "100";
                // Start transition to KAIZEN
                transitionToKaizen();
            }
        }
        updateCounter();
    }, 100); // Small delay to ensure DOM is ready
}

// Transition to KAIZEN (3.5-6s)
function transitionToKaizen() {
    // Fade out titles
    gsap.to(".titles > div", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.in"
    });

    // Fade out loader content
    gsap.to(".loader-content", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
            gsap.set(".loader-content", { visibility: "hidden" });
        }
    });

    // Fade out purple background and fade in white background
    gsap.to(".loader", {
        backgroundColor: "#FFF",
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
            // Start KAIZEN animation
            animateKaizen();
        }
    });
}

// Animate KAIZEN letters
function animateKaizen() {
    // Show brand background
    gsap.set(".brand", { visibility: "visible" });
    gsap.to(".brand", {
        opacity: 1,
        duration: 0.5
    });

    // Animate each letter of KAIZEN
    const brandLetters = document.querySelectorAll(".header span");
    let currentLetterIndex = 0;
    
    function showNextLetter() {
        if (currentLetterIndex < brandLetters.length) {
            const currentLetter = brandLetters[currentLetterIndex];
            
            gsap.fromTo(currentLetter, 
                {
                    y: 200,
                    opacity: 0,
                    visibility: "visible"
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power4.out",
                    onComplete: () => {
                        currentLetterIndex++;
                        if (currentLetterIndex < brandLetters.length) {
                            showNextLetter();
                        } else {
                            // All letters shown, finish loader
                            setTimeout(() => {
                                showMainContent();
                            }, 1000);
                        }
                    }
                }
            );
        }
    }
    
    // Start the sequence
    showNextLetter();
}

// Function to show main content after loader
function showMainContent() {
    const loader = document.querySelector('.load');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.style.display = 'none';
            }
        });
    }
}

// Initialize loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    startLoader();
});