const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/register', (req, res) => {
    if (req.body.password != req.body.repassword) {
        res.send({ status: "error", message: "Passwords did not much." });
    }
    if (req.body.password.length < 8) {
        res.send({ status: "error", message: "Password requires 8 or more characters" });
    }
    if (!/\d/.test(req.body.password)) {
        res.send({ status: "error", message: "Password requires at least 1 number" });
    }
    if (/[^a-zA-Z0-9]/.test(req.body.password)) {
        res.send({ status: "error", message: "Password cannot contain special characters" });
    }
    console.log("sanitization checked")
    User.findOne({ username: req.body.username })
    .then(user => {
        if (user) { res.send({ status: "error", message: "User is already registered." }) }
        else {
            let newUser = User({ username: req.body.username, password: req.body.password });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        { res.send({ status: "success", message: "New user created." }) }
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
	passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send(info);
        }
        req.login(user, err => {
            res.send(info);
        });
    })(req, res, next);
});

router.get("/logout", (req, res) => {
    console.log(`${req.user}\nhas logged out`)
    req.session.destroy(() => {
        res.clearCookie('connect.sid', { path: '/' }).status(200).send();
    })
});

router.get('/checkAuth', (req, res, next) => {
    console.log(`Logged in as\n${req.user}`);
    if (req.isAuthenticated()) { 
        return res.status(200).json(req.session)
    }
    else {
        return res.status(401).send()
    }
});

module.exports = router;