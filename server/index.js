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
const app = express();

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

const sessionStore = new Store(options);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
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

app.set('port', process.env.PORT);
app.set('host', '0.0.0.0');

app.use('/api/db', router);
app.use(`/api/${process.env.PGDATABASE}`, router);

const server = app.listen(app.get('port'), app.get('host'), () => (
  debugServer(`Node app started. Listening on port ${process.env.PORT || 5000}`)
));

const io = require('socket.io')(server);
app.io=io;

io.on('connection', (socket) => {
  debugSocket('Client connected...');
  debugSocket(`CONNECTIONS: ${io.engine.clientsCount}`);
  socket.on('disconnect', () => {
    debugSocket('Client disconnected.');
  });
});
