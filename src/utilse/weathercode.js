const request = require('request')
 
const forecast = ( longitude,latitude, callback) =>{
 
    const url = 'http://api.weatherstack.com/current?access_key=91d03c327b9967ab6e2b8e45e8b2e94c&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) 
 
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('unable to reach server', undefined)
        } else if(body.error){
            callback('unable to find location', undefined)
        }else{
            callback(undefined, ' it is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.' + ' The sky here is ' + body.current.weather_descriptions[0])
        }
    })
}
 
module.exports = forecast