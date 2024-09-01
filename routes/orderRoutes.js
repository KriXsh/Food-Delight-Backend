const express = require('express');
const router = express.Router();
const { placeOrderAndProcessPayment, getOrderById, updateOrderStatus, getAllOrders } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const { createOrderSchema } = require('../validations/payload');

// Route to place a new order
router.post('/create', authMiddleware, validationMiddleware(createOrderSchema), placeOrderAndProcessPayment);

// Route to get an order by ID
router.get('/:id', authMiddleware, getOrderById);

// Route to update order status
router.put('/:id/status', authMiddleware, updateOrderStatus);

// Route to get all orders (admin access)
router.get('/', authMiddleware, getAllOrders);

module.exports = router;
