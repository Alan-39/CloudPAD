const router = require('express').Router();

router.post('/gencode', (req, res) => {
    // checks if user is authorized to perform action
    // generate invite code
    // save code to mongodb
    // return invite code result
    res.send({ message: "foo"})
});

module.exports = router