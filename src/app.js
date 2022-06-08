const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const getWeather = require('./utils/getWeather')
const request = require('postman-request')
const port = process.env.PORT || 8080
console.log(process.env)
const cors = require('cors')

const app = express()

console.log(__dirname)
console.log(__filename)

//defining paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//setup handler engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(cors())

// "", "/help", "/about"

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'mukesh' 
    })
})


app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        message: 'you have reached the help section',
        name: 'mukesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'mukesh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address is provided'
        })
    }

    geocode(req.query.address, (error, {longtitude, lantitude, place} = {})=>{
        if(error){
            return res.send({error})
        }
        getWeather(longtitude, lantitude, (error,{forcast, temprature, feelsLike} = {})=>{
            if(error){
                return res.send({error})
            }
            // console.log(place)
            // console.log(responsedata)
            res.send({
                forcast,
                location: req.query.address,
                temprature,
                feelsLike,
                place
            })
        })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404page',{
        title: '404 not found',
        message: 'Help article not found',
        name: 'mukesh'
    })
})

app.get('*', (req, res) => {
    res.render('404page',{
        title: '404 not found',
        message: 'Page not found',
        name: 'mukesh'
    })
})



app.listen(port, () => {
    console.log('server is running on '+port+' port')
} )