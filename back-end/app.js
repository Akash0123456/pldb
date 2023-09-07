const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// Require the .env file
require('dotenv').config();

const app = express()

const dbUri = 'mongodb+srv://akashgampala229:' + process.env.DB_PASSWORD + '@cluster0.skh2hkp.mongodb.net/?retryWrites=true&w=majority'

// Connecting to db
mongoose.connect(dbUri);

app.use(bodyParser.json());

// Middleware that parses incoming requests with urlencoded payloads
app.use(cookieParser());

// Middleware that allows for enabling Cross Origin Resource Sharing (CORS)
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}));

// Importing routes
const userRoutes = require('./api/routes/users');
const gameRoutes = require('./api/routes/games');

// Route handling

app.use('/users', userRoutes);
app.use('/games', gameRoutes);

// Error handling

app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});


app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;