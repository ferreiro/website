const debug = require('debug')('website:setup:database')
const mongoose = require('mongoose');

const mongoDB = process.env.MONGO_DB || 'mongodb://127.0.0.1/ferreiro_blog';

module.exports = () => {
  //Set up default mongoose connection
  mongoose.connect(mongoDB, {
    useMongoClient: true
  }, (error) => {
    if (error) {
      throw err
    }
    console.log('Successfully connected to MongoDB');
  })
}
