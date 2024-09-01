const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const { standardManageError } = require('../utils/helpers');

// Get all menu items for a specific restaurant
exports.getMenuItems = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const menuItems = await MenuItem.findAll({ where: { restaurantId } });
        if(menuItems.length < 1)  return standardManageError(req, res, 'Menu items not found', 'notFound');
        res.status(200).json({ code: 200, data: menuItems });
    } catch (error) {
        return standardManageError(req, res, 'Error retrieving menu items', 'server');
    }
};


// Add a new menu item
exports.addMenuItem = async (req, res) => {
    const { restaurantId, name, description, price, dietaryTags } = req.body;

    try {
        // Check if the restaurant exists
        const restaurant = await Restaurant.findByPk(restaurantId);
        if (!restaurant) {
            return standardManageError(req, res, 'Restaurant not found', 'notFound');
        }

        // Add the new menu item
        const newItem = await MenuItem.create({
            restaurantId,
            name,
            description,
            price,
            dietaryTags
        });

        res.status(201).json({ code: 201, message: 'Menu item added successfully', itemId: newItem.id });
    } catch (error) {
        console.error('Error adding menu item:', error.message, error.stack);
        return standardManageError(req, res, 'Error adding menu item: ' + error.message, 'server');
    }
};


// Update a menu item
exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, dietaryTags } = req.body;

    try {
        const [updated] = await MenuItem.update(
            { name, description, price, dietaryTags },
            { where: { id } }
        );

        if (updated) {
            res.status(200).json({ code: 200, message: 'Menu item updated successfully' });
        } else {
            return standardManageError(req, res, 'Menu item not found', 'notFound');
        }
    } catch (error) {
        console.error('Error adding menu item:', error.message, error.stack);
        return standardManageError(req, res, 'Error updating menu item', 'server');
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await MenuItem.destroy({ where: { id } });

        if (deleted) {
            res.status(200).json({ code: 200, message: 'Menu item deleted successfully' });
        } else {
            return standardManageError(req, res, 'Menu item not found', 'notFound');
        }
    } catch (error) {
        console.error('Error adding menu item:', error.message, error.stack);
        return standardManageError(req, res, 'Error deleting menu item', 'server');
    }
};
