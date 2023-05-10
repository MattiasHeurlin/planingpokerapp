import '../style.css';
import { io } from 'socket.io-client';
import { getAllRooms } from './roomSelection';

import {
  addVote,
  renderComingTopics,
  renderRunningRoom,
  renderUserView,
} from './userView';

import { superadminLogin } from './superadminLogin';
import { Room } from './roomSelection';
import { printAdminView } from './adminView';
import { renderEndSessionPage } from './endSession';

export const app = document.querySelector('#app');

app!.innerHTML = `
  <div class="grid-container">
    <header class="header"><h1>Header<h1></header>
    <aside class="upcoming-topics"><h2>Upcoming topics<h2></aside>
    <main class="main-content"><h2>Öppna Rum<h2></main>
    <section class="previous-topics"><h2>Previous topics<h2></section>
    <footer class="footer"></footer>
  </div>`;

export const socket = io('http://localhost:3000');

function init(): void {
  getAllRooms();
  superadminLogin();

  socket.on('monitorRooms', () => {
    getAllRooms();
  });
}

init();
