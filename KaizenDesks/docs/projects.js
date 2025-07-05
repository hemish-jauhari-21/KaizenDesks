// Projects data structure with detailed information
const projectsData = [
    {
        id: 1,
        title: "Luxe Commerce",
        description: "High-end e-commerce platform with advanced filtering and payment systems",
        category: "web",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Website", "E-commerce"],
        detailImages: [
            "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1576082902547-28a07bc29812?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ],
        fullDescription: "Luxe Commerce is a premium e-commerce platform designed for high-end fashion and lifestyle brands. The platform offers a sophisticated shopping experience with advanced product filtering, seamless checkout process, and integrated payment gateways.",
        challenge: "The client needed a platform that would reflect their luxury brand identity while providing intuitive navigation through thousands of products. They required advanced filtering options, seamless mobile experience, and integration with multiple payment systems and inventory management.",
        solution: "We developed a custom e-commerce solution with an emphasis on visual appeal and performance. The platform features real-time inventory updates, advanced search and filtering capabilities, and a responsive design that maintains the luxury feel across all devices. We implemented a customized admin dashboard for easy content management and sales analytics.",
        client: "Premium Brands Inc.",
        year: "2023",
        technologies: ["React.js", "Node.js", "MongoDB", "AWS", "Stripe API"],
        links: [
            { type: "Visit Website", url: "#" },
            { type: "Case Study", url: "#" },
        ],
    },
    {
        id: 2,
        title: "FitTrack Pro",
        description: "Comprehensive fitness tracking app with personalized workout plans",
        category: "app",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Mobile App", "Health"],
        detailImages: [
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1530021232320-687d8e3dba54?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ],
        fullDescription: "FitTrack Pro is a comprehensive fitness application that helps users track workouts, monitor nutrition, and follow personalized training plans. The app features integration with wearable devices, progress visualization, and social sharing capabilities.",
        challenge: "The fitness app market is highly competitive. Our client needed a solution that would stand out by offering truly personalized workout experiences while maintaining ease of use. They also wanted seamless integration with multiple fitness wearables and health platforms.",
        solution: "We developed a cross-platform mobile application using React Native, with custom AI algorithms to create personalized workout recommendations based on user progress and goals. The app features real-time synchronization with popular fitness wearables, interactive workout animations, and a community feature for users to share achievements and challenges.",
        client: "HealthTech Solutions",
        year: "2022",
        technologies: ["React Native", "Firebase", "TensorFlow.js", "HealthKit/Google Fit APIs"],
        links: [
            { type: "App Store", url: "#" },
            { type: "Google Play", url: "#" },
            { type: "Demo Video", url: "#" },
        ],
    },
    {
        id: 3,
        title: "SecureShield",
        description: "Enterprise security management dashboard with real-time threat detection",
        category: "cyber",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Cyber Security", "Dashboard"],
        detailImages: [
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ],
        fullDescription: "SecureShield is an enterprise-grade security management system that provides real-time threat detection and response capabilities. The dashboard offers comprehensive visibility into network security status, with automated alerts and detailed analytics on potential vulnerabilities.",
        challenge: "The client, a major financial institution, needed a sophisticated security monitoring system that could handle millions of events per minute across their global infrastructure, while providing meaningful alerts without overwhelming their security team with false positives.",
        solution: "We designed a scalable security management platform that utilizes machine learning to identify genuine security threats among millions of events. The system features a real-time monitoring dashboard, automated threat response protocols, and detailed forensic tools for security analysts. The platform reduced false positives by 87% while improving detection rates for genuine security incidents.",
        client: "Global Financial Services Ltd.",
        year: "2023",
        technologies: ["Python", "Elasticsearch", "Kubernetes", "TensorFlow", "React"],
        links: [
            { type: "Case Study", url: "#" },
            { type: "White Paper", url: "#" },
        ],
    },
    {
        id: 4,
        title: "VisualCraft",
        description: "Interactive 3D product visualization platform for e-commerce",
        category: "3d",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["3D", "Visualization"],
        detailImages: [
            "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1544380904-c686aad2fc40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1534131234089-c1c8a71fa55b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ],
        has3DModel: true,
        modelPath: "assets/models/product_showcase.glb",
        fullDescription: "VisualCraft is an interactive 3D product visualization platform designed for e-commerce businesses. It allows customers to view products from all angles, customize features, and see products in context before purchasing.",
        challenge: "Our client, a furniture retailer, wanted to reduce return rates and improve customer confidence when purchasing items online. Traditional 2D images weren't providing enough detail for customers to accurately assess products, resulting in mismatched expectations and returns.",
        solution: "We developed a WebGL-based 3D visualization platform that enables customers to view furniture items from any angle, customize materials and colors, and place items in a virtual room to assess scale and fit. The platform works across all modern browsers and devices without requiring plugins. After implementation, the client saw a 42% reduction in returns and a 28% increase in conversion rates.",
        client: "Modern Home Furnishings",
        year: "2022",
        technologies: ["Three.js", "WebGL", "React", "Node.js", "3D Modeling (Blender)"],
        links: [
            { type: "Live Demo", url: "#" },
            { type: "Case Study", url: "#" },
        ],
    }
];

// Function to generate HTML for a project card
function createProjectCard(project) {
    return `
        <div class="project-card" data-category="${project.category}" data-id="${project.id}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join("")}
                </div>
            </div>
        </div>
    `;
}

// Function to handle smooth transitions between tabs
function handleTabTransition(oldTab, newTab) {
    return new Promise(resolve => {
        oldTab.style.opacity = '0';
        setTimeout(() => {
            oldTab.classList.remove('active');
            newTab.classList.add('active');
            newTab.style.opacity = '0';
            requestAnimationFrame(() => {
                newTab.style.opacity = '1';
                resolve();
            });
        }, 300);
    });
}

// Initialize projects section
function initProjectsSection() {
    const allTabContent = document.getElementById("all");
    if (!allTabContent) return; // Exit if not on projects page

    const tabContents = {
        all: allTabContent,
        cyber: document.getElementById("cyber"),
        web: document.getElementById("web"),
        app: document.getElementById("app"),
        "3d": document.getElementById("3d")
    };

    // Create grid containers for each tab
    Object.values(tabContents).forEach(tab => {
        tab.innerHTML = '<div class="projects-grid"></div>';
    });

    // Populate projects
    projectsData.forEach(project => {
        // Add to all projects tab
        tabContents.all.querySelector(".projects-grid").innerHTML += createProjectCard(project);
        
        // Add to category-specific tab
        if (tabContents[project.category]) {
            tabContents[project.category].querySelector(".projects-grid").innerHTML += createProjectCard(project);
        }
    });

    // Add click handlers to project cards
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("click", () => {
            const projectId = card.getAttribute("data-id");
            window.location.href = `project-detail.html?id=${projectId}`;
        });

        // Add hover effect listeners
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // Set up tab switching
    const tabButtons = document.querySelectorAll(".tab-btn");
    let currentTab = "all";

    tabButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const targetTab = button.getAttribute("data-tab");
            if (targetTab === currentTab) return;

            // Update active states
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Handle tab transition
            await handleTabTransition(
                tabContents[currentTab],
                tabContents[targetTab]
            );

            currentTab = targetTab;

            // Trigger card animations
            const cards = tabContents[targetTab].querySelectorAll(".project-card");
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add("visible");
                }, index * 100);
            });
        });
    });

    // Initialize scroll animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll(".project-card").forEach(card => {
        observer.observe(card);
    });
}

// Export for global use
window.projectsData = projectsData;
window.initProjectsSection = initProjectsSection;

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initProjectsSection); 