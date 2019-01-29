const express = require('express')
const routes = express.Router()

const {getCountryInfo, getCapitalCoords} = require('../third-party/geocode')
const {getCapital} = require('../third-party/restcountries')
const {getWeather} = require('../third-party/darksky')

const {sleep} = require('../utils')

routes.get('/', async (req, res) => {
  //read params
  const {latitude, longitude, lang} = req.query

  try {
    //simulate request error
    while (Math.random() <= 0.1) {
      console.log('Warning. Here in Simulated error request.');
      await sleep(1)
    }
  } catch (err) {
    console.error(err)
  }

  //validate latitude
  if (!latitude) {
    return res.status(400).json({error: 'missign latitude query param'})
  }
  
  //validate longitude
  if (!longitude) {
    return res.status(400).json({error: 'missing longitude query param'})
  }

  //define response map
  let response = {}

  //get values
  try {
    const country = await getCountryInfo(latitude, longitude)
    const capital = await getCapital(country)
    const coords = await getCapitalCoords(capital, country)
    const weather = await getWeather(coords.latitude, coords.longitude, lang)
    
    response = {country, capital, ...coords, ...weather}
  } catch (err) {
    return res.status(400).json({error: err.message})
  }
  
  //send response
  return res.status(200).json(response)
})

module.exports = routes