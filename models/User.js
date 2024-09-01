// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    addresses: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    // walletBalance: {
    //     type: DataTypes.FLOAT,
    //     allowNull: false,
    //     defaultValue: 0.0,  // Initialize with zero balance
    // },
});

// module.exports = { User };
module.exports = User;
