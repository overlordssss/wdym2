require('dotenv').config();
const auth = require('./routes/auth')
const game = require('./routes/game')
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const helmet = require('helmet');

const app = express();

app.use( express.static( `${__dirname}/../build` ) );

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
let currentGames = {}
let responses = {}
io.on('connection', socket => {
    console.log('User Connected')

    //creating a room
    socket.on('create room', data => {
        socket.join(data.newRoom);
        io.to(data.newRoom).emit('room created')
        currentGames[data.newRoom] = [{username: data.username, rounds_won: 0}]
        console.log('room created')
        console.log(currentGames)
    })

    //checking if a room has hit max capacity
    socket.on('check room', data => {
        console.log('data coming in: ', data)
        console.log('game info: ', currentGames[data.room])
        let { roomIndex } = data
        let usernames = currentGames[data.room]
        io.to().emit('room info', { usernames, roomIndex })
    })

    //joining a room and once a room is joined
    socket.on('join room', data => {
        let room = data.room
        socket.join(room);
        currentGames[room].push({username: data.username, rounds_won:0})
        io.to(room).emit('room joined', currentGames[room])
        console.log(currentGames)
    })

    //starting a game for every player
    socket.on('start game', data => {
        io.to(data.room).emit('game started', data)
    })

    //player submit handler
    socket.on('player submit', ({username, inputTop, inputBottom, room}) => {
        console.log('player submitted meme', username, inputTop, inputBottom, room)
        if(!responses[room]){
            responses[room] = []
        }
        responses[room].push({username, inputTop, inputBottom})
        io.to(room).emit('get responses', responses[room])
    })
    
    //judge selected a winning meme
    socket.on('judge select', data => {
        io.to(data.room).emit('round winner', data)
    })

    //disconnect
    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})


app.get('/api/usernames/:room', (req, res) => {
    console.log('params: ', req.params)
    res.send(currentGames[req.params.room])
})

app.put('/api/add_point', (req, res) => {
    let {room, username} = req.body
    let index = 0
    for (let i =0; i< currentGames[room].length; i++) {
        if(currentGames[room][i].username === username) {
            index = i
        }
    }
    currentGames[room][index].rounds_won += 1
    res.send(currentGames[room][index]).status(200)
})