//  auth router
const express = require('express');
const request = require('request');
const router = express.Router();
const passport = require('passport');
// const passportService = require('../services/passport')

const requireLogin = passport.authenticate('local', { session: false })


const AuthenticationController = require('../controllers/authentication_controller');


// use the logic from the auth controller to control what is happening on the route

// router.get('/index', AuthenticationController.index);
// router.get('/auth', AuthenticationController.auth);
// router.get('/login', AuthenticationController.login);
// router.get('/logout', AuthenticationController.logout);
// router.get('/callback', AuthenticationController.callback);
// router.get('/refresh_token', AuthenticationController.refreshToken);


router.post('/', AuthenticationController.signup)   // create user, get token
router.post('/signin', requireLogin, AuthenticationController.signin) // grab token, send to login



module.exports = router;