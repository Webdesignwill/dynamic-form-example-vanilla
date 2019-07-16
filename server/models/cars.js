
const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
  brand: {
    type: String,
    unique: true
  },
  models : {
    type : Array
  }
});

mongoose.model('cars', CarSchema)
const CarsModel = mongoose.model('cars')

module.exports = CarsModel
