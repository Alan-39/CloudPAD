const User = require('../models/User');
const minioClient = require('../config/minioSetUp');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid').v4;
require("dotenv").config();

const bucketName = uuidv4();

module.exports = User.findOne({ username: process.env.INIT_ADMIN_USERNAME })
    .then(user => {
        if (user) console.log("User already exists")
        else {
            console.log("No user found, creating...")
            let newUser = User({ 
                username: process.env.INIT_ADMIN_USERNAME, 
                password: process.env.INIT_ADMIN_PASSWORD,
                bucketName: bucketName,
                role: "admin",
                isInitialCred: true,
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save()
                    .then(() => {
                        minioClient.makeBucket(bucketName, err => {
                            if (err) return console.log('Error creating bucket.', err)
                            console.log('Bucket created successfully')
                        })
                        console.log("New user created.");
                    })
                    .catch(err => {
                        console.log("Error");
                        console.log(err);
                    })
                })
            });
        }
    })
    .catch(err => {
        console.log("Error!", err);
    })