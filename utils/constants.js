// constants.js

// Environment-related constants
const ENV = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    TEST: 'test',
};

// HTTP Status Codes
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

// Error Messages
const ERROR_MESSAGES = {
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid credentials',
    PERMISSION_DENIED: 'Permission denied',
};

// Other Application-Specific Constants
const APP_CONSTANTS = {
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    TOKEN_EXPIRATION: '1h',
    MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
    SUPPORTED_IMAGE_FORMATS: ['image/jpeg', 'image/png'],
};

module.exports = {
    ENV,
    HTTP_STATUS,
    ERROR_MESSAGES,
    APP_CONSTANTS,
};
