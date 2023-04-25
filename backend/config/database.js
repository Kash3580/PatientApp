const mongoose = require('mongoose');

const logger = require('./logger');

const { MONGO_URI } = process.env;
exports.connect = () => {
  // database logging
  //   mongoose.set('debug', (collectionName, method, query, doc) => {
  //     logger.debug(`${collectionName}.${method}`, JSON.stringify(query), doc);
  //   });

  // Connecting to the database
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      logger.info('Successfully connected to database');
    })
    .catch(error => {
      logger.error('database connection failed. exiting now...');
      logger.error(error);
      process.exit(1);
    });
};
