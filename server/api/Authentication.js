const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const uuidv4 = require('uuid').v4;
const minioClient = require('../config/minioSetUp');

router.post('/register', (req, res) => {
    if (req.body.password != req.body.repassword) {
        res.send({ success: false, message: "Passwords did not much." });
    }
    if (req.body.password.length < 8) {
        res.send({ success: false, message: "Password requires 8 or more characters" });
    }
    if (!/\d/.test(req.body.password)) {
        res.send({ success: false, message: "Password requires at least 1 number" });
    }
    if (/[^a-zA-Z0-9]/.test(req.body.password)) {
        res.send({ success: false, message: "Password cannot contain special characters" });
    }
    console.log("sanitization checked")
    User.findOne({ username: req.body.username })
    .then(user => {
        if (user) return res.send({ success: false, message: "User is already registered." })
        const bucketName = uuidv4();
        let newUser = User({ 
            username: req.body.username, 
            password: req.body.password,
            bucketName: bucketName,     
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser.save()
                .then(user => {
                    minioClient.makeBucket(bucketName, err => {
                        if (err) return console.log('Error creating bucket.', err)
                        console.log('Bucket created successfully')
                    })
                    console.log(user);
                    { res.send({ success: true,  message: "New user created." }) }
                })
                .catch(err => {
                    console.log("Error");
                    console.log(err);
                })
            })
        });
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
            if (user.isInitialCred == true) {
                info.updatePwdRequire = true;
                return res.send(info);
            }
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

router.post("/update", (req, res) => {

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