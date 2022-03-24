const mongoose = require('mongoose');

const InviteCodeSchema = new mongoose.Schema(
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
    {
        strict: false, 
        versionKey: false
    }
);

module.exports = InviteCode = mongoose.model("invite_code", InviteCodeSchema)