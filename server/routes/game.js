// This file is the endpoints for the game.
const gameController = require('../controllers/gameController')
const express = require('express');

// using express router to route these to the game controller file
const GameRouter = express.Router();

// allows user to upload custom images
GameRouter.post('/uploadimg');
// gets user data to display upon logging in
GameRouter.get('/userdata');
// will pull images cloudinary for database storage
GameRouter.get('/images');
//will get all existing rooms from db
GameRouter.get('/rooms', gameController.rooms);
//will post a new room to db
GameRouter.post('/newRoom', gameController.newRoom)

module.exports = GameRouter
