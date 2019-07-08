// const loggers = require('./helpers/loggers');
// const debug = require('debug')(loggers.routes);
const debug = require('./helpers/loggers')('routes');
const router = require('express').Router();
const mddlwr = require('./helpers/middleware');
const controller = require('./controllers');

// route-specific middleware
router.use('/signup', mddlwr.hashPassword);

// NEED TO ADD auth.restrict ON ROUTES?

// AUTHORIZATION
router.post('/signin', controller.signin.post);
router.post('/logout', controller.logout.get);

// ACCOUNT
router.post('/signup', controller.signup.post);
router.put('/users', controller.users.put);
router.delete('/users', controller.users.delete);

// ENTRIES
router.get('/entries', controller.entries.get);
router.put('/entries', controller.entries.put);
router.post('/entries', controller.entries.post);
router.delete('/entries', controller.entries.delete);

module.exports = router;
