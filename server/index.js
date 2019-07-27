/* eslint-disable import/order */
require('dotenv').config();
const debugServer = require('./helpers/loggers')('SERVER');
const debugSocket = require('./helpers/loggers')('SOCKET');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const Store = require('connect-pg-simple')(session);
const path = require('path');
const router = require('./routes.js');
const {
  pgDatabase,
  pgHost,
  pgPassword,
  pgPort,
  pgUser,
  port,
  sessionSecret,
} = require('../config');

// Serve static files from React app
const app = express();
app.use(express.static(path.join(__dirname, '/../client/build')));

// session
const options = {
  host: pgHost,
  port: pgPort,
  user: pgUser,
  password: pgPassword,
  database: pgDatabase,
};

const sessionStore = new Store(options);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  store: sessionStore,
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
}));

// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }

app.set('port', port);
app.set('host', '0.0.0.0');

app.use('/api/db', router);
app.use(`/api/${pgDatabase}`, router);

const server = app.listen(app.get('port'), app.get('host'), () => (
  debugServer(`Node app started. Listening on port ${port}`)
));

const io = require('socket.io')(server);

app.io = io;

io.on('connection', (socket) => {
  debugSocket('Client connected...');
  debugSocket(`CONNECTIONS: ${io.engine.clientsCount}`);
  socket.on('disconnect', () => {
    debugSocket('Client disconnected.');
  });
});
