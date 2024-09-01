const express = require('express');
const router = express.Router();
const { addReview, getReviews, updateReview, deleteReview } = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const { reviewValidation } = require('../validations/payload');

// Route to add a new review
router.post('/', authMiddleware, validationMiddleware(reviewValidation), addReview);

// Route to get reviews for a specific restaurant
router.get('/:restaurantId', authMiddleware, getReviews);

// Route to update a review
router.put('/:id', authMiddleware, validationMiddleware(reviewValidation), updateReview);

// Route to delete a review
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;
