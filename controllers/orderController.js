const pool = require('../config/db');
// const { Order, OrderItem, MenuItem } = require('../models');
const sequelize = require('../config/db');
const { Order, OrderItem, MenuItem, Payment } = require('../models');
const { standardManageError } = require('../utils/helpers');
const { v4: uuidv4 } = require('uuid');


// Place a new order and process payment
exports.placeOrderAndProcessPayment = async (req, res) => {
    const { userId, restaurantId, items, deliveryAddress, paymentMethod } = req.body;

    // Start a transaction
    const transaction = await sequelize.transaction();

    try {
        // Check if all menu items exist
        for (let item of items) {
            const menuItem = await MenuItem.findOne({ where: { id: item.menuItemId, restaurantId } });
            if (!menuItem) {
                await transaction.rollback();
                return standardManageError(req, res, `Menu item with ID ${item.menuItemId} not found`, 'notFound');
            }
        }

        // Calculate total price
        let totalPrice = 0;
        for (let item of items) {
            const menuItem = await MenuItem.findByPk(item.menuItemId);
            totalPrice += menuItem.price * item.quantity;
        }

        // Create a new order
        const newOrder = await Order.create({
            userId,
            restaurantId,
            deliveryAddress,
            totalPrice,
            status: 'placed',
        }, { transaction });

        // Insert order items
        for (let item of items) {
            await OrderItem.create({
                orderId: newOrder.id,
                menuItemId: item.menuItemId,
                quantity: item.quantity,
            }, { transaction });
        }

        // Simulate payment processing
        const paymentStatus = 'success'; // Assuming payment is always successful for now
        const transactionId = uuidv4(); // Generate a unique transaction ID

        // Create a payment record
        await Payment.create({
            orderId: newOrder.id,
            transactionId,
            amount: totalPrice,
            method: paymentMethod,
            status: paymentStatus,
        }, { transaction });

        // Commit the transaction
        await transaction.commit();

        res.status(201).json({ code: 201, message: 'Order placed and payment processed successfully', orderId: newOrder.id, transactionId });
    } catch (error) {
        // Rollback the transaction in case of error
        await transaction.rollback();

        console.error('Error during order placement:', error.message, error.stack);
        return standardManageError(req, res, 'Error placing order: ' + error.message, 'server');
    }
};



// Get an order by ID
exports.getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);
        if (order) {
            res.status(200).json({ code: 200, data: order });
        } else {
            res.status(404).json({ code: 404, message: 'Order not found' });
        }
    } catch (error) {
        console.error('Error during order retrieval:', error.message, error.stack);
        res.status(500).json({ code: 500, message: 'Error retrieving order' });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const [updated] = await Order.update(
            { status },
            { where: { id } }
        );

        if (updated) {
            res.status(200).json({ code: 200, message: 'Order status updated successfully' });
        } else {
            res.status(404).json({ code: 404, message: 'Order not found' });
        }
    } catch (error) {
        console.error('Error updating order status:', error.message, error.stack);
        res.status(500).json({ code: 500, message: 'Error updating order status' });
    }
};


// Get all orders (admin access)
exports.getAllOrders = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orders');
        res.status(200).json({ code: 200, data: rows });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Error retrieving orders' });
    }
};
