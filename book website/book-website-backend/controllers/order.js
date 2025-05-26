const db = require('../config/db');

class Order {
  static async create({ user_id, items }) {
    const client = await db.connect();
    
    try {
      await client.query('BEGIN');
      
      // Create order
      const orderRes = await client.query(
        'INSERT INTO orders (user_id) VALUES ($1) RETURNING *',
        [user_id]
      );
      const order = orderRes.rows[0];
      
      // Add order items
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, book_id, quantity, price)
           VALUES ($1, $2, $3, 
           (SELECT price FROM books WHERE book_id = $2))`,
          [order.order_id, item.book_id, item.quantity]
        );
      }
      
      await client.query('COMMIT');
      return order;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  static async findByUserId(user_id) {
    const { rows } = await db.query(
      `SELECT o.*, 
       json_agg(
         json_build_object(
           'book_id', oi.book_id,
           'title', b.title,
           'quantity', oi.quantity,
           'price', oi.price
         )
       ) as items
       FROM orders o
       JOIN order_items oi ON o.order_id = oi.order_id
       JOIN books b ON oi.book_id = b.book_id
       WHERE o.user_id = $1
       GROUP BY o.order_id ORDER BY o.order_date DESC`,
      [user_id]
    );
    return rows;
  }

  static async updateStatus(order_id, status) {
    const { rows } = await db.query(
      'UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *',
      [status, order_id]
    );
    return rows[0];
  }
}

module.exports = Order;