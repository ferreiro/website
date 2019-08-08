const mongoose = require('mongoose')
const permalink = require('mongoose-permalink')

const Schema = mongoose.Schema

const Series = {
    title: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: false,
        default: ''
    },
    favicon: {
        type: String,
        required: false,
        default: ''
    },
    permalink: {
        type: String,
        index: {
            unique: true
        },
        required: true
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    secretKey: {
        type: String,
        required: false,
        default: Date.now()
    }
}

const options = {
    timestamps: true // createdAt and updatedAt automatically
}

const SeriesSchema = new Schema(Series, options)

SeriesSchema.plugin(permalink.default, {
    sources: ['title']
})

module.exports = mongoose.model('Series', SeriesSchema)
