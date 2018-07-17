const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Series = {
  title: {
    type: String,
    required: true
  },
  pic: {
    type: String,
    required: false
  },
  permalink: {
    type: String,
    index: {
      unique: true
    },
    required: true
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  },
  description: {
    type: String,
    required: false,
    default: ''
  }
}

const options = {
  timestamps: true // createdAt and updatedAt automatically
}

module.exports = mongoose.model('Series', new Schema(Series, options))
