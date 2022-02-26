const router = require('express').Router();
const multer = require('multer');
const minioClient = require('../config/minioSetUp');

router.post('/upload', multer({ storage: multer.memoryStorage() }).single("file"), (req, res) => {
    minioClient.putObject(req.user.bucketName, req.file.originalname, req.file.buffer, { "Content-Type": req.file.mimetype })
    .then(data => {
        console.log("upload success", data);
        res.send({ success: true, message: "Object uploaded!"});

    })
    .catch(err => { 
        console.log("Error uploading", err)
        res.send({ success: false, message: "Upload failed!"});
    });
    
});

module.exports = router