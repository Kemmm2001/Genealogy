const express = require('express');
const FamilyHeadController = require('../Controller/InformationGenealogy/FamilyHeadController')
var router = express.Router();



const initWebRouter = (app) => {
    //API Hùng
    router.get('/familyhead', FamilyHeadController.ListFamilyHead)


    //API tuấn



    //API Nhật anh


    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;