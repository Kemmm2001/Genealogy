var Nodemailer = require('nodemailer');

var transporter = Nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: "system@giaphanguoiviet.com",
        pass: "xsmtpsib-a6e9d1077f661daffd5f3263ecc0d712bcdd9241dade86f52370df668e913587-YH5OcRzFWyQd6P3D"
    }
});

const sendEmail = (objData) => {
    transporter.sendMail(objData, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            return true;
        }
    });
}

module.exports = { sendEmail };