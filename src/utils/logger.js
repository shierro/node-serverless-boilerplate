const winston = require('winston');

/* istanbul ignore next */
const logger = process.env.NODE_ENV !== 'test'
  ? winston.createLogger({
    transports: [
      new (winston.transports.Console)({
        level: process.env.LOG_LEVEL || 'debug',
        colorize: false,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: process.env.NODE_ENV === 'production',
        stringify: process.env.NODE_ENV === 'production',
        timestamp: true,
      }),
    ],
  })
  : {
    log: () => { },
    info: () => { },
    warn: () => { },
    error: () => { },
    debug: () => { },
  };

/* istanbul ignore next */
logger.logStream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;
