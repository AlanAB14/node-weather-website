const request = require('request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWxhbmFiMTQiLCJhIjoiY2tlZGl1aGhxMDNmNDJzcHF3Y2U1anBsZSJ9.GRLNepc9AFPoDdZEftxY7w`
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('No se puede conectar con el servicio de coordenadas', undefined)
        }else if(body.features.length === 0){
            callback('Coordenadas de ubicación no encontrada', undefined)
        }else {
            callback(undefined, {
                latitud : body.features[0].center[1],
                longitud : body.features[0].center[0],
                localizacion : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode