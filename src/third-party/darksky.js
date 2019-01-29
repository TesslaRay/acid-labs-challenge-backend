const {GET} = require('../utils')
const queryString = require('querystring')
const Redis = require('./redis')

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
const DARKSKY_API_URL = process.env.DARKSKY_API_URL

//https://api.darksky.net/forecast/b0e1da478f80a5ca21e9aea95b031545/37.8267,-122.4233
async function getWeather (latitude, longitude, lang = 'es') {
  const params = queryString.stringify({
    lang,
    units: 'si',
  })
  const url = `${DARKSKY_API_URL}/${DARKSKY_API_KEY}/${latitude},${longitude}?${params}`

  try {
    const redisGetData = await Redis.getByKey(`weather:${latitude}:${longitude}:${lang}`)
    if (redisGetData !== null) {
      return {...redisGetData.weather, cached: true}
    }

    const data = await GET(url)
    const weather = {
      summary: data.currently.summary,
      icon: data.currently.icon,
      temperature: data.currently.temperature,
      cached: false,
    }

    await Redis.setByKey(`weather:${latitude}:${longitude}:${lang}`, {weather})
    return weather
  } catch (err) {
    throw err
  }
}

module.exports.getWeather = getWeather