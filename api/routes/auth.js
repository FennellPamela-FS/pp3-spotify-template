//  auth router
const express = require('express');
const passport = require('passport');
// const passportService = require('../services/passport')

const requireLogin = passport.authenticate('local', { session: false })

const router = express.Router();

const AuthenticationController = require('../controllers/authentication_controller')

// use the logic from the auth controller to control what is happening on the route
router.post('/', AuthenticationController.signup)   // create user, get token
router.post('/signin', requireLogin, AuthenticationController.signin) // grab token, send to login

module.exports = router;