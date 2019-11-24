const mongoose = require("mongoose")
const paginate = require("mongoose-paginate")
const permalink = require("mongoose-permalink")
const random = require("mongoose-simple-random")
const readingTime = require("reading-time")

const Schema = mongoose.Schema

const Post = {
    title: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: false
    },
    secretKey: {
        type: String,
        required: false,
        default: Date.now()
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
        default: ""
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        default: []
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
    },
    series: {
        type: Schema.ObjectId,
        ref: "Series",
        default: null
    }
}

const options = {
    timestamps: true // createdAt and updatedAt automatically
}

const PostSchema = new Schema(Post, options)

PostSchema.plugin(random)
PostSchema.plugin(paginate)
PostSchema.plugin(permalink.default, {
    sources: ["title"]
})
PostSchema.virtual("readingTime").get(function() {
    if (this.body) {
        return readingTime(this.body)
    }
    return null
})
// NB: This is needed to make the virtual "readingTime" appear in the response
// https://stackoverflow.com/questions/49945538/is-it-possible-to-get-virtual-property-in-mongoose-query-result
PostSchema.set("toJSON", { getters: true })

module.exports = mongoose.model("Post", PostSchema)
