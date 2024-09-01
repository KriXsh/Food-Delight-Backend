# Food Delight Backend

Welcome to the backend for Food Delight, a fictional food ordering and delivery service. This project serves as a robust backend system that powers interactions between users, restaurants, and delivery personnel.

## Features

- **JWT Authentication**: Secure all routes with JWT, except for user signup and login.
- **User Management**: User registration and login functionalities with password hashing.
- **Restaurant Management**: Restaurant onboarding, menu management, and order processing.
- **Order Management**: Core ordering functionality, including real-time order tracking.
- **Geocoding**: Simulate a geocoding service to find restaurants near a user's address.
- **Payment Simulation**: Mock payment gateway integration with predefined success or failure.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **MySQL**: Relational database management.
- **JWT**: JSON Web Tokens for secure authentication.
- **Joi**: Validation library for payloads.
- **dotenv**: Load environment variables from a `.env` file.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kriXsh/food-delight-backend.git
   cd food-delight-backend
2. Set up environment variables by creating a .env file in the root of your project and adding the following:
   DB_HOST=localhost
   DB_USER=root
   DB_PASS= # Replace this with your actual MySQL root password
   DB_NAME= # Replace this with the actual database name you are using
   DB_PORT= ####
   JWT_SECRET=your_jwt_secret
   PORT=3000
