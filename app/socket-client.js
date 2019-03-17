import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3000');

function emitVideoData(data) {
  socket.emit('videoData', data);
}
export { emitVideoData };
