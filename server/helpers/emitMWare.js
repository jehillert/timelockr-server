const debug = require('debug')('server:auth');

io.on('connection', function(socket) {
  debug('A new WebSocket connection has been established');
});
