const request = require('request')

const forecast = ({latitude, longtitude, location}, callback) => {
    const url = 'https://api.darksky.net/forecast/c945e439c407735fe6f0f90a07c37894/' + latitude + ',' + longtitude + '?units=si'
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather srvice!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} C° out, There is a ${body.currently.precipProbability * 100}% chance of rain! The Max temp for today is: ${body.daily.data[0].temperatureMax}C°, The Min temp for today is: ${body.daily.data[0].temperatureMin}C°.`)
        }
    })
}

module.exports = forecast