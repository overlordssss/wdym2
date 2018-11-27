// this file is for all things sockets

const express = require('express');
const socket = require('socket.io');

const router = express.Router();

// helps with creating socket rooms
router.post('/socket')
