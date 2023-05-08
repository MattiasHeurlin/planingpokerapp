import { socket } from './main';
import { User } from './roomSelection';
import { Topic } from './roomSelection';

class Room {
  public admin: string;
  public users: User[] = [];
  public usersWhoLeft: User[] = [];
  public upcomingTopics: Topic[] = [];
  public currentTopic: Topic[] = [];
  public finishedTopics: Topic[] = [];

  constructor(admin: string) {
    this.admin = admin;
  }
}

export function createRoom(roomAdmin: string) {
  if (!roomAdmin) {
    return alert('Rummet måste ha en admin');
  }

  const newRoom = new Room(roomAdmin);

  socket.emit('createRoom', newRoom);
}

export function createRoomElements() {
  const main = document.querySelector('.main-content');
  const createRoomInput = document.createElement('input');
  createRoomInput.placeholder = 'Namn på rum-admin';
  const createRoomBtn = document.createElement('button');
  createRoomBtn.innerHTML = 'Skapa rum';
  createRoomBtn.addEventListener('click', () => {
    createRoom(createRoomInput.value);
  });

  main?.append(createRoomInput, createRoomBtn);
}
