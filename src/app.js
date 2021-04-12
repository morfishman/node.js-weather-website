const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const  request  = require('request')
const geocde = require('./utilse/GioCode')
const forecast = require('./utilse/weathercode')
const { error } = require('console')
const app = express()

const port = process.env.PORT || 3000

//difine path
const pubicDirectoryPath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../template/views')

const PartilsPath = path.join(__dirname,'../template/partilias')

//setup Hendel bar
app.set('views',viewpath)
app.set('view engine', 'hbs')
hbs.registerPartials(PartilsPath)

//setup statc dir to serv
app.use(express.static(pubicDirectoryPath))



app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        Name: 'mor'
    })
})

app.get('/About', (req,res) => {
    res.render('About', {
        title: 'About',
        Name: 'mor'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        Discribe: 'help exsemple',
        Name: 'mor'
    })
})

app.get('/weathershow', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address'
        })
        }
    
        geocde(req.query.address , (error , {location,latitude,longitude} ={}) => {
            if (error){
                return res.send({error})
            }
 
            forecast(latitude, longitude , (error , data) => {
                if(error){
                    return res.send({error, longitude})
                }
                res.send({
                    forecast : data,
                    location,
                    address: req.query.address
                })
            })
        })
    })
app.get('/prodact',(req,res) => {
    if(!req.query.serch){
        return res.send({
            error: 'you must provid search term'
        })
    }
    console.log(req.query.serch)
    res.send({
       prodact: [] 
    })
})

app.get('/help*', (req,res) => {
    res.render('404real',{
        title: 'error',
        Discribe: 'error canot find this help page'
    })
})

//404 page:
app.get('*', (req,res) => {
    res.render('404real',{
        Discribe: 'error' ,
        title: '404'
    })
})



app.listen(port, () => {
    console.log('server is ap on port ' + port)
})