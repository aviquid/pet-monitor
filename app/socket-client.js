import openSocket from 'socket.io-client';
const socket = openSocket();

function emitVideoData(data) {
  socket.emit('videoData', data);
}
export { emitVideoData };
