require('dotenv').config();
const express = require('express');
const session = require('express-session');
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
app.use(express.json());
app.use(helmet());
app.use(
    session({
        secret: SECRET,
        resave: false,
        saveUninitialized: false
    })
)

// server listening here SERVER_PORT=4004;
app.listen(SERVER_PORT, () => console.log(`Docked at port: ${SERVER_PORT}`));