import { socket } from './main';
import { User } from './roomSelection';
import { Topic } from './roomSelection';

interface Admin {
  name: string;
  socketId: string;
}

class Room {
  public admin: Admin;
  public users: User[] = [];
  public usersWhoLeft: User[] = [];
  public upcomingTopics: Topic[] = [];
  public currentTopic: Topic[] = [];
  public finishedTopics: Topic[] = [];

  constructor(admin: string) {
    this.admin = { name: admin, socketId: socket.id };
  }
}

export function createRoom(roomAdmin: string) {
  if (!roomAdmin) {
    return alert('Rummet måste ha en admin');
  }

  const newRoom = new Room(roomAdmin);

  socket.on('createRoomAdmin', (room) => {
    // printAdminView(room); <--- kommentera in efter merge
    console.log(room);
    socket.off('createRoomAdmin');
  });

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
