-- Insert a new user
INSERT INTO users (username, email, password) VALUES 
('newuser', 'new@example.com', 'hashed_password6');

-- Update a book price
UPDATE books SET price = 11.99 WHERE book_id = 1;

-- Delete a review
DELETE FROM reviews WHERE review_id = 4;