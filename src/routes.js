const express = require('express');

const UsersController = require('./controllers/UsersController');
const ErrorController = require('./controllers/ErrorController');

const { NODE_ENV, APP_ROUTE } = process.env;

module.exports = (app) => {
  /* istanbul ignore next */
  app.use((req, res, next) => {
    if (NODE_ENV === 'test') {
      req.event = { requestContext: { authorizer: { claims: {} } } };
      req.event.body = JSON.stringify(req.body);
    }
    next();
  });
  const usersRouter = express.Router();
  usersRouter.get('/:id', UsersController.getUser);
  usersRouter.post('/', UsersController.createUser);
  usersRouter.patch('/:id', UsersController.updateUser);
  usersRouter.delete('/:id', UsersController.deleteUser);

  /* APIs */
  app.use(`/${APP_ROUTE}`, usersRouter);

  /* Error Handling */
  app.use(ErrorController.error404);
  app.use(ErrorController.generalError);
};
