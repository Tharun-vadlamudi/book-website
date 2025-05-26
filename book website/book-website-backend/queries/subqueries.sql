-- 1. Find books that have no reviews yet
SELECT b.title, a.name AS author
FROM books b
JOIN authors a ON b.author_id = a.author_id
WHERE b.book_id NOT IN (SELECT book_id FROM reviews);

-- 2. Find users who have spent more than $20 in total
SELECT u.username, u.email, SUM(o.total_price) AS total_spent
FROM users u
JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id
HAVING SUM(o.total_price) > 20
ORDER BY total_spent DESC;