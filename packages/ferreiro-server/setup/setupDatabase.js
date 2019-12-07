const debug = require("debug")("ferreiro:setup:database")
const mongoose = require("mongoose")
const bluebird = require("bluebird")

const env = require("../env")

const mongoDB = env.MONGODB_URI
const mongoOptions = {
    useMongoClient: true
}

function mongoConnectCallback(error) {
    if (error) {
        throw error
    }
    debug("Successfully connected to MongoDB")
    debug(`mongoDB URI: ${mongoDB}`)
}

module.exports = () => {
    // Set up default mongoose connection
    mongoose.Promise = bluebird
    mongoose.connect(mongoDB, mongoOptions, mongoConnectCallback)
}
