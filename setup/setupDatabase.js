const debug = require('debug')('ferreiro:setup:database')
const mongoose = require('mongoose');

const env = require('../env')
const mongoDB = env.MONGODB_URI

module.exports = () => {
  //Set up default mongoose connection
  mongoose.connect(mongoDB, {
    useMongoClient: true
  }, (error) => {
    if (error) {
      throw error
    }
    debug('Successfully connected to MongoDB');
  })
}
