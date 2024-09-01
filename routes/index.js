const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/restaurants', require('./restaurantRoutes'));
router.use('/orders', require('./orderRoutes'));
router.use('/menu', require('./menuRoutes'));
router.use('/reviews', require('./reviewRoutes'));
router.use('/promos', require('./promoRoutes'));
router.use('/location', require('./locationRoutes'));
router.use('/payments', require('./paymentRoutes'));
router.use('/images', require('./imageRoutes'));

module.exports = router;
