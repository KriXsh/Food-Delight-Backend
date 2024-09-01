// models/Payment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');

const Payment = sequelize.define('Payment', {
    transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('success', 'failure'),
        allowNull: false,
    },
});

Payment.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = Payment;
