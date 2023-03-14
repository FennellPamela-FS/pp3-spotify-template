const express = require('express'); // express server
const router = express.Router();    // express class to handle routes

// RESTful API endpoints
// use routes to access http verbs( GET, POST, PUT, DELETE)
// route handler has two parts - url/path and callback function
// router.get('/', (req, res) => {

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


module.exports = router;