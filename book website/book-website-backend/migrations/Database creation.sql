-- Database creation
CREATE DATABASE book_website;

-- Connect to the database
\c book_website

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'author', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Authors table
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    website VARCHAR(255),
    user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL
);

-- Books table
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INTEGER REFERENCES authors(author_id) ON DELETE CASCADE,
    genre VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    description TEXT,
    published DATE,
    cover_image VARCHAR(255)
);

-- Reviews table
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(book_id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, book_id) -- Prevent duplicate reviews by same user
);

-- Orders table
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    book_id INTEGER REFERENCES books(book_id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'processing' CHECK (status IN ('processing', 'shipped', 'delivered', 'cancelled'))
);

-- Forum posts table
CREATE TABLE forum_posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(book_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    parent_post_id INTEGER REFERENCES forum_posts(post_id) ON DELETE SET NULL
);

-- Create indexes for performance
CREATE INDEX idx_books_author ON books(author_id);
CREATE INDEX idx_reviews_book ON reviews(book_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_forum_posts_book ON forum_posts(book_id);