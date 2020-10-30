// Loading modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')  // changןng the views default path to "templates"
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)  // pointing on the right path for views (hbs files)
hbs.registerPartials(partialsPath)

// Setup static directory to serve  
app.use(express.static(publicDirectoryPath))
 
app.get('', (req, res) =>{
    res.render('index', {
        title: 'WEATHER APP', 
        name: 'O.A'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'ABOUT',
        name: 'O.A' 
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'HELP',
        name: 'O.A',
        age: 27
    })
})

// API request's

app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You need to provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast({ latitude, longtitude, location }, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                 forecast: data,
                 location,
                 address: req.query.address 
                }) 
        })
    }) 
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '-- 404 --',
        name: 'O.A',
        errorMessage: "Help article page is not exist!"
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '-- 404 --',
        name: 'O.A',
        errorMessage: "This page is not exist!"
    })
})

app.listen(port, ()=> {
    console.log(`Server is up on port ${port}...`)
})