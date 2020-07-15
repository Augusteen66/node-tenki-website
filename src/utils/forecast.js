const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e3b33c12f0e10739bc54ebc402005d7b/' + latitude + ',' + longitude
    
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback('Unable to find forecast. try another location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast