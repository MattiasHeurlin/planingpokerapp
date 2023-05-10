const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const superadminRouter = require('./routes/superadmin');
const { stringify } = require('querystring');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.CLIENT_URI,

    methods: ['GET', 'POST'],
  },
});

const options = {
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.DATABASE_URI, options)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('Error connecting to database: ', err));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/superadmin', superadminRouter);

const ROOMS = [
  {
    admin: { name: 'Joe' },
    users: [
      {
        name: 'Doe',
        socketId: 1,
      },
      {
        name: 'Foe',
        socketId: 2,
      },
    ],
    usersWhoLeft: ['Donny'],
    upcomingTopics: [
      {
        title: 'Skapa frontend',
      },
      {
        title: 'Skapa backend',
      },
    ],
    currentTopic: {
      title: 'Bygga Youtube klon',
      votes: [
        { user: { name: 'gregory' }, score: 3 },
        { user: { name: 'Barry' }, score: 3 },
      ],
      score: 0, // Avg score
    },
    previousTopics: [
      { title: 'skapa admin-vy', score: 5 },
      { title: 'random topic', score: 3 },
    ],
  },
  {
    admin: { name: 'Troy' },
    users: [
      {
        name: 'Lory',
        socketId: 1,
      },
      {
        name: 'Barry',
        socketId: 2,
      },
    ],
    usersWhoLeft: ['Donny'],
    upcomingTopics: [
      {
        title: 'Skapa frontend',
      },
      {
        title: 'Skapa backend',
      },
    ],
    currentTopic: {
      title: 'Bygga Spotify klon',
      votes: [{ user: 'gregory', score: 3 }],
    },
    previousTopics: [
      { title: 'skapa admin-vy', score: 5 },
      { title: 'random topic', score: 3 },
    ],
  },
];
const FIBONACCI = [0, 1, 3, 5, 8];
// const ROOMS = [];

app.get('/rooms', (req, res) => {
  res.json(ROOMS);
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    const roomWithUser = ROOMS.find((room) =>
      room.users.find((user) => user.socketId === socket.id)
    );

    if (!roomWithUser) {
      console.log('User without room left');
      return;
    }

    const user = roomWithUser.users.find((user) => user.socketId == socket.id);
    const indexOfUser = roomWithUser.users.indexOf(user);

    roomWithUser.users.splice(indexOfUser, 1);

    roomWithUser.usersWhoLeft.push(user);

    roomWithUser.users.forEach((user) =>
      io.to(user.id).emit('userDisconnect', roomWithUser)
    );
  });

  socket.on('monitorRooms', () => {
    io.emit('monitorRooms');
  });

  socket.on('createRoom', (room) => {
    ROOMS.push(room);

    // io.emit('monitorRooms');
    io.to(socket.id).emit('createRoomAdmin', room);
  });

  socket.on('joinRoom', (userAndRoomIndex) => {
    // userAndRoomIndex = {
    //   user: {id: uuidId, name: "Random", socketId: socketId},
    //   roomIndex: number
    // }

    const roomIndex = userAndRoomIndex.roomIndex;

    const room = ROOMS[roomIndex];
    let userAlreadyInRoom = false;
    room.users.forEach((user) => {
      if (user.name === userAndRoomIndex.name) {
        console.log('User that name is already in the room.');
        userAlreadyInRoom = true;
        return;
      }
    });
    if (userAlreadyInRoom) {
      io.to(socket.id).emit('userAlreadyInRoom', room);
      return;
    }
    const user = {
      name: userAndRoomIndex.name,
      socketId: socket.id,
    };
    room.users.push(user);
    console.log(ROOMS[roomIndex]);
    room.users.forEach((user) => io.to(user.socketId).emit('joinRoom', room));
  });

  socket.on('leaveRoom', (userAndRoomIndex) => {
    // userAndRoomIndex = {
    //   user: {id: uuidId, name: "Random", socketId: socketId},
    //   roomIndex: number
    // }

    const room = ROOMS[roomIndex];
    const user = room.users.find(
      (user) => user.socketId == userAndRoomIndex.user.socketId
    );
    const indexOfUser = room.users.indexOf(user);

    room.splice(indexOfUser, 1);

    room.usersWhoLeft.push(user);

    room.users.forEach((user) => io.to(user.id).emit('userLeft', room));
  });

  socket.on('deleteRoom', (roomIndex) => {
    const room = ROOMS[roomIndex];
    const usersInRoom = room.users.map((user) => user);

    ROOMS.splice(roomIndex, 1);

    usersInRoom.forEach((user) => io.to(user.socketId).emit('roomDeleted'));
  });

  socket.on('vote', (voteValue) => {
    const room = ROOMS.find((room) =>
      room.users.find((user) => user.socketId === socket.id)
    );
    const user = room.users.find((user) => user.socketId === socket.id);
    const userAndScore = {
      user: user,
      score: voteValue,
    };
    room.currentTopic.votes.push(userAndScore);

    if (room.users.length === room.currentTopic.votes.length) {
      const scoresAdded = room.currentTopic.votes.reduce(
        (sum, vote) => sum + vote.score,
        0
      );
      const averageValue = scoresAdded / room.currentTopic.votes.length;
      const fibonacciValue = roundToNearestFibonacci(averageValue);

      const lastUserScoreAndFibonacci = {
        userScore: userAndScore,
        averageValue: fibonacciValue,
      };

      room.currentTopic.score = fibonacciValue;
      console.log('all voted');
      return room.users.forEach((user) =>
        io.to(user.socketId).emit('allVoted', room)
      );
    }
    console.log(userAndScore);
    room.users.forEach((user) => io.to(user.socketId).emit('vote', room));
  });

  socket.on('changeTopicOrder', (topicIndexAndDirection) => {
    const room = ROOMS.find((room) => room.admin.socketId == socket.id);
    const direction = topicIndexAndDirection.direction;
    const topicIndex = topicIndexAndDirection.topicIndex;
    const topicToChange = room.upcomingTopics[topicIndex];

    if (direction == 'ner') {
      // handle swap down
      room.upcomingTopics[topicIndex] = room.upcomingTopics[topicIndex + 1];
      room.upcomingTopics[topicIndex + 1] = topicToChange;
    } else {
      // handle swap up
      room.upcomingTopics[topicIndex] = room.upcomingTopics[topicIndex - 1];
      room.upcomingTopics[topicIndex - 1] = topicToChange;
    }

    room.users.forEach((user) =>
      io.to(user.socketId).emit('changeTopicOrder', room)
    );
    io.to(room.admin.socketId).emit('changeTopicOrderAdmin', room);
  });

  socket.on('startGame', (socketId) => {
    const room = ROOMS.find((room) => room.admin.socketId == socketId);

    console.log(room);

    if (room.upcomingTopics.length < 1) {
      return io.to(socket.id).emit('noTopics');
    }

    room.currentTopic = { title: room.upcomingTopics[0], votes: [] };

    room.upcomingTopics.splice(0, 1);

    room.users.forEach((user) => io.to(user.socketId).emit('startGame', room));
    io.to(socket.id).emit('startGameAdmin', room);
  });

  socket.on('nextTopic', (socketId) => {
    const room = ROOMS.find((room) => room.admin.socketId == socketId);

    if (room.currentTopic.votes.length < room.users.length) {
      return io.to(socket.id).emit('missingVotes');
    }

    room.previousTopics.push(room.currentTopic);

    room.currentTopic = { title: room.upcomingTopics[0], votes: [] };

    room.upcomingTopics.splice(0, 1);

    room.users.forEach((user) => io.to(user.socketId).emit('nextTopic', room));
    io.to(socket.id).emit('nextTopicAdmin');
  });

  socket.on('endSession', (socketId) => {
    const room = ROOMS.find((room) => room.admin.socketId == socketId);
    const roomIndex = ROOMS.indexOf(room);
    const users = room.users;
    const admin = room.admin;

    // spara rummet i databasen här

    ROOMS.splice(roomIndex, 1);

    users.forEach((user) => io.to(user.socketId).emit('endSession'));
    io.to(admin.socketId).emit('endSession');
  });
});

function roundToNearestFibonacci(number) {
  let nearestFib = FIBONACCI[0];
  let minDifference = Math.abs(number - nearestFib);

  for (let i = 1; i < FIBONACCI.length; i++) {
    const difference = Math.abs(number - FIBONACCI[i]);
    if (difference < minDifference) {
      minDifference = difference;
      nearestFib = FIBONACCI[i];
    }
  }

  return nearestFib;
}

module.exports = { app: app, server: server };
