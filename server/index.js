require('dotenv').config();

const chalk = require('chalk');
const debug = require('debug')('server');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();  //needed b/c
const server = require('http').Server(app);
const io = require('socket.io')(server);
const session = require('express-session');
const Store = require('connect-pg-simple')(session);
const path = require('path');
const router = require('./routes.js');

const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

// session
const options = {
  host: process.env.PGHOST,
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

debug('Server Status: %o', 'DEVELOPMENT MODE - Debugging enabled...');

const sessionStore = new Store(options);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  resave: true,
  // rolling: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // domain: 'localhost:8080',
    // path: '/',
    // secure: false,
  },
}));

io.on('connection', socket => {
  socket.emit('connection', 'New client has connected. 🔥🔥🔥🔥🔥🔥🔥🔥');
  socket.on('disconnect', () => console.log('Client disconnected.'));

  app.use('/api/db', router);
  app.use(`/api/${process.env.PGDATABASE}`, router);
});

app.set('port', process.env.PORT);
app.set('host', '0.0.0.0');

server.listen(app.get('port'), app.get('host'), () => (
  debug(`Node app started. Listening on port ${process.env.PORT || 5000}`)
));
