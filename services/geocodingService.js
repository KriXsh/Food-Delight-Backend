// Mock geocoding service
const geocodeAddress = async (address) => {
    // Mock response for the sake of this example
    return {
        lat: 40.7128,
        lng: -74.0060,
    };
};

const getRestaurantsNearLocation = async (lat, lng, radius = 5) => {
    // This would normally query your database and find restaurants within a certain radius
    // For simplicity, this is just a mock function.
    return [
        {
            id: 1,
            name: 'Mock Restaurant 1',
            lat: 40.7128,
            lng: -74.0060,
        },
        {
            id: 2,
            name: 'Mock Restaurant 2',
            lat: 40.7138,
            lng: -74.0050,
        },
    ];
};

module.exports = { geocodeAddress, getRestaurantsNearLocation };
