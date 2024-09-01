const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Restaurant = db.define('Restaurant', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cuisine: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    openingHours: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false // Disable timestamps
});

module.exports = Restaurant;
