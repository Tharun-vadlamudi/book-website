// Mock API functions - will be replaced with real API calls in Phase 2

export async function fetchBooks(query = '') {
    // In a real implementation, this would be:
    // return fetch(`/api/books?q=${query}`).then(res => res.json());
    
    // Mock data
    return new Promise(resolve => {
        setTimeout(() => {
            const mockBooks = [
                // Same books as in main.js plus additional ones
            ];
            
            if (query) {
                const filtered = mockBooks.filter(book => 
                    book.title.toLowerCase().includes(query.toLowerCase()) || 
                    book.author.toLowerCase().includes(query.toLowerCase())
                );
                resolve(filtered);
            } else {
                resolve(mockBooks);
            }
        }, 500); // Simulate network delay
    });
}

export async function fetchBookDetails(bookId) {
    return new Promise(resolve => {
        setTimeout(() => {
            const mockBook = {
                id: bookId,
                title: "Sample Book",
                author: "Sample Author",
                description: "This is a detailed description of the book...",
                // More details
            };
            resolve(mockBook);
        }, 500);
    });
}