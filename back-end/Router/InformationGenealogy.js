const express = require('express');
const FamilyHeadController = require('../Controller/InformationGenealogy/FamilyHeadController')
const GeneralInformation = require('../Controller/InformationGenealogy/GeneralInformationController')
const FamilyHistoryController = require('../Controller/InformationGenealogy/FamilyHistory');
const StatisticsController = require('../Controller/InformationGenealogy/StatisticsController')
const AlbumPhotoController = require('../Controller/InformationGenealogy/AlbumPhoto');
var router = express.Router();



const initWebRouter = (app) => {
    //API Hùng
    router.get('/familyhead', FamilyHeadController.ListFamilyHead)
    router.delete('/removeFamilyHead', FamilyHeadController.removeRoleFamilyHead)

    router.get('/generalInfor', GeneralInformation.GetGeneralInformation)
    router.put('/updateInfor', GeneralInformation.UpdateGeneralInformation)

    router.get('/statistics', StatisticsController.Statistics)
    router.get('/filterMonth', StatisticsController.filterMemberByMonth)

    
    //API tuấn
    // Create a new FamilyHistory
    router.post('/familyhistory', FamilyHistoryController.addFamilyHistory);
    // Retrieve all FamilyHistories with CodeID
    router.get('/familyhistory/code-id/:id', FamilyHistoryController.getFamilyHistoryByCodeId);
    // Retrieve a single FamilyHistory with id
    router.get('/familyhistory/:id', FamilyHistoryController.getFamilyHistoryById);
    // Update a FamilyHistory with id
    router.put('/familyhistory', FamilyHistoryController.updateFamilyHistory);
    // Delete a FamilyHistory with id
    router.delete('/familyhistory', FamilyHistoryController.deleteFamilyHistory);

    // Create a new AlbumPhoto
    router.post('/albumphoto', AlbumPhotoController.addAlbumPhoto);
    // Retrieve all AlbumPhotos with codeId
    router.get('/albumphoto/code-id/:id', AlbumPhotoController.getAlbumPhotoByCodeId);
    // Retrieve a single AlbumPhoto with id
    router.get('/albumphoto/:id', AlbumPhotoController.getAlbumPhotoById);
    // Update an AlbumPhoto with id
    router.put('/albumphoto', AlbumPhotoController.updateAlbumPhoto);
    // Delete an AlbumPhoto with id
    router.delete('/albumphoto', AlbumPhotoController.deleteAlbumPhoto);



    //API Nhật anh


    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;