const request = require('postman-request')

const getWeather = (longtitude,lantitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=bc9c374a13ee6a4d12f75c18f4d92fe0&query="+longtitude+","+lantitude+"";
    request({ url, json: true},(error, {body}) => {
        if(error){
            callback('Cound not connect to the weather server', undefined)
        }else if(body.error != undefined){
            callback('enter a valid location to get the weather', undefined)
        }else{
            callback(undefined, {
                forcast: body.current.weather_descriptions,
                temprature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = getWeather