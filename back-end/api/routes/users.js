// route for /users

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();

// User - id, username, email, password, createdAt

const User = require('../models/user');

// Create a user using a post request - sign-up page

router.post('/signup', (req,res) => {
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
})

module.exports = router