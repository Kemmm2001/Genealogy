const EventManagementService = require('../../service/EventGenealogy/EventManagement');
const SystemAction = require('../../Utils/SystemOperation');
const Response = require('../../Utils/Response');

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
        let objData = {};
        objData.ToPhoneNumber = req.body.ToPhoneNumber;
        objData.Message = req.body.Message;
        console.log(objData);
        let result = SystemAction.SendSMSCore(objData);
        if (result == true) {
            res.send(Response.successResponse("Send SMS successfully!"));
        } else {
            res.send(Response.errorResponse("Send SMS failed!"));
        }
    } catch (error) {
        console.log(error);
        res.send(Response.internalServerErrorResponse(error));
    }
}


var SendSMSToMember = async (req, res) => {
    try {
        let id = req.body.ListMemberID;
        let contentMessage = req.body.contentMessage;
        let action = req.body.action;
        let CodeID = req.body.CodeID;

        let data = await EventManagementService.getListPhone(id);
        for (let i = 0; i < data.length; i++) {
            ExecuteSendSNS(data[i], contentMessage);
        }
        await SetHistorySendEmailandSMS(contentMessage, action, CodeID, res);
    } catch (error) {
        console.log(error);
        res.send(Response.internalServerErrorResponse(error));
    }
}



async function SetHistorySendEmailandSMS(Content, action, CodeID, res) {
    try {
        let data = await SystemAction.SetHistorySendEmailandSMS(Content, action, CodeID);
        if (data == true) {
            res.send(Response.successResponse(null, "gửi thông báo thành công!"));
        } else {
            res.send(Response.internalServerErrorResponse());
        }
    } catch (error) {
        console.log(error);
        res.send(Response.internalServerErrorResponse(error));
    }
}

function ExecuteSendSNS(ToPhoneNumber, Message) {
    try {
        let objData = {};
        objData.ToPhoneNumber = ToPhoneNumber;
        objData.Message = Message;
        let result = SystemAction.SendSMSCore(objData);
        if (result == true) {
            console.log("Send SMS successfully!");
        } else {
            console.log("Send SMS failed!");
        }
    } catch (error) {
        console.log(error);

    }
}


var searchEvent = async (req, res) => {
    try {
        const { searchTerm } = req.body;
        // Thực hiện tìm kiếm event trong database dựa trên searchTerm
        const searchResult = await EventManagementService.searchEvent(searchTerm);
        res.json(searchResult);
    } catch (e) {
        res.send(e);
    }
}
var filterEvent = async function (req, res) {
    try {
        const filterOptions = req.body; // Lấy filterOptions từ request body
        const filteredEvents = await EventManagementService.filterEvent(filterOptions);

        res.json({
            success: true,
            data: filteredEvents,
        });
    } catch (error) {
        console.error('Lỗi khi lọc thành viên:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi lọc thành viên' });
    }
}

var SendEmail = async (req, res) => {
    try {
        let objData = {};
        objData.to = req.body.to;
        objData.subject = req.body.subject;
        objData.text = req.body.text;
        objData.html = req.body.html;
        let requiredFields = ['to', 'subject'];
        // Trường hợp cả 2 trường text và html đều có
        if (objData.text != null && objData.html != null) {
            return res.send(Response.badRequestResponse(null, "Bạn chỉ được gửi text hoặc html!"));
        }
        // Trường hợp thiếu cả 2 trường text và html
        if (objData.text == null && objData.html == null) {
            return res.send(Response.badRequestResponse(null, "Bạn phải gửi text hoặc html!"));
        }
        // Kiểm tra xem có đủ các trường trong nhưng trường bắt buộc phải có không
        const missingFields = requiredFields.filter(field => !(field in objData));
        console.log(missingFields);
        // Trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        let result = SystemAction.SendEmailCore(objData);
        console.log(result);
        if (result == true) {
            return res.send(Response.successResponse(null, "Gửi email thành công!"));
        } else {
            return res.send(Response.internalServerErrorResponse());
        }
    } catch (error) {
        console.log(error);
        return res.send(Response.internalServerErrorResponse(error));
    }
};

module.exports = {
    getAllEventGenealogy, InsertEvent, UpdateEvent, RemoveEvent, GetBirthDayInMonth, GetDeadDayInMonth,
    SendSMS, SendEmail, searchEvent, filterEvent, SendSMSToMember,

}