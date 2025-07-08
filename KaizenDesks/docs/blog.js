// Fetch and render Medium posts for @sohail_saifi

console.log("blog.js loaded and running");

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('blog-posts-container');
    if (!container) {
        console.error('No container with id blog-posts-container found.');
        return;
    }

    // Medium RSS feed via rss2json
    const rss2jsonUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sohail_saifi';
    console.log('Fetching Medium posts from:', rss2jsonUrl);

    fetch(rss2jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Medium data:', data);
            if (!data.items || !Array.isArray(data.items)) {
                container.innerHTML = '<p>Could not load Medium posts.</p>';
                return;
            }
            if (data.items.length === 0) {
                container.innerHTML = '<p>No Medium posts found.</p>';
                return;
            }
            container.innerHTML = data.items.map(item => {
                // Use the first image in the content, or a fallback
                let imgMatch = item.content.match(/<img[^>]+src=\"([^\"]+)\"/);
                let imgSrc = imgMatch ? imgMatch[1] : 'blog-image-1.jpg';
                // Format date as DD MMM YYYY
                let pubDate = new Date(item.pubDate);
                let dateStr = pubDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                return `
                <div class="blog-post-card visible">
                    <img src="${imgSrc}" alt="${item.title}">
                    <div class="blog-post-date">${dateStr}</div>
                    <h3>${item.title}</h3>
                    <div class="blog-button-container">
                        <a href="${item.link}" class="blog-button" target="_blank" rel="noopener">Read More</a>
                    </div>
                </div>
                `;
            }).join('');
        })
        .catch(err => {
            container.innerHTML = '<p>Failed to fetch Medium posts.</p>';
            console.error('Failed to fetch Medium posts:', err);
        });
}); 