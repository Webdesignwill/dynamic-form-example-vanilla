let CarsModel = require('../models/cars')

module.exports.allBrands = function(req, res) {
  CarsModel.find({}, (err, cars) => {
    if (err) res.send(err)

    let brands = []
    cars.forEach((car) => {
      brands.push({
        _id: car._id,
        text: car.brand
      })
    })

    res.json(brands)
  })
}

module.exports.modelsByBrand = function(req, res) {
  CarsModel.findById(req.query.brand_id, (err, models) => {
    if (err) res.send(err)

    let resModels = []
    models.models.forEach((model, index) => {
      resModels.push({
        _id: index,
        text: model
      })
    })

    res.json(resModels)
  })
}
