const express = require('express');
const router = express.Router();
const { getRestaurantsByLocation } = require('../controllers/locationController');

router.get('/', getRestaurantsByLocation);

module.exports = router;
