const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getUserOrders);
router.put('/:orderId/status', authMiddleware, orderController.updateOrderStatus);

module.exports = router;