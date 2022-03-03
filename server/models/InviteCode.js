const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String
        },
        generatedBy: {
            type: String,
        },
        usedBy: {
            type: String
        }
    },
    { strict: false }
);

module.exports = User = mongoose.model("invite_code", UserSchema)