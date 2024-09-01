const Restaurant = require('../models/Restaurant');
const { standardManageError } = require('../utils/helpers');


// Get all restaurants
exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).json({ code: 200, data: restaurants });
    } catch (error) {
        console.error('Error during restaurant creation:', error.message, error.stack);
        return standardManageError(req, res, 'Error retrieving restaurants', 'server');
    }
};

// Get a restaurant by ID
exports.getRestaurantById = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findByPk(id);
        if (restaurant) {
            res.status(200).json({ code: 200, data: restaurant });
        } else {
            return standardManageError(req, res, 'Restaurant not found', 'notFound');
        }
    } catch (error) {
        console.error('Error during restaurant creation:', error.message, error.stack);
        return standardManageError(req, res, 'Error retrieving restaurant', 'server');
    }
};

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
    const { name, cuisine, address, contact, openingHours } = req.body;
    try {
        const newRestaurant = await Restaurant.create({ name, cuisine, address, contact, openingHours });
        res.status(201).json({ code: 201, message: 'Restaurant created successfully', restaurantId: newRestaurant.id });
    } catch (error) {
        console.error('Error during restaurant creation:', error.message, error.stack);
        return standardManageError(req, res, 'Error creating restaurant: ' + error.message, 'validate');
    }
};

// Update a restaurant
exports.updateRestaurant = async (req, res) => {
    const { id } = req.params;
    const { name, cuisine, address, contact, openingHours } = req.body;
    try {
        const [updated] = await Restaurant.update(
            { name, cuisine, address, contact, openingHours },
            { where: { id } }
        );
        if (updated) {
            res.status(200).json({ code: 200, message: 'Restaurant updated successfully' });
        } else {
            return standardManageError(req, res, 'Restaurant not found', 'notFound');
        }
    } catch (error) {
        console.error('Error during restaurant creation:', error.message, error.stack);
        return standardManageError(req, res, 'Error updating restaurant', 'server');
    }
};

// Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Restaurant.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ code: 200, message: 'Restaurant deleted successfully' });
        } else {
            return standardManageError(req, res, 'Restaurant not found', 'notFound');
        }
    } catch (error) {
        console.error('Error during restaurant creation:', error.message, error.stack);
        return standardManageError(req, res, 'Error deleting restaurant', 'server');
    }
};
