const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// import routes
// const musicRouter = require('./routes/musicRouter');
// const authRouter = require('./routes/authRouter');
// const authRouter = require('./routes/auth');

const app = express();  // create express app

// Middleware: JSON, CORS, BodyParser 
app.use(cors());    // allow cross-origin requests for this server
app.use(cookieParser());
app.use(express.json()); // expect json on all routes
app.use(bodyParser.urlencoded({ extended: false }));



// ROUTES
// app.use('/api/v1/music', musicRouter);
// app.use('/api/v1/auth', authRouter);


// add middleware to handle errors and bad URL paths
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status,
            method: req.method
        },
    });
});

// static nextjs build in nextjs dir
app.use(express.static(path.join(__dirname, '../nextjs/.next/static/chunks/pages')));


app.get('/', (req, res) => {
    res.send(`Music App Express Build ${port}!`)
    // res.status(200).json({ message: "Service is up and running!" });
});

// if route undefined by API then direct request to client-side route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../nextjs/.next/static/chunks/pages', 'index.html'));
});


module.exports = app;




