const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { signupSchema, loginSchema } = require('../validations/payload');
const validationMiddleware = require('../middlewares/validationMiddleware'); 

router.post('/register', validationMiddleware(signupSchema), signup);
router.post('/login', validationMiddleware(loginSchema), login);

module.exports = router;
