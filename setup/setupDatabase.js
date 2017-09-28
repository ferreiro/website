const debug = require('debug')('website:setup:database')
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
    console.log('Successfully connected to MongoDB');
  })
}
