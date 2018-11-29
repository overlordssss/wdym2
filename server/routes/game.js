// This file is the endpoints for the game.

const express = require('express');

// using express router to route these to the game controller file
const GameRouter = express.Router();

// allows user to upload custom images
GameRouter.post('/uploadimg');
// gets user data to display upon logging in
GameRouter.get('/userdata');
// will pull images cloudinary for database storage
GameRouter.get('/images');

module.exports = GameRouter
