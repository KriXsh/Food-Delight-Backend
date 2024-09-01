const pool = require('../config/db');
const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const query = `SELECT * FROM users WHERE id = ${userId}`;
        const [rows] = await pool.query(query);
        const user = rows[0];

        if (user) {
            delete user.password;
            res.status(200).json({ code: 200, result: user });
        } else {
            res.status(404).json({ code: 404, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving user profile:', error.message);
        res.status(403).json({ code: 403, message: 'Error retrieving user profile' });
    }
};


// Update user profile
exports.updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, phoneNumber, addresses } = req.body;

    try {
        const result = await User.update(
            {
                name: name,
                phone_number: phoneNumber,
                addresses: JSON.stringify(addresses),
            },
            { where: { id: userId } }
        );

        if (result[0] > 0) {
            res.status(200).json({ code: 200, message: 'Profile updated successfully' });
        } else {
            res.status(404).json({ code: 404, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error during update:', error.message);
        res.status(500).json({ code: 500, error: 'Error updating profile' });
    }
};
