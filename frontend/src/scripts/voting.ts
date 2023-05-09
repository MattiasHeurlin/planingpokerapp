import { socket } from './main';

export function startGame() {
  socket.emit('startGame', socket.id);
}
