const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  // ... (previous methods)

  static async findById(id) {
    const { rows } = await db.query(
      'SELECT user_id, username, email, role, created_at FROM users WHERE user_id = $1',
      [id]
    );
    return rows[0];
  }

  static async update(id, { username, email, role }) {
    const { rows } = await db.query(
      `UPDATE users SET 
        username = COALESCE($1, username),
        email = COALESCE($2, email),
        role = COALESCE($3, role)
       WHERE user_id = $4 RETURNING *`,
      [username, email, role, id]
    );
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await db.query(
      'DELETE FROM users WHERE user_id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  }
}

module.exports = User;