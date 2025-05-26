-- 1. Get all books with their authors
SELECT b.title, a.name AS author, b.genre, b.price
FROM books b
JOIN authors a ON b.author_id = a.author_id;

-- 2. Get average rating for each book
SELECT b.title, ROUND(AVG(r.rating), 1) AS avg_rating, COUNT(r.review_id) AS review_count
FROM books b
LEFT JOIN reviews r ON b.book_id = r.book_id
GROUP BY b.book_id
ORDER BY avg_rating DESC;

-- 3. Get all reviews for a specific book with usernames
SELECT u.username, r.rating, r.comment, r.created_at
FROM reviews r
JOIN users u ON r.user_id = u.user_id
WHERE r.book_id = 1
ORDER BY r.created_at DESC;

-- 4. Get user order history with book details
SELECT o.order_id, b.title, o.quantity, o.total_price, o.order_date, o.status
FROM orders o
JOIN books b ON o.book_id = b.book_id
WHERE o.user_id = 1
ORDER BY o.order_date DESC;

-- 5. Get forum discussions for a book with participant count
SELECT fp.post_id, b.title, u.username AS poster, fp.content, 
       (SELECT COUNT(*) FROM forum_posts WHERE parent_post_id = fp.post_id) AS replies
FROM forum_posts fp
JOIN books b ON fp.book_id = b.book_id
JOIN users u ON fp.user_id = u.user_id
WHERE fp.parent_post_id IS NULL
ORDER BY fp.created_at DESC;