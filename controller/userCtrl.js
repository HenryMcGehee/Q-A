const express = require('express');
const db = require('../models');
const bcrypt = require('bcryptjs');
const router = express.Router();



router.get('/login', (req, res) => {
    res.render('/user/login');
});

router.get('/profile', (req, res) => {
    db.User.findById(req.session.currentUser._id, (err, foundUser) => {
        if (err) return console.log(err);

        res.render('/user/profile', {
            user: foundUser,
        });
    })

});

router.get('/register', (req, res) => {
    res.render('/user/register');
});

//login
router.post('/login', (req, res) => {
    // Verify req.body Is Not Empty
  // Find One User By Email
  // If No User Found, Respond with 400
  // Compare Password Sent Password and foundUser Password
  // If Passwords Match, Create Session and Respond with 200
  // If Passwords Do Not Match, Respond with 400
  // Find User By Email Address
  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return console.log(err);
    // Respond with 400 If No User Found
    if (!foundUser) {
      return res.send('No User Found');
    }
    // Compare User Password with foundUser Password
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return console.log(err);
      // Create Session and Respond with 200 If Passwords Match
      if (isMatch) {
        // Create currentUser Object (Hide User Password)
        const currentUser = {
          _id: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
          isLoggedIn: true,
        }
        // Create A New Session and Respond 200
        req.session.currentUser = currentUser;
        res.redirect('/profile');
      } else {
        // Respond with 400 If Passwords Do Not Match
        return res.send('Passwords do not match');
      }
    });
  });
})

//register
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


//logout
router.get('/logout', (req, res) => {
    if (!req.session.currentUser) return res.redirect('/login');

    req.session.destroy((err) => {
        if (err) return console.log(err);

        res.redirect('/login');
    });
});


module.exports = router;