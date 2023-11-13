const express = require('express');
const EventManagementController = require('../Controller/EventGenealogy/EventManagementController')
var router = express.Router();



const initWebRouter = (app) => {
    //API Hùng
    router.get('/event', EventManagementController.getAllEventGenealogy)
    router.post('/addEvent', EventManagementController.InsertEvent)
    router.put('/updateEvent', EventManagementController.UpdateEvent)
    router.delete('/removeEvent', EventManagementController.RemoveEvent)

    router.get('/birthday', EventManagementController.GetBirthDayInMonth)
    router.get('/deadDay', EventManagementController.GetDeadDayInMonth)
    router.post('/send-sms', EventManagementController.SendSMSToMember)   
    //API tuấn
    // router.post('/send-sms', EventManagementController.SendSMS)
    router.post('/send-email', EventManagementController.SendEmail)



    //API Nhật anh
    router.post('/search-event', EventManagementController.searchEvent);
    router.post('/filter-event', EventManagementController.filterEvent);
    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;