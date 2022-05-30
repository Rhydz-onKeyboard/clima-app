const fs = require('fs');
const axios = require('axios');

class Buscar {
    constructor(){

    }
    get parametrosMapbox(){
        return {
            'access_token': process.env.KEY_MAPBOX,
            'limit': 5,
            'language': 'es'
        }
    }

    get parametrosOpentWeather(){
        return {
            'appid': process.env.KEY_OPENWEATHER,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async solicitudCiudad (lugar = '') {
        try {
            const solicitudHttp = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.parametrosMapbox
            })

            const respuesta = await solicitudHttp.get();
            return respuesta.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
        } catch (error) {
            return [];
        }
    }

    async solicitudClima( lat, lon ){
        try {
            const solicitudHttp = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { lat, lon, ...this.parametrosOpentWeather }
            });

            const respuesta = await solicitudHttp.get();
            const { main, weather } = respuesta.data;
            return {
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max,
                descripcion: weather[0].description
            }
        } catch (error) {
            
        }
    }
}

module.exports = Buscar;