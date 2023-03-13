// // server
const express = require('express');
const app = express();
const cors = require('cors');
// const mongoose = require('mongoose');

// // const musicRouter = require('./routes/music'); 
// // const authRouter = require('./routes/auth');

app.use(cors());
app.use(express.json()); // for parsing application/json
// // app.use('/api/v1/music', musicRouter); 
// // app.use('/api/auth', authRouter);

// app.get('/', (req, res) => { res.send(`Music App Express Build ${PORT}!`) })

// // app.use(router); 


module.exports = app;