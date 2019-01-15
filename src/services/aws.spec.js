const { expect } = require('chai');
const awsService = require('./aws');

describe('src/services/awsService.js', () => {
  it('should get lambda instance successfully', () => {
    const lambdaInstanceKeys = Object.keys(awsService.getLambda());
    expect(lambdaInstanceKeys).to.deep.equal(['config', 'isGlobalEndpoint', 'endpoint', '_events', 'MONITOR_EVENTS_BUBBLE', 'CALL_EVENTS_BUBBLE', '_clientId']);
  });
});
