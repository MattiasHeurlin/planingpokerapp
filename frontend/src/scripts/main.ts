import '../style.css';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000');

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Hello World!</h1>
  </div>
`;
