const Sequelize = require('sequelize')
require('dotenv').config()
const db = require('../config/database')

const data = db.define(process.env.DB_TABLE_SETTING, {
    base_url: {
        type: Sequelize.STRING
    },
    time_url: {
        type: Sequelize.NUMBER
    },
    subjects_email: {
        type: Sequelize.STRING
    },
    descriptions_email: {
        type: Sequelize.STRING
    }
})

module.exports = data