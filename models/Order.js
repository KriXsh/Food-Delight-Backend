// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Restaurant = require('./Restaurant');

const Order = sequelize.define('Order', {
    status: {
        type: DataTypes.ENUM('placed', 'preparing', 'dispatched', 'delivered'),
        allowNull: false,
        defaultValue: 'placed',
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

module.exports = Order;
