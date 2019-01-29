//load dependencies
const redis = require('redis')

//get redis env values
const REDIS_PORT = process.env.REDIS_PORT
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_EXPIRATION_SECONDS = process.env.REDIS_EXPIRATION_SECONDS

class Redis {
  constructor () {
    this.client = redis.createClient(REDIS_PORT, REDIS_HOST)
  }

  // get value from key 
  getByKey (key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, data) => (err) ? reject(err) : resolve(JSON.parse(data)))
    })
  } 

  // set value from key 
  setByKey (key, value) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, REDIS_EXPIRATION_SECONDS, JSON.stringify(value), (err, data) => (err) ? reject(err) : resolve(data))
    })
  }
}

//export a singleton instance for redis client
module.exports = new Redis()