const express = require('express'); // express server
const router = express.Router();    // express class to handle routes

// use routes to access http verbs( GET, POST, PUT, DELETE)
// route handler has two parts - url/path and callback function
// router.get('/', (req, res) => {

// /handle incoming GET requests    
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World! Incoming GET request.',
    })
});

// handle POST requests express.Router() class
router.post('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World! POST request.',
    })
});

// handle POST requests by ID
router.post('/:id', (req, res) => {
    res.status(200).json({
        message: 'Hello World! POST request by ID.',
    })
});


module.exports = router;