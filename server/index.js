require('dotenv').config();
const auth = require('./routes/auth')
const game = require('./routes/game')
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const helmet = require('helmet');

const app = express();

const { SERVER_PORT, CONNECTION_STRING, SECRET } = process.env;


// connecting to the database here
massive(CONNECTION_STRING).then(db => {
    console.log('db connected');
    app.set('db', db);
})

// middleware here
app.use(bodyParser.json());
app.use(helmet());
app.use(
    session({
        secret: SECRET,
        resave: false,
        saveUninitialized: false
    })
)
app.use('/auth', auth)
app.use('/game', game)

//==========================SOCKETS=========================
//socket set up with listen on Port 4004
const io = require('socket.io')(app.listen(SERVER_PORT, () => console.log(`Docked at port: ${SERVER_PORT}`)));

//connecting to the socket
io.on ('connection', socket => {
    console.log('User Connected')
    
    //joining a room
    socket.on('join room', data => {
        socket.join(data.newRoom);
        io.to(data.newRoom).emit('room joined')
        console.log('room joined')
    })

    //disconnect
    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})