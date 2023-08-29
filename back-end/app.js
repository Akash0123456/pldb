const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express()

const dbUri = 'mongodb+srv://akashgampala229:pldb123@cluster0.skh2hkp.mongodb.net/?retryWrites=true&w=majority'

// Connecting to db
mongoose.connect(dbUri);

app.use(bodyParser.json());

// Importing routes
const userRoutes = require('./api/routes/users');

// Route handling

app.use('/users', userRoutes)

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
            message:error.message
        }
    });
});

module.exports = app;