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

    router.get('/generalInfor', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, GeneralInformation.GetGeneralInformation)
    router.put('/updateInfor', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, GeneralInformation.UpdateGeneralInformation)

    router.get('/statistics', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, StatisticsController.Statistics)
    router.get('/filterMonth', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, StatisticsController.filterMemberByMonth)
    router.get('/filterByAge', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, StatisticsController.FilterMemberByAge)

    //API tuấn
    // Create a new FamilyHistory
    router.post('/familyhistory', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid ,FamilyHistoryController.addFamilyHistory);
    // Retrieve a single FamilyHistory with id
    router.get('/familyhistory', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, FamilyHistoryController.getFamilyHistory);
    // Update a FamilyHistory with id
    router.put('/familyhistory', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, FamilyHistoryController.updateFamilyHistory);
    // Delete a FamilyHistory with id
    router.get('/delete-familyhistory', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, FamilyHistoryController.deleteFamilyHistory);
    router.post('/searchHistory', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, FamilyHistoryController.searchHistory)
    router.post('/filterHistory', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, FamilyHistoryController.filterHistory)


    // Create a new AlbumPhoto
    router.post('/albumphoto', authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("album-photo").single('BackGroundPhoto'), AlbumPhotoController.addAlbumPhoto);
    // Retrieve a single AlbumPhoto with id
    router.get('/albumphoto', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, AlbumPhotoController.getAlbumPhoto);
    // Update an AlbumPhoto with id
    router.put('/albumphoto', authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("album-photo").single('BackGroundPhoto'), AlbumPhotoController.updateAlbumPhoto);
    // Delete an AlbumPhoto with id
    router.get('/delete-albumphoto', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, AlbumPhotoController.deleteAlbumPhoto);
    router.get('/searchAlbum', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, AlbumPhotoController.searchAlbumPhoto)

    // Create a new FamilyPhoto
    router.post('/familyphoto', authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("family-photo").single('Photo'), FamilyPhotoController.addFamilyPhoto);
    router.get('/familyphoto', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, FamilyPhotoController.getFamilyPhoto);
    // Delete a FamilyPhoto with id
    router.get('/delete-familyphoto', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, FamilyPhotoController.deleteFamilyPhoto);
    // End API tuấn




    router.get('/province', authMiddleware.authenticateAndAuthorize(3), AddressController.getProvince);
    router.get('/district', authMiddleware.authenticateAndAuthorize(3), AddressController.getDistrict);
    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;