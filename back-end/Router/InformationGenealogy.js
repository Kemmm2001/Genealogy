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

    router.get('/generalInfor', authMiddleware.authenticateAndAuthorize(3), GeneralInformation.GetGeneralInformation)
    router.put('/updateInfor', authMiddleware.authenticateAndAuthorize(2), GeneralInformation.UpdateGeneralInformation)

    router.get('/statistics', authMiddleware.authenticateAndAuthorize(3), StatisticsController.Statistics)
    router.get('/filterMonth', authMiddleware.authenticateAndAuthorize(3), StatisticsController.filterMemberByMonth)
    router.get('/filterByAge', authMiddleware.authenticateAndAuthorize(3), StatisticsController.FilterMemberByAge)

    //API tuấn
    // Create a new FamilyHistory
    router.post('/familyhistory', authMiddleware.authenticateAndAuthorize(2), FamilyHistoryController.addFamilyHistory);
    // Retrieve a single FamilyHistory with id
    router.get('/familyhistory', authMiddleware.authenticateAndAuthorize(3), FamilyHistoryController.getFamilyHistory);
    // Update a FamilyHistory with id
    router.put('/familyhistory', authMiddleware.authenticateAndAuthorize(3), FamilyHistoryController.updateFamilyHistory);
    // Delete a FamilyHistory with id
    router.get('/delete-familyhistory', authMiddleware.authenticateAndAuthorize(2), FamilyHistoryController.deleteFamilyHistory);
    router.post('/searchHistory', authMiddleware.authenticateAndAuthorize(3), FamilyHistoryController.searchHistory)
    router.post('/filterHistory', authMiddleware.authenticateAndAuthorize(3), FamilyHistoryController.filterHistory)


    // Create a new AlbumPhoto
    router.post('/albumphoto', authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("album-photo").single('BackGroundPhoto'), AlbumPhotoController.addAlbumPhoto);
    // Retrieve a single AlbumPhoto with id
    router.get('/albumphoto', authMiddleware.authenticateAndAuthorize(3), AlbumPhotoController.getAlbumPhoto);
    // Update an AlbumPhoto with id
    router.put('/albumphoto', authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("album-photo").single('BackGroundPhoto'), AlbumPhotoController.updateAlbumPhoto);
    // Delete an AlbumPhoto with id
    router.get('/delete-albumphoto', authMiddleware.authenticateAndAuthorize(2), AlbumPhotoController.deleteAlbumPhoto);
    router.get('/searchAlbum', authMiddleware.authenticateAndAuthorize(3), AlbumPhotoController.searchAlbumPhoto)

    // Create a new FamilyPhoto
    router.post('/familyphoto', authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("family-photo").single('Photo'), FamilyPhotoController.addFamilyPhoto);
    router.get('/familyphoto', authMiddleware.authenticateAndAuthorize(3), FamilyPhotoController.getFamilyPhoto);
    // Delete a FamilyPhoto with id
    router.get('/delete-familyphoto', authMiddleware.authenticateAndAuthorize(2), FamilyPhotoController.deleteFamilyPhoto);
    // End API tuấn




    router.get('/province', authMiddleware.authenticateAndAuthorize(3), AddressController.getProvince);
    router.get('/district', authMiddleware.authenticateAndAuthorize(3), AddressController.getDistrict);
    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;