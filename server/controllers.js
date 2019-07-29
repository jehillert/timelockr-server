// const debugSckt = require('./helpers/loggers')('SOCKET');
const chalk = require('chalk');
const hasher = require('pbkdf2-password')();
const debug = require('./helpers/loggers')('CONTROLLERS');
const helpers = require('./helpers/helpers');
const models = require('./models');
const { demoMode } = require('../config');

function deleteFromTable(req, res) {
  const params = helpers.getQueryParams(req);
  models.general
    .delete(params)
    .then(() => res.sendStatus(201))
    .catch(error => debug('Error', error));
}

function updateField(req, res) {
  const params = helpers.getQueryParams(req);
  models.general
    .put(params)
    .then(() => res.sendStatus(201))
    .catch(error => debug('Error', error));
}

module.exports = {
  signin: {
    post: (req, res) => models.users.get(req.body.username)
      .tap(() => {
        req.app.io.emit(req.method, 'USER LOGGING IN');
        req.app.io.emit('transmission', `Username: ${req.body.username} Password: ${req.body.password}`);
      })
      .tap((user) => {
          hasher({ password: req.body.password, salt: user[0].salt }, (err, pass, salt, hash) => {
            const truncatedSalt = `${salt.slice(0, 10)} ...`;
            const truncatedHash = `${hash.slice(0, 10)} ...`;

            req.app.io.emit('transmission',`Salt: ${truncatedSalt}hash: ${truncatedHash}`);
            req.app.io.emit('transmission', `Cookie: ${JSON.stringify(req.session.cookie, undefined, 2)}`);

          if (err) throw err;
          if (hash !== user[0].hash) debug(chalk.hex('#ff7643')('Invalid password.'));

          req.session.regenerate(() => {
            req.session.user = user;
            req.session.save();
          });
        });
      })
      .tap(() => req.app.io.emit('transmission', `res.req.sessionID: ${JSON.stringify(res.req.sessionID)}`))
      .then(user => res.status(202).send({ userId: user[0].user_id }))
      .catch(error => debug('Error', error)),
  },

  logout: {
    get: (req, res) => {
      req.session.destroy((err) => {
        req.app.io.emit(req.method, 'USER LOGGING OUT');
        if (err) {
          return res.status(500).json(`Error: ${err}`);
        }
      // debug('\n\nRESPONSE:\n\n%O', res);
      req.app.io.emit('transmission', 'User has logged out.');
      req.app.io.emit('transmission', `res.req.sessionID: ${res.req.sessionID}`);
      return res.status(200).json({ message: 'Logout successful.' });
      });
    },
  },

  users: {
    put: (req, res) => updateField(req, res),
    delete: (req, res) => deleteFromTable(req, res),
  },

  entries: {
    delete: (req, res) => models.entries
        .delete(req.body.entryId)
        .tap(() => req.app.io.emit(req.method, `DELETING ENTRY NO. ${req.body.entryId}...`))
        .tap(() => {
          req.app.io.emit('transmission', `req.body: ${JSON.stringify(req.body)}`);
        })
        .then(() => res.sendStatus(200))
        .catch(error => debug('Error', error)),

    get: (req, res) => models.entries.get(req.query.username)
        .tap(() => req.app.io.emit('transmission', `Fetching/reloading entries...`))
        .then(results => helpers.sortEntries(results))
        .then(results => res.send(results))
        .catch(error => debug('Error', error)),
        // .tap(results => debug('\n\nRESPONSE:\n\n%O', res))
        // .tap(results => debug('\n\nEntries - UNSORTED:\n\n%O', results))

    put: (req, res) => models.entries.update([
        req.body.data.releaseDate,
        req.body.data.entryId,
    ])
      .tap(() => req.app.io.emit('PUT', `USER CHANGING ENTRY NO. ${req.body.data.entryId}`))
      .tap(() => {
        req.app.io.emit('transmission', `req.body:\n${JSON.stringify(req.body, undefined, 3)}`);
      })
      .then(() => res.sendStatus(201))
      .catch(error => debug('Error', error)),

    post: (req, res) => models.entries.post([
      req.body.userId,
      req.body.creationDate,
      req.body.releaseDate,
      req.body.description,
      req.body.content,
    ])
      .tap(() => req.app.io.emit(req.method, 'POSTING NEW ENTRY'))
      .tap(() => {
        req.app.io.emit('transmission', `req.body:\n${JSON.stringify(req.body, undefined, 3)}`);
      })
      .then(() => res.sendStatus(201))
      .catch(error => debug('Error', error)),
  },

  signup: {
    post: (req, res) => models.users
      .post([
        req.body.username,
        req.body.hash,
        req.body.salt,
      ])
      .tap(() => req.app.io.emit(req.method, 'CREATING NEW USER'))
      .tap(() => {
        debug(req.body.username);
        debug(req.body.hash);
        debug(req.body.salt);
      })
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(409)),
  },
};
/*
.tap(() => req.app.io.emit(req.method, 'Server queries database...'))

req.app.io.emit(
req.method,
'delete',
'get',
'post',
'put',
`'transmission':\t${'transmission'}`);
req.ip:\t${req.ip}`);
req.hostname:\t${req.hostname}`);
req.url:\t${req.url}`);
req.baseURL:\t${req.baseURL}`);
req.path:\t${req.path}`);
req.secure:\t${req.secure}`);
signedCookies:${req.signedCookie}`);
req.cookies:\t${req.cookies}`);
Params:\t${JSON.stringify(req.query)}`);
reqprotocol:\t${req.protocol}`);
req.body:\n${JSON.stringify(req.body, undefined, 3)}`);
session.cookie:\n${JSON.stringify(req.session.cookie, undefined, 2)}`);
req.headers:\n${JSON.stringify(req.headers, undefined, 3)}`
);

debug(`'transmission':\t${'transmission'}`);
debug(`req.ip:\t${req.ip}`);
debug(`req.hostname:\t${req.hostname}`);
debug(`req.url:\t${req.url}`);
debug(`req.baseURL:\t${req.baseURL}`);
debug(`req.path:\t${req.path}`);
debug(`req.secure:\t${req.secure}`);
debug(`signedCookies:${req.signedCookie}`);
debug(`req.cookies:\t${req.cookies}`);
debug(`Params:\t${JSON.stringify(req.query)}`);
debug(`Protocol:\t${req.protocol}`);
debug(`req.body:\n${JSON.stringify(req.body, undefined, 3)}`);
debug(`\nsession.cookie:\n${JSON.stringify(req.session.cookie, undefined, 2)}`);
debug(`\nreq.headers:\n${JSON.stringify(req.headers, undefined, 3)}`);
*/
