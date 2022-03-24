const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// store user id into session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// retrieve user object by user id saved in session
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    });
});

passport.use(
    new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
        User.findOne({ username: username })
        .then(user => {
            if (!user) {
                return done(null, false, { success: false, message: "User does not exists" });
            } else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user, { success: true, message: "User logged in"});
                    } else {
                        return done(null, false, { success: false, message: "Incorrect username or password." });
                    }
                });
            }
        }).catch(err => {
            return done(null, false, { message: err });
        });
    })
);
module.exports = passport;
