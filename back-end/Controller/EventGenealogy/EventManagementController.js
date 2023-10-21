const EventManagementService = require('../../service/EventGenealogy/EventManagement');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "systemgenealogy@gmail.com",
        pass: "gyin yjnt cezd xsmt",
    }
});

var getAllEventGenealogy = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await EventManagementService.getAllEvent(CodeID);
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}


var InsertEvent = async (req, res) => {
    try {
        let objData = {};
        objData.EventName = req.body.EventName;
        objData.CodeID = req.body.CodeID;
        objData.Status = req.body.Status;
        objData.StartDate = req.body.StartDate;
        objData.EndDate = req.body.EndDate;
        objData.Description = req.body.Description;
        objData.IsImportant = req.body.IsImportant;
        objData.Note = req.body.Note;
        objData.Place = req.body.Place;
        objData.RepeatID = req.body.RepeatID;
        objData.IsSolarCalendar = req.body.IsSolarCalendar;
        objData.eventfamilycol = req.body.eventfamilycol;
        await EventManagementService.InsertNewEvent(objData);
        res.send("Success")
    } catch (error) {
        console.log(error)
    }
}

var UpdateEvent = async (req, res) => {
    try {
        let objData = {};
        objData.EventName = req.body.EventName;
        objData.Status = req.body.Status;
        objData.StartDate = req.body.StartDate;
        objData.EndDate = req.body.EndDate;
        objData.Description = req.body.Description;
        objData.IsImportant = req.body.IsImportant;
        objData.Note = req.body.Note;
        objData.Place = req.body.Place;
        objData.RepeatID = req.body.RepeatID;
        objData.IsSolarCalendar = req.body.IsSolarCalendar;
        objData.eventfamilycol = req.body.eventfamilycol;
        objData.EventID = req.body.EventID;
        await EventManagementService.UpdateEvent(objData);
        res.send("update success")
    } catch (error) {
        console.log(error)
    }
}
var RemoveEvent = async (req, res) => {
    try {
        let EventID = req.query.EventID;
        await EventManagementService.RemoveEvent(EventID);
        res.send("Successuly")
    } catch (error) {
        console.log(error)
    }
}

var GetBirthDayInMonth = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await EventManagementService.GetBirthDayInMonth(CodeID);
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}
var GetDeadDayInMonth = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await EventManagementService.GetDeadDayInMonth(CodeID);
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

var SendSMS = async (req, res) => {
    try {
        require('dotenv').config();
        var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        let objData = {};
        objData.PhoneNumber = req.body.PhoneNumber;
        objData.Message = req.body.Message;
        console.log("Req : " + objData.Message);
        client.messages.create({
            body: objData.Message,
            from: process.env.PHONE_NUMBER,
            to: objData.PhoneNumber
        });
        res.send("Success")
    } catch (error) {
        console.log(error)
    }
}

var SendEmail = async (req, res) => {
    try {
        var mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            subject: req.body.subject,
            text: req.body.message
        };
        // Kiểm tra xem có phải mảng hay không
        if (Array.isArray(req.body.to)) {
            // Nếu là mảng thì join
            mailOptions.to = req.body.to.join(',');
        } else {
            // Nếu là string thì gán luôn
            mailOptions.to = req.body.to;
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                response = {
                    success: false,
                    message: "Email sent failed!",

                };
                res.json(response);
            } else {
                console.log('Email sent: ' + info.response);
                response = {
                    success: true,
                    message: "Email sent successfully!",

                };
                res.json(response);
            }
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    }

};

module.exports = {
    getAllEventGenealogy, InsertEvent, UpdateEvent, RemoveEvent, GetBirthDayInMonth, GetDeadDayInMonth, SendSMS, SendEmail
}