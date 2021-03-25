const router = require('express').Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

let transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

router.post('/create', function (req, res) {
    console.log('sending email..', req.body);
    const message = {
        from: process.env.MAIL_USER, // Sender address
        to: req.body.email,         // recipients
        subject: req.body.subject, // Subject line
        html: req.body.emailTemplate
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('mail has sent.');
            res.status(200).json({ 'msg': 'Thankyou for starting journey with us' })
            console.log(info);
        }
    });
});

router.get("/read", (req, res) => {
    console.log('Email working');
    res.status(200).json({ 'success': 'Email Backend Working...' });
});

module.exports = router;
