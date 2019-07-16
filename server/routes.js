const routes = require('express').Router()
const carsController = require('./controllers/cars')

routes.get('/', (req, res) => res.render('index'))
routes.get('/api/cars/brands', carsController.allBrands)
routes.get('/api/cars/models', carsController.modelsByBrand)

module.exports = routes
