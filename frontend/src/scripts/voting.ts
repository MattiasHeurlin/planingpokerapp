import { socket } from './main';

export function startGame() {
  socket.emit('startGame', socket.id);
}

export function nextTopic() {
  socket.emit('nextTopic', socket.id);
}
