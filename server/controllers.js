const chalk = require('chalk');
const debugCtrl = require('./helpers/loggers')('CONTROLLERS');
const debugSckt = require('./helpers/loggers')('SOCKET');
const hasher = require('pbkdf2-password')();
const helpers = require('./helpers/helpers');
const models = require('./models');
const Promise = require('bluebird')
var util = require('util')

function deleteFromTable(req, res) {
  const params = helpers.getQueryParams(req);
  models.general
    .delete(params)
    .then(() => res.sendStatus(201))
    .catch(error => debugCtrl('Error', error));
}

function updateField(req, res) {
  const params = helpers.getQueryParams(req);
  models.general
    .put(params)
    .then(() => res.sendStatus(201))
    .catch(error => debugCtrl('Error', error));
}

module.exports = {
  signin: {
    post: (req, res) => models.users.get(req.body.username)
      .tap((user) => {
          hasher({ password: req.body.password, salt: user[0].salt }, (err, pass, salt, hash) => {

            const truncatedSalt = salt.slice(0, 10) + '...';
            const truncatedHash = hash.slice(0, 10) + '...';

            var io = req.app.io;

            io.emit(
              'transmission',
              `Username: ${req.body.username}\n
              Password: ${req.body.password}`
            );

            io.emit(
              'transmission',
              `Salt: ${truncatedSalt}\n
              hash: ${truncatedHash}`
            );

          io.emit('transmission',`Cookie:\n\n${JSON.stringify(req.session.cookie)}`);
          io.emit('transmission',`req.sessionID:\n\n${JSON.stringify(req.sessionID)}`);

          if (err) throw err;
          if (hash !== user[0].hash) debugCtrl(chalk.hex('#ff7643')('Invalid password.'));

          req.session.regenerate(() => {
            req.session.user = user;
            req.session.save();
          });
        });
      })
      .tap(() => req.app.io.emit('transmission',`res.req.sessionID:\n\n${JSON.stringify(res.req.sessionID)}`))
      .tap(results => debugCtrl('\n\nRESPONSE:\n\n%j', JSON.stringify(res)))
      .then(user => res.status(202).send({ userId: user[0].user_id }))
      .catch(error => debugCtrl('Error', error)),
  },

  // logout: {
  //   get: (req, res) => {
  //     req.app.io.emit('transmission', `User has logged out.`);
  //     req.session.data = null;
  //     return res.status(200).json();
  //   }
  // },

  logout: {
    get: (req, res) => {
      req.session.destroy(function(err) {
        if (err) {
          return res.status(500).json('Error: ${err}');
        }
      debugCtrl('\n\nRESPONSE:\n\n%O', res);
      req.app.io.emit('transmission', `User has logged out.`);
      req.app.io.emit('transmission', `res.req.sessionID: ${res.req.sessionID}`);
      return res.status(200).json({ message: 'Logout successful.' });
      });
    }
  },

  users: {
    put: (req, res) => updateField(req, res),
    delete: (req, res) => deleteFromTable(req, res),
  },

  entries: {
    delete: (req, res) => models.entries
        .delete(req.body.entryId)
        .tap(() => {
          req.app.io.emit('transmission',`Processed 'delete' request for Entry No. ${req.body.entryId} from database.`);
        })
        .then(() => res.sendStatus(200))
        .catch(error => debugCtrl('Error', error)),

    get: (req, res) => models.entries.get(req.query.username)
        .then(results => helpers.sortEntries(results))
        .then(results => res.send(results))
        .catch(error => debugCtrl('Error', error)),
        // .tap(results => debugCtrl('\n\nRESPONSE:\n\n%O', res))
        // .tap(results => debugCtrl('\n\nEntries - UNSORTED:\n\n%O', results))

    put: (req, res) => models.entries.update([
        req.body.data.releaseDate,
        req.body.data.entryId,
    ])
      .tap(() => {
        req.app.io.emit('transmission', `Processed 'put' request to extend release date of Entry No. ${req.body.entryId} to: ${req.body.data.releaseDate}.`)
      })
      .then(() => res.sendStatus(201))
      .catch(error => debugCtrl('Error', error)),

    post: (req, res) => models.entries.post([
      req.body.userId,
      req.body.creationDate,
      req.body.releaseDate,
      req.body.description,
      req.body.content,
    ])
      .then(() => res.sendStatus(201))
      .catch(error => debugCtrl('Error', error)),
  },

  signup: {
    post: (req, res) => models.users
      .post([
        req.body.username,
        req.body.hash,
        req.body.salt,
      ])
      .tap(() => {
        debugCtrl(req.body.username);
        debugCtrl(req.body.hash);
        debugCtrl(req.body.salt);
      })
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(409)),
  },
};
