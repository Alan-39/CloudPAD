const Minio = require('minio')
require("dotenv").config();

// Instantiate the minio client with the endpoint
// and access keys as shown below.
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});
/*
minioClient.makeBucket('test-bucket', err => {
    if (err) return console.log('Error creating bucket.', err)
    console.log('Bucket created successfully')
  })
*/
module.exports = minioClient;