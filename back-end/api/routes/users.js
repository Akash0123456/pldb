// route for /users

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();

// User - id, username, email, password, createdAt

const User = require('../models/user');

// Require user controller
const userController = require("../controllers/user");


// Create a user using a post request - register
router.post('/signup', userController.user_sign_up);

// Delete a user
router.delete('/:userId', userController.user_delete);

// Get all users
router.get('/', userController.user_get_all);

// Login post request + generate jwt + cookie
router.post('/login', userController.user_login);

// Get request for cookie validation
router.get('/checkAuth', userController.user_check_auth);

// Logout post request + clear cookie

router.post('/logout', userController.user_logout);

module.exports = router