// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load featured books
    loadFeaturedBooks();
    
    // Initialize event listeners
    initEventListeners();
});

function loadFeaturedBooks() {
    // In a real app, this would fetch from an API
    const featuredBooks = [
        {
            id: 1,
            title: "1984",
            author: "George Orwell",
            coverImage: "assets/images/1984.jpg",
            rating: 4.5
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            coverImage: "assets/images/mockingbird.jpg",
            rating: 5
        },
        {
            id: 3,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            coverImage: "assets/images/gatsby.jpg",
            rating: 4
        },
        {
            id: 4,
            title: "Pride and Prejudice",
            author: "Jane Austen",
            coverImage: "assets/images/pride.jpg",
            rating: 4.5
        }
    ];
    
    const bookGrid = document.getElementById('featured-books');
    bookGrid.innerHTML = featuredBooks.map(book => `
        <div class="book-card">
            <img src="${book.coverImage}" alt="${book.title}">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="author">${book.author}</p>
                <div class="rating">
                    ${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5-Math.floor(book.rating))}
                </div>
                <button onclick="viewBookDetails(${book.id})">View Details</button>
            </div>
        </div>
    `).join('');
}

function initEventListeners() {
    // Search functionality
    const searchButton = document.querySelector('.search-bar button');
    searchButton.addEventListener('click', performSearch);
    
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = document.querySelector('.search-bar input').value;
    if (searchTerm.trim()) {
        // In a real app, this would redirect to search results
        window.location.href = `pages/books.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

function viewBookDetails(bookId) {
    window.location.href = `pages/book-detail.html?id=${bookId}`;
}