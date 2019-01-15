require('dotenv-safe').config({
  example: require('./utils/file').getPath('.env.example'),
});

const { NODE_ENV, PORT } = process.env;

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const serverless = require('serverless-http');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('morgan')('short', { stream: logger.logStream }));

routes(app);

/* istanbul ignore next */
if (NODE_ENV === 'test' || NODE_ENV === 'development') {
  app.listen(PORT || 8080, () => {
    logger.info(`ENV[${NODE_ENV}] Started on port ${PORT}`);
  });
}

/* istanbul ignore next */
module.exports.handler = serverless(app, {
  request: (request, event) => {
    request.event = event;
    request.body = typeof event.body === 'object'
      ? JSON.parse(event.body)
      : {};
  },
});
module.exports.app = app;
