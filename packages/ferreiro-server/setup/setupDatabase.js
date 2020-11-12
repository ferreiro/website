const debug = require("debug")("ferreiro:setup:database");
const mongoose = require("mongoose");
const bluebird = require("bluebird");

const env = require("../env");
const mongoDB = env.DB_URI;

module.exports = () => {
  //Set up default mongoose connection
  mongoose.Promise = bluebird;
  mongoose.connect(
    mongoDB,
    {
      useMongoClient: true,
    },
    (error) => {
      if (error) {
        throw error;
      }
      debug("Successfully connected to MongoDB");
    }
  );
};
