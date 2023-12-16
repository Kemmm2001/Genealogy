var Response = require('./Response');
const schedule = require('node-schedule');
const UserManagement = require('../service/Authencation/UserManagement');
const db = require('../Models/ConnectDB')
const BrevoMail = require('./BrevoMail');
const xlsx = require('xlsx');
const CoreFunction = require('./CoreFunction');

let SendSMSCore = (objData, accountID) => {
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
        // đếm số lần gửi sms        
        // gửi sms
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



let SendEmailCore = (objData, accountID) => {
    console.log(objData)
    try {
        var mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            subject: objData.subject,
            text: objData.text,
            html: objData.html,
        };
        // đếm số lần gửi email
        let count = 0;
        // Kiểm tra xem có phải mảng hay không
        if (Array.isArray(objData.to)) {
            // Nếu là mảng thì join
            mailOptions.to = objData.to.join(',');
            count = objData.to.length;
        } else {
            // Nếu là string thì gán luôn
            mailOptions.to = objData.to;
            count = 1;
        }
        // nếu có accountid thì check xem có đủ lần gửi mail ko
        if (CoreFunction.isDataNumberExist(accountID)) {
            let accountData = UserManagement.getAccountByAccountID(accountID);
            if(accountData != null && accountData.length > 0){
                let account = accountData[0];
                if(account.FreeEmail < count){
                    return false;
                }else{
                    account.FreeEmail = account.FreeEmail - count;
                    UserManagement.setFreeEmail(account.FreeEmail, accountID);
                }
            }
        }
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
        UserManagement.refreshFreeEmail(process.env.FREE_EMAIL_EVERY_DAY);
        UserManagement.refreshFreeSMS(process.env.FREE_SMS_EVERY_DAY);
    } catch (error) {
        console.log("error : " + error);
    }

});

var ReadXLSX = (file) => {
    try {
        const workbook = xlsx.readFile(file);
        const sheet_name_list = workbook.SheetNames;
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        return data;
    } catch (error) {
        console.log("error : " + error);
        return false;
    }
}

module.exports = { SendSMSCore, SendEmailCore, SetHistorySendEmailandSMS, SetHistorySendEmail, ReadXLSX };
