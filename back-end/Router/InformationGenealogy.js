const express = require('express');
const FamilyHeadController = require('../Controller/InformationGenealogy/FamilyHeadController')
const GeneralInformation = require('../Controller/InformationGenealogy/GeneralInformationController')
const FamilyHistoryController = require('../Controller/InformationGenealogy/FamilyHistory');
const StatisticsController = require('../Controller/InformationGenealogy/StatisticsController')
const AlbumPhotoController = require('../Controller/InformationGenealogy/AlbumPhotoController');
const ArticleController = require('../Controller/FamilyGenealogy/ArticleController')
const MemberPhotoController = require('../Controller/InformationGenealogy/MemberPhotoController');
var router = express.Router();
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});




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

    // Create a new MemberPhoto
    router.post('/memberphoto', upload.single('photo'), MemberPhotoController.addMemberPhoto);
    // Retrieve all MemberPhotos with codeId
    router.get('/memberphoto/album-id/:id', MemberPhotoController.getMemberPhotoByAlbumId);
    // Retrieve a single MemberPhoto with id
    router.get('/memberphoto/:id', MemberPhotoController.getMemberPhotoById);
    // Update a MemberPhoto with id
    router.put('/memberphoto', upload.single('photo'), MemberPhotoController.updateMemberPhoto);
    // Delete a MemberPhoto with id
    router.delete('/memberphoto', MemberPhotoController.deleteMemberPhoto);
    // End API tuấn
    //API Nhật anh

    router.get('/article', ArticleController.getAllArticle);
    router.post('/add-article', ArticleController.addArticle);
    router.put('/update-article', ArticleController.updateArticle);
    router.delete('/delete-article', ArticleController.deleteArticle);
    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;