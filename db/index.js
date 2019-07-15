const debug = require('../server/helpers/loggers')('DATABASE');
const Promise = require('bluebird');

// console.log(`__dirname in database index.js:     ${__dirname}`)

const initOptions = { promiseLib: Promise };
const pgp = require('pg-promise')(initOptions);

if (process.env.NODE_ENV === 'development') {
  const config = {
    user               : process.env.PGUSER,
    password           : process.env.PGPASSWORD,
    database           : process.env.PGDATABASE || 'db',
    host               : process.env.PGHOST || 'localhost',
    port               : process.env.PGPORT || 5432,
    max                : process.env.PG_MAX || 100,
    idleTimeoutMillis  : process.env.PG_IDLETIMEOUTMILLIS || 30000,
    ssl                : process.env.PG_SSL || true,
  };

  debug(config);
  const db = pgp(config);

  module.exports = db;
} else {
  const connectionString = process.env.DATABASE_URL;
  const db = pgp(connectionString);

  module.exports = db;
}
