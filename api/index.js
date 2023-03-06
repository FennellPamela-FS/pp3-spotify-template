// server
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8000;

// const musicRouter = require('./routes/music'); 
// const authRouter = require('./routes/auth');

app.use(cors());
app.use(express.json()); // for parsing application/json
// app.use('/api/v1/music', musicRouter); 
// app.use('/api/auth', authRouter);

app.get('/', (req, res) => { res.send(`Music App Express Build ${PORT}!`) })

// app.use(router); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})