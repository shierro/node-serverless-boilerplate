const logger = require('../utils/logger');
const usersService = require('../services/users');

const UsersController = {
  getUser: async (req, res, next) => {
    try {
      const result = await usersService.getById(req.params.id);
      res.json(result);
    } catch (e) {
      logger.error(e);
      next(e);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const result = await usersService.create(req.body);
      res.json(result);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      req.body.id = req.params.id;
      const result = await usersService.update(req.body);
      res.json(result);
    } catch (e) {
      logger.error(e);
      next(e);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      await usersService.update({
        id: req.params.id,
        deleted: true,
      });
      res.json({ success: true });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  },
};

module.exports = UsersController;
