const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const InviteCode = require('../models/InviteCode');
const uuidv4 = require('uuid').v4;
const minioClient = require('../config/minioSetUp');

function passwordValidation(password, repassword) {
    if (password != repassword) {
        return {
            success: false, message: "Passwords did not much."
        };
    }
    if (password.length < 8) {
        return {
            success: false, message: "Password requires 8 or more characters"
        };
    }
    if (!/\d/.test(password)) {
        return {
            success: false, message: "Password requires at least 1 number"
        };
    }
    if (/[^a-zA-Z0-9]/.test(password)) {
        return {
            success: false, message: "Password cannot contain special characters"
        };
    }
}

router.post('/register', (req, res) => {
    let validateResult = passwordValidation(req.body.password, req.body.repassword)
    if (validateResult) {
        return res.send(validateResult);
    }
    if (req.body.inviteCode === '') {
        return res.send({ success: false, message: "Invite code cannot be empty." });
    }

    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) return res.send({ success: false, message: "User is already registered." })

            InviteCode.findOneAndUpdate({
                $and: [
                    { _id: req.body.inviteCode },
                    { usedBy: '' },
                ]
            }, { usedBy: req.body.username })
                .then(data => {
                    if (data == null) {
                        console.log(data)
                        return res.send({ success: false, message: "Invite code does not exist or has been used." })
                    }

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
                                    { res.send({ success: true, message: "New user created." }) }
                                })
                                .catch(err => {
                                    console.log("Error");
                                    console.log(err);
                                })
                        })
                    });
                })
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
    User.findOne({ username: req.user.username })
        .then(user => {
            bcrypt.compare(req.body.oldPassword, user.password, (err, isMatch) => {
                console.log("old pass", user.password)
                if (err) throw err;
                if (isMatch) {
                    let validateResult = passwordValidation(req.body.password, req.body.repassword)
                    if (validateResult) {
                        return res.send(validateResult);
                    }
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            console.log(req.user._id)
                            console.log("new pass", hash)
                            User.findOneAndUpdate({ _id: req.user._id }, { password: hash, isInitialCred: false })
                                .then(data => {
                                    console.log(data);
                                    res.send({ success: true, message: "Password successfully updated" })
                                })
                                .catch(err => console.log(err));
                        })
                    });
                    return;
                } else {
                    return res.send({ success: false, message: "Incorrect password." });
                }
            });

        }).catch(err => {
            return done(null, false, { message: err });
        });
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