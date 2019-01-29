const qs = require('querystring')
const {GET} = require('../utils')
const Redis = require('./redis')

const GEOCODE_API_URL = process.env.GEOCODE_API_URL
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY

// https://maps.googleapis.com/maps/api/geocode/json?latlng=-33.4290674,-70.5887924&key=AIzaSyA-vkodvDFjpoRupkNSVpEQnLhAoBNP4x4
async function getCountryInfo (latitude, longitude) {
  const params = qs.stringify({
    latlng: `${latitude},${longitude}`,
    key: GEOCODE_API_KEY,
  })
  const url = `${GEOCODE_API_URL}?${params}`
  
  try {
    const redisGetData = await Redis.getByKey(`country:${latitude}:${longitude}`)
    if (redisGetData !== null) {
      return redisGetData.country
    }

    const data = await GET(url)
    const {results} = data
    if (!results.length) {
      throw new Error('zero results in geocode')
    }

    let country
    const find = results.some((result) => {
      for (let i = 0; i < result.address_components.length; i++) {
        const ac = result.address_components[i]
        if (ac.types.includes('country')) {
          country = ac.long_name
          return true
        }
      }
      return false
    })

    if (!find) {
      throw new Error('country not found')
    }

    await Redis.setByKey(`country:${latitude}:${longitude}`, {country})
    return country
  } catch (err) {
    throw err
  }
}

async function getCapitalCoords (capital, country) {
  const params = qs.stringify({
    address: `${capital},${country}`,
    key: GEOCODE_API_KEY,
  })
  const url = `${GEOCODE_API_URL}?${params}`

  try {
    const redisGetData = await Redis.getByKey(`coords:${capital}:${capital}`)
    if (redisGetData !== null) {
      return redisGetData.coords
    }
    
    const data = await GET(url)
    const {results} = data

    const last = results[results.length - 1]
    const {lat, lng} = last.geometry.location
    const coords = {
      latitude: lat,
      longitude: lng,
    }

    await Redis.setByKey(`coords:${capital}:${capital}`, {coords})
    return coords
  } catch (err) {
    throw err
  }
}

module.exports.getCountryInfo = getCountryInfo
module.exports.getCapitalCoords = getCapitalCoords