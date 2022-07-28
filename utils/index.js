const path = require('path');
// const bunyan = require('bunyan');
const { Storage } = require('@google-cloud/storage');
// const config = require('../config');
const nodemailer = require('nodemailer')
require('dotenv').config()


// const sendJSONResponse = (res, message, status, statusCode, data) => {
//   res.status(statusCode);
//   res.json({
//     message,
//     status,
//     data,
//   });
// };

// const catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

// const logger = bunyan.createLogger({
//   name: 'Trade Depot',
//   level: config.logger.level,
// });

exports.rootDir = () => {
  return path.dirname(require.main.filename || process.mainModule.filename);
};


// const storage = new Storage({
//   keyFilename: `${rootDir()}/config/firebase.js`,
// });
// // console.log('yeahhh');
// // console.log(`${rootDir()}/config/firebase.js`);

// const bucket = storage.bucket("misc-project-305017-sx203");

exports.uploadImageToStorage = async (file) => {
    if (!file) {
      return null
    }
    let newFileName = `${Date.now()}_${file.originalFilename}`;
    await bucket.upload(file.path, {
      destination: newFileName,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });
    return `https://storage.googleapis.com/${bucket.name}/${newFileName}`;
}


exports.sendMail = (to, body, subject) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.email,
                    pass: process.env.password,
                }
            });
                const mailOptions = {
                    from: 'Trade Depot Assessment',
                    to: to,
                    subject: subject,
                    text: body
                    };
            
                    transporter.sendMail(mailOptions, (err, data) => {
                        if (err) {
                            console.log('Error Occurred: ', err)
                        }
                        console.log( data)
            
                    })
        }

// module.exports = {
//   sendJSONResponse,
//   catchErrors,
//   logger,
//   rootDir,
//   uploadImageToStorage,
//   sendMail,
// };
