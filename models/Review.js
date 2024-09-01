const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Restaurant = require('./Restaurant');

const Review = sequelize.define('Review', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

module.exports = Review;
