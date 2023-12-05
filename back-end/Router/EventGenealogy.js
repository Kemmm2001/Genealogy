const express = require('express');
const EventManagementController = require('../Controller/EventGenealogy/EventManagementController')
const CoreFunction = require('../Utils/CoreFunction');
var router = express.Router();



const initWebRouter = (app) => {
    //API Hùng
    router.get('/event', EventManagementController.getAllEventGenealogy)
    router.post('/addEvent', EventManagementController.InsertEvent)
    router.put('/updateEvent', EventManagementController.UpdateEvent)
    router.delete('/removeEvent', EventManagementController.RemoveEvent)
    router.get('/inforEvent', EventManagementController.getInformationEvent)
    router.post('/searchEvent', EventManagementController.searchEvent)
    router.put('/updateStatusEvent', EventManagementController.updateStatusEventGenealogy)
    router.get('/eventAttendance', EventManagementController.getEventAttendance)
    router.get('/getIdAndEmail', EventManagementController.getListMemberIDAndEmail)
    // router.get('/getEmail',EventManagementController)

    router.get('/birthday', EventManagementController.GetBirthDayInMonth)
    router.get('/deadDay', EventManagementController.GetDeadDayInMonth)
    router.post('/send-sms', EventManagementController.SendSMSToMember)
    //API tuấn
    // router.post('/send-sms', EventManagementController.SendSMS)
    // router.post('/send-email', EventManagementController.SendEmail)
    router.post('/send-email', EventManagementController.sendEmailToMember)
    router.post('/send-email-core', EventManagementController.SendEmail)
    router.post('/read-xlsx', CoreFunction.uploadExcelFile('family-member-xlsx').single('xlsx'), EventManagementController.ReadXLSX)

    //API Nhật anh  
    router.post('/filter-event', EventManagementController.filterEvent);
    router.post('/addAttendence', EventManagementController.addAttendence)
    router.post('/inviteMail', EventManagementController.inviteMail)
    router.post('/verify-invite', EventManagementController.verifyMail)
    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;