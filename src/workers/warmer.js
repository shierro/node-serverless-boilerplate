const { getPath } = require('../utils/file');
require('dotenv-safe').config({
  example: getPath('.env.example'),
});
const logger = require('../utils/logger');
const awsService = require('../services/awsService');

const { STAGE } = process.env;

module.exports = {
  handler: async (event, context, cb) => {
    try {
      await awsService.getLambda().invoke({
        FunctionName: `${STAGE}-node-serverless-boilerplate`,
        Payload: JSON.stringify({ cognitoPoolClaims: {} }, null, 2),
      });
      cb(null, { statusCode: 200, body: 'ok' });
    } catch (e) {
      logger.error(e);
      e.statusCode = e.statusCode || 500;
      cb(e);
    }
  },
};

