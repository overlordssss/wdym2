// This file is the endpoints for the game.

const express = require('express');

// express router instead of contoller files to keep things shorter and cleaner.
const router = express.Router();

// allows user to upload custom images
router.post('/api/uploadimg');
// gets user data to display upon logging in
router.get('/api/userdata');
// will pull images cloudinary for database storage
router.get('/api/images');
// allows users to save thier custom memes
router.post('/api/memes')