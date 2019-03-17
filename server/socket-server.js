const io = require('socket.io');

module.exports = (httpInstance, options = null) => {
    const sock = io(httpInstance);
    sock.on('connection', (client) => {
        console.log(`client connected`);
        client.on('videoData', (data) => {
          console.log('camera data ', data);
        });
        client.on('disconnect', function() {
          console.log('user disconnected');
        });
    });
}