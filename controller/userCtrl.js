const express = require('express');
const db = require('../models');
const bcrypt = require('bcryptjs');
const router = express.Router();



router.get('/login', (req, res) => {
    res.render('/user/login');
});

router.get('/register', (req, res) => {
    res.render('/user/register');
});

router.post('/register', (req, res) => {
    // Verify req.body Is Not Empty
  // Query DB For Existing User By Email
  // If foundUser, Respond with 400
  // If No foundUser, Generate Salt and Hash User Password
  // Replace newUser Plain Text Password with Hased Password
  // Create newUser and Respond with 200
  // Check For Existing User Account
  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return console.log(err);


    // Return Error If Account Already Exists
    if (foundUser) return console.log(foundUser);


    // Generate Hash Salt (This just makes the password hard to crack)
    bcrypt.genSalt(10, (err, salt)=> {
      if (err) return console.log(err);


      // Turn the Plain Text Password Into A Complicated Hash
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return console.log(err);


        // Destructure New User Data From Request
        const { username, email, password } = req.body;


        // Construct New User Object with Hashed Password
        const newUser = {
          username,
          email,
          password: hash, // never save plain text password
        };

        // Create New User
        db.User.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);


          res.redirect('/login');
        });
      });
    });
  });
})






module.exports = router;