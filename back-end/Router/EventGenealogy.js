const express = require('express');
const EventManagementController = require('../Controller/EventGenealogy/EventManagementController')
var router = express.Router();



const initWebRouter = (app) => {
    //API Hùng
    router.get('/event', EventManagementController.getAllEventGenealogy)
    router.post('/addEvent', EventManagementController.InsertEvent)
    router.put('/updateEvent', EventManagementController.UpdateEvent)
    router.delete('/removeEvent', EventManagementController.RemoveEvent)
    //API tuấn



    //API Nhật anh


    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;