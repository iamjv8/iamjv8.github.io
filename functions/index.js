const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'iamjv8@gmail.com',
        pass: 'e943Fwsk'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const to = 'iamjv8@gmail.com';
        // getting dest email by query string
        const body = req.body;
        const mailOptions = {
            from: body.from, // Something like: Jane Doe <janedoe@gmail.com>
            to: to,
            subject: 'Feedback message from ' + body.name + `(${body.from})`, // email subject
            html: body.message
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});