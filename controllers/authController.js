const bcrypt = require('bcrypt');
const User = require('../models/User');
const pool = require('../config/db');
const { generateToken, verifyToken } = require('../config/jwt');
const { standardManageError } = require('../utils/helpers');


/// User signup
exports.signup = async (req, res) => {
    const { name, email, password, phoneNumber, addresses } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return standardManageError(req, res, 'User already exits', 'badRequest');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone_number: phoneNumber,
            addresses: JSON.stringify(addresses),
            walletBalance: 0.0,  // Initialize wallet balance
        });

        const token = generateToken({ id: user.id, email: user.email });
        res.status(200).json({ code: 200, message: "user created sucessfully" });
    } catch (error) {
        console.error('Error during signup:', error.message, error.stack);
        return standardManageError(req, res, 'Error during signup', 'badRequest');
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return standardManageError(req, res, 'User not found', 'auth');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return standardManageError(req, res, 'Invalid credentials', 'auth');
        }

        const token = generateToken({ id: user.id, email: user.email });
        return res.status(200).json({ code: 200, token });

    } catch (error) {
        console.error('Error during signup:', error.message, error.stack);
        return standardManageError(req, res, 'Error during login', 'badRequest');
    }
};