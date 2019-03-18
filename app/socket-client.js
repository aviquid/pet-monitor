import openSocket from 'socket.io-client';
const socket = openSocket();

function listenToViewer(cb) {
  socket.on('listenToViewer', cb);
}
function emitIdToShower(id) {
  socket.emit('emitIdToShower', id);
}
export { listenToViewer, emitIdToShower };
