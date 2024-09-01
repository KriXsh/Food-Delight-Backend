const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const locationRoutes = require('./routes/locationRoutes');
const userRoutes = require('./routes/userRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware');


// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/locateMe', locationRoutes);
app.use('/api/profile', userRoutes);

// Error Middleware
app.use(errorMiddleware);

// Database connection and server start
db.authenticate()
    .then(() => {
        console.log('Database connected...');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch(err => console.log('Error connecting to the database: ' + err));
