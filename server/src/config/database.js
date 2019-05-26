const Sequelize = require('sequelize')
require('dotenv').config()

module.exports = new Sequelize(process.env.DB_DATABASE, 
    process.env.DB_USER,  
    process.env.DB_PASSWORD, {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        pool: {
            max: 5,
            min: 0,
            idle: 20000,
            acquire: 20000
            }
})
