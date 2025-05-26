const db = require('../config/db');

class Review {
  static async create({ user_id, book_id, rating, comment }) {
    const { rows } = await db.query(
      `INSERT INTO reviews (user_id, book_id, rating, comment)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, book_id, rating, comment]
    );
    return rows[0];
  }

  static async findByBookId(book_id) {
    const { rows } = await db.query(
      `SELECT r.*, u.username 
       FROM reviews r JOIN users u ON r.user_id = u.user_id
       WHERE r.book_id = $1 ORDER BY r.created_at DESC`,
      [book_id]
    );
    return rows;
  }

  static async update(review_id, { rating, comment }) {
    const { rows } = await db.query(
      `UPDATE reviews SET 
        rating = COALESCE($1, rating),
        comment = COALESCE($2, comment)
       WHERE review_id = $3 RETURNING *`,
      [rating, comment, review_id]
    );
    return rows[0];
  }

  static async delete(review_id) {
    const { rows } = await db.query(
      'DELETE FROM reviews WHERE review_id = $1 RETURNING *',
      [review_id]
    );
    return rows[0];
  }

  static async calculateAverageRating(book_id) {
    const { rows } = await db.query(
      'SELECT AVG(rating) as average FROM reviews WHERE book_id = $1',
      [book_id]
    );
    return rows[0].average || 0;
  }
}

module.exports = Review;