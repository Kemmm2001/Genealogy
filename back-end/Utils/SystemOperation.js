var Nodemailer = require('nodemailer');
var Response = require('./Response');
const schedule = require('node-schedule');
const UserManagement = require('../service/Authencation/UserManagement');
const { promises } = require('nodemailer/lib/xoauth2');
const db = require('../Models/ConnectDB')

var transporter = Nodemailer.createTransport({
    host: "mail.giaphanguoiviet.com",
    port: 587,
    secure: false,
    auth: {
        user: "system@giaphanguoiviet.com",
        pass: "weJFW732fqijojAWFHOhr4WFWFHO327uHUFWIH"
    }
});

let SendEmailCore = (objData) => {
    try {
        var mailOptions = {
            from: "system@giaphanguoiviet.com",
            to : "nanhtuan1003@gmail.com",
            subject: "subject",
            text: "test text",
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw error;
            } else {
                console.log('Email sent: ' + info.response);
                return true;
            }
        });
    } catch (error) {
        console.log("error : " + error);
        return false;
    }
};

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



function SetHistorySendEmailandSMS(content, action, CodeID) {
    return new Promise((resolve, reject) => {
        let currentDate = new Date();
        currentDate = currentDate.toISOString().slice(0, 19).replace("T", " ");
        console.log(currentDate)
        let IsSMS = 0;
        if (action == 'sms') IsSMS = 1;
        let query = `INSERT INTO notificationhistory (NotificationContent, NotificationDate, IsSMS, CodeID) VALUES ('${content}', '${currentDate}', ${IsSMS}, ${CodeID}) `;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(false);
            } else {
                resolve(true)
            }
        })
    })
}



// let SendEmailCore = (objData) => {
//     try {
//         let requiredFields = ['to', 'subject'];
//         // Trường hợp cả 2 trường text và html đều có
//         if (objData.text != null && objData.html != null) {
//             return Response.badRequestResponse("You can only send either text or html, not both!");
//         }
//         // Trường hợp thiếu cả 2 trường text và html
//         if (objData.text == null && objData.html == null) {
//             return Response.badRequestResponse("You must send either text or html!");
//         }
//         // Kiểm tra xem có đủ các trường trong nhưng trường bắt buộc phải có không
//         const missingFields = requiredFields.filter(field => !(field in objData));
//         console.log(missingFields);
//         // Trong trường hợp thiếu trường bắt buộc
//         if (missingFields.length) {
//             return Response.missingFieldsErrorResponse(missingFields);
//         }
//         // Tiến hành gửi mail
//         var mailOptions = {
//             from: "system@giaphanguoiviet.com",
//             subject: "subject",
//             text: "test text",
//         };

//         // var mailOptions = {
//         //     from: process.env.EMAIL_ADDRESS,
//         //     subject: objData.subject,
//         //     text: objData.text,
//         //     html: objData.html,
//         // };
//         // Kiểm tra xem có phải mảng hay không
//         if (Array.isArray(objData.to)) {
//             // Nếu là mảng thì join
//             mailOptions.to = objData.to.join(',');
//         } else {
//             // Nếu là string thì gán luôn
//             mailOptions.to = objData.to;
//         }
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 throw error;
//             } else {
//                 console.log('Email sent: ' + info.response);
//                 return true;
//             }
//         });
//     } catch (error) {
//         console.log("error : " + error);
//         return false;
//     }
// };

// schedule sẽ chạy vào mỗi 0h hằng ngày
schedule.scheduleJob('0 0 * * *', () => {
    try {
        console.log("Refresh free email : " + process.env.FREE_EMAIL_EVERY_DAY);
        UserManagement.refreshFreeEmail(process.env.FREE_EMAIL_EVERY_DAY);
    } catch (error) {
        console.log("error : " + error);
    }

});

module.exports = { SendSMSCore, SendEmailCore, SetHistorySendEmailandSMS };
