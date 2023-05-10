import { printAdminView } from './adminView';
import { renderEndSessionPage } from './endSession';
import { app, socket } from './main';
import { addVote, renderComingTopics, renderRunningRoom } from './userView';
import { Room } from './roomSelection';

export function addAdminSockets() {
  socket.on('changeTopicOrderAdmin', (room) => {
    printAdminView(room);
  });

  socket.on('removeTopicAdmin', (room) => {
    printAdminView(room);
  });

  socket.on('addTopicAdmin', (room) => {
    printAdminView(room);
  });

  socket.on("nextTopicAdmin", (room : Room) => {
    printAdminView(room);
  })

  socket.on('endSession', (room) => {
    renderEndSessionPage(room);
  });

  socket.on('noTopics', () => {
    console.log('You need to add atleast 1 topic to start the game.');
  });

  socket.on('missingVotes', () => {
    console.log("Everyone hasn't finished voting yet.");
  });

  socket.on('vote', (room: Room) => {
    console.log(room);
    addVote(room, false);
  });

  socket.on('allVoted', (room: Room) => {
    addVote(room, true);
  });
}

export function addUserSockets() {
  socket.on('changeTopicOrder', (room) => {
    renderComingTopics(room.upcomingTopics);
  });

  socket.on('removeTopic', (room) => {
    renderComingTopics(room.upcomingTopics);
  });

  socket.on('addTopic', (room) => {
    renderComingTopics(room.upcomingTopics);
  });

  socket.on("nextTopic", (room) => {
    renderRunningRoom(room);
  })

  socket.on('userAlreadyInRoom', (data) => {
    console.log(data);
    const error = document.createElement('p');
    error.innerText = 'Namnet är upptaget, välj ett annat';
    app!.append(error);
  });

  socket.on('joinRoom', (room: Room) => {
    console.log(room);
    // renderUserView(room); Går igång direkt förtillfället :FIXME
    renderRunningRoom(room);
  });

  socket.on('monitorRoom', (room: Room) => {
    console.log(room);
    renderRunningRoom(room);
  });

  socket.on('vote', (room: Room) => {
    console.log(room);
    addVote(room, false);
  });

  socket.on('allVoted', (room: Room) => {
    addVote(room, true);
  });

  socket.on('endSession', (room) => {
    renderEndSessionPage(room);
  });
}
