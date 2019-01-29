const https = require('https')

// I could use any library to get a GET for http, but it
// is good to decrease the number of dependencies when 
// only one method is needed. On the other hand this type of
// implementations allows to understand how the language works.
const GET = (url) => new Promise((resolve, reject) => {
  client = https.get(url, (res) => {
    let data = ''

    res.on('data', (d) => data = data + d)
    res.on('end', () => resolve(JSON.parse(data)))
  })
  
  client.on('error', (err) => reject(err))
})

// Used to add entropy when simulating the error in a request
const sleep = (seconds) => new Promise((resolve) => {
  setTimeout(() => resolve(), seconds * 1000)
})

module.exports.GET = GET
module.exports.sleep = sleep