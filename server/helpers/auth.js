const debug = require('debug')('server:auth');
const chalk = require('chalk');
const hasher = require('pbkdf2-password')();

const hashPassword = (req, res, next) => {
  hasher({ password: req.body.password }, (err, pass, salt, hash) => {
    if (err) {
      next(err);
    }
    req.body.hash = hash;
    req.body.salt = salt;
    next();
  });
};

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

module.exports = {
  hashPassword,
  restrict,
};
