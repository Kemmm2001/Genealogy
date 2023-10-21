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
    //API tuấn
    router.post('/send-sms', EventManagementController.SendSMS)
    router.post('/send-email', EventManagementController.SendEmail)


    //API Nhật anh


    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;