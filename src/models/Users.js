const dynogels = require('dynogels');
const Joi = require('joi');

const { IS_OFFLINE, DYNAMODB_PORT } = process.env;

/* istanbul ignore next */
if (IS_OFFLINE === 'true') {
  dynogels.AWS.config.update({ endpoint: `http://localhost:${DYNAMODB_PORT}` });
}

const Users = dynogels.define(process.env.DYNAMODB_TABLE, {
  hashKey: 'id',
  rangeKey: 'createdAt',
  timestamps: true,
  updatedAt: 'updatedAt',
  createdAt: 'createdAt',
  schema: {
    id: dynogels.types.uuid(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    age: Joi.number(),
    gender: Joi.string(),
    deleted: Joi.boolean(),
  },
  validation: {
    allowUnknown: false,
  },
  indexes: [
    {
      hashKey: 'id',
      rangeKey: 'createdAt',
      type: 'local',
      name: 'createdAtIndex',
    },
  ],
});

module.exports = Users;
