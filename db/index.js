/* eslint-disable key-spacing, import/order, import/no-extraneous-dependencies */
const chalk = require('chalk');
const Promise = require('bluebird');
const debug = require('debug')(chalk.hex('#0a93ff').bgHex('#000000')('database:index'));

debug(chalk.bold.hex('#FF0000')(' DEVELOPMENT MODE '), chalk.inverse(' Debugging Enabled '));

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
