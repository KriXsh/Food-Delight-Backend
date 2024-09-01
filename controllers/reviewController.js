const pool = require('../config/db');
const { Review } = require('../models');


// Add a new review
exports.addReview = async (req, res) => {
    const { restaurantId, userId, rating, comment } = req.body;

    try {
        const newReview = await Review.create({
            restaurantId,
            userId,
            rating,
            comment
        });
        res.status(201).json({ code: 201, message: 'Review added successfully', reviewId: newReview.id });
    } catch (error) {
        return standardManageError(req, res, 'Error adding review', 'server');
    }
};

// Get reviews for a specific restaurant
exports.getReviews = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const reviews = await Review.findAll({ where: { restaurantId } });
        res.status(200).json({ code: 200, data: reviews });
    } catch (error) {
        return standardManageError(req, res, 'Error retrieving reviews', 'server');
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    try {
        const [updated] = await Review.update(
            { rating, comment },
            { where: { id } }
        );

        if (updated) {
            res.status(200).json({ code: 200, message: 'Review updated successfully' });
        } else {
            return standardManageError(req, res, 'Review not found', 'notFound');
        }
    } catch (error) {
        return standardManageError(req, res, 'Error updating review', 'server');
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Review.destroy({ where: { id } });

        if (deleted) {
            res.status(200).json({ code: 200, message: 'Review deleted successfully' });
        } else {
            return standardManageError(req, res, 'Review not found', 'notFound');
        }
    } catch (error) {
        return standardManageError(req, res, 'Error deleting review', 'server');
    }
};