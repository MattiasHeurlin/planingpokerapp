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

const rooms = [
  {
    admin: 'Joe',
    users: [
      'Doe',
      'Due'
    ],
    usersWhoLeft: ['Donny'],
    topics: [
      {
        title: 'Skapa frontend',
        score: 5
      },
      {
        title: 'Skapa backend',
        score: 5
      },
    ]
  }
]


app.get('/rooms', (req, res) => {

  res.json(rooms)

})




io.on('connection', (socket) => {

  socket.on("disconnect", () => {
    console.log(socket.id + " has disconnected from the server.")
  })

  socket.on("test", () => {
    console.log("funkar jag?")
    io.emit("test", "hej");
  })
})

module.exports = { app: app, server: server };
