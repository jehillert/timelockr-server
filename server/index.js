/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-multi-assign */
/* eslint-disable key-spacing */
/*
! CHANGES REQUIRED:
!   cookie: {... domain: 'localhost:8080',
 */
require('dotenv').config();

const chalk = require('chalk');
const debug = require('debug')(chalk.hex('#00FF40').bgHex('#000000')('server:app'));
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const Store = require('connect-pg-simple')(session);
const router = require('./routes.js');

// initialize server for appropriate dbms
const app = module.exports = express();
const PORT = process.env.API_HOST || 3000;

// session
const options = {
  host: process.env.PGHOST,
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

debug('Server Status: %o', 'DEVELOPMENT MODE - Debugging enabled...');
debug(options);

const sessionStore = new Store(options);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: true,
  rolling: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    domain: 'localhost:8080',
    path: '/',
    secure: false,
  },
}));

app.use('/api/db', router);
// app.use(`/api/${process.env.PGDATABASE}`, router);

app.set('port', PORT);
app.listen(app.get('port'), () => (
  console.log(`Node app started. Listening on port ${PORT}`)
));

  // app.use(session({
  //   store: sessionStore,
  //   secret: process.env.SESSION_SECRET,
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  // }));

  // app.set('port', process.env.PORT);
  // app.set('host', '0.0.0.0');
  //
  // app.listen(app.get('port'), app.get('host'), () => (
  //   debug(`Node app started. Listening on port ${process.env.PORT}`)
  // ));
