// Blog Detail Page JavaScript

// Blog post data
const blogPosts = {
    'tech-reshaping-industries': {
        title: 'How leading tech is reshaping global industries',
        date: '07 Mar 2025',
        category: 'Technology',
        author: {
            name: 'John Doe',
            role: 'Technology Writer',
            image: 'https://picsum.photos/seed/author1/100/100'
        },
        image: 'https://picsum.photos/seed/blog1/1200/600',
        content: `
            <p class="blog-intro">
                The rapid advancement of technology is fundamentally transforming how businesses operate and compete in the global marketplace. From artificial intelligence to blockchain, these innovations are not just changing individual companies but entire industries.
            </p>

            <h2>The Impact of AI on Business Operations</h2>
            <p>
                Artificial Intelligence has become a cornerstone of modern business operations. Companies are leveraging AI to automate processes, enhance decision-making, and create more personalized customer experiences. The integration of AI systems has led to significant improvements in efficiency and productivity across various sectors.
            </p>

            <h2>Blockchain Revolution in Finance</h2>
            <p>
                The financial sector has been particularly impacted by blockchain technology. This distributed ledger technology is revolutionizing how transactions are processed, verified, and recorded. The implications for security, transparency, and efficiency are profound, leading to new business models and opportunities.
            </p>

            <blockquote>
                <span style="color: #030720;">"Technology is not just a tool. It can give learners a voice that they may not have had before."</span><br/>
                <cite style="color: #C3F00F;">- George Couros</cite>
            </blockquote>

            <h2>The Future of Work</h2>
            <p>
                As technology continues to evolve, the nature of work itself is changing. Remote work, digital collaboration, and automated systems are becoming the norm. This shift requires both businesses and workers to adapt and develop new skills to remain competitive in the digital age.
            </p>
        `,
        tags: ['Technology', 'Innovation', 'Business', 'Digital Transformation']
    },
    'digital-transformation': {
        title: 'Why digital transformation drives modern businesses',
        date: '07 Mar 2025',
        category: 'Digital Business',
        author: {
            name: 'Jane Smith',
            role: 'Digital Strategy Expert',
            image: 'https://picsum.photos/seed/author2/100/100'
        },
        image: 'https://picsum.photos/seed/blog2/1200/600',
        content: `
            <p class="blog-intro">
                Digital transformation has become a critical driver of business success in the modern era. Companies that embrace digital technologies are seeing unprecedented growth and innovation in their operations.
            </p>

            <h2>The Digital Imperative</h2>
            <p>
                In today's fast-paced business environment, digital transformation is no longer optional. Companies must adapt to digital technologies to remain competitive and meet evolving customer expectations.
            </p>

            <h2>Key Benefits of Digital Transformation</h2>
            <p>
                Organizations that successfully implement digital transformation initiatives often see improved efficiency, better customer experiences, and increased revenue growth. The key is to approach transformation strategically and with clear objectives.
            </p>
        `,
        tags: ['Digital Transformation', 'Business Strategy', 'Innovation']
    },
    'automation-trends': {
        title: 'How automation trends are impacting global industries',
        date: '20 Feb 2025',
        category: 'Automation',
        author: {
            name: 'Mike Johnson',
            role: 'Automation Specialist',
            image: 'https://picsum.photos/seed/author3/100/100'
        },
        image: 'https://picsum.photos/seed/blog3/1200/600',
        content: `
            <p class="blog-intro">
                Automation is revolutionizing industries worldwide, from manufacturing to healthcare. This comprehensive look at automation trends reveals how businesses are adapting to this technological shift.
            </p>

            <h2>Manufacturing Automation</h2>
            <p>
                The manufacturing sector has seen dramatic changes with the introduction of advanced automation technologies. Robotics and AI are transforming production lines and improving efficiency.
            </p>
        `,
        tags: ['Automation', 'Manufacturing', 'Technology']
    },
    'blockchain-adoption': {
        title: 'Why blockchain adoption is growing in financial sectors',
        date: '20 Feb 2025',
        category: 'Blockchain',
        author: {
            name: 'Sarah Wilson',
            role: 'Blockchain Analyst',
            image: 'https://picsum.photos/seed/author4/100/100'
        },
        image: 'https://picsum.photos/seed/blog4/1200/600',
        content: `
            <p class="blog-intro">
                Blockchain technology is rapidly gaining traction in the financial sector, offering new solutions for security, transparency, and efficiency in transactions.
            </p>

            <h2>Financial Sector Applications</h2>
            <p>
                Banks and financial institutions are increasingly adopting blockchain for various applications, from cross-border payments to smart contracts.
            </p>
        `,
        tags: ['Blockchain', 'Finance', 'Technology']
    },
    'smart-devices': {
        title: 'How smart devices are enhancing personal productivity',
        date: '20 Feb 2025',
        category: 'Smart Technology',
        author: {
            name: 'David Chen',
            role: 'IoT Expert',
            image: 'https://picsum.photos/seed/author5/100/100'
        },
        image: 'https://picsum.photos/seed/blog5/1200/600',
        content: `
            <p class="blog-intro">
                Artificial Intelligence (AI) is no longer a futuristic concept confined to sci-fi movies; it's an integral part of our everyday lives, shaping how we interact with technology, perform routine tasks, and even manage our homes. From smart devices to personal assistants, AI has revolutionized the way we live, making our daily routines more convenient, efficient, and connected. In this blog, we'll explore how AI is transforming everyday life, focusing on AI devices, personal assistants, and home automation systems that are seamlessly integrating into our daily routines.
            </p>

            <h2>1. AI-Powered Smart Devices: Making Life More Convenient</h2>
            <p>
                One of the most noticeable impacts of AI in daily life is the rise of smart devices that use AI to simplify and enhance everyday tasks. These devices are designed to learn from user behavior, anticipate needs, and make real-time adjustments to optimize their performance.
            </p>

            <img src="https://picsum.photos/seed/smartdevice1/800/450" alt="Smart Devices" class="blog-content-image">

            <h3>Smart Thermostats:</h3>
            <p>
                Devices like Nest or Ecobee use AI to learn your temperature preferences and adjust accordingly throughout the day. They even track weather patterns and occupancy to save energy, reducing utility bills.
            </p>
            <h3>Smart Speakers:</h3>
            <p>
                Devices like Amazon Echo, Google Home, and Apple HomePod are driven by AI to control music, answer questions, and provide information. They act as central hubs for many smart devices, making it easier to manage home automation.
            </p>
            <h3>AI-Enhanced Appliances:</h3>
            <p>
                AI-powered refrigerators, washing machines, and vacuum cleaners are growing in popularity. These appliances can track inventory, recommend recipes based on available ingredients, or even clean your floors autonomously.
            </p>
            <p>
                With these devices, AI is creating a more intuitive, responsive living environment, making day-to-day activities more efficient.
            </p>

            <h2>2. Personal Assistants: AI at Your Service</h2>
            <p>
                Personal assistants like Amazon's Alexa, Google Assistant, and Apple's Siri have become an integral part of modern life. These virtual assistants use sophisticated AI technology to manage schedules, control smart devices, provide weather updates, answer queries, and even facilitate online shopping—all through voice commands.
            </p>

            <img src="https://picsum.photos/seed/personalassistant/800/450" alt="Personal Assistant" class="blog-content-image">

            <h3>Task Management:</h3>
            <p>
                Virtual assistants can set reminders, make calls, send messages, and keep track of important events. This helps users stay organized and on top of their daily responsibilities.
            </p>
            <h3>Voice-Activated Control:</h3>
            <p>
                Personal assistants connect with various smart devices, enabling users to control lights, security systems, or even kitchen appliances using simple voice commands.
            </p>
            <h3>Information Retrieval:</h3>
            <p>
                Need to check the traffic before heading out? Want to hear the latest news or weather update? These AI-driven assistants provide real-time information, making life more convenient.
            </p>
            <p>
                The growing sophistication of personal assistants ensures that they aren't just responding to commands, but also learning from user interactions to offer more personalized experiences.
            </p>

            <h2>3. Home Automation: The Smart Home Revolution</h2>
            <p>
                Home automation powered by AI is creating connected, intelligent living spaces that adapt to our needs. Smart home systems are using AI to synchronize devices, manage energy consumption, and ensure the safety of your home, all through a centralized platform.
            </p>

            <img src="https://picsum.photos/seed/homeautomation/800/450" alt="Home Automation" class="blog-content-image">

            <h3>Security Systems:</h3>
            <p>
                AI-driven security cameras, motion sensors, and doorbell cameras can recognize faces, detect unusual activity, and send real-time alerts to homeowners. Some systems can even differentiate between harmless and suspicious activity, reducing false alarms.
            </p>
            <h3>Lighting and Climate Control:</h3>
            <p>
                Smart lighting systems can adjust brightness based on the time of day or activity, while AI-powered climate control systems can ensure optimal temperature levels by learning your preferences.
            </p>
            <h3>Energy Efficiency:</h3>
            <p>
                AI systems can optimize energy use by automatically adjusting heating, cooling, and lighting based on occupancy, weather patterns, and user behavior. This not only makes homes more comfortable but also helps reduce carbon footprints and utility costs.
            </p>
            <p>
                With AI seamlessly integrating into home automation, homes are becoming smarter, more efficient, and tailored to the individual preferences of their occupants.
            </p>

            <h2>4. AI in Entertainment and Media</h2>
            <p>
                Another way AI is transforming daily life is through entertainment. Streaming platforms like Netflix, Spotify, and YouTube use AI algorithms to recommend content based on your preferences and viewing habits. These recommendations become increasingly accurate the more you engage with the platform, providing a personalized entertainment experience.
            </p>
            <h3>Content Curation:</h3>
            <p>
                AI tracks your viewing habits and suggests movies, TV shows, or music that aligns with your tastes. This enhances your user experience by delivering relevant content and minimizing the time spent searching for something to watch or listen to.
            </p>
            <h3>AI-Driven Media Creation:</h3>
            <p>
                In addition to curation, AI is increasingly used in content creation. From AI-generated music to video editing tools, AI is revolutionizing how media is produced and consumed.
            </p>

            <h2>5. AI in Health and Wellness</h2>
            <p>
                AI is not just limited to convenience and entertainment; it's also becoming a key player in health and wellness. Wearable devices like Fitbits or Apple Watches monitor vital statistics such as heart rate, steps, and sleep patterns, providing insights into your physical health. Some advanced AI health apps even analyze this data to recommend changes in diet, exercise, or lifestyle for better well-being.
            </p>

            <img src="https://picsum.photos/seed/healthwellness/800/450" alt="Health and Wellness" class="blog-content-image">

            <h3>Fitness Tracking:</h3>
            <p>
                AI algorithms analyze data from fitness trackers to create customized workout plans, monitor progress, and provide real-time feedback.
            </p>
            <h3>Mental Wellness Apps:</h3>
            <p>
                AI-powered apps like Headspace or Woebot offer guided meditation, mental health support, and cognitive behavioral therapy based on user input, helping individuals manage stress and anxiety.
            </p>

            <h2>6. AI in Transportation: Autonomous Vehicles and Smart Traffic</h2>
            <p>
                The transportation industry is also seeing significant changes thanks to AI in daily life. Autonomous vehicles, such as Tesla's self-driving cars, use AI to navigate, detect obstacles, and even park without human intervention. AI is also being used in smart traffic management systems to reduce congestion and optimize public transportation schedules.
            </p>

            <img src="https://picsum.photos/seed/transportation/800/450" alt="Transportation" class="blog-content-image">

            <h3>Autonomous Vehicles:</h3>
            <p>
                AI systems in autonomous vehicles use cameras, sensors, and machine learning algorithms to process real-time data, making split-second decisions that improve road safety.
            </p>
            <h3>Smart Traffic Systems:</h3>
            <p>
                Cities are starting to adopt AI-powered traffic management systems that can predict traffic patterns, adjust traffic light timings, and provide alternative routes to drivers, reducing overall congestion.
            </p>

            <h2>Conclusion: The Future of AI in Daily Life</h2>
            <p>
                The integration of AI in daily life is only set to grow as technology advances. From personalized experiences through virtual assistants and smart devices to improving energy efficiency and security through home automation, AI is making everyday life more seamless, convenient, and intelligent. As AI continues to evolve, we can expect even greater transformations in how we live, work, and interact with technology.
            </p>
            <p>
                Whether you're adjusting the temperature of your home with a voice command, receiving curated content recommendations, or relying on AI-powered wearable devices for health insights, it's clear that AI has already changed the fabric of daily life—and it's only just beginning.
            </p>

            <h2>FAQs:</h2>
            <h3>What are some examples of AI devices used in everyday life?</h3>
            <p>
                AI devices include smart thermostats, smart speakers like Amazon Echo, AI-powered appliances, and personal assistants like Google Assistant and Siri, all of which enhance convenience and efficiency in daily tasks.
            </p>
            <h3>How does AI improve home automation?</h3>
            <p>
                AI enhances home automation by allowing devices like smart lighting, thermostats, and security systems to learn from user preferences and operate autonomously, making homes more efficient and secure.
            </p>
            <h3>Can AI be used for entertainment?</h3>
            <p>
                Yes, streaming services like Netflix and Spotify use AI algorithms to provide personalized recommendations based on user behavior, improving the entertainment experience.
            </p>
            <h3>How do AI personal assistants like Alexa or Google Assistant work?</h3>
            <p>
                These AI-powered assistants use natural language processing (NLP) to understand voice commands, perform tasks, and provide real-time information. They also integrate with other smart devices for a seamless experience.
            </p>
            <h3>How does AI impact transportation?</h3>
            <p>
                AI is revolutionizing transportation through autonomous vehicles and smart traffic management systems, improving road safety and reducing traffic congestion.
            </p>
        `,
        tags: ['Smart Devices', 'Productivity', 'Technology']
    },
    'cybersecurity-measures': {
        title: 'Why cybersecurity measures are crucial for businesses',
        date: '20 Feb 2025',
        category: 'Cybersecurity',
        author: {
            name: 'Emily White',
            role: 'Cybersecurity Analyst',
            image: 'https://picsum.photos/seed/author6/100/100'
        },
        image: 'https://picsum.photos/seed/blog6/1200/600',
        content: `
            <p class="blog-intro">
                In today's digital landscape, cybersecurity is no longer an option but a necessity for businesses of all sizes. Protecting sensitive data and systems from evolving threats is paramount.
            </p>

            <h2>The Growing Threat Landscape</h2>
            <p>
                Cyber threats are becoming more sophisticated, ranging from ransomware attacks to phishing schemes. Businesses must implement robust cybersecurity measures to mitigate these risks.
            </p>
        `,
        tags: ['Cybersecurity', 'Business Security', 'Data Protection']
    },
    'ai-creative-industries': {
        title: 'The Future of AI in Creative Industries',
        date: '10 Apr 2025',
        category: 'Artificial Intelligence',
        author: {
            name: 'Alex Rivera',
            role: 'AI & Design Specialist',
            image: 'https://picsum.photos/seed/author7/100/100'
        },
        image: 'https://picsum.photos/seed/blog7/1200/600',
        content: `
            <p class="blog-intro">
                Artificial Intelligence is rapidly transforming creative industries, offering new tools and possibilities for artists, designers, and content creators. From generating art to automating tedious tasks, AI is reshaping the creative landscape.
            </p>

            <h2>AI-Powered Art Generation</h2>
            <p>
                AI models can now generate stunning visual art, music compositions, and written content, pushing the boundaries of what's possible in creative fields. This opens up new avenues for artistic expression and collaboration.
            </p>

            <h2>Automating Design Workflows</h2>
            <p>
                AI tools are streamlining various aspects of design, from graphic design to UI/UX, by automating repetitive tasks and providing intelligent suggestions. This allows designers to focus on more conceptual and strategic work.
            </p>

            <blockquote>
                <span style="color: #030720;">"Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something."</span><br/>
                <cite style="color: #C3F00F;">- Steve Jobs</cite>
            </blockquote>

            <h2>The Evolution of Content Creation</h2>
            <p>
                AI is changing how content is produced, enabling faster creation of videos, articles, and marketing materials. This shift is empowering creators to scale their output and explore new formats.
            </p>
        `,
        tags: ['AI', 'Creative Industries', 'Art', 'Design']
    },
    'sustainable-tech': {
        title: 'Sustainable Tech: Innovating for a Greener Tomorrow',
        date: '15 May 2025',
        category: 'Sustainability',
        author: {
            name: 'Jordan Lee',
            role: 'Environmental Tech Advocate',
            image: 'https://picsum.photos/seed/author8/100/100'
        },
        image: 'https://picsum.photos/seed/blog8/1200/600',
        content: `
            <p class="blog-intro">
                The tech industry is increasingly focusing on sustainability, developing innovative solutions to address environmental challenges. From renewable energy to eco-friendly manufacturing, sustainable tech is paving the way for a greener future.
            </p>

            <h2>Renewable Energy Innovations</h2>
            <p>
                Technological advancements are making renewable energy sources like solar and wind power more efficient and accessible. Smart grids and energy storage solutions are also playing a crucial role in the transition to clean energy.
            </p>

            <h2>Eco-Friendly Manufacturing</h2>
            <p>
                Companies are adopting sustainable manufacturing practices, using recycled materials, reducing waste, and minimizing their carbon footprint. This commitment to eco-friendly production is vital for a circular economy.
            </p>

            <blockquote>
                <span style="color: #030720;">"The greatest threat to our planet is the belief that someone else will save it."</span><br/>
                <cite style="color: #C3F00F;">- Robert Swan</cite>
            </blockquote>

            <h2>Sustainable Urban Development</h2>
            <p>
                Technology is enabling the creation of smart, sustainable cities. From intelligent transportation systems to green buildings, urban areas are leveraging tech to improve resource efficiency and quality of life.
            </p>
        `,
        tags: ['Sustainability', 'Green Tech', 'Renewable Energy', 'Innovation']
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Get the blog post ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');

    // Load the appropriate blog post
    if (postId && blogPosts[postId]) {
        loadBlogPost(blogPosts[postId]);
    } else {
        // Redirect to blog page if post not found
        window.location.href = 'blog.html';
    }

    // Initialize animations
    initializeAnimations();
    
    // Initialize share buttons
    initializeShareButtons();
    
    // Initialize related posts
    initializeRelatedPosts();
});

function loadBlogPost(post) {
    // Update page title
    document.title = `${post.title} - KaizenDesks Blog`;

    // Update blog header
    document.querySelector('.blog-date').textContent = post.date;
    document.querySelector('.blog-category').textContent = post.category;
    document.querySelector('.blog-title').textContent = post.title;

    // Update author information
    document.querySelector('.author-image').src = post.author.image;
    document.querySelector('.author-info h3').textContent = post.author.name;
    document.querySelector('.author-info p').textContent = post.author.role;

    // Update featured image
    document.querySelector('.blog-featured-image img').src = post.image;

    // Update content
    document.querySelector('.blog-content').innerHTML = post.content;

    // Update tags
    const tagsContainer = document.querySelector('.blog-tags');
    tagsContainer.innerHTML = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    // Update related posts
    updateRelatedPosts(post);
}

function updateRelatedPosts(currentPost) {
    const relatedPosts = Object.values(blogPosts)
        .filter(post => post.title !== currentPost.title)
        .slice(0, 2);

    const relatedPostsGrid = document.querySelector('.related-posts-grid');
    relatedPostsGrid.innerHTML = relatedPosts.map(post => `
        <div class="related-post-card">
            <img src="${post.image}" alt="${post.title}">
            <h3>${post.title}</h3>
            <a href="blog-detail.html?post=${Object.keys(blogPosts).find(key => blogPosts[key] === post)}" class="read-more">Read More</a>
        </div>
    `).join('');
}

function initializeAnimations() {
    // Animate blog title
    gsap.from('.blog-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Animate blog content
    gsap.from('.blog-content', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });

    // Animate related posts
    gsap.from('.related-post-card', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.related-posts',
            start: 'top 80%'
        }
    });
}

function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.querySelector('.blog-title').textContent);
            
            let shareUrl;
            
            if (this.classList.contains('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            } else if (this.classList.contains('linkedin')) {
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
            } else if (this.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

function initializeRelatedPosts() {
    const relatedPostCards = document.querySelectorAll('.related-post-card');
    
    relatedPostCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if the click wasn't on the read more link
            if (!e.target.classList.contains('read-more')) {
                const link = this.querySelector('.read-more');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll to top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.className = 'scroll-to-top';
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #C3F00F;
    color: #000;
    border: none;
    cursor: pointer;
    display: none;
    font-size: 20px;
    z-index: 1000;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 