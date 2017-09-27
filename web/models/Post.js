const mongoose = require('mongoose')
const permalink = require('mongoose-permalink')

const Schema = mongoose.Schema
const PostSchema = new Schema({
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
  author: {
    type: String,
    required: false
  },
  summary: {
    type: String,
    required: false,
    default: ''
  },
  body: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  },
  likes: {
    type: Number,
    required: false,
    default: 0
  },
  views: {
    type: Number,
    required: false,
    default: 0
  },
  updated: {
    type: Date,
    default: Date.now,
    required: false
  },
  created: {
    type: Date,
    default: Date.now,
    required: false
  }
})

PostSchema.plugin(permalink.default, {
  sources: ['title']
})

const PostModel = mongoose.model('Post', PostSchema)

module.exports = PostModel