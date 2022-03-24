const router = require('express').Router();
const { nanoid } = require('nanoid');
const InviteCode = require('../models/InviteCode');

router.get('/getcode', (req, res) => {
    if (req.user.role === "admin") {
        InviteCode.find({})
            .then(data => {
                res.send(data);
            }).catch(err => {
                console.log(err);
            });
        return;
    }
    res.send({ message: "foo, i'm afraid you cannot do that" })
});

router.post('/gencode', (req, res) => {
    if (req.user.role === "admin") {
        const inviteCode = nanoid(10);
        const inviteDetails = {
            _id: inviteCode,
            generatedBy: req.user.username,
            usedBy: '',
        }
        InviteCode.create(inviteDetails);
        return res.send(inviteDetails);
    }
    res.send({ message: "foo, i'm afraid you cannot do that" })
});

router.post('/delcode', (req, res) => {
    if (req.user.role === "admin") {
        InviteCode.deleteOne({ _id: req.body._id })
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        return;
    }
});

module.exports = router