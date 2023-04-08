// server
const http = require('http');
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const nextAuthHandler = require('next-auth');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8000;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const server = express();
    server.use(cookieParser())
    server.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
    }))
    server.use(flash());
    server.use('/api/auth', nextAuthHandler(nextApp));

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })


})


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
