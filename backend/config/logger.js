const winston = require('winston');
const { combine, timestamp, label, printf, prettyPrint } = winston.format;
const CATEGORY = 'winston';

const logger = winston.createLogger({
  level: 'debug',
  format: combine(
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    prettyPrint()
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/example.log'
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'logs/error.log'
    }),
    new winston.transports.Console()
  ]
});

module.exports = logger;
