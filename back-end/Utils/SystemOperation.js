var Nodemailer = require('nodemailer');
var Response = require('./Response');
const schedule = require('node-schedule');
const UserManagement = require('../service/Authencation/UserManagement');

var transporter = Nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "systemgenealogy@gmail.com",
        pass: "gyin yjnt cezd xsmt",
    }
});

let SendSMSCore = (objData) => {
    try {
        require('dotenv').config();
        let client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        let requiredFields = ['ToPhoneNumber', 'Message'];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = requiredFields.filter(field => !(field in objData));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return false;
        }
        client.messages.create({
            body: objData.Message,
            from: process.env.PHONE_NUMBER,
            to: objData.ToPhoneNumber
        });
        console.log("Send SMS successfully!");
        return true;
    } catch (error) {
        console.log("error : " + error);
        return false;
    }

}


let SendEmailCore = (objData) => {
    try {
        let requiredFields = ['to', 'subject'];
        // Trường hợp cả 2 trường text và html đều có
        if (objData.text != null && objData.html != null) {
            return Response.badRequestResponse("You can only send either text or html, not both!");
        }
        // Trường hợp thiếu cả 2 trường text và html
        if (objData.text == null && objData.html == null) {
            return Response.badRequestResponse("You must send either text or html!");
        }
        // Kiểm tra xem có đủ các trường trong nhưng trường bắt buộc phải có không
        const missingFields = requiredFields.filter(field => !(field in objData));
        console.log(missingFields);
        // Trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return Response.missingFieldsErrorResponse(missingFields);
        }
        // Tiến hành gửi mail
        var mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            subject: req.body.subject,
            text: req.body.text,
            html: req.body.html,
        };
        // // Kiểm tra xem có phải mảng hay không
        // if (Array.isArray(req.body.to)) {
        //     // Nếu là mảng thì join
        //     mailOptions.to = req.body.to.join(',');
        // } else {
        //     // Nếu là string thì gán luôn
        //     mailOptions.to = req.body.to;
        // }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw error;
            } else {
                console.log('Email sent: ' + info.response);
                return truel
            }
        });
    } catch (error) {
        console.log("error : " + error);
        return false;
    }
};

// schedule sẽ chạy vào mỗi 0h hằng ngày
schedule.scheduleJob('0 0 * * *', () => {
    console.log("Refresh free email : " + process.env.FREE_EMAIL_EVERY_DAY);
    UserManagement.refreshFreeEmail(process.env.FREE_EMAIL_EVERY_DAY);
});

module.exports = { SendSMSCore, SendEmailCore };
