const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: true, // Set to true if you want to see SQL queries being run
});


sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync(); // This will create the table if it doesn't exist
    })
    .then(() => console.log('All models were synchronized successfully.'))
    .catch(err => console.log('Error connecting to the database:', err));


module.exports = sequelize;
