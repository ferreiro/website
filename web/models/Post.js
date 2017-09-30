const mongoose = require('mongoose')
const paginate = mongoosePaginate = require('mongoose-paginate')
const permalink = require('mongoose-permalink')
const random = require('mongoose-simple-random')

const mongooseOptions = {
  timestamps: true // createdAt and updatedAt automatically
}

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
  author_name: {
    type: String,
    required: false
  },
  author_pic: {
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
  tags: {
    type: [String],
    required: false,
    default: []
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
  }
}, mongooseOptions)

PostSchema.plugin(random)
PostSchema.plugin(paginate)
PostSchema.plugin(permalink.default, {
  sources: ['title']
})

const PostModel = mongoose.model('Post', PostSchema)

module.exports = PostModel