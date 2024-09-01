const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Restaurant = require('./Restaurant');

const MenuItem = sequelize.define('MenuItem', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    dietaryTags: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Restaurant,
            key: 'id'
        }
    },
});

MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

module.exports = MenuItem;
