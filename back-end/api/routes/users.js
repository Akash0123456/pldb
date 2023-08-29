// route for /users

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();

// User - id, username, email, password, createdAt

const User = require('../models/user');

// Require user controller
const userController = require("../controllers/user");


// Create a user using a post request - sign-up page
router.post('/signup', userController.user_sign_up);

// Delete a user
router.delete('/:userId', userController.user_delete);

// Get all users
router.get('/', userController.user_get_all);


module.exports = router