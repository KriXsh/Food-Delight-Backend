const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/imageController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Assuming you use multer for image upload

router.post('/:restaurantId', authenticateToken, upload.single('image'), uploadImage);

module.exports = router;
