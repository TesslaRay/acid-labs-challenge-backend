const express = require('express')
const weather = require('./weather')
const routes = express.Router()

routes.use('/weather', weather)

module.exports = routes