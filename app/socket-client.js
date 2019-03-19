import openSocket from 'socket.io-client';
const socket = openSocket();

function listenToViewer(cb) {
  socket.on('listenToViewer', cb);
}
function emitIdToShower(id) {
  socket.emit('emitIdToShower', id);
}
function emitCctvName(roomName) {
  socket.emit('emitCctvName', roomName)
}
function unMountRoom(roomName) {
  socket.emit('unMountRoom', roomName);
}
export { listenToViewer, emitIdToShower, emitCctvName, unMountRoom };
