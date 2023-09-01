const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require('../models/user');

// Create a user using a post request - sign-up page
exports.user_sign_up = (req,res) => {
    User.find({email: req.body.email})
        .then((users) => {
            // Check if the email address has been used already
            if (users.length >= 1) {
                return res.status(409).json({
                    message: "Email address already exists"
                })
            } else {
                // Hash the password that was sent in the request body
                bcrypt.hash(req.body.password, 10, (err, hash) =>{
                    if (err) {
                        return res.status(200).json({
                            error: err
                        });
                    } else {
                        // Create a new user using the information from the payload / request body
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                            createdAt: Date.now()
                        });

                        // Save the new user to the db
                        user.save()
                            .then((result) => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })
            }
        })
}

// Delete a user
exports.user_delete = (req,res) => {
    User.deleteOne({_id: req.params.userId})
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
}

// Get all users
exports.user_get_all = (req,res) => {
    User.find()
        .then((users) => {
            res.status(200).json({
                count: users.length,
                users: users.map((user) => {
                    return {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        createdAt: user.createdAt,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/users/" + user._id
                        }
                    }
                })
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
}


// Login post request

exports.user_login = (req,res) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }

                    if (result) {

                        // Create a token
                        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

                        // Set the token as a cookie
                        res.cookie('jwt', token, {
                            httpOnly: true,
                            maxAge: 24 * 60 * 60 * 1000
                        })

                        return res.status(200).json({
                            message: "Auth successful"
                        })
                    }

                    res.status(401).json({
                        message: "Auth failed"
                    })
                })
            } else {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        })
}

// Get request for cookie validation

exports.user_check_auth = async (req,res) => {
    try {
        const cookie = req.cookies['jwt'];

        const claims = jwt.verify(cookie, process.env.JWT_SECRET);

    // claims - Object with the ID of the user.
    
    console.log(claims);

    if (!claims) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }

    // Find and return relevant user credentials
    const user = await User.findById(claims.id);

    const response = {
        username: user.username,
        email: user.email
    }

    res.status(200).json(response);

    } catch (err) {
        res.status(401).json({
            message: 'Auth failed'
        })
    }
}

// Logout post request

exports.user_logout = (req,res) => {
    // Removing the cookie
    res.cookie('jwt', '', {maxAge: 0})
    res.status(200).json({
        message: 'Logged out'
    })
}
    