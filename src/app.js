const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)

// Setup static directory to use
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: "Aagaaz"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Ali"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Some message',
        title: 'Help',
        name: "Ali"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please enter a location!"
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address : req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: "404",
        name: "Aagaaz Ali Sayed",
        errorMessage: "Help article not found."
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: "Aagaaz Ali Sayed",
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => { 
    console.log('Server is up on port 3000.')
})