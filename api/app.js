const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());    // allow cross-origin requests for this server

const port = process.env.PORT || 8000;

const musicRouter = require('./routes/music');
// const authRouter = require('./routes/auth');

app.use(express.json()); // expect json on all routes
app.use('/api/v1/music', musicRouter);
// app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send(`Music App Express Build ${port}!`)
    // res.status(200).json({ message: "Service is up and running!" });
});

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
app.use(express.static(path.join(__dirname, '../nextjs/build/')));

app.get('/', (req, res) => { res.send(`Music App Express Build ${port}!`) })

// if route undefined by API then direct request to client-side route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../nextjs/build/', 'index.html'));
});



module.exports = app;