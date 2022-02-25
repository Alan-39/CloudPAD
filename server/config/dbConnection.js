const mongoose = require('mongoose')
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
    .then(console.log(`Connecting to ${process.env.MONGO_URI}`))
    .catch(err => console.log(err.message));

module.exports = mongoose.connection;