-- Insert sample users
INSERT INTO users (username, email, password, role) VALUES
('johndoe', 'john@example.com', 'hashed_password1', 'user'),
('janedoe', 'jane@example.com', 'hashed_password2', 'user'),
('sarahsmith', 'sarah@example.com', 'hashed_password3', 'author'),
('mikejohnson', 'mike@example.com', 'hashed_password4', 'admin'),
('booklover42', 'bl42@example.com', 'hashed_password5', 'user');

-- Insert sample authors
INSERT INTO authors (name, bio, website, user_id) VALUES
('George Orwell', 'English novelist and essayist', 'https://georgeorwell.org', 3),
('J.K. Rowling', 'British author best known for Harry Potter', 'https://jkrowling.com', NULL),
('Stephen King', 'American author of horror and suspense', 'https://stephenking.com', NULL),
('Jane Austen', 'English novelist known for social commentary', 'https://janeausten.org', NULL),
('Mark Twain', 'American humorist and writer', 'https://marktwain.com', NULL);

-- Insert sample books
INSERT INTO books (title, author_id, genre, price, description, published) VALUES
('1984', 1, 'Dystopian', 12.99, 'A dystopian social science fiction novel', '1949-06-08'),
('Harry Potter and the Philosopher''s Stone', 2, 'Fantasy', 14.99, 'First book in the Harry Potter series', '1997-06-26'),
('The Shining', 3, 'Horror', 10.99, 'A horror novel about a haunted hotel', '1977-01-28'),
('Pride and Prejudice', 4, 'Romance', 9.99, 'Classic romance novel', '1813-01-28'),
('The Adventures of Tom Sawyer', 5, 'Adventure', 8.99, 'Story of a young boy growing up along the Mississippi River', '1876-06-01');

-- Insert sample reviews
INSERT INTO reviews (user_id, book_id, rating, comment) VALUES
(1, 1, 5, 'A timeless classic that remains relevant today'),
(2, 1, 4, 'Thought-provoking but somewhat depressing'),
(1, 2, 5, 'Magical world that captivates readers of all ages'),
(5, 3, 3, 'Scary but the pacing was slow at times'),
(4, 5, 5, 'A masterpiece of American literature');

-- Insert sample orders
INSERT INTO orders (user_id, book_id, quantity, total_price, status) VALUES
(1, 1, 1, 12.99, 'delivered'),
(2, 2, 2, 29.98, 'shipped'),
(5, 3, 1, 10.99, 'processing'),
(1, 4, 1, 9.99, 'delivered'),
(5, 5, 3, 26.97, 'cancelled');

-- Insert sample forum posts
INSERT INTO forum_posts (user_id, book_id, content, parent_post_id) VALUES
(1, 1, 'What did everyone think about the ending of 1984?', NULL),
(2, 1, 'I found it haunting but realistic', 1),
(5, 2, 'Which Hogwarts house would you be in?', NULL),
(1, 2, 'Definitely Gryffindor!', 3),
(4, 5, 'Discussion about Mark Twain''s writing style', NULL);