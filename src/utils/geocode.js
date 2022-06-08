const request = require('postman-request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibXVrZXNoYmhlZWwwMDEiLCJhIjoiY2wyenY5NGYwMHF3MzNib3c0YjlsZ3JsNCJ9.YlOJvThXAPJXBSSGxpl7Qw&limit=1"
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Coundnt connet to geolocation server', undefined)
        }else if(body.features.length == 0){
            callback('location not found', undefined)
        }else{
            callback(undefined, {
             lantitude: body.features[0].center[0],
             longtitude: body.features[0].center[1],
             place: body.features[0].place_name    
            })
        }
    })
}

module.exports = geocode