const io = require('socket.io');
var listOfRooms = {};

module.exports = (httpInstance, options = null) => {
    const sock = io(httpInstance);
    sock.on('connection', (client) => {
        console.log(`client connected`, client.id);
        client.on('emitIdToShower', ({id, roomName}) => {
          console.log(roomName, id, listOfRooms)
          sock.to(listOfRooms[roomName]).emit('listenToViewer', id);
        });
        client.on('emitCctvName', roomName => {
          listOfRooms[roomName] = client.id;
        })
        client.on('unMountRoom', roomName => {
          delete listOfRooms[roomName];
          console.log(roomName, listOfRooms)
        })
        client.on('disconnect', function() {
          console.log('user disconnected');
        });
    });
}