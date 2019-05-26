const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const sequelize = require('./config/database')
require('dotenv').config()

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

sequelize
    .authenticate()
    .then(() => {
        console.log('Connect data success...');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

// routes
app.use('/', require('./routes/index'))     

app.listen(process.env.PORT , () => {
    console.log('app listen at port + ' + process.env.PORT )
})