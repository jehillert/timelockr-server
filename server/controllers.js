const chalk = require('chalk');
const debug = require('debug')(chalk.hex('#38A53C').bgHex('#000000')('server:controllers'));
const hasher = require('pbkdf2-password')();
const helpers = require('./helpers/helpers');
const models = require('./models');

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
          if (err) throw err;
          debug(chalk.hex('#ff7643')(`HASH --- ${hash}`));
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

  users: {
    put: (req, res) => updateField(req, res),

    delete: (req, res) => deleteFromTable(req, res),
  },

  entries: {
    delete: (req, res) => models.entries
        .delete(req.body.entryId)
        .then(() => res.sendStatus(200))
        .catch(error => debug('Error', error)),

    get: (req, res) => models.entries.get(req.query.username)
        .tap(results => debug('\n\nEntries - UNSORTED:\n\n%O', results))
        .then(results => helpers.sortEntries(results))
        .then(results => res.send(results))
        .catch(error => debug('Error', error)),

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
