const request = require('request');

const forecast = (latitud, longitud, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=36e2662d17adb26ba2c0808a525ea359&query=${latitud},${longitud}&units`;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Error de conexion con la aplicación', undefined)
        }else if(body.error){
            callback('Coordenadas no válidas', undefined)
        }else {
            callback(undefined,`El clima es ${body.current.weather_descriptions[0]} En este momento hay ${body.current.temperature}°. Afuera se siente como si haría ${body.current.feelslike}°`);
        }
    })
}

module.exports = forecast