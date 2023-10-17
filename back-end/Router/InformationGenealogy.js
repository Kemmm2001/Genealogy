const express = require('express');
const FamilyHeadController = require('../Controller/InformationGenealogy/FamilyHeadController')
const GeneralInformation = require('../Controller/InformationGenealogy/GeneralInformationController')
var router = express.Router();



const initWebRouter = (app) => {
    //API Hùng
    router.get('/familyhead', FamilyHeadController.ListFamilyHead)
    router.delete('/removeFamilyHead', FamilyHeadController.removeRoleFamilyHead)

    router.get('/generalInfor',GeneralInformation.GetGeneralInformation)
    router.put('/updateInfor',GeneralInformation.UpdateGeneralInformation)
    //API tuấn



    //API Nhật anh


    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;