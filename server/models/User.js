const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String,
        },
        invite_code: {
            type: String
        }
    },
    { strict: false }
);

module.exports = User = mongoose.model("users", UserSchema)