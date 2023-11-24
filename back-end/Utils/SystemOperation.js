var Response = require('./Response');
const schedule = require('node-schedule');
const UserManagement = require('../service/Authencation/UserManagement');
const db = require('../Models/ConnectDB')
const EmailUtils = require('./EmailUtils');
const Mail = require('nodemailer/lib/mailer');
const BrevoMail = require('./BrevoMail');
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



function SetHistorySendEmailandSMS(content, CodeID) {
    return new Promise((resolve, reject) => {
        let currentDate = new Date();
        currentDate = currentDate.toISOString().slice(0, 19).replace("T", " ");
        let query = `INSERT INTO notificationhistory (NotificationContent, NotificationDate, CodeID) VALUES ('${content}', '${currentDate}', ${CodeID}) `;
        db.connection.query(query, (err) => {
            if (err) {
                console.log(err);
                reject(false);
            } else {
                resolve(true)
            }
        })
    })
}
function SetHistorySendEmail(EmailSubject, EmailContent, CodeID) {
    return new Promise((resolve, reject) => {
        let currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        let query = `INSERT INTO notificationemail (EmailSubject, EmailContent, EmailDate, CodeID) VALUES (?, ?, ?, ?)`;
        db.connection.query(query, [EmailSubject, EmailContent, currentDate, CodeID], (err) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
}



let SendEmailCore = (objData) => {
    console.log(objData)
    try {
        var mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            subject: objData.subject,
            text: objData.text,
            html: objData.html,
        };
        // Kiểm tra xem có phải mảng hay không
        if (Array.isArray(objData.to)) {
            // Nếu là mảng thì join
            mailOptions.to = objData.to.join(',');
        } else {
            // Nếu là string thì gán luôn
            mailOptions.to = objData.to;
        }
        // EmailUtils.sendEmail(mailOptions);
        // BrevoMail.sendEmail(mailOptions);
        BrevoMail.sendEmailBrevo(mailOptions);
        // BrevoMail.sendEmailBySendGrid(mailOptions);
        return true;
    } catch (error) {
        console.log("error : " + error);
        return false;
    }
};

// schedule sẽ chạy vào mỗi 0h hằng ngày
schedule.scheduleJob('0 0 * * *', () => {
    try {
        console.log("Refresh free email : " + process.env.FREE_EMAIL_EVERY_DAY);
        UserManagement.refreshFreeEmail(process.env.FREE_EMAIL_EVERY_DAY);
    } catch (error) {
        console.log("error : " + error);
    }

});

module.exports = { SendSMSCore, SendEmailCore, SetHistorySendEmailandSMS, SetHistorySendEmail };
