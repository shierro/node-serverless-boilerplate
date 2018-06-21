const { expect } = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const usersService = require('../services/usersService');
const { app } = require('../index');

const { APP_ROUTE } = process.env;

describe('src/controllers/UsersController.js', () => {
  describe('function [createUser]', () => {
    it('should create user successfully', async () => {
      const testData = {
        firstName: 'test',
        lastName: 'test',
        age: 5,
        gender: 'test',
      };
      const stub = sinon.stub(usersService, 'create').callsFake(() => testData);
      const result = await request(app)
        .post(`/${APP_ROUTE}`)
        .send(testData);
      expect(result.body).to.deep.equal(testData);
      expect(result.status).to.equal(200);
      stub.restore();
    });
    it('should fail gracefully', async () => {
      const error = { status: 400, message: 'test' };
      const stub = sinon.stub(usersService, 'create').callsFake(() => Promise.reject(error));
      const result = await request(app)
        .post(`/${APP_ROUTE}`)
        .send({});
      expect(result.body).to.deep.equal(error);
      expect(result.status).to.equal(error.status);
      stub.restore();
    });
  });

  describe('function [getUser]', () => {
    it('should get user by id successfully', async () => {
      const user = { id: 5 };
      const stub = sinon.stub(usersService, 'getById').callsFake(() => user);
      const result = await request(app).get(`/${APP_ROUTE}/1`);
      expect(result.body).to.deep.equal(user);
      expect(result.status).to.equal(200);
      stub.restore();
    });
    it('should fail gracefully', async () => {
      const error = { status: 404, message: 'test error msg' };
      const stub = sinon.stub(usersService, 'getById').callsFake(() => Promise.reject(error));
      const result = await request(app).get(`/${APP_ROUTE}/1`);
      expect(result.body).to.deep.equal(error);
      expect(result.status).to.equal(error.status);
      stub.restore();
    });
  });

  describe('function [updateUser]', () => {
    it('should update user a goal successfully', async () => {
      const user = { firstName: 'new name' };
      const stub = sinon.stub(usersService, 'update').callsFake(() => user);
      const result = await request(app).patch(`/${APP_ROUTE}/1`).send(user);
      expect(result.body).to.deep.equal(user);
      expect(result.status).to.equal(200);
      stub.restore();
    });
    it('should fail gracefully', async () => {
      const error = { status: 400, message: 'Bad request - please pass an ID' };
      const stub = sinon.stub(usersService, 'update').callsFake(() => Promise.reject(error));
      const result = await request(app).patch(`/${APP_ROUTE}/1`).send('');
      expect(result.body).to.deep.equal(error);
      expect(result.status).to.equal(error.status);
      stub.restore();
    });
  });

  describe('function [deleteUser]', () => {
    it('should delete user goal by id successfully', async () => {
      const user = { id: 1, name: 'test' };
      const stub = sinon.stub(usersService, 'update').callsFake(() => user);
      const result = await request(app).delete(`/${APP_ROUTE}/1`).send();
      expect(result.body).to.deep.equal({ success: true });
      expect(result.status).to.equal(200);
      stub.restore();
    });
    it('should fail gracefully', async () => {
      const error = { status: 400, message: 'Bad request - please pass an ID' };
      const stub = sinon.stub(usersService, 'update').callsFake(() => Promise.reject(error));
      const result = await request(app).delete(`/${APP_ROUTE}/1`).send('');
      expect(result.body).to.deep.equal(error);
      expect(result.status).to.equal(error.status);
      stub.restore();
    });
  });
});
