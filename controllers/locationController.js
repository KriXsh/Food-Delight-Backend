const pool = require('../config/db');
const geoLocation = require('../utils/geoLocation');

// Fetch restaurants by IP location
exports.getRestaurantsByLocation = async (req, res) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log(`IP Address: ${ip}`);  // Debugging IP address

    // Handle localhost cases
    if (ip === '::1' || ip === '127.0.0.1') {
        return res.status(400).json({ code: 400, message: 'Geolocation lookup cannot be performed for localhost' });
    }

    try {
        const location = await geoLocation(ip);

        console.log('Geolocation Data:', location);  // Debugging geolocation data

        if (!location || !location.ll) {
            return res.status(404).json({ code: 404, message: 'Unable to determine location from IP address' });
        }

        const [latitude, longitude] = location.ll;

        const [rows] = await pool.query('SELECT * FROM restaurants WHERE latitude = ? AND longitude = ?', [latitude, longitude]);

        if (rows.length === 0) {
            return res.status(404).json({ code: 404, message: 'No restaurants found near this location' });
        }

        res.status(200).json({ code: 200, result: rows });
    } catch (error) {
        console.error('Error fetching restaurants by location:', error.message || error);
        res.status(500).json({ code: 500, message: 'Error fetching restaurants by location' });
    }
};
