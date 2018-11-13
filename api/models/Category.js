const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  permalink: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  }
})

const CategoryModel = mongoose.model('Category', CategorySchema)

module.exports.Schema = CategorySchema
module.exports = CategoryModel
