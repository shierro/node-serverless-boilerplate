const aws = require('aws-sdk');

const lambda = new aws.Lambda({ region: 'ap-southeast-2' });

const awsService = {
  getLambda: () => lambda,
};

module.exports = awsService;
