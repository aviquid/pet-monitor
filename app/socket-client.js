import openSocket from 'socket.io-client';
const socket = openSocket(window.location.origin);

function emitVideoData(data) {
  socket.emit('videoData', data);
}
export { emitVideoData };
