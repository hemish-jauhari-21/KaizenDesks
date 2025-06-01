document.addEventListener("DOMContentLoaded", function () {
    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get("id"));

    // Initialize animations
    initializeAnimations();
    initializeTextEffects();

    // Get project data (from projects.js which should have made projectsData global)
    if (!window.projectsData) {
        // If projectsData is not loaded yet, fetch projects.js
        const script = document.createElement("script");
        script.src = "../js/utils/projects.js";
        script.onload = () => loadProjectDetails(projectId);
        document.head.appendChild(script);
    } else {
        loadProjectDetails(projectId);
    }
});

function initializeAnimations() {
    // Add animation indices to elements
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    document.querySelectorAll('.project-details h2').forEach((heading, index) => {
        heading.style.setProperty('--heading-index', index);
    });

    document.querySelectorAll('.project-details p').forEach((paragraph, index) => {
        paragraph.style.setProperty('--paragraph-index', index);
    });

    document.querySelectorAll('.project-info-box').forEach((box, index) => {
        box.style.setProperty('--box-index', index);
    });

    document.querySelectorAll('.project-info-box li').forEach((item, index) => {
        item.style.setProperty('--list-item-index', index);
    });

    document.querySelectorAll('.related-project-card').forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });

    // Add scroll animation classes
    const animatedElements = document.querySelectorAll('.project-details h2, .project-details p, .project-info-box, .related-project-card');
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Initialize scroll observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function initializeTextEffects() {
    // Split text into spans for wave effect
    document.querySelectorAll('.text-wave').forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.transitionDelay = `${i * 0.05}s`;
            element.appendChild(span);
        });
    });

    // Split text into spans for split effect
    document.querySelectorAll('.text-split').forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        text.split(' ').forEach((word, i) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.transitionDelay = `${i * 0.1}s`;
            element.appendChild(span);
        });
    });

    // Initialize scroll observer for text effects
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all text elements with effects
    const textElements = document.querySelectorAll(
        '.text-reveal, .text-slide, .text-highlight, .text-split, ' +
        '.text-gradient, .text-scale, .text-blur, .text-rotate, ' +
        '.text-bounce, .text-wave, .text-glow, .text-slide-up, ' +
        '.text-slide-left, .text-slide-right, .text-fade-scale, .text-mask'
    );

    textElements.forEach(element => {
        textObserver.observe(element);
    });
}

function loadProjectDetails(projectId) {
    // Find the project by ID
    const project = window.projectsData.find((p) => p.id === projectId);

    if (!project) {
        // Handle project not found
        document.querySelector(".project-detail-container").innerHTML = `
            <div class="error-message">
                <h2 class="text-reveal">Project Not Found</h2>
                <p class="text-slide">Sorry, the project you're looking for doesn't exist.</p>
                <a href="index.html#projects-section" class="back-button text-highlight">Back to Projects</a>
            </div>
        `;
        return;
    }

    // Set page title
    document.title = `${project.title} | KaizenDesks Agency`;

    // Update project details in the DOM with text effects
    document.getElementById("project-title").innerHTML = `
        <span class="text-reveal">${project.title}</span>
    `;

    // Add tags with effects
    const tagsContainer = document.getElementById("project-tags");
    tagsContainer.innerHTML = project.tags
        .map((tag, index) => `
            <span class="project-tag text-scale delay-${index + 1}">${tag}</span>
        `)
        .join("");

    // Add gallery images with effects
    const galleryContainer = document.getElementById("project-gallery");
    galleryContainer.innerHTML = project.detailImages
        .map((image, index) => `
            <div class="gallery-item text-fade-scale delay-${index + 1}">
                <img src="${image}" alt="${project.title}">
            </div>
        `)
        .join("");

    // Show 3D model viewer if applicable
    if (project.has3DModel) {
        document.getElementById("model-viewer-container").style.display = "block";
        document.getElementById("model-viewer-container").classList.add("text-slide-up");

        setTimeout(() => {
            initializeModelViewer(project.modelPath);
        }, 100);
    }

    // Add project description with effects
    document.getElementById("project-description").innerHTML = `
        <div class="text-mask">${project.fullDescription}</div>
    `;
    document.getElementById("project-challenge").innerHTML = `
        <div class="text-slide-left">${project.challenge}</div>
    `;
    document.getElementById("project-solution").innerHTML = `
        <div class="text-slide-right">${project.solution}</div>
    `;

    // Add sidebar info with effects
    document.getElementById("project-client").innerHTML = `
        <span class="text-gradient">${project.client}</span>
    `;
    document.getElementById("project-year").innerHTML = `
        <span class="text-glow">${project.year}</span>
    `;

    // Add technologies with effects
    const techList = document.getElementById("project-technologies");
    techList.innerHTML = project.technologies
        .map((tech, index) => `
            <li class="text-bounce delay-${index + 1}">${tech}</li>
        `)
        .join("");

    // Add links with effects
    const linksContainer = document.getElementById("project-links");
    linksContainer.innerHTML = project.links
        .map((link, index) => `
            <a href="${link.url}" class="project-link-btn text-wave delay-${index + 1}" target="_blank">
                ${link.type}
            </a>
        `)
        .join("");

    // Add related projects with effects
    const relatedProjects = window.projectsData
        .filter((p) => p.id !== project.id && p.category === project.category)
        .slice(0, 3);

    const relatedProjectsContainer = document.getElementById("related-projects");
    if (relatedProjects.length > 0) {
        relatedProjectsContainer.innerHTML = relatedProjects
            .map((relatedProject, index) => `
                <div class="related-project-card text-slide-up delay-${index + 1}" data-id="${relatedProject.id}">
                    <div class="related-project-image">
                        <img src="${relatedProject.image}" alt="${relatedProject.title}">
                    </div>
                    <div class="related-project-info">
                        <h3 class="text-highlight">${relatedProject.title}</h3>
                        <p class="text-fade-scale">${relatedProject.description}</p>
                    </div>
                </div>
            `)
            .join("");

        // Add click handlers to related project cards
        document.querySelectorAll(".related-project-card").forEach((card) => {
            card.addEventListener("click", () => {
                const id = card.getAttribute("data-id");
                window.location.href = `project-detail.html?id=${id}`;
            });
        });
    } else {
        document.querySelector(".related-projects").style.display = "none";
    }

    // Reinitialize text effects after content is loaded
    initializeTextEffects();
}

// Initialize 3D model viewer
function initializeModelViewer(modelPath) {
    console.log("Initializing 3D viewer");
    const container = document.getElementById("3d-viewer");

    if (!container) {
        console.error("3D viewer container not found");
        return;
    }

    // Check if THREE is available
    if (typeof THREE === "undefined") {
        console.error("THREE.js not loaded");
        return;
    }

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    // Setup camera
    const width = container.clientWidth;
    const height = container.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.innerHTML = ""; // Clear any existing content
    container.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Load 3D model if path is provided
    if (modelPath) {
        const loader = new THREE.GLTFLoader();
        loader.load(
            modelPath,
            (gltf) => {
                const model = gltf.scene;
                scene.add(model);

                // Center and scale model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2 / maxDim;
                model.scale.multiplyScalar(scale);
                model.position.sub(center.multiplyScalar(scale));

                // Add controls
                const controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.05;

                // Animation loop
                function animate() {
                    requestAnimationFrame(animate);
                    controls.update();
                    renderer.render(scene, camera);
                }
                animate();
            },
            undefined,
            (error) => {
                console.error("Error loading 3D model:", error);
            }
        );
    } else {
        // Create a colored cube for demo purposes
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const materials = [
            new THREE.MeshStandardMaterial({ color: 0xff0000 }), // red
            new THREE.MeshStandardMaterial({ color: 0x00ff00 }), // green
            new THREE.MeshStandardMaterial({ color: 0x0000ff }), // blue
            new THREE.MeshStandardMaterial({ color: 0xffff00 }), // yellow
            new THREE.MeshStandardMaterial({ color: 0xff00ff }), // magenta
            new THREE.MeshStandardMaterial({ color: 0x00ffff }), // cyan
        ];
        const cube = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        scene.add(cube);

        // Add controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    }

    // Handle window resize
    window.addEventListener("resize", () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    console.log("3D viewer initialized");
} 