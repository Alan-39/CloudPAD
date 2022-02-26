const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String,
        },
        bucket_name: {
            type: String
        }
    },
    { strict: false }
);

module.exports = User = mongoose.model("users", UserSchema)