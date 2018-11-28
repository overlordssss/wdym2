// this is the file for all things authentication

<<<<<<< HEAD
const express = require('express');
=======
const express = require("express");
>>>>>>> master
const bcrypt = require('bcrypt')

// express router instead of contoller files to keep things shorter and cleaner.
const router = express.Router();

// register a new user
router.post('/register');
// logs in a user
router.get('/login');
// logs out a user
router.post('/logout');

module.exports = router