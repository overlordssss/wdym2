// this is the file for all things authentication

const express = require(express);
const bycrypt = require('bcrypt')

// express router instead of contoller files to keep things shorter and cleaner.
const router = express.Router();

// register a new user
router.post('/auth/register');
// logs in a user
router.get('/auth/login');
// logs out a user
router.post('auth/logout');
