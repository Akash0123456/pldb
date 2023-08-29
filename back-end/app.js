const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express()

const dbUri = 'mongodb+srv://akashgampala229:pldb123@cluster0.skh2hkp.mongodb.net/?retryWrites=true&w=majority'

// Connecting to db
mongoose.connect(dbUri);

app.use(bodyParser.json())



