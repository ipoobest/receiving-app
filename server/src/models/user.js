const Sequelize = require('sequelize')
require('dotenv').config()
const db = require('../config/database')

const data = db.define(process.env.DB_TABLE_USER, {
    email: {
        type: Sequelize.STRING
    },
    phone_number_normal: {
        type: Sequelize.STRING
    },
    phone_number_user: {
        type: Sequelize.STRING
    },
    phone_number_callcenter: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    },
    urls: {
        type: Sequelize.STRING
    }
})

module.exports = data