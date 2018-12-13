// This file is the endpoints for the game.
const gameController = require('../controllers/gameController')
const express = require('express');

// using express router to route these to the game controller file
const GameRouter = express.Router();

// allows user to upload custom images
GameRouter.post('/uploadimg');
// gets user data to display upon logging in
GameRouter.get('/userdata');
// will pull images s3 for database storage
GameRouter.get('/memes/:limit', gameController.blankMemes);
//will get all existing rooms from db
GameRouter.get('/rooms', gameController.rooms);
//will post a new room to db
GameRouter.post('/newRoom', gameController.newRoom)
//will retrieve a specified room's information
GameRouter.get('/roomInfo/:room_number', gameController.roomInfo)
//will update max players in a room
GameRouter.put('/updateMax', gameController.updateMax)

module.exports = GameRouter
