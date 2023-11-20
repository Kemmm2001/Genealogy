const express = require('express');
const FamilyHeadController = require('../Controller/InformationGenealogy/FamilyHeadController')
const GeneralInformation = require('../Controller/InformationGenealogy/GeneralInformationController')
const FamilyHistoryController = require('../Controller/InformationGenealogy/FamilyHistory');
const StatisticsController = require('../Controller/InformationGenealogy/StatisticsController')
const AlbumPhotoController = require('../Controller/InformationGenealogy/AlbumPhotoController');
const ArticleController = require('../Controller/FamilyGenealogy/ArticleController')
const FamilyPhotoController = require('../Controller/InformationGenealogy/FamilyPhotoController');
const AddressController = require('../Controller/InformationGenealogy/AddressController');
const CoreFunction = require('../Utils/CoreFunction');

var router = express.Router();






const initWebRouter = (app) => {
    //API Hùng
    router.get('/familyhead', FamilyHeadController.ListFamilyHead)
    router.post('/searchFamilyHead', FamilyHeadController.searchMemberFamilyHead)
    router.delete('/removeFamilyHead', FamilyHeadController.removeRoleFamilyHead)
    router.get('/CanSetfamilyhead', FamilyHeadController.ListFamilyHeadCanAdd)
    router.post('/searchCanAdd',FamilyHeadController.searchFamilyCanSearch)

    router.get('/generalInfor', GeneralInformation.GetGeneralInformation)
    router.put('/updateInfor', GeneralInformation.UpdateGeneralInformation)

    router.get('/statistics', StatisticsController.Statistics)
    router.get('/filterMonth', StatisticsController.filterMemberByMonth)
    router.get('/filterByAge', StatisticsController.FilterMemberByAge)

    //API tuấn
    // Create a new FamilyHistory
    router.post('/familyhistory', FamilyHistoryController.addFamilyHistory);
    // Retrieve a single FamilyHistory with id
    router.get('/familyhistory', FamilyHistoryController.getFamilyHistory);
    // Update a FamilyHistory with id
    router.put('/familyhistory', FamilyHistoryController.updateFamilyHistory);
    // Delete a FamilyHistory with id
    router.delete('/familyhistory', FamilyHistoryController.deleteFamilyHistory);

    // Create a new AlbumPhoto
    router.post('/albumphoto', AlbumPhotoController.addAlbumPhoto);
    // Retrieve a single AlbumPhoto with id
    router.get('/albumphoto', AlbumPhotoController.getAlbumPhoto);
    // Update an AlbumPhoto with id
    router.put('/albumphoto', AlbumPhotoController.updateAlbumPhoto);
    // Delete an AlbumPhoto with id
    router.delete('/albumphoto', AlbumPhotoController.deleteAlbumPhoto);

    // Create a new FamilyPhoto
    router.post('/familyphoto', CoreFunction.uploadImage("family-photo").single('Photo'), FamilyPhotoController.addFamilyPhoto);
    // Retrieve a single FamilyPhoto with id
    router.get('/familyphoto', FamilyPhotoController.getFamilyPhoto);
    // Update a FamilyPhoto with id
    router.put('/familyphoto', CoreFunction.uploadImage("family-photo").single('Photo'), FamilyPhotoController.updateFamilyPhoto);
    // Delete a FamilyPhoto with id
    router.delete('/familyphoto', FamilyPhotoController.deleteFamilyPhoto);
    // End API tuấn
    //API Nhật anh

    router.get('/article', ArticleController.getAllArticle);
    router.post('/article', ArticleController.getArticle);
    router.post('/add-article', ArticleController.addArticle);
    router.put('/update-article', ArticleController.updateArticle);
    router.delete('/delete-article', ArticleController.deleteArticle);

    router.get('/province', AddressController.getProvince);
    router.get('/district', AddressController.getDistrict);
    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;