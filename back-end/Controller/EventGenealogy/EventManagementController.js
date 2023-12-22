const EventManagementService = require('../../service/EventGenealogy/EventManagement');
const FamilyMember = require('../../service/FamilyGenealogy/FamilyManagement');
const EventAttendence = require('../../service/EventGenealogy/EventAttendence');
const SystemAction = require('../../Utils/SystemOperation');
const UserManagement = require('../../service/Authencation/UserManagement');
const Response = require('../../Utils/Response');
const CoreFunction = require('../../Utils/CoreFunction');
require('dotenv').config();
const backEndURL = process.env.BACKEND_URL
const frontEndURL = process.env.FRONTEND_URL

const { signInviteToken, verifyInviteToken } = require('../../helper/jwt_helper');
const { assign } = require('nodemailer/lib/shared');

var getAllEventGenealogy = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await EventManagementService.getAllEvent(CodeID);
        if (data) {
            return res.send(Response.successResponse(data));
        } else {
            return res.send(Response.internalServerErrorResponse)
        }

    } catch (error) {
        console.log(error)
    }
}

var getNumberRemainingSMSSendss = async (req, res) => {
    try {
        let AccountID = req.payload.insertId;
        if (AccountID) {
            let result = await EventManagementService.NumberOfRemainingSMSSSends(AccountID)
            if (result) {
                return res.send(Response.successResponse(result))
            } else {
                return res.send(Response.dataNotFoundResponse())
            }
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse())
    }
}

var searchMemberHasEmail = async (req, res) => {
    try {
        let keySearch = req.query.keySearch;
        let CodeID = req.payload.codeId;
        if (CodeID) {
            let result = await EventManagementService.searchMemberHasEmail(CodeID, keySearch);
            if (result) {
                return res.send(Response.successResponse(result))
            } else {
                return res.send(Response.dataNotFoundResponse())
            }
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse())
    }
}
var searchMemberHasPhone = async (req, res) => {
    try {
        let keySearch = req.query.keySearch;
        let CodeID = req.payload.codeId;
        if (CodeID) {
            let result = await EventManagementService.searchMemberHasPhone(CodeID, keySearch);
            if (result) {
                return res.send(Response.successResponse(result))
            } else {
                return res.send(Response.dataNotFoundResponse())
            }
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse())
    }
}

var getInforEventattendance = async (req, res) => {
    try {
        let EventID = req.query.EventID
        let result = await EventManagementService.getInforEventattendance(EventID);
        if (result) {
            return res.send(Response.successResponse(result));
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse())
    }
}

var updateTimeEventattendance = async (req, res) => {
    try {
        console.log('req: ' + req.body)
        let EventID = req.body.EventID;
        let datetime = req.body.NewDateTime;
        let result = await EventManagementService.updateTimeEventattendance(EventID, datetime)
        if (result) {
            return res.send(Response.successResponse())
        } else {
            return res.send(Response.internalServerErrorResponse())
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse())
    }
}


var getListMemberHasEmail = async (req, res) => {
    try {
        let CodeID = req.payload.codeId;
        if (CodeID) {
            let result = await EventManagementService.getListMemberHasEmail(CodeID);
            if (result) {
                return res.send(Response.successResponse(result))
            } else {
                return res.send(Response.dataNotFoundResponse())
            }
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse())
    }
}

var getListMemberHasPhone = async (req, res) => {
    try {
        let CodeID = req.payload.codeId;
        if (CodeID) {
            let result = await EventManagementService.getListMemberHasPhone(CodeID);
            if (result) {
                return res.send(Response.successResponse(result))
            } else {
                return res.send(Response.dataNotFoundResponse())
            }
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse())
    }
}

var getNumberRemainingEmailSends = async (req, res) => {
    try {
        let AccountID = req.payload.insertId;
        if (AccountID) {
            let result = await EventManagementService.NumberOfRemainingEmailSends(AccountID)
            if (result) {
                return res.send(Response.successResponse(result))
            } else {
                return res.send(Response.dataNotFoundResponse())
            }
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse())
    }
}

var getListEventNotificationSent = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await EventManagementService.getListEventNotificationSent(CodeID);
        if (data) {
            return res.send(Response.successResponse(data))
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (error) {
        return res.send(Response.dataNotFoundResponse(error))
    }
}

var getEventAttendance = async (req, res) => {
    try {
        let EventID = req.query.EventID;
        let data = await EventManagementService.getEventAttendance(EventID);
        if (data) {
            return res.send(Response.successResponse(data))
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (error) {
        return res.send(Response.dataNotFoundResponse(error))
    }
}

var getListMemberIDAndEmail = async (req, res) => {
    try {
        let ListMemberID = req.query.ListMemberID;
        let eventId = req.query.eventId
        console.log('ListMember: ' + ListMemberID)
        for (let i = 0; i < ListMemberID.length; i++) {
            let result = await EventAttendence.insertMemberAttend(eventId, ListMemberID[i])
            if (!result) {
                return res.send(Response.internalServerErrorResponse())
            }
        }
        if (ListMemberID) {
            let data = await EventManagementService.getListEmailAndMemberID(ListMemberID);
            if (data) {
                return res.send(Response.successResponse(data))
            } else {
                return res.send(Response.dataNotFoundResponse())
            }
        }
    } catch (error) {
        return res.send(Response.dataNotFoundResponse(error))
    }
}

var updateStatusEventGenealogy = async (req, res) => {
    try {
        let CodeID = req.body.CodeID;
        let currentDate = new Date().toISOString().split('T')[0];
        let data = await EventManagementService.getAllEvent(CodeID);
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].Status == 1) {
                    const endDate = new Date(data[i].EndDate);
                    if (endDate < new Date(currentDate)) {
                        let result = await EventManagementService.updateStatusEvent(data[i].EventID);
                        if (!result) {
                            res.send(Response.badRequestResponse());
                            return;
                        }
                    }
                }
            }
            res.send(Response.successResponse());
        }
    } catch (error) {
        res.send(Response.badRequestResponse(error));
    }
}

var getInformationEvent = async (req, res) => {
    try {
        let data = await EventManagementService.getInformationEvent(req.query.EventID);
        if (data) {
            return res.send(Response.successResponse(data))
        } else {
            return res.send(Response.internalServerErrorResponse)
        }
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
        console.log(objData)
        let data = await EventManagementService.InsertNewEvent(objData);
        if (data) {
            return res.send(Response.successResponse(data, 'Thêm sự kiện thành công'));
        } else {
            return res.send(Response.internalServerErrorResponse)
        }

    } catch (error) {
        return res.send(Response.internalServerErrorResponse(error))
    }
}
var searchEvent = async (req, res) => {
    try {
        console.log(req.body)
        let keySearch = req.body.keySearch;
        keySearch = keySearch.replace(/\s/g, '');
        console.log('keySearch: ' + keySearch)
        let data = await EventManagementService.searchEvent(req.body.CodeID, keySearch);
        if (data) {
            return res.send(Response.successResponse(data));
        } else {
            return res.send(Response.internalServerErrorResponse())
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse(error))
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
        objData.EventID = req.body.EventID;
        let data = await EventManagementService.UpdateEvent(objData);
        if (data) {
            return res.send(Response.successResponse(null, "Sửa thông tin sự kiện thành công"));
        } else {
            return res.send(Response.internalServerErrorResponse)
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse(error))
    }
}
var RemoveEvent = async (req, res) => {
    try {
        let EventID = req.query.EventID;
        let data = await EventManagementService.RemoveEvent(EventID);
        if (data) {
            return res.send(Response.successResponse(null, 'Xóa sự kiện thành công'))
        }
        else {
            return res.send(Response.internalServerErrorResponse)
        }
    } catch (error) {
        return res.send(error)
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


async function SetHistorySendEmailandSMS(Content, CodeID, res) {
    try {
        let data = await SystemAction.SetHistorySendEmailandSMS(Content, CodeID);
        if (data == true) {
            return res.send(Response.successResponse(null, "gửi thông báo thành công!"));
        } else {
            return res.send(Response.internalServerErrorResponse());
        }
    } catch (error) {
        console.log(error);
        return res.send(Response.internalServerErrorResponse(error));
    }
}

function ExecuteSendSNS(ToPhoneNumber, Message) {
    try {
        let objData = {};
        objData.ToPhoneNumber = ToPhoneNumber;
        objData.Message = Message;
        let result = SystemAction.SendSMSCore(objData);
        if (result == true) {
            return true;
        } else {
            return false
        }
    } catch (error) {
        console.log(error);

    }
}


var filterEvent = async function (req, res) {
    try {
        let filterOptions = req.body; // Lấy filterOptions từ request body
        let filteredEvents = await EventManagementService.filterEvent(filterOptions);
        if (filteredEvents) {
            return res.send(Response.successResponse(filteredEvents));
        } else {
            res.send(Response.internalServerErrorResponse());
        }
    } catch (error) {
        console.log(error);
        res.send(Response.internalServerErrorResponse(error));
    }
}
var SendSMSToMember = async (req, res) => {
    try {
        console.log('body: ' + req.body)
        let ListPhone = req.body.ListPhone;

        let contentMessage = req.body.contentMessage;
        let CodeID = req.body.CodeID;
        let accountID = req.payload.insertId;

        let count = ListPhone.length
        if (CoreFunction.isDataNumberExist(accountID)) {
            console.log('false1')
            let accountData = await UserManagement.getAccountByAccountID(accountID);
            console.log('accountData: ' + accountData)
            if (accountData != null && accountData.length > 0) {
                let account = accountData[0];
                if (account.FreeSMS < count) {
                    console.log('false')
                    return res.send(Response.internalServerErrorResponse(null, 'Tài khoản để hết số lượt gửi sms miễn phí trong ngày'))
                } else {
                    console.log('true')
                    account.FreeSMS = account.FreeSMS - count;
                    UserManagement.setFreeSMS(account.FreeSMS, accountID);
                }
            }
        }

        for (let i = 0; i < ListPhone.length; i++) {
            let sendSms = ExecuteSendSNS(ListPhone[i], contentMessage);
            if (!sendSms) {
                return res.send(Response.internalServerErrorResponse())
            }
        }
        await SetHistorySendEmailandSMS(contentMessage, CodeID, res);
    } catch (error) {
        console.log(error);
        res.send(Response.internalServerErrorResponse(error));
    }
}


var sendEmailToMember = async (req, res) => {
    try {
        console.log("đã vào send email")
        console.log("req.body: " + req.body)
        let objData = {};
        let ListEmail = req.body.ListEmail;
        objData.subject = req.body.subject;
        objData.text = req.body.text;
        objData.html = req.body.html;
        let CodeID = req.body.CodeID;
        let accountID = req.payload.insertId;

        let count = ListEmail.length;

        console.log('ListEmail: ' + ListEmail)
        // nếu có accountid thì check xem có đủ lần gửi mail ko
        if (CoreFunction.isDataNumberExist(accountID)) {
            let accountData = await UserManagement.getAccountByAccountID(accountID);
            if (accountData != null && accountData.length > 0) {
                let account = accountData[0];
                if (account.FreeEmail < count) {
                    console.log()
                    return res.send(Response.internalServerErrorResponse(null, "Tài khoản để hết số lượt gửi email miễn phí trong ngày"))
                } else {
                    console.log("true")
                    account.FreeEmail = account.FreeEmail - count;
                    UserManagement.setFreeEmail(account.FreeEmail, accountID);
                }
            }
        }

        if (ListEmail) {
            for (let i = 0; i < ListEmail.length; i++) {
                ExecuteSendEmail(ListEmail[i], objData.subject, objData.text, objData.html, res);
            }
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
        let setHistory = await SystemAction.SetHistorySendEmail(objData.subject, objData.text, CodeID);

        if (setHistory) {
            return res.send(Response.successResponse());
        } else {
            return res.send(Response.dataNotFoundResponse())
        }

    } catch (error) {

    }
}

function ExecuteSendEmail(to, subject, text, html) {
    try {
        let objData = {};
        objData.to = to;
        objData.subject = subject;
        objData.text = text;
        objData.html = html;
        let requiredFields = ['to', 'subject'];
        // Trường hợp cả 2 trường text và html đều có
        if (objData.text != null && objData.html != null) {
            console.log("Bạn chỉ được gửi text hoặc html!");
        }
        // Trường hợp thiếu cả 2 trường text và html
        if (objData.text == null && objData.html == null) {
            console.log("Bạn phải gửi text hoặc html!");
        }
        // Kiểm tra xem có đủ các trường trong nhưng trường bắt buộc phải có không
        const missingFields = requiredFields.filter(field => !(field in objData));
        console.log(missingFields);
        // Trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        let result = SystemAction.SendEmailCore(objData);

        if (result == true) {
            console.log("Gửi email thành công!");
        }
    } catch (error) {
        console.log(error);
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

var ReadXLSX = async (req, res) => {
    try {
        console.log("Vào hàm ReadXLSX");
        console.log("req.file: ", req.file);
        const file = req.file.path;
        console.log("file: ", file);
        let spreadsheet = xlsx.readFile(file);
        const sheets = spreadsheet.SheetNames;
        for (let i = 0; i < sheets.length; i++) {
            console.log('Sheet ' + i + ' -- ' + sheets[i]);
        }
        const firstSheet = spreadsheet.Sheets[sheets[0]];

        // Lấy ra dòng 1
        const row1 = firstSheet['!ref'].split(':')[0] + ':' + firstSheet['!ref'].split(':')[0];
        const row1Values = xlsx.utils.sheet_to_json(firstSheet, { header: 1, range: row1 })[0];

        // Lấy ra dòng 2
        const row2 = firstSheet['!ref'].split(':')[0] + ':' + firstSheet['!ref'].split(':')[0];
        const row2Values = xlsx.utils.sheet_to_json(firstSheet, { header: 1, range: row2 })[0];

        console.log('Row 1: ', row1Values);
        console.log('Row 2: ', row2Values);
        return res.send(Response.successResponse());
    } catch (error) {
        console.log(error);
        return res.send(Response.internalServerErrorResponse());
    }
};

//Nguyễn Lê Hùng
var checkConfirmedEvent = async (req, res) => {
    try {
        let EventID = req.body.EventID;
        let MemberID = req.body.MemberID;
        let token = req.body.token;
        let data = await EventAttendence.checkConfirmedEvent(EventID, MemberID, token);
        console.log('data: ' + data)
        if (data) {
            return res.send(Response.successResponse(data))
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'Thành viên chưa confirm'))
        }
    } catch (error) {

    }
}

var addAttendence = async (req, res) => {
    try {
        let { eventID } = req.body

        try {
            let checkEventId = await EventAttendence.checkEventID(eventID)
            if (checkEventId > 0) {
                return res.send(Response.badRequestResponse(null, 'Đã có event ID'));
            }
        } catch (checkEventIdError) {
            return res.send(Response.internalServerErrorResponse(error.message || error));
        }
        let codeID;
        try {
            codeID = await EventManagementService.getCodeID(eventID);
        } catch (codeIDError) {
            return res.send(Response.internalServerErrorResponse(error.message || error));
        }

        let memberIDs;
        try {
            memberIDs = await FamilyMember.getAllMemberID(codeID[0].CodeID);
        } catch (memberIDsError) {
            return res.send(Response.internalServerErrorResponse(error.message || error));
        }

        let memberIdNumbers = memberIDs.map(member => member.MemberID);

        let successfulInsertions = 0;

        for (let memberId of memberIdNumbers) {
            try {
                let data = await EventAttendence.insertMemberAttend(eventID, memberId);
                if (data) {
                    successfulInsertions++;
                }
            } catch (insertError) {
                return res.send(Response.internalServerErrorResponse(error.message || error));
            }
        }

        if (successfulInsertions === memberIdNumbers.length) {
            return res.send(Response.successResponse(null, 'Thêm sự kiện thành công'));
        } else {
            return res.send(Response.internalServerErrorResponse());
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse(error.message || error));
    }
}

var inviteMail = async (req, res) => {
    try {
        const requestBody = req.body;
        const emails = requestBody.data.map(item => item.Email);
        const memberIds = requestBody.data.map(item => item.MemberID);
        const eventId = requestBody.eventId;
        const time = requestBody.time;
        let datetime = req.body.datetime;


        console.log('eventId: ' + eventId)


        console.log('requestBody: ' + requestBody)
        let updateFormEndDate = await EventAttendence.UpdateFormEndDate(datetime, eventId)
        if (!updateFormEndDate) {
            return res.send(Response.internalServerErrorResponse())
        }

        if (memberIds.length > 0) {
            for (let i = 0; i < memberIds.length; i++) {
                const memberId = memberIds[i];
                const token = await signInviteToken(memberId, eventId, time);

                const data = await EventAttendence.Update(memberId, token);
                const link = `${frontEndURL}/CfEvent?token=${token}`;
                console.log('link:::::::: ' + link)
                if (data === true) {
                    const mailOptions = {
                        to: emails[i],
                        subject: 'Your Invite Link',
                        text: `Here is your invite link: ${link}`,
                        html: `<p>Bạn có thông báo mới về sự kiện sắp diễn ra. Click <a href="${link}">here</a> để biết thêm chi tiết.</p>`,
                    };
                    SystemAction.SendEmailCore(mailOptions);
                    console.log(`Token generated for member ${memberId}: ${token}`);
                } else {
                    return res.send(Response.internalServerErrorResponse(null, 'Lỗi hệ thống'));
                }
            }
        }
        return res.send(Response.successResponse(null, 'Đã gửi mail mời mọi người'));

    } catch (error) {
        return res.send(Response.internalServerErrorResponse(error, 'Lỗi hệ thống'));
    }
}

var getEventByToken = async (req, res) => {
    try {
        let token = req.query.token;
        let payload = await verifyInviteToken(token);
        console.log('token: ' + token)
        console.log('payload: ' + payload.memberId)
        console.log('Result:', JSON.stringify(payload, null, 2));

        let checkExpair = await EventAttendence.checkExpairEvent(payload.eventId);
        if (!checkExpair) {
            return res.send(Response.internalServerErrorResponse(null, "Link đã hết hạn"));
        }

        let tokenData = await EventAttendence.checkTokenEvent(token);
        if (tokenData == 0) {
            return res.send(Response.dataNotFoundResponse(null, 'Link không đúng'));
        }
        return res.send(Response.successResponse(payload))
    } catch (error) {
        return res.send(Response.dataNotFoundResponse());
    }
}

var UpdateIsGoing = async (req, res) => {
    try {
        let memberId = req.body.memberId;
        let eventId = req.body.eventId;
        let IsGoing = req.body.IsGoing
        let data = await EventAttendence.UpdateIsGoing(memberId, eventId, IsGoing)
        if (data) {
            res.send(Response.successResponse(null, 'Phản hồi thành công. Xin cảm ơn bạn'))
        } else {
            res.send(Response.internalServerErrorResponse(null, 'Lỗi hệ thống'))
        }
    } catch (error) {
        res.send(Response.internalServerErrorResponse(null, 'Lỗi hệ thống'))
    }
}

var verifyMail = async (req, res) => {
    try {
        let token = req.query.token;
        let IsGoing = req.body.IsGoing;
        let payload = await verifyInviteToken(token);
        if (payload.error === 'Token expired') {
            return res.send(Response.internalServerErrorResponse(null, "Link đã hết hạn"));
        }
        let tokenData = await EventAttendence.checkTokenEvent(token);
        if (tokenData == 0) {
            return res.send(Response.dataNotFoundResponse(null, 'Link không đúng'));
        }
        let data;
        try {
            data = await EventAttendence.UpdateIsGoing(payload.memberId, payload.eventId, IsGoing);

            if (data == true) {
                let data1;
                try {
                    data1 = await EventAttendence.DeleteToken(payload.memberId, payload.eventId);
                    if (data1 == true) {
                        return res.send(Response.successResponse());
                    }
                    return res.send(Response.internalServerErrorResponse(null, 'Lỗi xoá Token'));
                } catch (error) {
                    return res.send(Response.internalServerErrorResponse(error, 'Lỗi khi xoá Token'));
                }
            } else {
                return res.send(Response.internalServerErrorResponse(null, 'Lỗi hệ thống'));
            }
        } catch (error) {
            return res.send(Response.internalServerErrorResponse(null, 'Lỗi khi cập nhật dữ liệu'));
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse(null, error.message));
    }
}




module.exports = {
    getAllEventGenealogy, InsertEvent, UpdateEvent, RemoveEvent, GetBirthDayInMonth, GetDeadDayInMonth,
    SendSMS, SendEmail, searchEvent, filterEvent, SendSMSToMember, getInformationEvent, sendEmailToMember
    , addAttendence, inviteMail, verifyMail, ReadXLSX, updateStatusEventGenealogy, getEventAttendance,
    getListMemberIDAndEmail, getEventByToken, checkConfirmedEvent, UpdateIsGoing, getListEventNotificationSent,
    getNumberRemainingSMSSendss, getNumberRemainingEmailSends, getListMemberHasEmail, getListMemberHasPhone,
    searchMemberHasEmail, searchMemberHasPhone, getInforEventattendance, updateTimeEventattendance
}