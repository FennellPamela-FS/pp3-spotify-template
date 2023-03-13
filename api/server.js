// server
const http = require('http');
require('dotenv').config();
const express = require('express');
// const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());    // allow cross-origin requests for this server

// serve up environment variables 
const port = process.env.PORT || 8000;

// ROUTES
const musicRouter = require('./routes/music');
// const authRouter = require('./routes/auth');

// db
// const DATABASE_URL = process.env.DATABASE_URL;

// db connection
mongoose.connect(DATABASE_URL, { useNewParser: true });
mongoose.set('strictQuery', false);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Databse connection established'));

app.use(express.json()); // expect json on all routes after this
app.use('/api/v1/music', musicRouter);
// app.use('/api/v1/auth', authRouter);

// static nextjs build in nextjs dir
app.use(express.static(path.join(__dirname, '../nextjs/build')));

app.get('/', (req, res) => { res.send(`Music App Express Build ${port}!`) })

// if route undefined by API then direct request to client-side route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../nextjs/build/', 'index.html'));
});


// spin up server
const server = http.createServer(app);  // create http server object

// listen to port and execute app function on each request
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
