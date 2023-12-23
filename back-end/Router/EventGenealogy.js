const express = require('express');
const EventManagementController = require('../Controller/EventGenealogy/EventManagementController')
const CoreFunction = require('../Utils/CoreFunction');
var router = express.Router();
const authMiddleware = require('../helper/author_helper')


const initWebRouter = (app) => {
    //API Hùng
    router.get('/event', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, EventManagementController.getAllEventGenealogy)
    router.post('/addEvent', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, EventManagementController.InsertEvent)
    router.put('/updateEvent', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, EventManagementController.UpdateEvent)
    router.delete('/removeEvent', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, EventManagementController.RemoveEvent)
    router.get('/inforEvent', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, EventManagementController.getInformationEvent)
    router.post('/searchEvent', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, EventManagementController.searchEvent)
    router.put('/updateStatusEvent', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, EventManagementController.updateStatusEventGenealogy)
    router.get('/eventAttendance', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, EventManagementController.getEventAttendance)
    router.get('/getIdAndEmail', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, EventManagementController.getListMemberIDAndEmail)
    router.post('/checkConfirmed', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, EventManagementController.checkConfirmedEvent)
    router.put('/UpdateIsGoing', CoreFunction.isChecksumValid, EventManagementController.UpdateIsGoing)
    router.get('/ListEventNotiSent', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, EventManagementController.getListEventNotificationSent)
    router.get('/listMemberEmail', authMiddleware.authenticateAndAuthorize(1), CoreFunction.isChecksumValid, EventManagementController.getListMemberHasEmail)
    router.get('/listMemberPhone', authMiddleware.authenticateAndAuthorize(1), CoreFunction.isChecksumValid, EventManagementController.getListMemberHasPhone)
    router.get('/searchMemberEmail', authMiddleware.authenticateAndAuthorize(1), CoreFunction.isChecksumValid, EventManagementController.searchMemberHasEmail)
    router.get('/searchMemberPhone', authMiddleware.authenticateAndAuthorize(1), CoreFunction.isChecksumValid, EventManagementController.searchMemberHasPhone)
    router.get('/inforEventattendance', authMiddleware.authenticateAndAuthorize(1), CoreFunction.isChecksumValid, EventManagementController.getInforEventattendance)
    router.put('/updateTimeEvent', authMiddleware.authenticateAndAuthorize(1), CoreFunction.isChecksumValid, EventManagementController.updateTimeEventattendance)

    // router.get('/getEmail',EventManagementController)

    router.get('/birthday', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, EventManagementController.GetBirthDayInMonth)
    router.get('/deadDay', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, EventManagementController.GetDeadDayInMonth)
    router.post('/send-sms', authMiddleware.authenticateAndAuthorize(1), CoreFunction.isChecksumValid, EventManagementController.SendSMSToMember)
    router.get('/remainingSMS', authMiddleware.authenticateAndAuthorize(1), CoreFunction.isChecksumValid, EventManagementController.getNumberRemainingSMSSendss)
    router.get('/remainingEmail', authMiddleware.authenticateAndAuthorize(1), CoreFunction.isChecksumValid, EventManagementController.getNumberRemainingEmailSends)

    //API tuấn
    // router.post('/send-sms', CoreFunction.isChecksumValid, EventManagementController.SendSMS)
    // router.post('/send-email', CoreFunction.isChecksumValid, EventManagementController.SendEmail)
    router.post('/send-email', authMiddleware.authenticateAndAuthorize(1), CoreFunction.isChecksumValid, EventManagementController.sendEmailToMember)
    router.post('/send-email-core', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, EventManagementController.SendEmail)
    router.post('/read-xlsx', authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadExcelFile('family-member-xlsx').single('xlsx'), EventManagementController.ReadXLSX)

    //API Nhật anh  
    router.post('/filter-event', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, EventManagementController.filterEvent);
    router.post('/addAttendence', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, EventManagementController.addAttendence)
    router.post('/inviteMail', authMiddleware.authenticateAndAuthorize(1), CoreFunction.isChecksumValid, EventManagementController.inviteMail)
    router.post('/verify-invite', CoreFunction.isChecksumValid, EventManagementController.verifyMail)
    router.get('/getEventByToken', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, EventManagementController.getEventByToken)
    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;