const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getRestaurants, getRestaurantById,
    createRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/restaurantController');
const validationMiddleware = require('../middlewares/validationMiddleware');
const { createRestaurantSchema } = require('../validations/payload');

// Route for getting all restaurants
router.get('/', getRestaurants);

// Route for getting a restaurant by ID
router.get('/:id', getRestaurantById);

// Route for creating a new restaurant
router.post('/', validationMiddleware(createRestaurantSchema), createRestaurant);

// Define the PUT route for updating a restaurant
router.put('/update/:id', authMiddleware, validationMiddleware(createRestaurantSchema), updateRestaurant)

// Route for deleting a restaurant
router.delete('/delete/:id', deleteRestaurant);

module.exports = router;
