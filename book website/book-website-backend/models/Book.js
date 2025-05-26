const db = require('../config/db');

class Book {
  static async findAll() {
    const { rows } = await db.query(
      `SELECT b.*, a.name as author_name 
       FROM books b JOIN authors a ON b.author_id = a.author_id`
    );
    return rows;
  }

  static async findById(id) {
    const { rows } = await db.query(
      `SELECT b.*, a.name as author_name 
       FROM books b JOIN authors a ON b.author_id = a.author_id 
       WHERE b.book_id = $1`,
      [id]
    );
    return rows[0];
  }

  static async create({ title, author_id, genre, price, description, published }) {
    const { rows } = await db.query(
      `INSERT INTO books (title, author_id, genre, price, description, published) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, author_id, genre, price, description, published]
    );
    return rows[0];
  }
}

module.exports = Book;