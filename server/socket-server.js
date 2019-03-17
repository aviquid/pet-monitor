const io = require('socket.io');
const logger = require('heroku-logger')

module.exports = (httpInstance, options = null) => {
    const sock = io(httpInstance);
    sock.on('connection', (client) => {
        logger(`client connected`);
        client.on('videoData', (data) => {
          logger('camera data ', data);
        });
        client.on('disconnect', function() {
          logger('user disconnected');
        });
    });
}