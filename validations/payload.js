const Joi = require('joi');

// Registration validation schema
const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().optional(),
    addresses: Joi.array().items(Joi.string()).optional()
});

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

// Restaurant creation validation schema
const createRestaurantSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(10).max(100).required(),
    cuisine: Joi.string().min(3).max(30).required(),
    contact: Joi.string().required(), // Ensure contact is required
    openingHours: Joi.string().required() // Ensure openingHours is required
});

// Order creation validation schema
const createOrderSchema = Joi.object({
    userId: Joi.number().integer().required(),
    restaurantId: Joi.string().required(),
    items: Joi.array().items(Joi.object({
        menuItemId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required()
    })).required(),
    deliveryAddress: Joi.string().min(10).max(100).required(),
    paymentMethod: Joi.string().valid('credit_card', 'debit_card', 'paypal', 'cash_on_delivery').required(),
});

// Review creation validation schema
const addReviewSchema = Joi.object({
    restaurantId: Joi.string().required(),
    userId: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().max(500).optional()
});

// Payment processing validation schema
const processPaymentSchema = Joi.object({
    paymentMethod: Joi.string().valid('credit_card', 'debit_card', 'paypal', 'cash_on_delivery').required(),
    amount: Joi.number().precision(2).positive().required()
});

// User Validation Schema
const userValidation = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().optional(),
    addresses: Joi.array().items(Joi.string()).optional(),
});

// Order Validation Schema
const orderValidation = Joi.object({
    userId: Joi.number().integer().required(),
    restaurantId: Joi.number().integer().required(),
    items: Joi.array().items(Joi.object({
        itemId: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1).required(),
    })).required(),
    status: Joi.string().valid('placed', 'preparing', 'dispatched', 'delivered').required(),
    totalPrice: Joi.number().precision(2).required(),
});


// Menu item validation schema
const menuItemSchema = Joi.object({
    restaurantId: Joi.number().integer().required(),
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(500).optional(),
    price: Joi.number().precision(2).positive().required(),
    dietaryTags: Joi.array().items(Joi.string().valid('vegetarian', 'vegan', 'gluten-free', 'dairy-free')).optional()
});

// Review Validation Schema
const reviewValidation = Joi.object({
    userId: Joi.number().integer().required(),
    restaurantId: Joi.number().integer().required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().max(500).optional(),
});

// Promo Validation Schema
const promoValidation = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(500).optional(),
    discountPercentage: Joi.number().min(1).max(100).required(),
    validFrom: Joi.date().required(),
    validUntil: Joi.date().required(),
    applicableItems: Joi.array().items(Joi.number().integer()).optional(),
});

// Payment Validation Schema
const paymentValidation = Joi.object({
    userid: Joi.number().integer().required(),  // Add userId here
    orderId: Joi.number().integer().required(),
    amount: Joi.number().precision(2).required(),
    paymentMethod: Joi.string().valid('credit_card', 'debit_card', 'paypal', 'stripe', 'wallet').required(),
    transactionId: Joi.string().optional(),  // Optional since it will be generated if not provided
    paymentStatus: Joi.string().valid('success', 'failure').optional(),  // Optional
});

// Export all validation schemas
module.exports = {
    signupSchema,
    loginSchema,
    userValidation,
    createRestaurantSchema,
    orderValidation,
    createOrderSchema,
    menuItemSchema,
    addReviewSchema,
    reviewValidation,
    promoValidation,
    processPaymentSchema,
    paymentValidation,
};
