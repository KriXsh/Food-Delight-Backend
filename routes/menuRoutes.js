// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const {
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require('../controllers/menuController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const { menuItemSchema } = require('../validations/payload');

// Route to get all menu items for a specific restaurant
router.get('/:restaurantId', authMiddleware, getMenuItems);

// Route to add a new menu item
router.post('/add', authMiddleware, validationMiddleware(menuItemSchema), addMenuItem);

// Route to update a menu item
router.put('/update/:id', authMiddleware, validationMiddleware(menuItemSchema), updateMenuItem);

// Route to delete a menu item
router.delete('/delete/:id', authMiddleware, deleteMenuItem);

module.exports = router;
