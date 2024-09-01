const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController'); // Ensure this path is correct
console.log({ getUserProfile, updateUserProfile });
const authMiddleware = require('../middlewares/authMiddleware');

// Define routes
router.get('/myProfile', authMiddleware, getUserProfile);   // Ensure getUserProfile is defined
router.put('/updateProfile', authMiddleware, updateUserProfile); // Ensure updateUserProfile is defined

module.exports = router;
