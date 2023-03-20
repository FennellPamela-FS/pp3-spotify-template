// server
const http = require('http');
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 8000;

// db
const DATABASE_URL = process.env.DATABASE_URL;

// db connection
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
mongoose.set('strictQuery', false);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Database connection established'));



// spin up server
const server = http.createServer(app);  // create http server object

// listen to port and execute app function on each request
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
