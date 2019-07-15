const debug = require('./helpers/loggers')('ROUTES');
const router = require('express').Router();
const mddlwr = require('./helpers/middleware');
const controllers = require('./controllers');

// route-specific middleware
router.use('/signup', mddlwr.hashPassword);

// NEED TO ADD auth.restrict ON ROUTES?

// AUTHORIZATION
router.post('/signin', controllers.signin.post);
router.get('/logout', controllers.logout.get);

// ACCOUNT
router.post('/signup', controllers.signup.post);
router.put('/users', controllers.users.put);
router.delete('/users', controllers.users.delete);

// ENTRIES
router.get('/entries', controllers.entries.get);
router.put('/entries', controllers.entries.put);
router.post('/entries', controllers.entries.post);
router.delete('/entries', controllers.entries.delete);

module.exports = router;
