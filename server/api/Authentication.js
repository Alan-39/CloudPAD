const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/register', (req, res) => {
    User.findOne({ username: req.body.username })
    .then(user => {
        if (user) { res.send({ success: false, message: "User is already registered." }) }
        else {
            let newUser = User({ username: req.body.username, password: req.body.password });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        { res.send({ success: true,  message: "New user created." }) }
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
            return res.status(403).send(info.message);
        }
        req.login(user, err => {
            console.log(info.message)
            res.send(info.message);
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