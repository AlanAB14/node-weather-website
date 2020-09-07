const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Habdlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Alan Bersia'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Alan Bersia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        name : 'Alan Bersia',
        helpText : 'Esto es un mensaje de prueba'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error : 'Debes ingresar una localización'
        })
    }

    geocode(req.query.address, (error, {latitud, longitud, localizacion} = {}) => {
        if (error) {
          return res.send({error})
        }
    
        forecast(latitud, longitud, (error, forecastData) => {
          if (error) {
            return res.send({error})
          }
          
          res.send({
            address : req.query.address,
            location : localizacion,
            forecast : forecastData
        })
        })
    })

    // res.send({
    //     address : req.query.address,
    //     location : 'Philadelphia',
    //     forecast : 'Its snowing'
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error : 'Debes seleccionar el termino search'
        })
    }
    res.send({
        products : []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title : '404',
        errorMessage : 'Help article not found',
        name : 'Alan Bersia'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        errorMessage : 'Page not found',
        name : 'Alan Bersia'
    })
})

app.listen(3000, () => {
    console.log('Server se abrio en puerto 3000')
})