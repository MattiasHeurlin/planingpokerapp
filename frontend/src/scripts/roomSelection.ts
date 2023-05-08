import { uuid } from 'uuidv4';
import { socket } from './main';

export interface Room {
  admin: string;
  users: User[];
  usersWhoLeft: string[];
  upcomingTopics: Topic[];
  currentTopic: Topic[];
}
export interface User {
  name: string;
  id: string;
}
export interface Topic {
  title: string;
  score?: number;
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
  const adminText = document.createElement('p');
  adminText.innerText = 'Rum Admin:';

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const roomDiv = document.createElement('div');
    roomDiv.classList.add('room');
    const inputContainer = document.createElement('div');
    const roomName = document.createElement('h2');
    roomName.innerText = room.admin;
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Skriv in ditt namn';
    const button = document.createElement('button');
    button.innerText = 'Gå med';
    button.id = `joinBtn-${i}`;
    button.addEventListener('click', () => {
      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        const user = {
          id: uuid(),
          name: input.value,
        };
        localStorage.setItem('user', JSON.stringify(user));
      }

      const userFromStorage: User | null = storedUser
        ? JSON.parse(storedUser)
        : null;

      socket.emit('joinRoom', { user: userFromStorage, roomIndex: i });
      console.log(input.value, i);
    });

    inputContainer.append(input, button);
    roomDiv.append(adminText, roomName, inputContainer);
    div.append(roomDiv);
  }
  main!.append(div);
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
