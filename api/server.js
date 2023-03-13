// server
const http = require('http');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');

const server = http.createServer(app);  // create http server object


const musicRouter = require('./routes/music');
// const authRouter = require('./routes/auth');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use('/api/v1/music', musicRouter);
// app.use('/api/auth', authRouter);

app.get('/', (req, res) => { res.send(`Music App Express Build ${port}!`) })

// app.use(router); 

// app.listen(port, () => {
//     console.log(`Server running on pdort ${port}`);
// })

// listen to port and execute app function on each request
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
