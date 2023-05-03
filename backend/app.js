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

// const rooms = [
//   {
//     admin: 'Joe',
//     users: [{
//       name: 'Doe',
//       id:
//     }, {
//       name: 'Doe',
//       id:
//     }],
//     usersWhoLeft: ['Donny'],
//     topics: [
//       {
//         title: 'Skapa frontend',
//         score: 5,
//       },
//       {
//         title: 'Skapa backend',
//         score: 5,
//       },
//     ],
//   },
// ];

const ROOMS = [];

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    const roomWithUser = ROOMS.find((room) =>
      room.users.find((user) => user.id === socket.id)
    );

    if (!roomWithUser) {
      console.log('User without room left');
      return;
    }

    const user = roomWithUser.find((user) => user.id == socket.id);
    const indexOfUser = roomWithUser.users.indexOf(user);

    roomWithUser.splice(indexOfUser, 1);

    roomWithUser.usersWhoLeft.push(user.userName);

    roomWithUser.users.forEach((user) =>
      io.to(user.id).emit('userDisconnect', roomWithUser)
    );
  });

  socket.on('monitorRooms', () => {
    io.emit('monitorRooms', ROOMS);
  });

  socket.on('joinRoom', (userAndRoomIndex) => {
    ROOMS.forEach((room) => {
      room.users.forEach((user) => {
        if (user.userName === userAndRoomIndex.userName) {
          console.log('User that name is already in the room.');
          return;
        }
      });
    });
    const roomIndex = userAndRoomIndex.roomIndex;
    const newUser = {
      name: userAndRoomIndex.userName,
      id: socket.id,
    };
    const room = ROOMS[roomIndex];

    room.users.push(newUser);

    room.users.forEach((user) => io.to(user.id).emit('joinRoom', room));
  });
});

module.exports = { app: app, server: server };
