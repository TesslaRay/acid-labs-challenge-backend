const {GET} = require('../utils')
const Redis = require('./redis')

const RESTCOUNTRIES_API_URL = process.env.RESTCOUNTRIES_API_URL

// https://restcountries.eu/rest/v2/name/chile
async function getCapital (name) {
  const n = (name === 'united states') ? 'usa' : name
  const url = `${RESTCOUNTRIES_API_URL}/name/${n}`
  
  try {
    const redisGetData = await Redis.getByKey(`capital:${name}`)
    if (redisGetData !== null) {
      return redisGetData.capital
    }

    const data = await GET(url)
    if (data.status === 404) {
      throw new Error('capital not found')
    }

    const last = data[data.length - 1]
    const capital = last.capital.toLowerCase()

    await Redis.setByKey(`capital:${name}`, {capital})
    return capital
  } catch (err) {
    throw err
  }
}

module.exports.getCapital = getCapital