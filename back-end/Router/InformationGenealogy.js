const express = require('express');
const FamilyHeadController = require('../Controller/InformationGenealogy/FamilyHeadController')
const GeneralInformation = require('../Controller/InformationGenealogy/GeneralInformationController')
const FamilyHistoryController = require('../Controller/InformationGenealogy/FamilyHistory');
var router = express.Router();



const initWebRouter = (app) => {
    //API Hùng
    router.get('/familyhead', FamilyHeadController.ListFamilyHead)
    router.delete('/removeFamilyHead', FamilyHeadController.removeRoleFamilyHead)

    router.get('/generalInfor', GeneralInformation.GetGeneralInformation)
    router.put('/updateInfor', GeneralInformation.UpdateGeneralInformation)
    //API tuấn
    // Create a new FamilyHistory
    router.post('/familyhistory', FamilyHistoryController.addFamilyHistory);
    // Retrieve all FamilyHistories
    router.get('/familyhistory', FamilyHistoryController.getAllFamilyHistory);
    // Retrieve a single FamilyHistory with id
    router.get('/familyhistory/:id', FamilyHistoryController.getFamilyHistoryById);
    // Update a FamilyHistory with id
    router.put('/familyhistory', FamilyHistoryController.updateFamilyHistory);
    // Delete a FamilyHistory with id
    router.delete('/familyhistory', FamilyHistoryController.deleteFamilyHistory);



    //API Nhật anh


    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;