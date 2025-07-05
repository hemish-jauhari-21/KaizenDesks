document.addEventListener('DOMContentLoaded', function() {
    const blogPostCardsContainer = document.getElementById('blog-posts-container');
    const blogPostCards = Array.from(blogPostCardsContainer.getElementsByClassName('blog-post-card'));
    const pageLinks = document.querySelectorAll('#blog-pagination .page-link');
    const postsPerPage = 8; // Number of posts to display per page
    const totalPages = Math.ceil(blogPostCards.length / postsPerPage);
    let currentPage = 1;

    function showPage(pageNumber) {
        const startIndex = (pageNumber - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        blogPostCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block'; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });

        // Update active class on pagination links
        pageLinks.forEach(link => {
            link.classList.remove('active');
        });

        const currentPageLink = document.querySelector(`#blog-pagination .page-link:nth-child(${pageNumber})`);
        if (currentPageLink) {
            currentPageLink.classList.add('active');
        }
    }

    // Initial load: show the first page
    showPage(currentPage);

    // Add event listeners to pagination links
    pageLinks.forEach((link, index) => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            let newPageNumber;

            if (this.textContent.trim() === '>') {
                newPageNumber = Math.min(currentPage + 1, totalPages);
            } else {
                newPageNumber = parseInt(this.textContent);
            }

            if (!isNaN(newPageNumber) && newPageNumber !== currentPage) {
                currentPage = newPageNumber;
                showPage(currentPage);
            }
        });
    });
}); 