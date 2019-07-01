const debug = require('debug')('server:auth');

docket.emit('connection', function(socket) {
  debug('A new WebSocket connection has been established');
});
