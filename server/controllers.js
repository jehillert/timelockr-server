const chalk = require('chalk');
const debug = require('./helpers/loggers')('controllers');
const hasher = require('pbkdf2-password')();
const helpers = require('./helpers/helpers');
const models = require('./models');
const Promise = require('bluebird')

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
              `Salt generated: ${truncatedSalt}\n
              Password hash: ${truncatedHash}`
            );

            io.emit(
              'transmission',
              `Cookie:\n\n${req.headers.cookie}`
            );

          if (err) throw err;
          if (hash !== user[0].hash) debug(chalk.hex('#ff7643')('Invalid password.'));

          req.session.regenerate(() => {
            req.session.user = user;
            req.session.save();
          });
        });
      })
      .then(user => res.status(202).send({ userId: user[0].user_id }))
      .catch(error => debug('Error', error)),
  },

  logout: {
    get: (req, res) => req.session.destroy()
      .then(() => res.status(200).json({ message: 'Logout successful.' }))
      .catch(error => debug('Error', error)),
  },

  // purgeAccount: {
  //   delete: (req, res) => models.users
  //     .delete(req.body.username)
  //     .tap(() => {
  //       req.app.io.emit('transmission',`Deleting all entries for user ${req.body.username}`);
  //     })
  //     .then(() => res.sendStatus(200))
  //     .catch(error => debug('Error', error)),
  //   delete: (req, res) => deleteFromTable(req, res),

  // }

  users: {
    put: (req, res) => updateField(req, res),
    delete: (req, res) => deleteFromTable(req, res),
  },

  entries: {
    delete: (req, res) => models.entries
        .delete(req.body.entryId)
        .tap(() => {
          req.app.io.emit('transmission',`Deleting Entry No. ${req.body.entryId} from database.`);
        })
        .then(() => res.sendStatus(200))
        .catch(error => debug('Error', error)),

    get: (req, res) => models.entries.get(req.query.username)
        .then(results => helpers.sortEntries(results))
        .then(results => res.send(results))
        .catch(error => debug('Error', error)),
        // .tap(results => debug('\n\nRESPONSE:\n\n%O', res))
        // .tap(results => debug('\n\nEntries - UNSORTED:\n\n%O', results))

    put: (req, res) => models.entries.update([
        req.body.data.releaseDate,
        req.body.data.entryId,
    ])
      .then(() => res.sendStatus(201))
      .catch(error => debug('Error', error)),

    post: (req, res) => models.entries.post([
      req.body.userId,
      req.body.creationDate,
      req.body.releaseDate,
      req.body.description,
      req.body.content,
    ])
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
      .tap(() => {
        debug(req.body.username);
        debug(req.body.hash);
        debug(req.body.salt);
      })
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(409)),
  },
};
