//Import the mongoose module
const mongoose = require('mongoose');
const debug = require('debug')('website:setup:database')
var mongoDB = 'mongodb://127.0.0.1/my_database';

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

  /*
  //Get the default connection
  var db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on('error', (error) => {
    debug('MongoDB connection error:', error)
    console.error('MongoDB connection error:', error)
    process.exit(1)
  });
  */
}
