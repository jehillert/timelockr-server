// const debug = require('debug')('server:routes');
const router = require('express').Router();
const auth = require('./helpers/auth');
const controller = require('./controllers');
// const app = require('./index');
// var io = app.getIO(); //your io var

// route-specific middleware
router.use('/signup', auth.hashPassword);

// routes
router.post('/signin', controller.signin.post);
router.post('/logout', controller.logout.get);
router.post('/signup', controller.signup.post);

// auth.restrict
router.put('/users', controller.users.put);
router.delete('/users', controller.users.delete);

router.get('/entries', controller.entries.get);
router.put('/entries', controller.entries.put);
router.post('/entries', controller.entries.post);
router.delete('/entries', controller.entries.delete);

module.exports = router;
