require('dotenv').config();

const chalk = require('chalk');
const debug = require('debug')(chalk.hex('#00FF40').bgHex('#000000')('server:app'));
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const Store = require('connect-pg-simple')(session);
const router = require('./routes.js');
// delete me
const generatePassword = require('password-generator');

const app = module.exports = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));
// app.use(express.static(path.join(__dirname, 'client/build'))); //tutorial
// app.use(express.static(path.join(__dirname,"public"))); // jeh

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});
// app.get('*', (req, res) => { //tutorial
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
//   res.sendFile(path.join(__dirname+'/../client/build/index.html'));
// });
// app.get('/', function(req, res) { //jeh
//     res.sendFile(path.join(__dirname, 'index.html'));
// });


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

app.use('/api/db', router);
app.use(`/api/${process.env.PGDATABASE}`, router);

app.set('port', process.env.PORT);
app.set('host', '0.0.0.0');

app.listen(app.get('port'), app.get('host'), () => (
  debug(`Node app started. Listening on port ${process.env.PORT}`)
));

/*

  app.set('port', PORT);
  app.listen(app.get('port'), () => (
    console.log(`Node app started. Listening on port ${PORT}`)
  });
*/
