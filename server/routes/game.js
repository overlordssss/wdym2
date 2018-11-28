// This file is the endpoints for the game.

const express = require('express');

// express router instead of contoller files to keep things shorter and cleaner.
const router = express.Router();

// allows user to upload custom images
router.post('/uploadimg');
// gets user data to display upon logging in
router.get('/userdata');
// will pull images cloudinary for database storage
router.get('/images');
// allows users to save thier custom memes
router.post('/memes')

<<<<<<< HEAD:server/routes/game.js
module.exports = router;
=======
module.exports = router
>>>>>>> master:server/game.js
