const Users = require('../models/Users');

const usersService = {
  getById: id => new Promise((resolve, reject) => {
    Users
      .query(id)
      .filter('deleted')
      .equals(true)
      .limit(1)
      .exec((err, users) => {
        if (err) return reject(err);
        if (users.Items.length === 0) {
          reject({ status: 404, message: 'no user found' });
        }
        return resolve(users.Items[0]);
      });
  }),

  create: user => new Promise((resolve, reject) => {
    Users.create(user, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  }),
  update: user => new Promise((resolve, reject) => {
    if (!user.id) {
      return reject({ status: 400, message: 'Bad request - please pass an ID' });
    }
    return Users.update(user, { expected: { id: { Exists: true } } }, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  }),
};

module.exports = usersService;
