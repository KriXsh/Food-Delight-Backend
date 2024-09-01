// utils/logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Define the custom format for log messages
const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Create a logger instance with the desired configuration
const logger = createLogger({
    format: combine(
        colorize(),  // Colorize the output (optional)
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),  // Include timestamp
        customFormat  // Apply the custom format
    ),
    transports: [
        // Print to the console
        new transports.Console(),
        // Save logs to a file
        new transports.File({ filename: 'logs/app.log', level: 'info' }),
        // Save error logs to a separate file
        new transports.File({ filename: 'logs/error.log', level: 'error' })
    ]
});

// If you're in production, log only warnings and errors to the console
if (process.env.NODE_ENV === 'production') {
    logger.clear().add(new transports.Console({
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            customFormat
        ),
        level: 'warn'
    }));
}

module.exports = logger;
