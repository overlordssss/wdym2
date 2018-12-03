// this is the file for all things authentication

const express = require('express');
const authController = require('../controllers/authController');

// using express router to route these to the auth controller file
const AuthRouter = express.Router();

// logs in a user
AuthRouter.post('/login', authController.login);
// register a new user
AuthRouter.post('/register', authController.register);
// logs out a user
AuthRouter.post('/logout', authController.logout);
AuthRouter.get('/test', (req, res) => {
    console.log('hit the endpoint')
})

module.exports = AuthRouter;
