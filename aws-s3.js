const AWS = require('aws-sdk');
const fs = require('fs');
require("dotenv").config()

const s3 = new AWS.S3({
    accessKeyId: process.env.KeyID,
    secretAccessKey: process.env.SecretAccessKey
});


exports.uploadFile = async (file) => {
    // Read content from the file
  const fileContent = fs.createReadStream(file.path)


    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.Bucket,
        Key: file.filename, // File name you want to save as in S3
        Body: fileContent
    };
     let result = await s3.upload(params).promise()
     console.log("beans", result)
     return result.key
};

