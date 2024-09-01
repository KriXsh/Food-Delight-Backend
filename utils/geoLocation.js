const geoip = require('geoip-lite');

const geoLocation = (ip) => {
    return new Promise((resolve, reject) => {
        try {
            const geo = geoip.lookup(ip);
            console.log('GeoIP Lookup Result:', geo); 
            if (geo) {
                resolve(geo);
            } else {
                reject('Location not found');
            }
        } catch (error) {
            console.error('Error during geolocation:', error);
            reject(error);
        }
    });
};

module.exports = geoLocation;
