import { createRoomElements } from './createRoom';
import { socket } from './main';
import { addUserSockets } from './sockets';

export interface Room {
  admin: Admin;
  users: User[];
  usersWhoLeft: string[];
  upcomingTopics: Topic[];
  currentTopic: CurrentTopic;
  previousTopics: Topic[];
}

export interface Admin {
  name: string;
  socketId: string;
}

export interface User {
  name: string;
  id: string;
}
export interface Topic {
  title?: string;
  votes?: Vote[];
  score?: number;
}

interface CurrentTopic {
  title: string;
  votes: Vote[];
  score: number;
}
interface Vote {
  user: User;
  score: number;
}

export function getAllRooms() {
  fetch('http://localhost:3000/rooms')
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        console.log('No rooms found');
      }
      renderRooms(data);
    });
}

export function renderRooms(rooms: Room[]) {
  const div = document.createElement('div');
  div.classList.add('room-select-container');
  const main = document.querySelector<HTMLDivElement>('.main-content');
  main!.innerHTML = '';
  const adminText = document.createElement('p');
  adminText.innerText = 'Rum Admin:';

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const roomDiv = document.createElement('div');
    roomDiv.classList.add('room');
    const inputContainer = document.createElement('div');
    const roomName = document.createElement('h2');
    roomName.innerText = room.admin.name;
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Skriv in ditt namn';
    const button = document.createElement('button');
    button.innerText = 'Gå med';
    button.addEventListener('click', () => {
      addUserSockets();

      socket.emit('joinRoom', { name: input.value, roomIndex: i });
      console.log(input.value, i);
    });

    inputContainer.append(input, button);
    roomDiv.append(adminText, roomName, inputContainer);
    div.append(roomDiv);
  }

  main!.append(div);
  createRoomElements();
  reJoinCheck(rooms);
}

function reJoinCheck(rooms: Room[]) {
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    return;
  }

  const userFromStorage = JSON.parse(storedUser);

  const roomWithUser = rooms.find((room) =>
    room.users.find((user) => user.id == userFromStorage.id)
  );

  if (!roomWithUser) {
    return;
  }

  const roomIndex = rooms.indexOf(roomWithUser);
  const joinBtn = document.querySelector(`#joinBtn-${roomIndex}`);

  if (joinBtn) {
    joinBtn.innerHTML = 'Re-join';
  }
}
