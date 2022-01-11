const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/register', (req, res) => {
    User.findOne({ username: req.body.username })
    .then(user => {
        if (user) { res.send({ message: "User is already registered." }) }
        else {
            let newUser = User({ username: req.body.username, password: req.body.password });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        { res.send({ message: "New user created." }) }
                        console.log(user);
                    })
                    .catch(err => {
                        console.log("Error");
                        console.log(err);
                    })
                })
            });
        }
    });
});

router.post('/login', (req, res, next) => {
	passport.authenticate("local", {
            successRedirect: "/success",
            failureRedirect: "/failure",
            failureFlash: false,
	})(req, res, next);
});

module.exports = router;