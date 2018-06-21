/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');
const awsService = require('../services/awsService');
const warmer = require('./warmer');

describe('src/endpoints/warmer.js', () => {
  it('should update goals successfully', (done) => {
    const lambda = { invoke: () => true };
    const stub = sinon.stub(awsService, 'getLambda').callsFake(() => lambda);
    warmer.handler({}, null, (err, result) => {
      expect(err).to.be.null;
      expect(result).to.deep.equal({ statusCode: 200, body: 'ok' });
      stub.restore();
      done();
    });
  });

  it('should update goals & fail gracefully', (done) => {
    const lambda = { invoke: () => Promise.reject('Error') };
    const stub = sinon.stub(awsService, 'getLambda').callsFake(() => lambda);
    warmer.handler({}, null, (err) => {
      expect(err).to.equal('Error');
      stub.restore();
      done();
    });
  });
});
