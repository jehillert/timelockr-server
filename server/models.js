const db = require('../db');

module.exports = {
  users: {
    get: user => db
      .query('SELECT * FROM users WHERE username = $1', user)
      .catch(err => console.log(err)),
    post: params => db
      .query('INSERT INTO users (username, hash, salt) VALUES ($1, $2, $3) ON CONFLICT (username) DO NOTHING', params)
      .catch(err => console.log(err)),
    delete: params => db
      .query('DELETE FROM users WHERE username = $1', params)
      .catch(err => console.log(err)),
    update: params => db
      .query('UPDATE users SET $1 = $2 WHERE user_id = $2 ON CONFLICT DO NOTHING', params)
      .catch(err => console.log(err)),
    },

  entries: {
    get: username => db
      .query('SELECT * FROM entries LEFT JOIN users ON users.user_id = entries.user_id WHERE users.username = $1 ORDER BY entries.release_date ASC', username)
      .catch(err => console.log(err)),
    post: params => db
      .query('INSERT INTO entries(user_id, creation_date, release_date, description, content) VALUES ($1, $2, $3, $4, $5)', params)
      .catch(err => console.log(err)),
    delete: entryId => db
      .query('DELETE FROM entries WHERE entry_id = $1', entryId)
      .catch(err => console.log(err)),
    update: params => db
      .query('UPDATE entries SET release_date = $1 WHERE entry_id = $2', params)
      .catch(err => console.log(err)),
  },
};



// purgeAccount: username => db
// .query('DELETE * FROM entries LEFT JOIN users ON users.user_id = entries.user_id WHERE users.username = $1', username)
//   .then
// .catch(err => console.log(err)),
