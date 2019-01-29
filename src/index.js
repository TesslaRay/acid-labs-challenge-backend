//load env values
require('dotenv').config()

//load dependencies
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

//load api routes
const api = require('./api')

//initialize express
const app = express()

//define port
const port = 3000 || process.env.PORT

//define morgan for show logs
app.use(morgan(':method :url :status :response-time ms'))

//
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//active cors in all api request
app.use(cors())

//set api routes for api
app.use('/api', api)

//listen server
app.listen(port, () => console.log(`Acid challenge backend is running on port ${port}`))