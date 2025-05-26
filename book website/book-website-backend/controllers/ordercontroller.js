const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user_id: req.user.id,
      items: req.body.items
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findByUserId(req.user.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.updateStatus(
      req.params.orderId,
      req.body.status
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};