const { expect } = require('chai');
const sinon = require('sinon');
const usersService = require('./usersService');
const Users = require('../models/Users');

describe('src/services/usersService.js', () => {
  describe('function [getById]', () => {
    it('should get user by id successfully', async () => {
      const successData = { Items: [{ id: 1 }] };
      const fakeQuery = () => ({
        filter: () => ({
          equals: () => ({
            limit: () => ({
              exec: cb => cb(null, successData),
            }),
          }),
        }),
      });
      const stub = sinon.stub(Users, 'query').callsFake(fakeQuery);
      const result = await usersService.getById('123');
      expect(result).to.equal(successData.Items[0]);
      stub.restore();
    });

    it('should try to get user by id and fail gracefully on successfull call', async () => {
      const errorData = { status: 'connection failed' };
      const fakeQuery = () => ({
        filter: () => ({
          equals: () => ({
            limit: () => ({
              exec: cb => cb(errorData),
            }),
          }),
        }),
      });
      const stub = sinon.stub(Users, 'query').callsFake(fakeQuery);
      try {
        await usersService.getById('123');
      } catch (e) {
        expect(e).to.equal(errorData);
        stub.restore();
      }
    });

    it('should try to get user by id and fail gracefully if no user is found', async () => {
      const fakeQuery = () => ({
        filter: () => ({
          equals: () => ({
            limit: () => ({
              exec: cb => cb(null, { Items: [] }),
            }),
          }),
        }),
      });
      const stub = sinon.stub(Users, 'query').callsFake(fakeQuery);
      try {
        await usersService.getById('123');
      } catch (e) {
        expect(e).to.deep.equal({ status: 404, message: 'no user found' });
        stub.restore();
      }
    });
  });

  describe('function [create]', () => {
    it('should create goal successfully', async () => {
      const successData = { attrs: { id: 5 } };
      const fakeCreate = (data, cb) => {
        cb(null, successData);
      };
      const stub = sinon.stub(Users, 'create').callsFake(fakeCreate);
      const result = await usersService.create('123');
      expect(result).to.equal(successData);
      stub.restore();
    });

    it('should fail gracefully', async () => {
      const errorData = { status: 'connection failed' };
      const fakeCreate = (data, cb) => cb(errorData);
      const stub = sinon.stub(Users, 'create').callsFake(fakeCreate);
      try {
        await usersService.create('123');
      } catch (e) {
        expect(e).to.equal(errorData);
        stub.restore();
      }
    });
  });

  describe('function [update]', () => {
    it('should update goal successfully', async () => {
      const successData = { attrs: { id: 5 } };
      const fakeUpdate = (data, data2, cb) => cb(null, successData);
      const stub = sinon.stub(Users, 'update').callsFake(fakeUpdate);
      const result = await usersService.update({ id: 1 });
      expect(result).to.equal(successData);
      stub.restore();
    });

    it('should fail gracefully', async () => {
      const errorData = { status: 'connection failed' };
      const fakeUpdate = (data, data2, cb) => cb(errorData);
      const stub = sinon.stub(Users, 'update').callsFake(fakeUpdate);
      try {
        await usersService.update({ id: 1 });
      } catch (e) {
        expect(e).to.equal(errorData);
        stub.restore();
      }
    });
  });
});
