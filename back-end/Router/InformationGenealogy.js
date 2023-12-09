const express = require('express');
const GeneralInformation = require('../Controller/InformationGenealogy/GeneralInformationController')
const FamilyHistoryController = require('../Controller/InformationGenealogy/FamilyHistory');
const StatisticsController = require('../Controller/InformationGenealogy/StatisticsController')
const AlbumPhotoController = require('../Controller/InformationGenealogy/AlbumPhotoController');
const FamilyPhotoController = require('../Controller/InformationGenealogy/FamilyPhotoController');
const AddressController = require('../Controller/InformationGenealogy/AddressController');
const CoreFunction = require('../Utils/CoreFunction');
const authMiddleware = require('../helper/author_helper')

var router = express.Router();






const initWebRouter = (app) => {
    //API Hùng        

    router.get('/generalInfor', GeneralInformation.GetGeneralInformation)
    router.put('/updateInfor', authMiddleware.authenticateAndAuthorize(2), GeneralInformation.UpdateGeneralInformation)

    router.get('/statistics', StatisticsController.Statistics)
    router.get('/filterMonth', StatisticsController.filterMemberByMonth)
    router.get('/filterByAge', StatisticsController.FilterMemberByAge)

    //API tuấn
    // Create a new FamilyHistory
    router.post('/familyhistory', authMiddleware.authenticateAndAuthorize(2), FamilyHistoryController.addFamilyHistory);
    // Retrieve a single FamilyHistory with id
    router.get('/familyhistory', FamilyHistoryController.getFamilyHistory);
    // Update a FamilyHistory with id
    router.put('/familyhistory', authMiddleware.authenticateAndAuthorize(2), FamilyHistoryController.updateFamilyHistory);
    // Delete a FamilyHistory with id
    router.get('/delete-familyhistory', authMiddleware.authenticateAndAuthorize(2), FamilyHistoryController.deleteFamilyHistory);
    router.post('/searchHistory', FamilyHistoryController.searchHistory)
    router.post('/filterHistory', FamilyHistoryController.filterHistory)


    // Create a new AlbumPhoto
    router.post('/albumphoto', authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("album-photo").single('BackGroundPhoto'), AlbumPhotoController.addAlbumPhoto);
    // Retrieve a single AlbumPhoto with id
    router.get('/albumphoto', AlbumPhotoController.getAlbumPhoto);
    // Update an AlbumPhoto with id
    router.put('/albumphoto', authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("album-photo").single('BackGroundPhoto'), AlbumPhotoController.updateAlbumPhoto);
    // Delete an AlbumPhoto with id
    router.get('/delete-albumphoto', authMiddleware.authenticateAndAuthorize(2), AlbumPhotoController.deleteAlbumPhoto);
    router.get('/searchAlbum', AlbumPhotoController.searchAlbumPhoto)

    // Create a new FamilyPhoto
    router.post('/familyphoto', authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("family-photo").single('Photo'), FamilyPhotoController.addFamilyPhoto);
    // Retrieve a single FamilyPhoto with id
    router.get('/familyphoto', FamilyPhotoController.getFamilyPhoto);
    // Update a FamilyPhoto with id
    router.put('/familyphoto', authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("family-photo").single('Photo'), FamilyPhotoController.updateFamilyPhoto);
    // Delete a FamilyPhoto with id
    router.get('/delete-familyphoto', authMiddleware.authenticateAndAuthorize(2), FamilyPhotoController.deleteFamilyPhoto);
    // End API tuấn




    router.get('/province', AddressController.getProvince);
    router.get('/district', AddressController.getDistrict);
    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;