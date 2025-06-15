// Testimonial data
const testimonials = [
    {
        text: "As a small business owner I needed a reliablecoverag. provided comprehensive options tailored to my need. Their support has been invaluable. Their disability too coverage, kept me afloat during a tough time. I will be forever grateful. Their team is always ready to help.",
        name: "Mr. Daniel Scoot",
        role: "CEO at Softconic",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        text: "Working with KaizenDesks has been transformative for our digital presence. Their attention to detail and innovative solutions helped us achieve our goals faster than expected.",
        name: "Sarah Johnson",
        role: "Marketing Director",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        text: "The team at KaizenDesks goes above and beyond. Their technical expertise and creative approach to problem-solving made our project a huge success.",
        name: "Michael Chen",
        role: "Tech Lead at InnovateCo",
        avatar: "https://randomuser.me/api/portraits/men/66.jpg"
    }
];

let currentTestimonialIndex = 0;

// Function to update the testimonial content
function updateTestimonial(index) {
    const card = document.querySelector('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // Fade out
    card.style.opacity = '0';
    
    setTimeout(() => {
        // Update content
        const testimonial = testimonials[index];
        card.querySelector('.testimonial-text').textContent = testimonial.text;
        card.querySelector('.testimonial-name').textContent = testimonial.name;
        card.querySelector('.testimonial-role').textContent = testimonial.role;
        card.querySelector('.testimonial-avatar').src = testimonial.avatar;
        
        // Fade in
        card.style.opacity = '1';
    }, 300);
}

// Initialize dots functionality
document.addEventListener('DOMContentLoaded', () => {
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    // Add click event listeners to dots
    dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            const newIndex = Array.from(dotsContainer.children).indexOf(e.target);
            currentTestimonialIndex = newIndex;
            updateTestimonial(newIndex);
        }
    });

    // Add transition style to testimonial card
    const card = document.querySelector('.testimonial-card');
    card.style.transition = 'opacity 0.3s ease';
});

// Optional: Auto-rotate testimonials
setInterval(() => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial(currentTestimonialIndex);
}, 5000); // Change testimonial every 5 seconds

// Reviews Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewAllReviewsBtn = document.getElementById('view-all-reviews');
    const reviewsModal = document.getElementById('reviews-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    // Open modal
    viewAllReviewsBtn.addEventListener('click', function() {
        reviewsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    // Close modal
    closeModalBtn.addEventListener('click', function() {
        reviewsModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside
    reviewsModal.addEventListener('click', function(e) {
        if (e.target === reviewsModal) {
            reviewsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal on escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && reviewsModal.classList.contains('active')) {
            reviewsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}); 