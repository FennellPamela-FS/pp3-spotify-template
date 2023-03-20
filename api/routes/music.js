const express = require('express'); // express server
const passport = require('passport'); // passport authentication
// const mongoose = require('mongoose'); // mongoose server
const protectedRoute = passport.authenticate('jwt', { session: false });
const router = express.Router();    // express class to handle routes
// const Music = require('../models/music'); // model for music

const Music = require('../models/music'); // model for music

// RESTful API endpoints
// use routes to access http verbs( GET, POST, PUT, DELETE)
// route handler has two parts - url/path and callback function
// router.get('/', (req, res) => {

const getMusic = async (req, res, next) => {
    // set equal to music we find
    let music = await Music.findById({ _id: req.params.id });
    // if ()
}

// GET ALL - handle incoming GET requests    
router.get('/', (req, res) => {
    res.send('Route for All Music')
    res.status(200).json({
        message: 'Incoming GET request.',
    })
});

// handle POST requests express.Router() class
router.post('/', (req, res) => {
    res.status(200).json({
        message: 'POST request.',
    })
});

// handle POST requests by ID
router.post('/:id', (req, res) => {
    res.status(200).json({
        message: 'POST request by ID.',
    })
});

// GET by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        message: 'GET request by ID.',
        id: id,
    })
});

// PUT by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        message: 'PUT request by ID.',
        id: id,
    })
});

// DELETE by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        message: 'DELETE request by ID.',
        id: id,
    })
});

module.exports = router;